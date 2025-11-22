"use client";

import Link from "next/link";
import { ArrowLeftCircle, MessageSquare, PlusCircle } from "lucide-react";
import { useMemo } from "react";
import NotificationBanner from "@/components/NotificationBanner";
import SearchBar from "@/components/SearchBar";
import CategoryTabs from "@/components/CategoryTabs";
import FatwaCard from "@/components/FatwaCard";
import { HighlightList } from "@/components/FatwaHighlights";
import { useFatwaContext } from "@/context/FatwaContext";

export default function HomePageContent() {
  const {
    filteredFatwas,
    newestFatwas,
    mostReadFatwas,
    isLoading,
    error,
  } = useFatwaContext();

  const stats = useMemo(() => {
    const total = filteredFatwas.length;
    const avgViews =
      filteredFatwas.reduce((acc, fatwa) => acc + fatwa.views, 0) || 0;
    return {
      total,
      avgViews: Math.floor(avgViews / Math.max(total, 1)),
    };
  }, [filteredFatwas]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <section className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-l from-emerald-100/80 via-white to-white p-8 shadow-md">
        <div className="relative z-10 flex flex-col gap-5">
          <span className="w-fit rounded-full bg-white px-4 py-1 text-xs font-semibold text-emerald-600 shadow-sm">
            مصدر موثوق للفتاوى المعاصرة
          </span>
          <h2 className="text-3xl font-bold leading-relaxed text-emerald-900">
            ابحث عن الفتاوى الشرعية بثقة،
            <br />
            وشارك سؤالك ليجيب عنه أهل العلم.
          </h2>
          <p className="max-w-xl text-sm text-emerald-700">
            صُمم التطبيق ليكون مرجعاً شاملاً للفتاوى مع تقسيمات واضحة،
            وتصميم حديث، ودعم كامل للغة العربية.
          </p>
          <div className="flex flex-col items-start gap-3 sm:flex-row">
            <Link
              href="/ask"
              className="flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-600"
            >
              <PlusCircle size={18} />
              اسأل سؤالاً جديداً
            </Link>
            <Link
              href="#new-fatwas"
              className="flex items-center gap-2 rounded-full border border-emerald-200 px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:border-emerald-300 hover:text-emerald-900"
            >
              <ArrowLeftCircle size={18} />
              تصفح آخر الفتاوى
            </Link>
          </div>
          <div className="mt-6 grid gap-4 text-xs sm:grid-cols-3">
            <div className="rounded-3xl border border-white bg-white/70 p-4 text-emerald-700 shadow-sm backdrop-blur">
              <p className="text-emerald-500">عدد الفتاوى المتاحة</p>
              <strong className="text-2xl">
                {stats.total.toLocaleString("ar-EG")}
              </strong>
            </div>
            <div className="rounded-3xl border border-white bg-white/70 p-4 text-emerald-700 shadow-sm backdrop-blur">
              <p className="text-emerald-500">متوسط القراءات اليومية</p>
              <strong className="text-2xl">
                {stats.avgViews.toLocaleString("ar-EG")}
              </strong>
            </div>
            <div className="rounded-3xl border border-white bg-white/70 p-4 text-emerald-700 shadow-sm backdrop-blur">
              <p className="text-emerald-500">سؤالك سيُراجع خلال</p>
              <strong className="text-2xl">24 ساعة</strong>
            </div>
          </div>
        </div>
        <MessageSquare className="absolute -left-8 -top-8 h-48 w-48 text-emerald-100" />
      </section>

      <NotificationBanner />

      <section className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-emerald-900">
              استكشف الفتاوى
            </h3>
            <p className="text-sm text-emerald-600">
              ابحث بسهولة حسب الموضوع أو القسم الشرعي
            </p>
          </div>
          <div className="w-full sm:max-w-xs">
            <SearchBar />
          </div>
        </div>
        <div className="mt-5">
          <CategoryTabs />
        </div>
      </section>

      {isLoading ? (
        <div className="rounded-3xl border border-emerald-100 bg-white p-10 text-center text-emerald-600 shadow-sm">
          جار تحميل البيانات...
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-red-100 bg-red-50/70 p-10 text-center text-red-600 shadow-sm">
          {error}
        </div>
      ) : filteredFatwas.length === 0 ? (
        <div className="rounded-3xl border border-emerald-100 bg-white p-10 text-center text-emerald-600 shadow-sm">
          لم يتم العثور على فتاوى مطابقة لبحثك.
        </div>
      ) : (
        <section className="grid gap-6 md:grid-cols-2">
          {filteredFatwas.map((fatwa) => (
            <FatwaCard key={fatwa.id} fatwa={fatwa} />
          ))}
        </section>
      )}

      <section
        id="new-fatwas"
        className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        <HighlightList title="الفتاوى الجديدة" items={newestFatwas} />
        <HighlightList title="الأكثر قراءة" items={mostReadFatwas} />
        <div className="hidden rounded-3xl border border-emerald-100 bg-gradient-to-b from-white via-emerald-50/40 to-emerald-100/50 p-6 shadow-sm xl:flex xl:flex-col xl:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-emerald-900">
              اشترك في تنبيهات الفتاوى
            </h3>
            <p className="mt-2 text-sm text-emerald-700">
              قم بتفعيل الإشعارات لتصلك أحدث الفتاوى فور نشرها. (يتطلب تفعيل
              أذونات المتصفح)
            </p>
          </div>
          <button
            className="mt-4 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm text-emerald-700 transition hover:border-emerald-300 hover:text-emerald-900"
            onClick={() => {
              if (typeof window === "undefined") return;
              if ("Notification" in window) {
                void Notification.requestPermission();
                alert("سيتم تفعيل الإشعارات عند السماح من المتصفح.");
              } else {
                alert("إشعارات المتصفح غير مدعومة في هذا الجهاز.");
              }
            }}
          >
            تفعيل الإشعارات
          </button>
        </div>
      </section>
    </div>
  );
}
