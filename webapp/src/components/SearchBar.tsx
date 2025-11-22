"use client";

import { Search } from "lucide-react";
import { useFatwaContext } from "@/context/FatwaContext";

export default function SearchBar() {
  const { searchTerm, setSearchTerm } = useFatwaContext();

  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-400" />
      <input
        type="search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="ابحث عن فتوى..."
        className="w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 pr-12 text-sm text-emerald-900 shadow-sm outline-none transition focus:border-emerald-300 focus:shadow-md focus:shadow-emerald-100"
      />
    </div>
  );
}
