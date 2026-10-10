import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Gender, DocumentType } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      // Step 1: Program & Periode
      programId,
      periodId,

      // Step 2: Data Diri
      fullName,
      gender,
      nisn,
      nik,
      birthPlace,
      birthDate,
      phone,
      address,
      previousSchool,

      // Step 3: Data Orang Tua / Wali
      fatherName,
      fatherNik,
      fatherJob,
      fatherPhone,
      fatherIncome,
      motherName,
      motherNik,
      motherJob,
      motherPhone,
      motherIncome,
      guardianName,
      guardianPhone,
      guardianRelation,
      parentAddress,

      // Step 4: Dokumen
      documents = [],
    } = body;

    // Validation for required fields
    if (!fullName || !gender || !birthPlace || !birthDate || !address || !previousSchool || !programId || !periodId) {
      return NextResponse.json(
        {
          success: false,
          message: "Data wajib belum lengkap. Harap periksa kembali formulir Anda.",
        },
        { status: 400 }
      );
    }

    // Ensure valid Gender enum
    const validGender = gender === "PEREMPUAN" ? Gender.PEREMPUAN : Gender.LAKI_LAKI;

    // Parse BirthDate
    const parsedBirthDate = new Date(birthDate);
    if (isNaN(parsedBirthDate.getTime())) {
      return NextResponse.json(
        {
          success: false,
          message: "Format tanggal lahir tidak valid.",
        },
        { status: 400 }
      );
    }

    // Check if Program and Period exist or create fallback
    let selectedProgram = await prisma.program.findUnique({
      where: { id: programId },
    });

    if (!selectedProgram) {
      // Try to find first active program or create fallback
      selectedProgram = await prisma.program.findFirst({
        where: { isActive: true },
      });

      if (!selectedProgram) {
        selectedProgram = await prisma.program.create({
          data: {
            id: programId,
            name: "Madrasah Tsanawiyah (MTs) Unggulan Tahfidz",
            slug: "mts-tahfidz",
            level: "MTs / SMP",
            quota: 100,
          },
        });
      }
    }

    let selectedPeriod = await prisma.registrationPeriod.findUnique({
      where: { id: periodId },
    });

    if (!selectedPeriod) {
      selectedPeriod = await prisma.registrationPeriod.findFirst({
        where: { isActive: true },
      });

      if (!selectedPeriod) {
        selectedPeriod = await prisma.registrationPeriod.create({
          data: {
            id: periodId,
            name: "Gelombang 1 — TA 2026/2027",
            academicYear: "2026/2027",
            startDate: new Date("2026-01-01"),
            endDate: new Date("2026-06-30"),
          },
        });
      }
    }

    // Generate Unique Registration Number: PSB-2026-0001
    const currentYear = new Date().getFullYear();
    const count = await prisma.applicant.count();
    const sequence = String(count + 1).padStart(4, "0");
    const registrationNumber = `PSB-${currentYear}-${sequence}`;

    // Transaction to insert Applicant + Parent + Documents
    const result = await prisma.$transaction(async (tx) => {
      const applicant = await tx.applicant.create({
        data: {
          registrationNumber,
          fullName: fullName.trim(),
          gender: validGender,
          nisn: nisn?.trim() || null,
          nik: nik?.trim() || null,
          birthPlace: birthPlace.trim(),
          birthDate: parsedBirthDate,
          phone: phone?.trim() || null,
          address: address.trim(),
          previousSchool: previousSchool.trim(),
          programId: selectedProgram!.id,
          periodId: selectedPeriod!.id,
          status: "BARU",
        },
      });

      // Create Parent data
      if (fatherName || motherName || guardianName) {
        await tx.parent.create({
          data: {
            applicantId: applicant.id,
            fatherName: fatherName?.trim() || null,
            fatherNik: fatherNik?.trim() || null,
            fatherJob: fatherJob?.trim() || null,
            fatherPhone: fatherPhone?.trim() || null,
            fatherIncome: fatherIncome?.trim() || null,
            motherName: motherName?.trim() || null,
            motherNik: motherNik?.trim() || null,
            motherJob: motherJob?.trim() || null,
            motherPhone: motherPhone?.trim() || null,
            motherIncome: motherIncome?.trim() || null,
            guardianName: guardianName?.trim() || null,
            guardianPhone: guardianPhone?.trim() || null,
            guardianRelation: guardianRelation?.trim() || null,
            parentAddress: parentAddress?.trim() || null,
          },
        });
      }

      // Create Documents if provided
      if (Array.isArray(documents) && documents.length > 0) {
        for (const doc of documents) {
          if (doc.fileUrl) {
            let docType: DocumentType = DocumentType.LAINNYA;
            if (Object.values(DocumentType).includes(doc.type as DocumentType)) {
              docType = doc.type as DocumentType;
            }

            await tx.document.create({
              data: {
                applicantId: applicant.id,
                type: docType,
                fileName: doc.fileName || `${docType}_file`,
                fileUrl: doc.fileUrl,
                fileSize: doc.fileSize || null,
                mimeType: doc.mimeType || null,
                status: "PENDING",
              },
            });
          }
        }
      }

      // Record Audit Log
      await tx.auditLog.create({
        data: {
          action: "PENDAFTARAN_BARU",
          entity: "Applicant",
          entityId: applicant.id,
          details: JSON.stringify({
            registrationNumber,
            fullName: applicant.fullName,
            program: selectedProgram!.name,
            registeredAt: new Date().toISOString(),
          }),
        },
      });

      return applicant;
    });

    return NextResponse.json({
      success: true,
      message: "Pendaftaran berhasil! Simpan nomor pendaftaran Anda untuk pengecekan status berkala.",
      data: {
        registrationNumber: result.registrationNumber,
        applicantId: result.id,
        fullName: result.fullName,
        programName: selectedProgram.name,
        birthDate: result.birthDate,
      },
    });
  } catch (error) {
    console.error("PPDB Registration Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan saat memproses pendaftaran. Silakan coba beberapa saat lagi.",
      },
      { status: 500 }
    );
  }
}
