import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { ApplicantStatus, Prisma } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const programId = searchParams.get("programId") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const where: Prisma.ApplicantWhereInput = {};

    if (search.trim()) {
      where.OR = [
        { fullName: { contains: search, mode: "insensitive" } },
        { registrationNumber: { contains: search, mode: "insensitive" } },
        { nik: { contains: search, mode: "insensitive" } },
        { nisn: { contains: search, mode: "insensitive" } },
      ];
    }

    if (status && Object.values(ApplicantStatus).includes(status as ApplicantStatus)) {
      where.status = status as ApplicantStatus;
    }

    if (programId) {
      where.programId = programId;
    }

    const [total, applicants] = await Promise.all([
      prisma.applicant.count({ where }),
      prisma.applicant.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          program: { select: { name: true, level: true } },
          period: { select: { name: true, academicYear: true } },
          documents: { select: { id: true, type: true, status: true } },
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        applicants,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("Admin Applicants List API Error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
