import { NextResponse } from "next/server";
import { createQuestion } from "@/lib/fatwaService";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = String(formData.get("name") ?? "").trim();
    const question = String(formData.get("question") ?? "").trim();
    const attachment = formData.get("attachment");

    if (!name || !question) {
      return NextResponse.json(
        { error: "الاسم والسؤال حقول إلزامية" },
        { status: 400 },
      );
    }

    let buffer: Buffer | undefined;
    let fileName: string | undefined;
    let fileType: string | undefined;

    if (attachment instanceof File) {
      const arrayBuffer = await attachment.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
      fileName = attachment.name;
      fileType = attachment.type;
    }

    const record = await createQuestion({
      name,
      question,
      fileBuffer: buffer,
      fileName,
      fileType,
    });

    return NextResponse.json({ question: record }, { status: 201 });
  } catch (error) {
    console.error("Failed to create question", error);
    return NextResponse.json(
      { error: "تعذر إرسال السؤال، حاول لاحقاً" },
      { status: 500 },
    );
  }
}
