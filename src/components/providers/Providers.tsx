/**
 * Root providers wrapper — add all global providers here
 */
"use client";

import { QueryProvider } from "./QueryProvider";
import { PostHogProvider } from "./PostHogProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <PostHogProvider>{children}</PostHogProvider>
    </QueryProvider>
  );
}
