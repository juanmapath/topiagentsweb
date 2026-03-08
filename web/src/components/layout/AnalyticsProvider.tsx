"use client";

import { useAnalytics } from "@/lib/useAnalytics";

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useAnalytics();
  return <>{children}</>;
}
