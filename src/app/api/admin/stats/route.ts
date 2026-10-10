import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const [
      totalApplicants,
      baruCount,
      verifikasiCount,
      seleksiCount,
      lulusCount,
      ditolakCount,
      daftarUlangCount,
      diterimaCount,
      recentApplicants,
      programs,
    ] = await Promise.all([
      prisma.applicant.count(),
      prisma.applicant.count({ where: { status: "BARU" } }),
      prisma.applicant.count({ where: { status: "VERIFIKASI" } }),
      prisma.applicant.count({ where: { status: "SELEKSI" } }),
      prisma.applicant.count({ where: { status: "LULUS" } }),
      prisma.applicant.count({ where: { status: "DITOLAK" } }),
      prisma.applicant.count({ where: { status: "DAFTAR_ULANG" } }),
      prisma.applicant.count({ where: { status: "DITERIMA" } }),
      prisma.applicant.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          program: { select: { name: true, level: true } },
          period: { select: { name: true } },
        },
      }),
      prisma.program.findMany({
        select: {
          id: true,
          name: true,
          level: true,
          _count: { select: { applicants: true } },
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          total: totalApplicants,
          baru: baruCount,
          verifikasi: verifikasiCount,
          seleksi: seleksiCount,
          lulus: lulusCount,
          ditolak: ditolakCount,
          daftarUlang: daftarUlangCount,
          diterima: diterimaCount,
        },
        recentApplicants,
        programs,
      },
    });
  } catch (error) {
    console.error("Admin Stats API Error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
