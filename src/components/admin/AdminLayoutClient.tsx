"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Newspaper,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

const navItems = [
  { href: "/admin", label: "Dashboard Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/pendaftar", label: "Data Pendaftar PPDB", icon: Users, exact: false },
  { href: "/admin/santri", label: "Data Santri Aktif", icon: GraduationCap, exact: false },
  { href: "/admin/berita", label: "CMS Warta & Berita", icon: Newspaper, exact: false },
  { href: "/admin/pengaturan", label: "Pengaturan Website", icon: Settings, exact: false },
];

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  // If we are on login page, render children directly without admin frame
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        const json = await res.json();
        if (json.success && json.user) {
          setUser(json.user);
        } else {
          router.push("/admin/login");
        }
      } catch {
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Gagal logout", err);
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#F7FAF7] text-[#0B3521]">
        <div className="w-12 h-12 rounded-full border-2 border-[#E5A81E] border-t-transparent animate-spin mb-4" />
        <span className="text-xs uppercase tracking-widest text-[#0A8B46] font-semibold">
          Memuat Panel Administrasi...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#F7FAF7] text-[#1A281E] font-sans flex flex-col lg:flex-row overflow-x-hidden">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-72 bg-[#0B3521] text-white flex-col justify-between p-6 flex-shrink-0 min-h-screen border-r border-white/10 shadow-2xl">
        <div className="space-y-8">
          {/* Brand Logo */}
          <Link href="/admin" className="flex items-center gap-3.5 group">
            <div className="w-10 h-10 bg-white/95 rounded-xl p-1 shadow-md flex items-center justify-center border border-[#E5A81E]/40 group-hover:scale-105 transition-transform">
              <Image
                src="/images/logo.png"
                alt="Logo Pesantren Baitul Hidayah"
                width={36}
                height={36}
                className="w-auto h-8 object-contain"
              />
            </div>
            <div>
              <div className="font-serif text-lg font-bold text-white tracking-tight leading-none mb-1">
                BAITUL HIDAYAH
              </div>
              <div className="text-[9px] text-[#E5A81E] uppercase tracking-widest font-semibold">
                Panel Administrasi PPDB
              </div>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-1.5 pt-4">
            <div className="text-[10px] uppercase tracking-widest text-white/50 font-bold mb-3 px-3">
              Menu Utama
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-3.5 py-3 rounded-xl text-xs tracking-wider transition-all duration-200 group font-semibold",
                    isActive
                      ? "bg-[#E5A81E] text-[#0B3521] shadow-md shadow-[#E5A81E]/20"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn("w-4 h-4", isActive ? "text-[#0B3521]" : "text-[#E5A81E]")} />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight
                    className={cn(
                      "w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity",
                      isActive && "opacity-100 text-[#0B3521]"
                    )}
                  />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Card & Logout */}
        <div className="pt-6 border-t border-white/10 space-y-4">
          {user && (
            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
              <div className="w-9 h-9 rounded-full bg-[#E5A81E]/20 text-[#E5A81E] flex items-center justify-center font-bold text-sm">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-white truncate">{user.name}</div>
                <div className="text-[10px] text-[#E5A81E] uppercase tracking-wider font-medium">
                  {user.role}
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-red-500/20 text-white/80 hover:text-red-300 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all border border-white/5 cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-red-400" />
            <span>Keluar Sesi</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Mobile Navbar */}
        <header className="lg:hidden bg-[#0B3521] text-white p-4 flex items-center justify-between border-b border-white/10 sticky top-0 z-50">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/95 rounded-lg p-0.5 flex items-center justify-center border border-[#E5A81E]/40">
              <Image
                src="/images/logo.png"
                alt="Logo Pesantren Baitul Hidayah"
                width={28}
                height={28}
                className="w-auto h-6 object-contain"
              />
            </div>
            <span className="font-serif text-base font-bold text-white">Admin Baitul Hidayah</span>
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-white/80 hover:text-white"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>

        {/* Mobile Fullscreen Menu */}
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 bg-[#0B3521] z-40 p-6 flex flex-col justify-between pt-20">
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.exact
                  ? pathname === item.href
                  : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all",
                      isActive
                        ? "bg-[#E5A81E] text-[#0B3521]"
                        : "text-white/80 hover:bg-white/10"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-4 bg-red-500/20 text-red-300 text-xs font-semibold uppercase tracking-wider rounded-xl cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Keluar Sesi</span>
            </button>
          </div>
        )}

        {/* Dynamic Page Content */}
        <main className="flex-1 w-full max-w-7xl mx-auto p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
