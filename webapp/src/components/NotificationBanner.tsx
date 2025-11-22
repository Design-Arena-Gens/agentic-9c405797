"use client";

import { BellRing } from "lucide-react";
import { useEffect } from "react";
import { useFatwaContext } from "@/context/FatwaContext";

export default function NotificationBanner() {
  const { notifications, consumeNotifications } = useFatwaContext();

  useEffect(() => {
    if (notifications.length) {
      const timer = setTimeout(() => consumeNotifications(), 4500);
      return () => clearTimeout(timer);
    }
  }, [notifications, consumeNotifications]);

  if (!notifications.length) return null;

  return (
    <div className="mb-6 flex items-center gap-3 rounded-3xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 shadow-sm">
      <BellRing className="text-emerald-500" size={20} />
      <div className="flex flex-col">
        {notifications.map((note) => (
          <span key={note}>{note}</span>
        ))}
      </div>
    </div>
  );
}
