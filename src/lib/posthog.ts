/**
 * PostHog client singleton — analytics + feature flags
 */
import posthog from "posthog-js";

export { posthog };

export function initPostHog() {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;

  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    capture_pageview: false, // handled manually in PostHogProvider
    persistence: "localStorage",
  });
}
