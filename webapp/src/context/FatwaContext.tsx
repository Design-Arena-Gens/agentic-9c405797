"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Fatwa, FatwaCategory } from "@/types/fatwa";

interface FatwaContextValue {
  fatwas: Fatwa[];
  filteredFatwas: Fatwa[];
  categories: FatwaCategory[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isLoading: boolean;
  error?: string;
  newestFatwas: Fatwa[];
  mostReadFatwas: Fatwa[];
  activeCategory?: FatwaCategory | "الكل";
  setActiveCategory: (category?: FatwaCategory | "الكل") => void;
  notifications: string[];
  consumeNotifications: () => void;
}

const FatwaContext = createContext<FatwaContextValue | undefined>(undefined);

async function fetchFatwas(): Promise<Fatwa[]> {
  const response = await fetch("/api/fatwas", { cache: "no-store" });
  if (!response.ok) {
    throw new Error("تعذر تحميل البيانات");
  }
  const payload = (await response.json()) as { fatwas: Fatwa[] };
  return payload.fatwas;
}

const STORAGE_KEY = "fatwa-favorites";

export function FatwaProvider({ children }: { children: React.ReactNode }) {
  const [fatwas, setFatwas] = useState<Fatwa[]>([]);
  const [filteredFatwas, setFilteredFatwas] = useState<Fatwa[]>([]);
  const [activeCategory, setActiveCategory] = useState<
    FatwaCategory | "الكل" | undefined
  >("الكل");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        setFavorites(JSON.parse(cached));
      }
    } catch (err) {
      console.error("Favorite cache error", err);
    }
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const records = await fetchFatwas();
        setFatwas(records);
        setFilteredFatwas(records);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
        setIsLoading(false);
      }
    }
    void load();
  }, []);

  useEffect(() => {
    let dataset = [...fatwas];
    if (activeCategory && activeCategory !== "الكل") {
      dataset = dataset.filter((fatwa) => fatwa.category === activeCategory);
    }
    if (searchTerm.trim()) {
      const token = searchTerm.trim().toLowerCase();
      dataset = dataset.filter(
        (fatwa) =>
          fatwa.title.toLowerCase().includes(token) ||
          fatwa.body.toLowerCase().includes(token) ||
          fatwa.tags?.some((tag) => tag.toLowerCase().includes(token)),
      );
    }
    setFilteredFatwas(dataset);
  }, [fatwas, activeCategory, searchTerm]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (err) {
      console.error("Failed to persist favorites", err);
    }
  }, [favorites]);

  useEffect(() => {
    if (!isLoading && fatwas.length) {
      setNotifications(["تم إضافة فتاوى جديدة إلى المكتبة"]);
    }
  }, [isLoading, fatwas.length]);

  const categories: FatwaCategory[] = useMemo(
    () => [
      "العبادات",
      "المعاملات",
      "الأسرة",
      "العقيدة",
      "الأخلاق",
      "فتاوى عامة",
    ],
    [],
  );

  const newestFatwas = useMemo(() => {
    return [...fatwas]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 4);
  }, [fatwas]);

  const mostReadFatwas = useMemo(() => {
    return [...fatwas].sort((a, b) => b.views - a.views).slice(0, 4);
  }, [fatwas]);

  const consumeNotifications = useCallback(() => setNotifications([]), []);

  const value: FatwaContextValue = {
    fatwas,
    filteredFatwas,
    categories,
    searchTerm,
    setSearchTerm,
    favorites,
    toggleFavorite: (id: string) => {
      setFavorites((prev) => {
        if (prev.includes(id)) {
          return prev.filter((item) => item !== id);
        }
        return [...prev, id];
      });
    },
    isLoading,
    error,
    newestFatwas,
    mostReadFatwas,
    activeCategory,
    setActiveCategory,
    notifications,
    consumeNotifications,
  };

  return (
    <FatwaContext.Provider value={value}>{children}</FatwaContext.Provider>
  );
}

export function useFatwaContext() {
  const context = useContext(FatwaContext);
  if (!context) {
    throw new Error("useFatwaContext must be used within FatwaProvider");
  }
  return context;
}
