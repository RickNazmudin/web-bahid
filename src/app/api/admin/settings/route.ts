import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { createAuditLog } from "@/lib/audit";

export async function GET() {
  try {
    const settings = await prisma.setting.findMany();
    const settingsMap: Record<string, string> = {};
    settings.forEach((s) => {
      settingsMap[s.key] = s.value;
    });

    return NextResponse.json({
      success: true,
      data: settingsMap,
    });
  } catch (error) {
    console.error("Admin Settings GET Error:", error);
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json(); // Object with key-value pairs

    const updates = Object.entries(body).map(([key, value]) =>
      prisma.setting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value), group: "general" },
      })
    );

    await prisma.$transaction(updates);

    await createAuditLog({
      userId: user.userId,
      action: "UPDATE_SETTINGS",
      entity: "Setting",
      details: { keysUpdated: Object.keys(body) },
    });

    return NextResponse.json({
      success: true,
      message: "Pengaturan website berhasil diperbarui",
    });
  } catch (error) {
    console.error("Admin Settings POST Error:", error);
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server" }, { status: 500 });
  }
}
