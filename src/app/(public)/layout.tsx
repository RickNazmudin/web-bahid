import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ConciergeChat from "@/components/layout/ConciergeChat";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex flex-col bg-white">
      <Suspense fallback={<div className="h-20" />}>
        <Navbar />
      </Suspense>
      <main className="flex-1 w-full flex flex-col">{children}</main>
      <ConciergeChat />
      <Footer />
    </div>
  );
}
