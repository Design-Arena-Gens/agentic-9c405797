"use client";

import { Share2 } from "lucide-react";
import { useState, useTransition } from "react";

interface ShareFatwaButtonProps {
  title: string;
  id: string;
}

export default function ShareFatwaButton({
  title,
  id,
}: ShareFatwaButtonProps) {
  const [copied, setCopied] = useState(false);
  const [, startTransition] = useTransition();

  const handleShare = () => {
    startTransition(async () => {
      const url = `${window.location.origin}/fatwa/${id}`;
      if (navigator.share) {
        await navigator.share({
          title,
          url,
        });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 rounded-full border border-emerald-200 px-4 py-2 text-emerald-600 transition hover:border-emerald-300 hover:text-emerald-800"
    >
      <Share2 size={16} />
      {copied ? "تم النسخ" : "مشاركة الفتوى"}
    </button>
  );
}
