import { NextResponse } from "next/server";
import { createFatwa, listFatwas } from "@/lib/fatwaService";
import type { Fatwa } from "@/types/fatwa";

export async function GET() {
  try {
    const fatwas = await listFatwas();
    return NextResponse.json({ fatwas });
  } catch (error) {
    console.error("Failed to list fatwas", error);
    return NextResponse.json(
      { error: "تعذر تحميل الفتاوى" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Partial<Fatwa>;
    if (!payload.title || !payload.body || !payload.category) {
      return NextResponse.json(
        { error: "الرجاء إدخال جميع البيانات المطلوبة" },
        { status: 400 },
      );
    }
    const fatwa = await createFatwa({
      title: payload.title,
      body: payload.body,
      category: payload.category,
      tags: payload.tags,
      reference: payload.reference,
    });
    return NextResponse.json({ fatwa }, { status: 201 });
  } catch (error) {
    console.error("Failed to create fatwa", error);
    return NextResponse.json(
      { error: "تعذر إضافة الفتوى" },
      { status: 500 },
    );
  }
}
