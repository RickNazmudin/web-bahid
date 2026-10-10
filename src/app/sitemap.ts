import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const staticRoutes = [
    "",
    "/tentang",
    "/program",
    "/fasilitas",
    "/berita",
    "/ppdb",
    "/ppdb/daftar",
    "/ppdb/cek-status",
    "/kontak",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const newsSlugs = [
    "penerimaan-santri-baru-psb-2026-resmi-dibuka",
    "santri-raih-medali-emas-olimpiade-nasional",
  ];

  const newsRoutes = newsSlugs.map((slug) => ({
    url: `${baseUrl}/berita/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...newsRoutes];
}
