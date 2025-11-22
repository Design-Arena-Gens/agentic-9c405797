"use client";

import { FatwaProvider } from "@/context/FatwaContext";
import AppShell from "@/components/layout/AppShell";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <FatwaProvider>
      <AppShell>{children}</AppShell>
    </FatwaProvider>
  );
}
