import { PrismaClient, UserRole, Gender, ApplicantStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Memulai seeding database pesantren...");

  // 1. Seed Super Admin
  const adminEmail = process.env.INITIAL_ADMIN_EMAIL || "admin@pesantren.id";
  const rawPassword = process.env.INITIAL_ADMIN_PASSWORD || "AdminPesantren2026!";
  const passwordHash = await bcrypt.hash(rawPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash,
    },
    create: {
      name: "Administrator Utama",
      email: adminEmail,
      passwordHash,
      role: UserRole.SUPER_ADMIN,
      isActive: true,
    },
  });
  console.log(`✅ Admin akun berhasil disiapkan: ${admin.email}`);

  // 2. Seed Periode PPDB
  const period1 = await prisma.registrationPeriod.upsert({
    where: { id: "period-gelombang-1-2026" },
    update: {},
    create: {
      id: "period-gelombang-1-2026",
      name: "Gelombang 1 (Jalur Prestasi & Reguler)",
      academicYear: "2026/2027",
      startDate: new Date("2026-01-01"),
      endDate: new Date("2026-06-30"),
      quota: 150,
      registrationFee: 250000,
      isActive: true,
      description: "Penerimaan Santri Baru Gelombang 1 untuk Tahun Ajaran 2026/2027 dengan potongan biaya pendaftaran bagi jalur prestasi.",
    },
  });
  console.log(`✅ Periode PPDB aktif: ${period1.name}`);

  // 3. Seed Program Pendidikan
  const programsData = [
    {
      id: "prog-mts-tahfidz",
      name: "MTs Unggulan Tahfidz Al-Qur'an",
      slug: "mts-unggulan-tahfidz",
      level: "MTs / SMP",
      description: "Program pendidikan setingkat SLTP yang memadukan kurikulum Kementerian Agama/Kemendikbud dengan target hafalan minimal 15 Juz mutqin.",
      curriculum: "Kurikulum Merdeka + Kurikulum Kemenag + Metode Tahfidz Mandiri Intensif",
      quota: 60,
      isActive: true,
    },
    {
      id: "prog-ma-sains",
      name: "MA Plus Keterampilan & Sains Riset",
      slug: "ma-plus-keterampilan-sains",
      level: "MA / SMA",
      description: "Pendidikan tingkat Aliyah yang menitikberatkan pada penguasaan sains modern, riset ilmiah teknologi, dan bahasa internasional (Arab & Inggris).",
      curriculum: "Kurikulum Nasional + Kemenag + Laboratorium Riset & Robotika",
      quota: 50,
      isActive: true,
    },
    {
      id: "prog-salafiyah",
      name: "Dirasah Islamiyah & Kitab Kuning (Salafiyah)",
      slug: "salafiyah-kitab-kuning",
      level: "Pesantren Salaf",
      description: "Kajian mendalam khazanah keilmuan Islam klasik (Turats), Nahwu-Shorof, Fiqih, Ushul Fiqih, Hadits, dan Tasawuf berkarakter Ahlussunnah wal Jama'ah.",
      curriculum: "Sorogan, Bandongan, Mudzakarah, dan Bahtsul Masa'il",
      quota: 40,
      isActive: true,
    },
  ];

  for (const prog of programsData) {
    await prisma.program.upsert({
      where: { slug: prog.slug },
      update: {},
      create: prog,
    });
  }
  console.log(`✅ Program pendidikan berhasil disiapkan (${programsData.length} program).`);

  // 4. Seed Fasilitas
  const facilitiesData = [
    {
      name: "Masjid Jami' Baitul Hikmah",
      category: "Ibadah",
      description: "Pusat ibadah santri berkapasitas 1.500 jamaah dengan arsitektur megah dan nyaman untuk sholat berjamaah dan halaqah tahfidz.",
      imageUrl: "/images/facilities/masjid.jpg",
      orderIndex: 1,
    },
    {
      name: "Asrama Santri Modern & Bersih",
      category: "Asrama",
      description: "Kamar tidur bertingkat ber-ventilasi baik, lemari pribadi, kamar mandi bersih di setiap lantai, didampingi pembina asrama 24 jam.",
      imageUrl: "/images/facilities/asrama.jpg",
      orderIndex: 2,
    },
    {
      name: "Laboratorium Komputer & Bahasa",
      category: "Ruang Belajar",
      description: "Dilengkapi 40 unit PC modern dengan koneksi internet serat optik berkecepatan tinggi dan software pembelajaran bahasa Arab/Inggris.",
      imageUrl: "/images/facilities/lab.jpg",
      orderIndex: 3,
    },
    {
      name: "Perpustakaan & Ruang Baca Digital",
      category: "Ruang Belajar",
      description: "Ribuan koleksi kitab kuning klasik, buku referensi nasional, jurnal riset, dan e-library interaktif.",
      imageUrl: "/images/facilities/perpustakaan.jpg",
      orderIndex: 4,
    },
    {
      name: "Sarana Olahraga Terpadu",
      category: "Olahraga",
      description: "Lapangan futsal rumput sintetis, lapangan basket, bulu tangkis, panahan, dan area bela diri silat.",
      imageUrl: "/images/facilities/olahraga.jpg",
      orderIndex: 5,
    },
  ];

  for (const item of facilitiesData) {
    const existing = await prisma.facility.findFirst({ where: { name: item.name } });
    if (!existing) {
      await prisma.facility.create({ data: item });
    }
  }
  console.log(`✅ Fasilitas pesantren berhasil disiapkan.`);

  // 5. Seed Berita & Informasi
  const newsData = [
    {
      title: "Penerimaan Santri Baru (PSB) Tahun Ajaran 2026/2027 Resmi Dibuka",
      slug: "penerimaan-santri-baru-psb-2026-resmi-dibuka",
      excerpt: "Pesantren membuka pendaftaran santri baru jalur prestasi dan reguler untuk jenjang MTs dan MA.",
      content: "<p>Alhamdulillah, pendaftaran calon santri baru untuk tahun ajaran 2026/2027 telah resmi dibuka. Para calon wali santri dapat melakukan pendaftaran secara online melalui portal PPDB resmi ini.</p><p>Disediakan beasiswa penuh dan potongan biaya pendidikan bagi santri berprestasi di bidang akademik maupun tahfidz Al-Qur'an minimal 5 Juz.</p>",
      thumbnail: "/images/news/ppdb-open.jpg",
      isPublished: true,
      publishedAt: new Date("2026-01-10"),
    },
    {
      title: "Santri Pesantren Raih Medali Emas Olimpiade Sains & Bahasa Tingkat Nasional",
      slug: "santri-raih-medali-emas-olimpiade-nasional",
      excerpt: "Prestasi membanggakan kembali ditorehkan oleh santri binaan program riset dan sains MA Plus Keterampilan.",
      content: "<p>Prestasi gemilang diraih delegasi santri pada ajang Olimpiade Sains dan Bahasa Nasional. Ini membuktikan bahwa pendidikan pesantren mampu mengintegrasikan spiritualitas dengan keunggulan intelektual.</p>",
      thumbnail: "/images/news/prestasi.jpg",
      isPublished: true,
      publishedAt: new Date("2026-02-15"),
    },
  ];

  for (const n of newsData) {
    await prisma.news.upsert({
      where: { slug: n.slug },
      update: {},
      create: n,
    });
  }
  console.log(`✅ Berita awal berhasil disiapkan.`);

  // 6. Seed Pengaturan Web (Settings)
  const settingsData = [
    { key: "site_name", value: "Pondok Pesantren Baitul Hidayah", group: "general", description: "Nama resmi pesantren" },
    { key: "site_tagline", value: "Mencetak Generasi Qur'ani, Berakhlak Mulia, dan Unggul dalam Sains", group: "general", description: "Slogan / Motto pesantren" },
    { key: "site_address", value: "Jl. Ciporeat Andir kulon, Kelurahan Pasanggrahan, Kec. Ujungberung, Kota Bandung", group: "contact", description: "Alamat lengkap" },
    { key: "site_phone", value: "085196045409", group: "contact", description: "Nomor telepon kantor" },
    { key: "site_whatsapp", value: "085196045409", group: "contact", description: "Nomor WhatsApp Helpdesk PPDB" },
    { key: "site_email", value: "info@baitulhidayah.sch.id", group: "contact", description: "Email resmi pesantren" },
    { key: "site_vision", value: "Menjadi pusat keunggulan pendidikan Islam integratif berlandaskan Al-Qur'an dan As-Sunnah yang berwawasan global.", group: "general", description: "Visi Pesantren" },
    { key: "site_mission", value: "1. Menyelenggarakan pendidikan tahfidz dan kepesantrenan berkualitas tinggi.\n2. Mengintegrasikan kurikulum ilmu agama dan sains teknologi modern.\n3. Membina akhlak karimah, kemandirian, dan jiwa kepemimpinan santri.", group: "general", description: "Misi Pesantren" },
  ];

  for (const s of settingsData) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: {},
      create: s,
    });
  }
  console.log(`✅ Pengaturan website berhasil disiapkan.`);

  // 7. Seed Sample Pendaftar (untuk pengujian flow PPDB & admin)
  const sampleApplicant = await prisma.applicant.upsert({
    where: { registrationNumber: "PSB-2026-0001" },
    update: {},
    create: {
      registrationNumber: "PSB-2026-0001",
      fullName: "Muhammad Fatih Al-Ayyubi",
      gender: Gender.LAKI_LAKI,
      nisn: "0081234567",
      nik: "3201234567890001",
      birthPlace: "Bogor",
      birthDate: new Date("2012-05-14"),
      phone: "081298765432",
      address: "Jl. Melati Indah No. 12, RT 02/05, Cibinong, Bogor",
      previousSchool: "SD Islam Terpadu Al-Ikhlas",
      programId: "prog-mts-tahfidz",
      periodId: "period-gelombang-1-2026",
      status: ApplicantStatus.VERIFIKASI,
      notes: "Memiliki sertifikat tahfidz 2 Juz dari sekolah asal.",
      parent: {
        create: {
          fatherName: "Ahmad Dahlan",
          fatherNik: "3201234567890002",
          fatherJob: "Pegawai Swasta",
          fatherPhone: "081298765430",
          fatherIncome: "Rp 5.000.000 - Rp 10.000.000",
          motherName: "Siti Maryam",
          motherNik: "3201234567890003",
          motherJob: "Guru",
          motherPhone: "081298765431",
          motherIncome: "Rp 3.000.000 - Rp 5.000.000",
          parentAddress: "Jl. Melati Indah No. 12, Cibinong, Bogor",
        },
      },
      documents: {
        create: [
          {
            type: "KK",
            fileName: "kartu_keluarga_fatih.pdf",
            fileUrl: "/sample-docs/kk-sample.pdf",
            fileSize: 450200,
            mimeType: "application/pdf",
            status: "VALID",
          },
          {
            type: "AKTA_KELAHIRAN",
            fileName: "akta_fatih.pdf",
            fileUrl: "/sample-docs/akta-sample.pdf",
            fileSize: 320100,
            mimeType: "application/pdf",
            status: "VALID",
          },
        ],
      },
    },
  });
  console.log(`✅ Sample pendaftar berhasil disiapkan: ${sampleApplicant.registrationNumber} - ${sampleApplicant.fullName}`);

  console.log("✨ Seeding database selesai tanpa error!");
}

main()
  .catch((e) => {
    console.error("❌ Error saat seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
