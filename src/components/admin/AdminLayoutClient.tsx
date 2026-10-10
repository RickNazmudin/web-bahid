"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#FAFAF7] text-[#1A1A2E]">
        <div className="w-12 h-12 rounded-full border-2 border-[#D3AD3B] border-t-transparent animate-spin mb-4" />
        <span className="text-xs uppercase tracking-widest text-[#CA9667] font-medium">
          Memuat Panel Administrasi...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#FAFAF7] text-[#2B2825] font-sans flex flex-col lg:flex-row overflow-x-hidden">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-72 bg-[#1A1A2E] text-white flex-col justify-between p-6 flex-shrink-0 min-h-screen border-r border-white/10 shadow-2xl">
        <div className="space-y-8">
          {/* Brand Logo */}
          <Link href="/admin" className="flex items-center gap-3.5 group">
            <div className="w-10 h-10 bg-[#D3AD3B] text-[#1A1A2E] flex items-center justify-center font-serif font-bold text-xl rounded-xl shadow-md">
              <span>D</span>
            </div>
            <div>
              <div className="font-serif text-lg font-medium text-white tracking-tight leading-none mb-1">
                DARUL ULUM
              </div>
              <div className="text-[9px] text-[#D3AD3B] uppercase tracking-widest font-light">
                Panel Administrasi PPDB
              </div>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-1.5 pt-4">
            <div className="text-[10px] uppercase tracking-widest text-white/40 font-semibold mb-3 px-3">
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
                    "flex items-center justify-between px-3.5 py-3 rounded-xl text-xs tracking-wider transition-all duration-200 group font-medium",
                    isActive
                      ? "bg-[#D3AD3B] text-white shadow-md shadow-[#D3AD3B]/20"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-[#CA9667]")} />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight
                    className={cn(
                      "w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity",
                      isActive && "opacity-100"
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
              <div className="w-9 h-9 rounded-full bg-[#CA9667]/20 text-[#D3AD3B] flex items-center justify-center font-bold text-sm">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-white truncate">{user.name}</div>
                <div className="text-[10px] text-[#D3AD3B] uppercase tracking-wider font-light">
                  {user.role}
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-red-500/20 text-white/80 hover:text-red-300 text-xs font-medium uppercase tracking-wider rounded-xl transition-all border border-white/5 cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-red-400" />
            <span>Keluar Sesi</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Mobile Navbar */}
        <header className="lg:hidden bg-[#1A1A2E] text-white p-4 flex items-center justify-between border-b border-white/10 sticky top-0 z-50">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#D3AD3B] text-[#1A1A2E] flex items-center justify-center font-serif font-bold text-lg rounded-lg">
              <span>D</span>
            </div>
            <span className="font-serif text-base font-medium">Admin Darul Ulum</span>
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
          <div className="lg:hidden fixed inset-0 bg-[#1A1A2E] z-40 p-6 flex flex-col justify-between pt-20">
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
                      "flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all",
                      isActive
                        ? "bg-[#D3AD3B] text-white"
                        : "text-white/80 hover:bg-white/5"
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
