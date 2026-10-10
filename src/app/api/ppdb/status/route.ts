import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const registrationNumber = searchParams.get("registrationNumber")?.trim();
  const birthDateStr = searchParams.get("birthDate")?.trim();

  try {

    if (!registrationNumber || !birthDateStr) {
      return NextResponse.json(
        {
          success: false,
          message: "Nomor Pendaftaran dan Tanggal Lahir wajib diisi.",
        },
        { status: 400 }
      );
    }

    const birthDate = new Date(birthDateStr);
    if (isNaN(birthDate.getTime())) {
      return NextResponse.json(
        {
          success: false,
          message: "Format tanggal lahir tidak valid.",
        },
        { status: 400 }
      );
    }

    // Set start & end of day for timezone-safe date comparison
    const startOfDay = new Date(birthDate);
    startOfDay.setUTCHours(0, 0, 0, 0);
    const endOfDay = new Date(birthDate);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const applicant = await prisma.applicant.findFirst({
      where: {
        registrationNumber,
        birthDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: {
        program: {
          select: {
            name: true,
            level: true,
          },
        },
        period: {
          select: {
            name: true,
            academicYear: true,
          },
        },
        documents: {
          select: {
            type: true,
            status: true,
            verificationNote: true,
            createdAt: true,
          },
        },
      },
    });

    if (!applicant) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Data pendaftaran tidak ditemukan. Pastikan Nomor Pendaftaran dan Tanggal Lahir sesuai dengan data saat mendaftar.",
        },
        { status: 404 }
      );
    }

    // Define workflow steps and progress index
    const statusWorkflow = [
      { key: "BARU", label: "Pendaftaran Dikirim", desc: "Formulir pendaftaran berhasil masuk sistem." },
      { key: "VERIFIKASI", label: "Verifikasi Berkas", desc: "Panitia sedang memvalidasi kelengkapan dokumen administrasi." },
      { key: "SELEKSI", label: "Tahap Seleksi / Ujian", desc: "Tes baca Qur'an, wawancara, dan tes akademik." },
      { key: "LULUS", label: "Dinyatakan Lulus Seleksi", desc: "Selamat! Calon santri telah lolos seleksi penerimaan." },
      { key: "DAFTAR_ULANG", label: "Daftar Ulang & Administrasi", desc: "Penyelesaian administrasi santri baru." },
      { key: "DITERIMA", label: "Resmi Santri Aktif", desc: "Telah terdaftar resmi dan mendapatkan Nomor Induk Santri (NIS)." },
    ];

    let currentStepIndex = 0;
    switch (applicant.status) {
      case "BARU":
        currentStepIndex = 0;
        break;
      case "VERIFIKASI":
        currentStepIndex = 1;
        break;
      case "SELEKSI":
        currentStepIndex = 2;
        break;
      case "LULUS":
        currentStepIndex = 3;
        break;
      case "DAFTAR_ULANG":
        currentStepIndex = 4;
        break;
      case "DITERIMA":
        currentStepIndex = 5;
        break;
      case "DITOLAK":
        currentStepIndex = -1; // Special rejected state
        break;
    }

    return NextResponse.json({
      success: true,
      data: {
        registrationNumber: applicant.registrationNumber,
        fullName: applicant.fullName,
        gender: applicant.gender,
        birthPlace: applicant.birthPlace,
        birthDate: applicant.birthDate,
        programName: applicant.program.name,
        programLevel: applicant.program.level,
        periodName: applicant.period.name,
        academicYear: applicant.period.academicYear,
        status: applicant.status,
        currentStepIndex,
        rejectionReason: applicant.rejectionReason,
        notes: applicant.notes,
        createdAt: applicant.createdAt,
        updatedAt: applicant.updatedAt,
        documents: applicant.documents,
        timeline: statusWorkflow,
      },
    });
  } catch (error) {
    console.error("Status Check Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan saat memeriksa status pendaftaran.",
      },
      { status: 500 }
    );
  }
}
