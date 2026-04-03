/**
 * STAG stack landing page — animated stag hero + feature overview
 */
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

// ─── Animated SVG Stag Head ──────────────────────────────────────────────────
// Proper frontal stag with large sweeping antlers

function StagHead() {
  return (
    <motion.div
      animate={{ scale: [1, 1.015, 1] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      className="flex items-center justify-center"
    >
      <svg
        width="320"
        height="420"
        viewBox="0 0 320 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_50px_rgba(201,168,76,0.25)]"
      >
        {/* ── LEFT ANTLER ── */}
        {/* Main left beam: rises from skull, sweeps up-left */}
        <motion.path d="M130 170 C125 150 118 128 110 108 C102 88 92 68 85 48 C80 34 78 20 80 8"
          stroke="#c9a84c" strokeWidth="4" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
          transition={{ pathLength: { duration: 1.2, delay: 0.0, ease: "easeInOut" }, opacity: { duration: 0.01, delay: 0 } }} />
        {/* Left brow tine: short forward tine near base */}
        <motion.path d="M118 140 C108 132 96 128 82 130 C72 131 62 136 56 144"
          stroke="#c9a84c" strokeWidth="3" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
          transition={{ pathLength: { duration: 0.8, delay: 0.15, ease: "easeInOut" }, opacity: { duration: 0.01, delay: 0.15 } }} />
        {/* Left bez tine: mid-beam tine angling back-left */}
        <motion.path d="M108 112 C96 104 82 100 68 102 C56 104 46 110 40 120"
          stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
          transition={{ pathLength: { duration: 0.8, delay: 0.28, ease: "easeInOut" }, opacity: { duration: 0.01, delay: 0.28 } }} />
        {/* Left trez tine: upper mid tine */}
        <motion.path d="M96 86 C82 76 68 72 54 76 C44 79 36 86 32 96"
          stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
          transition={{ pathLength: { duration: 0.8, delay: 0.40, ease: "easeInOut" }, opacity: { duration: 0.01, delay: 0.40 } }} />
        {/* Left crown fork A: top of beam splits left */}
        <motion.path d="M80 48 C70 36 58 28 44 24 C32 20 20 22 12 28"
          stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
          transition={{ pathLength: { duration: 0.8, delay: 0.52, ease: "easeInOut" }, opacity: { duration: 0.01, delay: 0.52 } }} />
        {/* Left crown fork B: top of beam goes straight up */}
        <motion.path d="M80 48 C78 34 76 20 76 6 C76 -2 78 -8 82 -12"
          stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
          transition={{ pathLength: { duration: 0.7, delay: 0.60, ease: "easeInOut" }, opacity: { duration: 0.01, delay: 0.60 } }} />
        {/* Left crown fork C: top of beam sweeps right */}
        <motion.path d="M80 48 C88 36 96 28 106 22 C114 17 122 16 128 20"
          stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
          transition={{ pathLength: { duration: 0.7, delay: 0.68, ease: "easeInOut" }, opacity: { duration: 0.01, delay: 0.68 } }} />

        {/* ── RIGHT ANTLER (mirrored) ── */}
        {/* Main right beam */}
        <motion.path d="M190 170 C195 150 202 128 210 108 C218 88 228 68 235 48 C240 34 242 20 240 8"
          stroke="#c9a84c" strokeWidth="4" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
          transition={{ pathLength: { duration: 1.2, delay: 0.05, ease: "easeInOut" }, opacity: { duration: 0.01, delay: 0.05 } }} />
        {/* Right brow tine */}
        <motion.path d="M202 140 C212 132 224 128 238 130 C248 131 258 136 264 144"
          stroke="#c9a84c" strokeWidth="3" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
          transition={{ pathLength: { duration: 0.8, delay: 0.20, ease: "easeInOut" }, opacity: { duration: 0.01, delay: 0.20 } }} />
        {/* Right bez tine */}
        <motion.path d="M212 112 C224 104 238 100 252 102 C264 104 274 110 280 120"
          stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
          transition={{ pathLength: { duration: 0.8, delay: 0.33, ease: "easeInOut" }, opacity: { duration: 0.01, delay: 0.33 } }} />
        {/* Right trez tine */}
        <motion.path d="M224 86 C238 76 252 72 266 76 C276 79 284 86 288 96"
          stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
          transition={{ pathLength: { duration: 0.8, delay: 0.45, ease: "easeInOut" }, opacity: { duration: 0.01, delay: 0.45 } }} />
        {/* Right crown fork A */}
        <motion.path d="M240 48 C250 36 262 28 276 24 C288 20 300 22 308 28"
          stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
          transition={{ pathLength: { duration: 0.8, delay: 0.57, ease: "easeInOut" }, opacity: { duration: 0.01, delay: 0.57 } }} />
        {/* Right crown fork B */}
        <motion.path d="M240 48 C242 34 244 20 244 6 C244 -2 242 -8 238 -12"
          stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
          transition={{ pathLength: { duration: 0.7, delay: 0.65, ease: "easeInOut" }, opacity: { duration: 0.01, delay: 0.65 } }} />
        {/* Right crown fork C */}
        <motion.path d="M240 48 C232 36 224 28 214 22 C206 17 198 16 192 20"
          stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
          transition={{ pathLength: { duration: 0.7, delay: 0.73, ease: "easeInOut" }, opacity: { duration: 0.01, delay: 0.73 } }} />

        {/* ── HEAD / FACE ── */}
        {/* Head shape: narrow top (forehead), wider cheeks, tapers to muzzle */}
        <motion.path d="M140 175 C134 172 126 168 122 162 C116 154 114 144 116 134 C118 124 124 116 130 112 C138 108 148 108 160 108 C172 108 182 108 190 112 C196 116 202 124 204 134 C206 144 204 154 198 162 C194 168 186 172 180 175 C173 178 167 180 160 180 C153 180 147 178 140 175Z"
          stroke="#c9a84c" strokeWidth="2" fill="rgba(201,168,76,0.04)"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }} />
        {/* Neck / lower head extending down */}
        <motion.path d="M140 175 C136 185 134 200 136 218 C138 236 144 252 152 264 C156 270 160 274 160 274 C160 274 164 270 168 264 C176 252 182 236 184 218 C186 200 184 185 180 175"
          stroke="#c9a84c" strokeWidth="2" fill="rgba(201,168,76,0.04)"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }} />
        {/* Left ear: upward-pointing oval */}
        <motion.path d="M122 148 C112 140 106 128 108 116 C110 106 118 100 126 102 C132 104 136 112 134 122 C132 132 128 142 124 150Z"
          stroke="#c9a84c" strokeWidth="1.5" fill="rgba(201,168,76,0.06)"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.15 }} />
        {/* Right ear */}
        <motion.path d="M198 148 C208 140 214 128 212 116 C210 106 202 100 194 102 C188 104 184 112 186 122 C188 132 192 142 196 150Z"
          stroke="#c9a84c" strokeWidth="1.5" fill="rgba(201,168,76,0.06)"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }} />
        {/* Left eye: almond shape */}
        <motion.path d="M143 142 C146 138 151 136 156 137 C161 138 164 142 163 146 C162 150 157 153 152 152 C147 151 143 147 143 142Z"
          stroke="#c9a84c" strokeWidth="1.5" fill="rgba(201,168,76,0.15)"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.25 }} />
        {/* Right eye */}
        <motion.path d="M177 142 C174 138 169 136 164 137 C159 138 156 142 157 146 C158 150 163 153 168 152 C173 151 177 147 177 142Z"
          stroke="#c9a84c" strokeWidth="1.5" fill="rgba(201,168,76,0.15)"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.3 }} />
        {/* Nose bridge line */}
        <motion.path d="M156 155 C157 162 158 168 159 172 M164 155 C163 162 162 168 161 172"
          stroke="#c9a84c" strokeWidth="1" strokeLinecap="round"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.35 }} />
        {/* Muzzle */}
        <motion.path d="M148 228 C148 218 153 210 160 210 C167 210 172 218 172 228 C172 238 167 246 160 246 C153 246 148 238 148 228Z"
          stroke="#c9a84c" strokeWidth="1.5" fill="rgba(201,168,76,0.08)"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.4 }} />
        {/* Nostril left */}
        <motion.path d="M153 228 C153 224 156 222 158 222 C159 222 160 224 160 227"
          stroke="#c9a84c" strokeWidth="1" strokeLinecap="round" fill="none"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1.5 }} />
        {/* Nostril right */}
        <motion.path d="M167 228 C167 224 164 222 162 222 C161 222 160 224 160 227"
          stroke="#c9a84c" strokeWidth="1" strokeLinecap="round" fill="none"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1.55 }} />
      </svg>
    </motion.div>
  );
}

// ─── Stack cards ─────────────────────────────────────────────────────────────

const STACK = [
  { name: "Next.js 16", emoji: "▲", desc: "App Router, React 19, Turbopack", free: "Unlimited on Vercel hobby" },
  { name: "Supabase", emoji: "⚡", desc: "Postgres, Auth, Storage, Realtime", free: "500MB DB, 50K MAU" },
  { name: "Trigger.dev", emoji: "⚙️", desc: "Background jobs & scheduled tasks", free: "50K runs/mo" },
  { name: "TanStack", emoji: "🔄", desc: "Query v5 + Form v1 for server state", free: "Open source" },
  { name: "Sanity", emoji: "📝", desc: "Headless CMS with live preview", free: "3 users, 10GB bandwidth" },
  { name: "PostHog", emoji: "📊", desc: "Analytics + feature flags + replays", free: "1M events/mo" },
  { name: "Sentry", emoji: "🔍", desc: "Error tracking + performance monitoring", free: "5K errors/mo" },
  { name: "Resend", emoji: "✉️", desc: "Transactional email with React Email", free: "3K emails/mo" },
];

function StackCard({ item, index }: { item: typeof STACK[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 hover:border-amber-800/50 transition-colors"
    >
      <div className="text-2xl mb-2">{item.emoji}</div>
      <h3 className="font-semibold text-white mb-1">{item.name}</h3>
      <p className="text-zinc-400 text-sm mb-3">{item.desc}</p>
      <span className="text-xs text-amber-600 bg-amber-950/50 px-2 py-1 rounded-full">
        Free: {item.free}
      </span>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-16 pb-8">
        <StagHead />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="text-center mt-6"
        >
          <h1 className="text-6xl sm:text-7xl font-bold tracking-[0.3em] text-white mb-4">
            STAG
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg max-w-md mx-auto mb-8">
            The AI-native full-stack starter.{" "}
            <span className="text-amber-500">Ship faster. Scale further.</span>
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="https://github.com/AustinNChristensen/stag"
              className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-medium rounded-lg transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="#stack"
              className="px-6 py-3 border border-zinc-700 hover:border-zinc-500 text-zinc-300 font-medium rounded-lg transition-colors"
            >
              View Stack
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Stack */}
      <section id="stack" className="max-w-5xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-center mb-4">The Stack</h2>
        <p className="text-zinc-400 text-center mb-12 max-w-xl mx-auto">
          Every service chosen for its free tier, developer experience, and AI-agent compatibility.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STACK.map((item, i) => (
            <StackCard key={item.name} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* Why STAG */}
      <section className="max-w-5xl mx-auto px-6 py-24 border-t border-zinc-800">
        <h2 className="text-3xl font-bold text-center mb-12">Why STAG?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "AI-Native by Default", icon: "🤖", desc: "AGENTS.md tells every AI agent exactly how the codebase works. Add a page, table, or task in seconds — no hallucinations." },
            { title: "Free Tier to Revenue", icon: "🚀", desc: "Every service has a generous free tier. Go from $0 to paying customers without changing your stack." },
            { title: "Batteries Included", icon: "🔋", desc: "Auth, database, background jobs, CMS, analytics, error tracking, and email — all wired together out of the box." },
          ].map((item) => (
            <div key={item.title} className="text-center">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-zinc-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick start */}
      <section className="max-w-3xl mx-auto px-6 py-24 border-t border-zinc-800">
        <h2 className="text-3xl font-bold text-center mb-12">Quick Start</h2>
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6 font-mono text-sm overflow-x-auto">
          {[
            "git clone https://github.com/AustinNChristensen/stag my-app",
            "cd my-app && cp .env.example .env.local",
            "pnpm install",
            "pnpm dev",
          ].map((cmd, i) => (
            <div key={i} className="flex gap-3 mb-2">
              <span className="text-amber-600 select-none">$</span>
              <span className="text-zinc-200">{cmd}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 text-center text-zinc-600 text-sm">
        <p>STAG Stack — MIT License —{" "}
          <a href="https://github.com/AustinNChristensen/stag" className="text-amber-600 hover:text-amber-500">GitHub</a>
        </p>
      </footer>
    </div>
  );
}
