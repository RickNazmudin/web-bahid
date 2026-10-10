"use client";

import { useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ConciergeChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: "bot" | "user"; text: string }[]>([
    {
      sender: "bot",
      text: "Assalamu'alaikum. Selamat datang di Pesantren Modern Darul Ulum. Ada yang dapat kami bantu mengenai pendaftaran PPDB atau informasi program?",
    },
  ]);
  const [inputVal, setInputVal] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInputVal("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Terima kasih atas pertanyaan Anda. Petugas panitia PPDB kami akan segera menghubungi Anda, atau Anda dapat langsung menghubungi WhatsApp kami di 0812-3456-7890.",
        },
      ]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 w-14 h-14 bg-[#D3AD3B] hover:bg-[#CA9667] text-white shadow-xl shadow-[#D3AD3B]/25 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-105 z-[3000]"
        aria-label="Konsultasi PPDB"
      >
        {isOpen ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
      </button>

      {/* Floating Chat Panel */}
      <div
        className={cn(
          "fixed bottom-24 left-6 w-80 sm:w-96 bg-white rounded-[2rem] border border-[#1A1A2E]/10 shadow-2xl z-[3000] flex flex-col overflow-hidden transition-all duration-300",
          isOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none translate-y-4"
        )}
      >
        <div className="bg-[#1A1A2E] text-white p-5 flex justify-between items-center">
          <div>
            <span className="text-xs tracking-widest uppercase font-medium text-white block">
              Konsultasi PPDB
            </span>
            <span className="text-[11px] text-[#D3AD3B] font-light">Sekretariat Darul Ulum</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/70 hover:text-white p-1 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 h-72 overflow-y-auto bg-[#FAFAF7] text-xs flex flex-col gap-3">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={cn(
                "p-4 max-w-[85%] text-xs leading-relaxed",
                m.sender === "user"
                  ? "bg-[#1A1A2E] text-white self-end rounded-2xl rounded-tr-none ml-auto"
                  : "bg-white border border-[#1A1A2E]/8 text-[#2B2825] self-start rounded-2xl rounded-tl-none shadow-sm"
              )}
            >
              {m.text}
            </div>
          ))}
        </div>

        <div className="p-3.5 bg-white border-t border-[#1A1A2E]/10">
          <form onSubmit={handleSend} className="flex items-center gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Tulis pertanyaan Anda..."
              className="w-full text-xs outline-none px-4 py-2.5 text-[#2B2825] bg-[#FAFAF7] rounded-full border border-transparent focus:border-[#D3AD3B]/40 transition-colors"
            />
            <button
              type="submit"
              className="w-9 h-9 rounded-full bg-[#D3AD3B] text-white hover:bg-[#CA9667] flex items-center justify-center transition-colors flex-shrink-0"
              aria-label="Kirim"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
