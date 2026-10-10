import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".pdf"];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const documentType = (formData.get("type") as string) || "DOKUMEN";

    if (!file) {
      return NextResponse.json(
        { success: false, message: "Tidak ada file yang diunggah" },
        { status: 400 }
      );
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, message: "Ukuran file melebihi batas maksimum 5MB" },
        { status: 400 }
      );
    }

    // Check MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message: "Format file tidak didukung. Harap unggah file PDF, JPG, atau PNG.",
        },
        { status: 400 }
      );
    }

    const originalName = file.name;
    const ext = path.extname(originalName).toLowerCase();

    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json(
        { success: false, message: "Ekstensi file tidak valid" },
        { status: 400 }
      );
    }

    // Generate safe unique filename
    const uniqueSuffix = `${Date.now()}_${crypto.randomBytes(6).toString("hex")}`;
    const cleanDocType = documentType.replace(/[^a-zA-Z0-9_-]/g, "").toLowerCase();
    const safeFileName = `${cleanDocType}_${uniqueSuffix}${ext}`;

    const uploadDir = path.join(process.cwd(), "public", "uploads", "documents");
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, safeFileName);
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);

    const fileUrl = `/uploads/documents/${safeFileName}`;

    return NextResponse.json({
      success: true,
      message: "File berhasil diunggah",
      data: {
        fileName: safeFileName,
        originalName,
        fileUrl,
        fileSize: file.size,
        mimeType: file.type,
      },
    });
  } catch (error) {
    console.error("Upload API Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal memproses unggahan file pada server",
      },
      { status: 500 }
    );
  }
}
