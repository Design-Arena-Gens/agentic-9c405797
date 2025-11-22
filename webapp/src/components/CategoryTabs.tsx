"use client";

import clsx from "clsx";
import { useFatwaContext } from "@/context/FatwaContext";

export default function CategoryTabs() {
  const { categories, activeCategory, setActiveCategory } = useFatwaContext();

  const items: (typeof activeCategory)[] = ["الكل", ...categories];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => setActiveCategory(item)}
          className={clsx(
            "rounded-full border px-4 py-1.5 text-sm transition",
            activeCategory === item
              ? "border-emerald-400 bg-emerald-50 text-emerald-800 shadow-sm"
              : "border-transparent bg-white text-emerald-600 hover:border-emerald-200 hover:text-emerald-800",
          )}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
