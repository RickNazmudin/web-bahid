import { z } from "zod";
import { Gender, ApplicantStatus, DocumentType } from "@prisma/client";

// Step 1: Data Calon Santri
export const santriDataSchema = z.object({
  fullName: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  gender: z.nativeEnum(Gender, { message: "Pilih jenis kelamin" }),
  nisn: z.string().optional().or(z.literal("")),
  nik: z.string().min(16, "NIK harus 16 digit").max(16, "NIK harus 16 digit").optional().or(z.literal("")),
  birthPlace: z.string().min(2, "Tempat lahir wajib diisi"),
  birthDate: z.string().min(1, "Tanggal lahir wajib diisi"),
  phone: z.string().optional().or(z.literal("")),
  address: z.string().min(5, "Alamat lengkap wajib diisi"),
  previousSchool: z.string().min(2, "Asal sekolah sebelumnya wajib diisi"),
});

// Step 2: Data Orang Tua / Wali
export const parentDataSchema = z.object({
  fatherName: z.string().min(2, "Nama ayah wajib diisi"),
  fatherNik: z.string().optional().or(z.literal("")),
  fatherJob: z.string().min(2, "Pekerjaan ayah wajib diisi"),
  fatherPhone: z.string().min(8, "Nomor HP/WA ayah minimal 8 digit"),
  fatherIncome: z.string().optional().or(z.literal("")),

  motherName: z.string().min(2, "Nama ibu wajib diisi"),
  motherNik: z.string().optional().or(z.literal("")),
  motherJob: z.string().min(2, "Pekerjaan ibu wajib diisi"),
  motherPhone: z.string().optional().or(z.literal("")),
  motherIncome: z.string().optional().or(z.literal("")),

  guardianName: z.string().optional().or(z.literal("")),
  guardianPhone: z.string().optional().or(z.literal("")),
  guardianRelation: z.string().optional().or(z.literal("")),
  parentAddress: z.string().optional().or(z.literal("")),
});

// Step 3: Pilihan Program & Gelombang
export const programChoiceSchema = z.object({
  programId: z.string().min(1, "Pilih program pendidikan"),
  periodId: z.string().min(1, "Pilih gelombang pendaftaran"),
  notes: z.string().optional().or(z.literal("")),
});

// Step 4: Berkas Dokumen Upload
export const uploadedDocumentSchema = z.object({
  type: z.nativeEnum(DocumentType),
  fileName: z.string().min(1),
  fileUrl: z.string().min(1),
  fileSize: z.number().optional(),
  mimeType: z.string().optional(),
});

// Full Registration Schema
export const fullRegistrationSchema = z.object({
  santri: santriDataSchema,
  parent: parentDataSchema,
  program: programChoiceSchema,
  documents: z.array(uploadedDocumentSchema).min(1, "Wajib mengunggah minimal 1 dokumen berkas"),
});

export type FullRegistrationInput = z.infer<typeof fullRegistrationSchema>;

// Check Status Schema
export const checkStatusSchema = z.object({
  registrationNumber: z.string().min(3, "Nomor pendaftaran wajib diisi"),
  birthDate: z.string().min(1, "Tanggal lahir wajib diisi"),
});

export type CheckStatusInput = z.infer<typeof checkStatusSchema>;

// Admin Update Status Schema
export const updateApplicantStatusSchema = z.object({
  status: z.nativeEnum(ApplicantStatus),
  rejectionReason: z.string().optional(),
  notes: z.string().optional(),
});

export type UpdateApplicantStatusInput = z.infer<typeof updateApplicantStatusSchema>;
