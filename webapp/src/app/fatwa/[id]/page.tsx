import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getFatwaById, incrementFatwaViews } from "@/lib/fatwaService";
import ShareFatwaButton from "@/components/ShareFatwaButton";

interface FatwaPageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: FatwaPageProps): Promise<Metadata> {
  const fatwa = await getFatwaById(params.id);
  if (!fatwa) {
    return {
      title: "الفتوى غير موجودة",
    };
  }
  return {
    title: `${fatwa.title} | فتاوى الإسلام`,
    description: fatwa.body.slice(0, 160),
  };
}

export default async function FatwaPage({ params }: FatwaPageProps) {
  const fatwa = await getFatwaById(params.id);

  if (!fatwa) {
    notFound();
  }

  await incrementFatwaViews(fatwa.id);

  const createdAt = new Date(fatwa.createdAt).toLocaleDateString("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-3xl border border-emerald-100 bg-white p-10 shadow-lg">
      <div className="flex flex-col gap-4 border-b border-emerald-100 pb-6">
        <Link
          href="/"
          className="self-start text-sm text-emerald-600 transition hover:text-emerald-800"
        >
          العودة إلى الصفحة الرئيسية
        </Link>
        <span className="w-fit rounded-full bg-emerald-50 px-4 py-1 text-xs font-semibold text-emerald-700">
          {fatwa.category}
        </span>
        <h1 className="text-3xl font-bold text-emerald-900">{fatwa.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-emerald-600">
          <span>{createdAt}</span>
          <span>{fatwa.views.toLocaleString("ar-EG")} مشاهدة</span>
          {fatwa.reference ? (
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs text-emerald-700">
              مرجع الفتوى: {fatwa.reference}
            </span>
          ) : null}
        </div>
      </div>

      <div className="space-y-6 text-right text-lg leading-9 text-emerald-800">
        {fatwa.body.split("\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <footer className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-emerald-100 pt-4 text-sm">
        <ShareFatwaButton id={fatwa.id} title={fatwa.title} />
        <Link
          href="/ask"
          className="rounded-full bg-emerald-500 px-6 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
        >
          لدي سؤال مشابه
        </Link>
      </footer>
    </article>
  );
}
