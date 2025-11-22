"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-emerald-900">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-emerald-100 bg-white/90 px-6 py-4 backdrop-blur">
          <button
            onClick={() => setOpen(true)}
            className="rounded-full border border-emerald-200 bg-white p-2 text-emerald-600 shadow-sm transition hover:bg-emerald-50 lg:hidden"
            aria-label="فتح القائمة الجانبية"
          >
            <Menu size={20} />
          </button>
          <div className="ml-auto flex flex-col text-right">
            <span className="text-sm text-emerald-700">مرحبا بك في منصتنا</span>
            <h1 className="text-lg font-semibold text-emerald-900">
              المنصة الذكية للفتاوى
            </h1>
          </div>
        </header>
        <main className="flex-1 px-6 py-8">{children}</main>
      </div>
      {open ? (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        >
          <button
            aria-label="إغلاق القائمة"
            className="absolute left-4 top-4 rounded-full border border-white/40 bg-white p-2 text-emerald-700 shadow"
            onClick={() => setOpen(false)}
          >
            <X size={18} />
          </button>
        </div>
      ) : null}
    </div>
  );
}
