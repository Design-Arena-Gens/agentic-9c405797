"use client";

import { Bookmark, Share2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import type { Fatwa } from "@/types/fatwa";
import { useFatwaContext } from "@/context/FatwaContext";

interface FatwaCardProps {
  fatwa: Fatwa;
}

export default function FatwaCard({ fatwa }: FatwaCardProps) {
  const { toggleFavorite, favorites } = useFatwaContext();
  const [copied, setCopied] = useState(false);

  const isFavorite = favorites.includes(fatwa.id);

  const handleShare = useCallback(async () => {
    const url = `${window.location.origin}/fatwa/${fatwa.id}`;
    if (navigator.share) {
      await navigator.share({
        title: fatwa.title,
        text: "فتوى مختارة من المنصة الذكية",
        url,
      });
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [fatwa.id, fatwa.title]);

  return (
    <article className="group flex flex-col rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <header className="flex items-start justify-between gap-4">
        <div>
          <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            {fatwa.category}
          </span>
          <h3 className="mt-3 text-lg font-semibold text-emerald-900">
            {fatwa.title}
          </h3>
        </div>
        <button
          onClick={() => toggleFavorite(fatwa.id)}
          className={`rounded-full border px-3 py-2 text-sm transition ${
            isFavorite
              ? "border-emerald-300 bg-emerald-50 text-emerald-700"
              : "border-emerald-100 text-emerald-400 hover:bg-emerald-50"
          }`}
        >
          <Bookmark
            size={18}
            className={isFavorite ? "fill-emerald-500 text-emerald-500" : ""}
          />
        </button>
      </header>

      <p className="mt-4 line-clamp-4 text-sm leading-7 text-emerald-800/80">
        {fatwa.body}
      </p>

      <footer className="mt-6 flex items-center justify-between border-t border-emerald-100 pt-4 text-sm text-emerald-600">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs">
            {new Date(fatwa.createdAt).toLocaleDateString("ar-EG", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span className="text-xs text-emerald-500">
            {fatwa.views.toLocaleString("ar-EG")} مشاهدة
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="flex items-center gap-1 rounded-full border border-emerald-200 px-3 py-1 text-xs text-emerald-600 transition hover:border-emerald-300 hover:text-emerald-800"
          >
            <Share2 size={14} />
            {copied ? "تم النسخ" : "مشاركة"}
          </button>
          <Link
            href={`/fatwa/${fatwa.id}`}
            className="rounded-full bg-emerald-500 px-4 py-1 text-xs font-semibold text-white transition hover:bg-emerald-600"
          >
            قراءة التفاصيل
          </Link>
        </div>
      </footer>
    </article>
  );
}
