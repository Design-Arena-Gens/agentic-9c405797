"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRightCircle, UploadCloud } from "lucide-react";

export default function AskPage() {
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const payload = new FormData();
      payload.append("name", name);
      payload.append("question", question);
      if (file) {
        payload.append("attachment", file);
      }

      const response = await fetch("/api/questions", {
        method: "POST",
        body: payload,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error ?? "تعذر إرسال السؤال");
      }

      setStatus("success");
      setMessage("تم إرسال سؤالك بنجاح، سيتم مراجعته والرد عليه قريباً.");
      setName("");
      setQuestion("");
      setFile(null);
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "حدث خطأ غير متوقع، حاول مرة أخرى.",
      );
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 rounded-3xl border border-emerald-100 bg-white p-10 shadow-lg">
      <div className="flex flex-col gap-3 border-b border-emerald-100 pb-6">
        <Link
          href="/"
          className="self-start text-sm text-emerald-600 transition hover:text-emerald-800"
        >
          العودة إلى الرئيسية
        </Link>
        <h1 className="text-3xl font-bold text-emerald-900">إرسال سؤال شرعي</h1>
        <p className="text-sm text-emerald-600">
          أرسل سؤالك وسيتم تحويله إلى لجنة الفتوى المختصة، مع الحفاظ على سرية
          البيانات الشخصية.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-semibold text-emerald-800">
            الاسم الكريم
          </label>
          <input
            id="name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            placeholder="مثال: أحمد عبد الله"
            className="w-full rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:shadow focus:shadow-emerald-100"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="question"
            className="text-sm font-semibold text-emerald-800"
          >
            السؤال الشرعي
          </label>
          <textarea
            id="question"
            name="question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            required
            rows={6}
            placeholder="اكتب سؤالك هنا بتفصيل ووضوح..."
            className="w-full rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:shadow focus:shadow-emerald-100"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="attachment"
            className="text-sm font-semibold text-emerald-800"
          >
            مرفقات (اختياري)
          </label>
          <label
            htmlFor="attachment"
            className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/40 px-4 py-6 text-sm text-emerald-600 transition hover:border-emerald-300 hover:bg-emerald-50"
          >
            <UploadCloud size={20} />
            <span>
              {file ? `تم اختيار: ${file.name}` : "اسحب الملف أو اختره من جهازك"}
            </span>
            <input
              id="attachment"
              name="attachment"
              type="file"
              className="hidden"
              onChange={(event) => {
                const currentFile = event.target.files?.[0];
                setFile(currentFile ?? null);
              }}
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:opacity-70"
        >
          <ArrowRightCircle size={18} />
          {status === "loading" ? "جارٍ الإرسال..." : "إرسال السؤال"}
        </button>
      </form>

      {message ? (
        <div
          className={`rounded-3xl border px-4 py-3 text-sm ${
            status === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {message}
        </div>
      ) : null}
    </div>
  );
}
