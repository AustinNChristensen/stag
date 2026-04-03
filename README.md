# 🦌 STAG Stack

**The AI-native, free-tier-optimized full-stack Next.js starter.**

Built for the age of AI-assisted development. Every layer of the stack is designed to be understood and extended by AI agents — whether you're using Claude Code, Cursor, or Codex.

```
Ship faster. Scale further. Let AI drive.
```

---

## Stack

| | Service | Free Tier |
|---|---------|-----------|
| ▲ | **Next.js 16** + React 19 | Unlimited (Vercel hobby) |
| ⚡ | **Supabase** — Postgres, Auth, Storage | 500MB DB, 50K MAU |
| ⚙️ | **Trigger.dev v3** — Background jobs | 50K runs/mo |
| 🔄 | **TanStack Query v5** + Form v1 | Open source |
| 📝 | **Sanity v3** — Headless CMS | 3 users, 10GB bandwidth |
| 📊 | **PostHog** — Analytics + flags | 1M events/mo |
| 🔍 | **Sentry** — Error tracking | 5K errors/mo |
| ✉️ | **Resend** + React Email | 3K emails/mo |
| 🎨 | **Tailwind v4** + shadcn/ui | Open source |

**Total monthly cost at launch: $0**

---

## Quick Start

```bash
git clone https://github.com/AustinNChristensen/stag my-app
cd my-app
pnpm install
cp .env.example .env.local
pnpm dev
```

Fill in `.env.local` with your service keys. Full setup guide in [`AGENTS.md`](./AGENTS.md).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/AustinNChristensen/stag)

---

## Why STAG vs T3?

| | T3 Stack | STAG Stack |
|---|----------|------------|
| **Philosophy** | Type-safety first | AI-agent-first |
| **Backend** | tRPC + Prisma | Supabase (Postgres + Auth + Storage) |
| **Background jobs** | ❌ | Trigger.dev |
| **CMS** | ❌ | Sanity |
| **Analytics** | ❌ | PostHog |
| **Error tracking** | ❌ | Sentry |
| **Email** | ❌ | Resend + React Email |
| **AI agent guide** | ❌ | AGENTS.md (every pattern documented) |
| **Free tier** | Partial | Fully optimized |

T3 was designed before AI coding tools existed. STAG assumes your dev team includes Claude, Cursor, and Codex.

---

## What's Included

- ✅ Supabase auth (email/password + magic link)
- ✅ Protected routes via middleware
- ✅ Dashboard shell with sidebar
- ✅ User profiles with RLS
- ✅ TanStack Query wired for server state
- ✅ Trigger.dev welcome email on signup
- ✅ PostHog page view tracking + identify
- ✅ Sentry error + performance monitoring
- ✅ React Email templates
- ✅ Sanity CMS + Studio
- ✅ All shadcn/ui components pre-installed
- ✅ `AGENTS.md` — comprehensive AI agent guide
- ✅ GitHub Actions typecheck on every PR
- ✅ `.env.example` with all vars documented

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # Login, signup, reset password
│   ├── (dashboard)/     # Protected dashboard pages
│   └── api/             # API routes
├── components/
│   ├── ui/              # shadcn components
│   └── providers/       # PostHog, TanStack Query, etc.
├── lib/
│   ├── supabase/        # Browser + server clients
│   └── auth.ts          # getUser / requireUser helpers
├── trigger/             # Trigger.dev background tasks
├── emails/              # React Email templates
└── sanity/              # CMS client, schemas, queries
```

---

## License

MIT — use it, fork it, ship it.

Made with 🦌 by [Austin Christensen](https://github.com/AustinNChristensen)
