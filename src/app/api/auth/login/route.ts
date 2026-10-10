import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyPassword, setSessionCookie } from "@/lib/auth";
import { loginSchema } from "@/lib/validations/auth";
import { createAuditLog } from "@/lib/audit";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = loginSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Data login tidak valid",
          errors: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { email, password } = parseResult.data;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user || !user.isActive) {
      return NextResponse.json(
        {
          success: false,
          message: "Email atau password salah",
        },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Email atau password salah",
        },
        { status: 401 }
      );
    }

    // Set session cookie
    await setSessionCookie({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    // Record audit log
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip");
    await createAuditLog({
      userId: user.id,
      action: "LOGIN",
      entity: "User",
      entityId: user.id,
      details: { email: user.email },
      ipAddress: ip,
    });

    return NextResponse.json({
      success: true,
      message: "Login berhasil",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan pada server saat login",
      },
      { status: 500 }
    );
  }
}
