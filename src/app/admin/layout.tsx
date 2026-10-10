import { Suspense } from "react";
import AdminLayoutClient from "@/components/admin/AdminLayoutClient";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#FAFAF7] text-[#1A1A2E]">
          <div className="w-12 h-12 rounded-full border-2 border-[#D3AD3B] border-t-transparent animate-spin mb-4" />
          <span className="text-xs uppercase tracking-widest text-[#CA9667] font-medium">
            Memuat Panel Administrasi...
          </span>
        </div>
      }
    >
      <AdminLayoutClient>{children}</AdminLayoutClient>
    </Suspense>
  );
}
