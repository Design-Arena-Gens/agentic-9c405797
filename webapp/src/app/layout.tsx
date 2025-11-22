import type { Metadata } from "next";
import { Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const notoKufi = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "فتاوى الإسلام | المنصة الذكية",
  description:
    "منصة متكاملة للفتاوى الإسلامية توفر أقسام متعددة، بحث سريع، وإمكانية إرسال الأسئلة مع تكامل Firebase.",
  metadataBase: new URL("https://agentic-9c405797.vercel.app"),
  applicationName: "المنصة الذكية للفتاوى",
  icons: [{ rel: "icon", url: "/icons/mosque.svg", type: "image/svg+xml" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${notoKufi.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
