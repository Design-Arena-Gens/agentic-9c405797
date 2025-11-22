export type FatwaCategory =
  | "العبادات"
  | "المعاملات"
  | "الأسرة"
  | "العقيدة"
  | "الأخلاق"
  | "فتاوى عامة";

export interface Fatwa {
  id: string;
  title: string;
  body: string;
  category: FatwaCategory;
  views: number;
  createdAt: string;
  updatedAt?: string;
  tags?: string[];
  reference?: string;
}

export interface Question {
  id: string;
  name: string;
  question: string;
  attachmentUrl?: string;
  createdAt: string;
  status: "pending" | "answered";
  fatwaId?: string;
}
