import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { createAuditLog } from "@/lib/audit";
import { ApplicantStatus, DocumentStatus } from "@prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const applicant = await prisma.applicant.findUnique({
      where: { id },
      include: {
        program: true,
        period: true,
        parent: true,
        documents: true,
      },
    });

    if (!applicant) {
      return NextResponse.json(
        { success: false, message: "Data pendaftar tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: applicant,
    });
  } catch (error) {
    console.error("Admin Applicant Detail API Error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await req.json();

    const existingApplicant = await prisma.applicant.findUnique({
      where: { id },
    });

    if (!existingApplicant) {
      return NextResponse.json(
        { success: false, message: "Data pendaftar tidak ditemukan" },
        { status: 404 }
      );
    }

    // Action 1: Update Applicant Status & Notes
    if (body.action === "UPDATE_STATUS") {
      const { status, notes, rejectionReason } = body;

      if (!status || !Object.values(ApplicantStatus).includes(status)) {
        return NextResponse.json(
          { success: false, message: "Status tidak valid" },
          { status: 400 }
        );
      }

      const updated = await prisma.applicant.update({
        where: { id },
        data: {
          status: status as ApplicantStatus,
          notes: notes !== undefined ? notes : existingApplicant.notes,
          rejectionReason: rejectionReason !== undefined ? rejectionReason : existingApplicant.rejectionReason,
        },
      });

      // Audit Log
      await createAuditLog({
        userId: user.userId,
        action: "UPDATE_STATUS",
        entity: "Applicant",
        entityId: id,
        details: {
          oldStatus: existingApplicant.status,
          newStatus: status,
          notes,
          rejectionReason,
        },
      });

      return NextResponse.json({
        success: true,
        message: `Status berhasil diperbarui menjadi ${status}`,
        data: updated,
      });
    }

    // Action 2: Update Document Status
    if (body.action === "UPDATE_DOCUMENT") {
      const { documentId, status, verificationNote } = body;

      if (!documentId || !status || !Object.values(DocumentStatus).includes(status)) {
        return NextResponse.json(
          { success: false, message: "Parameter dokumen tidak valid" },
          { status: 400 }
        );
      }

      const updatedDoc = await prisma.document.update({
        where: { id: documentId },
        data: {
          status: status as DocumentStatus,
          verificationNote: verificationNote || null,
        },
      });

      // Audit Log
      await createAuditLog({
        userId: user.userId,
        action: "VERIFY_DOCUMENT",
        entity: "Document",
        entityId: documentId,
        details: { status, verificationNote },
      });

      return NextResponse.json({
        success: true,
        message: "Status verifikasi dokumen berhasil diperbarui",
        data: updatedDoc,
      });
    }

    return NextResponse.json(
      { success: false, message: "Aksi tidak dikenali" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Admin Update Applicant API Error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
