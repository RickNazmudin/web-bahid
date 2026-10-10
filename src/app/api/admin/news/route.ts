import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { createAuditLog } from "@/lib/audit";

export async function GET(req: NextRequest) {
  try {
    const newsList = await prisma.news.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: newsList });
  } catch (error) {
    console.error("Admin News GET Error:", error);
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
    const { title, excerpt, content, thumbnail, authorName, isPublished } = body;

    if (!title || !content) {
      return NextResponse.json({ success: false, message: "Judul dan isi artikel wajib diisi" }, { status: 400 });
    }

    // Generate unique slug
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "") + "-" + Date.now().toString().slice(-4);

    const news = await prisma.news.create({
      data: {
        title,
        slug,
        excerpt: excerpt || title.slice(0, 150),
        content,
        thumbnail: thumbnail || "/images/hero-campus.jpg",
        authorName: authorName || user.name || "Sekretariat Pesantren",
        isPublished: isPublished !== undefined ? isPublished : true,
      },
    });

    await createAuditLog({
      userId: user.userId,
      action: "CREATE_NEWS",
      entity: "News",
      entityId: news.id,
      details: { title, slug },
    });

    return NextResponse.json({
      success: true,
      message: "Artikel warta berhasil dibuat",
      data: news,
    });
  } catch (error) {
    console.error("Admin News POST Error:", error);
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "ID berita wajib disertakan" }, { status: 400 });
    }

    await prisma.news.delete({ where: { id } });

    await createAuditLog({
      userId: user.userId,
      action: "DELETE_NEWS",
      entity: "News",
      entityId: id,
    });

    return NextResponse.json({ success: true, message: "Artikel warta berhasil dihapus" });
  } catch (error) {
    console.error("Admin News DELETE Error:", error);
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server" }, { status: 500 });
  }
}
