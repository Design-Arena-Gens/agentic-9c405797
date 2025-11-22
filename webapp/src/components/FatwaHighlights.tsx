"use client";

import Link from "next/link";
import type { Fatwa } from "@/types/fatwa";

interface HighlightListProps {
  title: string;
  items: Fatwa[];
}

export function HighlightList({ title, items }: HighlightListProps) {
  return (
    <section className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm">
      <header className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-emerald-900">{title}</h3>
        <span className="text-xs text-emerald-500">آخر التحديثات</span>
      </header>
      <ul className="space-y-4 text-sm text-emerald-700">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex flex-col gap-1 rounded-2xl border border-transparent px-3 py-2 transition hover:border-emerald-200 hover:bg-emerald-50/70"
          >
            <Link
              href={`/fatwa/${item.id}`}
              className="font-semibold text-emerald-800 hover:text-emerald-600"
            >
              {item.title}
            </Link>
            <div className="flex items-center justify-between text-xs text-emerald-500">
              <span>
                {new Date(item.createdAt).toLocaleDateString("ar-EG", {
                  day: "numeric",
                  month: "short",
                })}
              </span>
              <span>{item.views.toLocaleString("ar-EG")} قراءة</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
