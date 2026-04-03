/**
 * STAG stack landing page — animated stag hero + feature overview
 */
"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Link from "next/link";

// ─── Animated SVG Stag Head ──────────────────────────────────────────────────

const ANTLER_PATHS = [
  // Left main beam
  "M200 280 C185 250 175 220 165 190 C155 160 148 130 155 100 C158 85 165 72 172 60",
  // Left brow tine
  "M175 210 C165 200 152 195 140 198 C128 201 118 210 115 222",
  // Left bez tine
  "M168 178 C155 165 145 155 130 150 C118 146 105 148 95 155",
  // Left royal tine
  "M163 148 C148 132 138 118 128 105 C118 92 108 82 95 78",
  // Left top fork A
  "M162 110 C155 92 148 78 138 65 C130 54 120 46 108 42",
  // Left top fork B
  "M162 110 C168 92 172 78 178 65 C182 54 184 44 182 32",

  // Right main beam (mirrored)
  "M200 280 C215 250 225 220 235 190 C245 160 252 130 245 100 C242 85 235 72 228 60",
  // Right brow tine
  "M225 210 C235 200 248 195 260 198 C272 201 282 210 285 222",
  // Right bez tine
  "M232 178 C245 165 255 155 270 150 C282 146 295 148 305 155",
  // Right royal tine
  "M237 148 C252 132 262 118 272 105 C282 92 292 82 305 78",
  // Right top fork A
  "M238 110 C245 92 252 78 262 65 C270 54 280 46 292 42",
  // Right top fork B
  "M238 110 C232 92 228 78 222 65 C218 54 216 44 218 32",
];

const FACE_PATHS = [
  // Head outline
  "M200 340 C175 340 158 320 155 295 C152 270 158 250 165 235 C172 220 180 210 185 200 L200 185 L215 200 C220 210 228 220 235 235 C242 250 248 270 245 295 C242 320 225 340 200 340Z",
  // Left eye
  "M182 265 C179 260 179 254 182 249 C185 244 191 242 196 244 C201 246 203 252 201 258 C199 264 193 267 188 266 C185 265 183 265 182 265Z",
  // Right eye  
  "M218 265 C221 260 221 254 218 249 C215 244 209 242 204 244 C199 246 197 252 199 258 C201 264 207 267 212 266 C215 265 217 265 218 265Z",
  // Muzzle
  "M188 305 C188 295 193 288 200 288 C207 288 212 295 212 305 C212 315 207 322 200 322 C193 322 188 315 188 305Z",
  // Left ear
  "M162 240 C152 228 148 212 155 200 C158 194 164 190 170 192 C176 194 178 202 176 212 C174 220 170 230 168 238Z",
  // Right ear
  "M238 240 C248 228 252 212 245 200 C242 194 236 190 230 192 C224 194 222 202 224 212 C226 220 230 230 232 238Z",
];

function StagHead() {
  const controls = useAnimation();
  const pathRefs = useRef<SVGPathElement[]>([]);

  useEffect(() => {
    const animateIn = async () => {
      // Get path lengths for stroke animation
      pathRefs.current.forEach((path) => {
        if (!path) return;
        const length = path.getTotalLength();
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;
      });

      // Stagger the antler draw-on
      await controls.start((i) => ({
        strokeDashoffset: 0,
        transition: {
          duration: 1.5,
          delay: i * 0.08,
          ease: "easeInOut",
        },
      }));
    };

    animateIn();
  }, [controls]);

  return (
    <motion.div
      animate={{ scale: [1, 1.02, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="flex items-center justify-center"
    >
      <svg
        width="400"
        height="380"
        viewBox="0 0 400 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_40px_rgba(201,168,76,0.3)]"
      >
        {/* Face paths — fade in after antlers */}
        {FACE_PATHS.map((d, i) => (
          <motion.path
            key={`face-${i}`}
            d={d}
            stroke="#c9a84c"
            strokeWidth="1.5"
            fill={i === 0 ? "rgba(201,168,76,0.05)" : i >= 4 ? "rgba(201,168,76,0.08)" : "none"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 + i * 0.1 }}
          />
        ))}

        {/* Antler paths — draw on with stroke animation */}
        {ANTLER_PATHS.map((d, i) => (
          <motion.path
            key={`antler-${i}`}
            ref={(el) => {
              if (el) pathRefs.current[i] = el;
            }}
            d={d}
            stroke="#c9a84c"
            strokeWidth={i < 6 ? (i === 0 || i === 6 ? 3.5 : 2) : (i === 6 ? 3.5 : 2)}
            strokeLinecap="round"
            fill="none"
            custom={i}
            animate={controls}
            style={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
          />
        ))}
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
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        <StagHead />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.2 }}
          className="text-center mt-8"
        >
          <h1 className="text-7xl font-bold tracking-[0.3em] text-white mb-4">
            STAG
          </h1>
          <p className="text-zinc-400 text-lg max-w-md mx-auto mb-8">
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="absolute bottom-8 text-zinc-600 text-sm"
        >
          ↓ scroll
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
            {
              title: "AI-Native by Default",
              icon: "🤖",
              desc: "AGENTS.md tells every AI agent (Claude Code, Cursor, Codex) exactly how the codebase works. Add a page, table, or task in seconds — no hallucinations.",
            },
            {
              title: "Free Tier to Revenue",
              icon: "🚀",
              desc: "Every service has a generous free tier. Go from $0 to paying customers without changing your stack. Scale only when you need to.",
            },
            {
              title: "Batteries Included",
              icon: "🔋",
              desc: "Auth, database, background jobs, CMS, analytics, error tracking, and email — all wired together and ready to extend.",
            },
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
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6 font-mono text-sm">
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
        <p className="text-zinc-500 text-sm text-center mt-4">
          Add your env vars and you&apos;re live. Full setup guide in{" "}
          <code className="text-amber-600">AGENTS.md</code>.
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 text-center text-zinc-600 text-sm">
        <p>
          STAG Stack — MIT License —{" "}
          <a
            href="https://github.com/AustinNChristensen/stag"
            className="text-amber-600 hover:text-amber-500"
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}
