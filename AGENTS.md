# AGENTS.md — STAG Stack Guide for AI Agents

This file is your map. Read it before touching any code.
Claude Code, Cursor, Codex — this is written for you.

---

## Stack Overview

| Service | Purpose | Key files |
|---------|---------|-----------|
| **Next.js 16** | App Router, API routes, SSR/SSG | `src/app/`, `next.config.ts` |
| **Supabase** | Postgres DB + Auth + Storage | `src/lib/supabase/`, `supabase/migrations/` |
| **Trigger.dev v3** | Background jobs, scheduled tasks | `src/trigger/`, `src/trigger.config.ts` |
| **TanStack Query v5** | Client-side server state | `src/shared/hooks/` |
| **Sanity v3** | CMS (optional) | `src/sanity/`, `src/app/studio/` |
| **PostHog** | Analytics + feature flags | `src/lib/posthog.ts`, `src/components/providers/PostHogProvider.tsx` |
| **Sentry** | Error tracking | `sentry.*.config.ts` |
| **Resend + React Email** | Transactional email | `src/lib/resend.ts`, `src/emails/` |
| **shadcn/ui + Tailwind v4** | UI components | `src/components/ui/`, `src/app/globals.css` |

---

## File Structure

```
src/
├── app/
│   ├── (auth)/          # Public auth pages (login, signup, reset)
│   ├── (dashboard)/     # Protected app pages (layout wraps with sidebar)
│   ├── api/             # API routes
│   ├── studio/          # Sanity Studio (optional)
│   ├── layout.tsx       # Root layout — wraps in <Providers>
│   └── page.tsx         # Landing page
├── components/
│   ├── ui/              # shadcn components — do not edit directly
│   ├── providers/       # React context providers
│   └── [feature]/       # Feature-specific components
├── lib/
│   ├── supabase/
│   │   ├── client.ts    # Browser client (use in "use client" components)
│   │   └── server.ts    # Server client (use in Server Components / API routes)
│   ├── auth.ts          # getUser() and requireUser() helpers
│   ├── posthog.ts       # PostHog client
│   └── resend.ts        # Resend email client
├── trigger/             # Trigger.dev tasks
├── emails/              # React Email templates
├── sanity/              # Sanity client, schemas, queries
├── shared/
│   └── hooks/           # TanStack Query hooks
└── types/               # Global TypeScript types
```

---

## Adding a New Page

### Public page
1. Create `src/app/your-page/page.tsx`
2. Export a default React component
3. No auth check needed

### Protected page
1. Create `src/app/(dashboard)/your-page/page.tsx`
2. Add `const user = await requireUser();` at the top of the component
3. The middleware in `middleware.ts` will redirect unauthenticated users to `/login`

---

## Adding an API Route

```ts
// src/app/api/example/route.ts
import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = await createClient();
  const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ data });
}
```

**Rules:**
- Always check auth first
- Use `createClient()` from `@/lib/supabase/server` (NOT the browser client)
- Return `NextResponse.json()`

---

## Adding a Supabase Table

1. Create a migration file: `supabase/migrations/00N_description.sql`
2. Write your SQL (always enable RLS and add policies):
```sql
CREATE TABLE things (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE things ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own things" ON things USING (auth.uid() = user_id);
```
3. Run: `pnpm db:migrate` (requires Supabase CLI + linked project)
4. Regenerate types: `pnpm db:types`

---

## Adding a Trigger.dev Task

```ts
// src/trigger/my-task.ts
import { task } from "@trigger.dev/sdk/v3";

export const myTask = task({
  id: "my-task",           // must be unique across all tasks
  run: async (payload: { userId: string }) => {
    // do async work here
    return { success: true };
  },
});
```

**To fire it from an API route or Server Component:**
```ts
import { tasks } from "@trigger.dev/sdk/v3";
import { myTask } from "@/trigger/my-task";

await tasks.trigger(myTask.id, { userId: user.id });
```

**Scheduled task:**
```ts
import { schedules } from "@trigger.dev/sdk/v3";

export const weeklyDigest = schedules.task({
  id: "weekly-digest",
  cron: "0 9 * * 1",  // Every Monday 9am UTC
  run: async (payload) => { ... },
});
```

**Deploy:** `pnpm trigger:deploy`

---

## Sending an Email

1. Create a template in `src/emails/YourEmail.tsx` using React Email components
2. Send it:
```ts
import { resend } from "@/lib/resend";
import { YourEmail } from "@/emails/YourEmail";

await resend.emails.send({
  from: "STAG <noreply@yourdomain.com>",
  to: user.email,
  subject: "Your subject",
  react: <YourEmail name={user.name} />,
});
```

Preview emails locally: `pnpm email:preview`

---

## Tracking a PostHog Event

```ts
// In a Client Component:
import { posthog } from "@/lib/posthog";
posthog.capture("button_clicked", { button: "upgrade", plan: "pro" });

// Identify user on login:
posthog.identify(user.id, { email: user.email });
```

**Feature flag:**
```ts
import { useFeatureFlag } from "@/shared/hooks/use-feature-flag";
const isEnabled = useFeatureFlag("new-feature");
```

---

## Environment Variables

| Variable | Used by | Server/Client |
|----------|---------|---------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase | Client |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase | Client |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase (admin) | Server only |
| `TRIGGER_SECRET_KEY` | Trigger.dev | Server only |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog | Client |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog | Client |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry | Client |
| `SENTRY_AUTH_TOKEN` | Sentry (build) | Build only |
| `RESEND_API_KEY` | Resend | Server only |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity | Client |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity | Client |
| `SANITY_API_TOKEN` | Sanity (writes) | Server only |

---

## Local Dev Setup

```bash
git clone https://github.com/AustinNChristensen/stag my-app
cd my-app
pnpm install
cp .env.example .env.local
# Fill in .env.local with your keys

# Start Supabase locally (requires Docker)
npx supabase start
pnpm db:migrate

# Start the app
pnpm dev

# In a separate terminal, start Trigger.dev dev server
pnpm trigger:dev
```

---

## Deploy Checklist

- [ ] Push to GitHub
- [ ] Connect to Vercel → set all `NEXT_PUBLIC_*` env vars
- [ ] Link Supabase project → run `supabase db push` against prod
- [ ] Deploy Trigger.dev tasks: `pnpm trigger:deploy`
- [ ] Set `NEXT_PUBLIC_APP_URL` to your production domain in Vercel

---

## Common Gotchas

**"You're using the browser Supabase client in a Server Component"**
→ Use `createClient()` from `@/lib/supabase/server`, not `@/lib/supabase/client`

**Cookies not being set in middleware**
→ Make sure you're returning `supabaseResponse` from middleware, not a new `NextResponse`

**RLS blocking your queries**
→ The server client uses the anon key and respects RLS. For admin operations (bypassing RLS), use the service role key: `createClient(process.env.SUPABASE_SERVICE_ROLE_KEY)`

**TanStack Query not updating after mutation**
→ Call `queryClient.invalidateQueries({ queryKey: ["profile"] })` after mutations

**Trigger.dev tasks not firing locally**
→ Make sure `pnpm trigger:dev` is running in a separate terminal
