import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [periods, programs] = await Promise.all([
      prisma.registrationPeriod.findMany({
        where: { isActive: true },
        orderBy: { startDate: "asc" },
      }),
      prisma.program.findMany({
        where: { isActive: true },
        orderBy: { name: "asc" },
      }),
    ]);

    // Fallback default data if database has not been seeded yet
    const defaultPeriods = periods.length > 0 ? periods : [
      {
        id: "gelombang-1-2026",
        name: "Gelombang 1 — Jalur Prestasi & Reguler TA 2026/2027",
        academicYear: "2026/2027",
        startDate: new Date("2026-01-01"),
        endDate: new Date("2026-03-31"),
        quota: 150,
        registrationFee: 250000,
        isActive: true,
        description: "Pendaftaran Gelombang 1 dibuka untuk semua jenjang dengan beasiswa potongan infaq bagi pendaftar awal.",
      },
      {
        id: "gelombang-2-2026",
        name: "Gelombang 2 — Jalur Reguler TA 2026/2027",
        academicYear: "2026/2027",
        startDate: new Date("2026-04-01"),
        endDate: new Date("2026-06-30"),
        quota: 100,
        registrationFee: 300000,
        isActive: true,
        description: "Pendaftaran Gelombang 2 (kuota tersisa).",
      },
    ];

    const defaultPrograms = programs.length > 0 ? programs : [
      {
        id: "mts-tahfidz",
        name: "Madrasah Tsanawiyah (MTs) Unggulan Tahfidz Al-Qur'an",
        slug: "mts-tahfidz",
        level: "MTs / SMP",
        quota: 75,
        description: "Program terpadu kurikulum Kemenag + Target hafalan 15-30 Juz Al-Qur'an dengan sanad muttashil.",
        curriculum: "Kurikulum Merdeka + Kemenag + Kepesantrenan Klasik",
      },
      {
        id: "ma-sains-riset",
        name: "Madrasah Aliyah (MA) Plus Riset & Keterampilan Digital",
        slug: "ma-sains-riset",
        level: "MA / SMA",
        quota: 60,
        description: "Program MA berbasis sains alam, robotic, coding, serta penguasaan kitab kuning dan bahasa Arab-Inggris aktif.",
        curriculum: "Kemenag + Cambridge Science Prep + Laboratorium Riset",
      },
      {
        id: "salafiyah-kitab",
        name: "Pendidikan Diniyah Formal (PDF) Ulya & Kitab Turats",
        slug: "salafiyah-kitab",
        level: "PDF / Salafiyah",
        quota: 40,
        description: "Kajian mendalam khazanah kutubus sittah, fiqh perbandingan madzhab, balaghah, dan ushul fiqh bersanad.",
        curriculum: "Manhaj Salafiyah Syafi'iyyah + Dirasah Islamiyah",
      },
    ];

    return NextResponse.json({
      success: true,
      data: {
        periods: defaultPeriods,
        programs: defaultPrograms,
      },
    });
  } catch (error) {
    console.error("Error fetching periods and programs:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal memuat data periode dan program",
      },
      { status: 500 }
    );
  }
}
