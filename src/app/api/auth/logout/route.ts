import { NextResponse } from "next/server";
import { removeSessionCookie } from "@/lib/auth";

export async function POST() {
  try {
    await removeSessionCookie();
    return NextResponse.json({
      success: true,
      message: "Berhasil logout",
    });
  } catch (error) {
    console.error("Logout API Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal logout",
      },
      { status: 500 }
    );
  }
}
