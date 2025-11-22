"use client";

import {
  Bookmark,
  BookOpen,
  Info,
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useFatwaContext } from "@/context/FatwaContext";
import clsx from "clsx";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const staticLinks = [
  {
    label: "حول التطبيق",
    href: "/about",
    icon: Info,
  },
  {
    label: "سياسة الخصوصية",
    href: "/privacy",
    icon: ShieldCheck,
  },
];

export default function Sidebar({ open, onClose }: SidebarProps) {
  const {
    categories,
    activeCategory,
    setActiveCategory,
    favorites,
    setSearchTerm,
  } = useFatwaContext();

  return (
    <aside
      className={clsx(
        "fixed inset-y-0 right-0 z-50 w-72 transform bg-gradient-to-b from-white to-emerald-50/60 px-6 py-8 shadow-xl transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
        open ? "translate-x-0" : "translate-x-full",
      )}
    >
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 text-emerald-900"
          onClick={onClose}
        >
          <Image
            src="/icons/mosque.svg"
            alt="شعار المنصة"
            width={32}
            height={32}
            className="rounded-full bg-emerald-100 p-1"
          />
          <div className="flex flex-col">
            <span className="text-sm text-emerald-600">فتاوى موثوقة</span>
            <strong className="text-lg">المنصة الذكية</strong>
          </div>
        </Link>
        <button
          onClick={onClose}
          className="lg:hidden"
          aria-label="إغلاق القائمة"
        >
          <span className="rounded-full border border-emerald-100 bg-white px-2 py-1 text-xs text-emerald-600">
            إغلاق
          </span>
        </button>
      </div>

      <nav className="mt-8 space-y-6 text-sm">
        <div>
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold text-emerald-600">
            <LayoutDashboard size={16} />
            أقسام الفتاوى
          </p>
          <div className="space-y-2">
            <button
              className={clsx(
                "w-full rounded-xl border border-transparent px-4 py-2 text-right transition hover:border-emerald-200 hover:bg-white hover:text-emerald-900",
                activeCategory === "الكل"
                  ? "border-emerald-300 bg-white font-semibold text-emerald-900 shadow-sm"
                  : "text-emerald-700",
              )}
              onClick={() => {
                setActiveCategory("الكل");
                setSearchTerm("");
                onClose();
              }}
            >
              جميع الفتاوى
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={clsx(
                  "flex w-full items-center justify-between gap-2 rounded-xl border border-transparent px-4 py-2 text-right transition hover:border-emerald-200 hover:bg-white hover:text-emerald-900",
                  activeCategory === category
                    ? "border-emerald-300 bg-white font-semibold text-emerald-900 shadow-sm"
                    : "text-emerald-700",
                )}
                onClick={() => {
                  setActiveCategory(category);
                  setSearchTerm("");
                  onClose();
                }}
              >
                <span>{category}</span>
                <Sparkles size={16} className="text-emerald-400" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold text-emerald-600">
            <Bookmark size={16} />
            المفضلة
          </p>
          <Link
            href="/favorites"
            className="flex w-full items-center justify-between rounded-xl border border-emerald-200 bg-white px-4 py-2 text-sm text-emerald-700 transition hover:border-emerald-300 hover:text-emerald-900"
            onClick={onClose}
          >
            <span>قائمة المفضلة</span>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
              {favorites.length}
            </span>
          </Link>
        </div>

        <div>
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold text-emerald-600">
            <BookOpen size={16} />
            روابط مهمة
          </p>
          <div className="space-y-2">
            {staticLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 rounded-xl border border-transparent px-4 py-2 text-right text-emerald-700 transition hover:border-emerald-200 hover:bg-white hover:text-emerald-900"
                onClick={onClose}
              >
                <link.icon size={16} />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}
