"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import FatwaCard from "@/components/FatwaCard";
import { useFatwaContext } from "@/context/FatwaContext";

export default function FavoritesPage() {
  const { favorites, fatwas } = useFatwaContext();
  const favoriteFatwas = fatwas.filter((item) => favorites.includes(item.id));

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 rounded-3xl border border-emerald-100 bg-white p-10 shadow-lg">
      <div className="flex flex-col gap-3 border-b border-emerald-100 pb-6">
        <Link
          href="/"
          className="self-start text-sm text-emerald-600 transition hover:text-emerald-800"
        >
          العودة إلى الرئيسية
        </Link>
        <h1 className="flex items-center gap-2 text-3xl font-bold text-emerald-900">
          <Heart className="text-emerald-500" />
          الفتاوى المفضلة
        </h1>
        <p className="text-sm text-emerald-600">
          احتفظت بهذه الفتاوى لتسهيل الرجوع إليها لاحقاً.
        </p>
      </div>

      {favoriteFatwas.length === 0 ? (
        <div className="rounded-3xl border border-emerald-100 bg-emerald-50/70 p-10 text-center text-emerald-700">
          لم تقم بإضافة أي فتوى إلى قائمة المفضلة بعد.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {favoriteFatwas.map((fatwa) => (
            <FatwaCard key={fatwa.id} fatwa={fatwa} />
          ))}
        </div>
      )}
    </div>
  );
}
