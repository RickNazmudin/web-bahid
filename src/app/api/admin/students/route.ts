import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { createAuditLog } from "@/lib/audit";
import { StudentStatus, ApplicantStatus, Gender } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const programId = searchParams.get("programId") || "";
    const status = searchParams.get("status") || "AKTIF";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search.trim()) {
      where.OR = [
        { fullName: { contains: search, mode: "insensitive" } },
        { nis: { contains: search, mode: "insensitive" } },
        { nisn: { contains: search, mode: "insensitive" } },
      ];
    }

    if (programId) where.programId = programId;
    if (status) where.status = status as StudentStatus;

    const [total, students] = await Promise.all([
      prisma.student.count({ where }),
      prisma.student.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          program: { select: { name: true, level: true } },
          applicant: { select: { registrationNumber: true } },
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        students,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("Admin Students GET API Error:", error);
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { applicantId, classGrade, dormitoryRoom } = body;

    if (!applicantId) {
      return NextResponse.json({ success: false, message: "ID Pendaftar wajib diisi" }, { status: 400 });
    }

    const applicant = await prisma.applicant.findUnique({
      where: { id: applicantId },
      include: { student: true, program: true },
    });

    if (!applicant) {
      return NextResponse.json({ success: false, message: "Data pendaftar tidak ditemukan" }, { status: 404 });
    }

    if (applicant.student) {
      return NextResponse.json({ success: false, message: "Pendaftar ini sudah dikonversi menjadi santri aktif" }, { status: 400 });
    }

    // Generate NIS (format: YYYY.PROG_CODE.SEQUENCE -> e.g. 2026.01.0001)
    const currentYear = new Date().getFullYear();
    const studentCount = await prisma.student.count({
      where: { entryYear: currentYear },
    });
    const sequence = String(studentCount + 1).padStart(4, "0");
    const progCode = applicant.program.level === "MTs" ? "01" : applicant.program.level === "MA" ? "02" : "03";
    const generatedNis = `${currentYear}.${progCode}.${sequence}`;

    // Create Student & update Applicant status to DITERIMA in a transaction
    const newStudent = await prisma.$transaction(async (tx) => {
      const student = await tx.student.create({
        data: {
          nis: generatedNis,
          applicantId: applicant.id,
          fullName: applicant.fullName,
          gender: applicant.gender,
          nisn: applicant.nisn,
          nik: applicant.nik,
          birthPlace: applicant.birthPlace,
          birthDate: applicant.birthDate,
          programId: applicant.programId,
          entryYear: currentYear,
          status: StudentStatus.AKTIF,
          classGrade: classGrade || "Kelas 7A",
          dormitoryRoom: dormitoryRoom || "Asrama Kampus Utama",
          address: applicant.address,
          phone: applicant.phone,
        },
      });

      await tx.applicant.update({
        where: { id: applicant.id },
        data: { status: ApplicantStatus.DITERIMA },
      });

      return student;
    });

    // Record Audit Log
    await createAuditLog({
      userId: user.userId,
      action: "CONVERT_STUDENT",
      entity: "Student",
      entityId: newStudent.id,
      details: {
        applicantId: applicant.id,
        nis: generatedNis,
        classGrade,
        dormitoryRoom,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Berhasil mengonversi ${applicant.fullName} menjadi Santri Aktif dengan NIS ${generatedNis}`,
      data: newStudent,
    });
  } catch (error) {
    console.error("Admin Student Conversion POST API Error:", error);
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server" }, { status: 500 });
  }
}
