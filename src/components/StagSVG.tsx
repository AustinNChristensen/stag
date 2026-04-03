/**
 * Stag head SVG — clean geometric logo style with animated draw-on
 */
"use client";
import { motion } from "framer-motion";

const C = "#c9a84c";

interface LineProps {
  d: string;
  w?: number;
  delay?: number;
  dur?: number;
  fill?: string;
  fade?: boolean;
}

function AL({ d, w = 2.5, delay = 0, dur = 1.0, fill = "none", fade = false }: LineProps) {
  if (fade) {
    return (
      <motion.path
        d={d} stroke={C} strokeWidth={w} strokeLinecap="round" fill={fill}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay }}
      />
    );
  }
  return (
    <motion.path
      d={d} stroke={C} strokeWidth={w} strokeLinecap="round" fill={fill}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{
        pathLength: { duration: dur, delay, ease: "easeInOut" as const },
        opacity: { duration: 0.01, delay },
      }}
    />
  );
}

export function StagSVG() {
  return (
    <motion.div
      animate={{ scale: [1, 1.015, 1] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 3 }}
    >
      <svg
        viewBox="0 0 400 500" width="320" height="400" fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_60px_rgba(201,168,76,0.3)]"
      >
        {/* LEFT main beam */}
        <AL d="M168 200 C160 182 150 160 140 138 C130 116 120 92 114 68 C110 50 110 34 116 20 C120 10 126 2 132 -4" w={5} delay={0} dur={1.5} />
        {/* LEFT brow tine */}
        <AL d="M146 140 C134 130 118 124 100 122 C84 120 68 126 54 136 C44 144 36 154 34 166" w={3.5} delay={0.2} dur={1.0} />
        {/* LEFT bez tine */}
        <AL d="M132 110 C118 98 100 92 80 90 C62 88 44 94 30 106 C20 114 12 126 10 140" w={3} delay={0.38} dur={0.9} />
        {/* LEFT trez tine */}
        <AL d="M120 80 C104 66 84 60 62 60 C42 60 24 68 12 82 C4 92 0 104 2 118" w={2.5} delay={0.54} dur={0.85} />
        {/* LEFT crown A (sweeps far left) */}
        <AL d="M114 20 C102 4 86 -8 68 -14 C52 -18 36 -14 24 -4" w={2.5} delay={0.68} dur={0.7} />
        {/* LEFT crown B (straight up) */}
        <AL d="M114 20 C112 4 112 -10 114 -22" w={2.5} delay={0.77} dur={0.55} />
        {/* LEFT crown C (inner) */}
        <AL d="M114 20 C124 6 136 -4 150 -8 C160 -10 170 -8 178 -2" w={2} delay={0.85} dur={0.65} />

        {/* RIGHT main beam */}
        <AL d="M232 200 C240 182 250 160 260 138 C270 116 280 92 286 68 C290 50 290 34 284 20 C280 10 274 2 268 -4" w={5} delay={0.05} dur={1.5} />
        {/* RIGHT brow tine */}
        <AL d="M254 140 C266 130 282 124 300 122 C316 120 332 126 346 136 C356 144 364 154 366 166" w={3.5} delay={0.25} dur={1.0} />
        {/* RIGHT bez tine */}
        <AL d="M268 110 C282 98 300 92 320 90 C338 88 356 94 370 106 C380 114 388 126 390 140" w={3} delay={0.43} dur={0.9} />
        {/* RIGHT trez tine */}
        <AL d="M280 80 C296 66 316 60 338 60 C358 60 376 68 388 82 C396 92 400 104 398 118" w={2.5} delay={0.59} dur={0.85} />
        {/* RIGHT crown A */}
        <AL d="M286 20 C298 4 314 -8 332 -14 C348 -18 364 -14 376 -4" w={2.5} delay={0.72} dur={0.7} />
        {/* RIGHT crown B */}
        <AL d="M286 20 C288 4 288 -10 286 -22" w={2.5} delay={0.81} dur={0.55} />
        {/* RIGHT crown C */}
        <AL d="M286 20 C276 6 264 -4 250 -8 C240 -10 230 -8 222 -2" w={2} delay={0.89} dur={0.65} />

        {/* HEAD — wide cheeks, long muzzle */}
        <AL d="M200 215 C176 215 154 224 140 240 C126 256 120 276 124 296 C128 314 140 330 156 340 C166 346 178 350 186 356 C192 360 196 364 200 370 C204 364 208 360 214 356 C222 350 234 346 244 340 C260 330 272 314 276 296 C280 276 274 256 260 240 C246 224 224 215 200 215Z"
          w={2.5} fill="rgba(201,168,76,0.04)" fade delay={1.6} />
        {/* Left ear */}
        <AL d="M140 240 C128 226 122 208 128 194 C132 182 144 176 154 180 C164 184 168 198 164 212 C160 226 150 238 142 244Z"
          w={2} fill="rgba(201,168,76,0.07)" fade delay={1.75} />
        {/* Right ear */}
        <AL d="M260 240 C272 226 278 208 272 194 C268 182 256 176 246 180 C236 184 232 198 236 212 C240 226 250 238 258 244Z"
          w={2} fill="rgba(201,168,76,0.07)" fade delay={1.82} />
        {/* Left eye */}
        <AL d="M164 274 C164 264 172 256 182 256 C192 256 200 264 200 274 C200 284 192 292 182 292 C172 292 164 284 164 274Z"
          w={2} fill="rgba(201,168,76,0.15)" fade delay={1.92} />
        {/* Right eye */}
        <AL d="M200 274 C200 264 208 256 218 256 C228 256 236 264 236 274 C236 284 228 292 218 292 C208 292 200 284 200 274Z"
          w={2} fill="rgba(201,168,76,0.15)" fade delay={1.98} />
        {/* Nose bridge */}
        <AL d="M192 298 L192 334 M208 298 L208 334" w={1.5} fade delay={2.04} />
        {/* Muzzle */}
        <AL d="M178 348 C178 334 188 324 200 324 C212 324 222 334 222 348 C222 362 212 372 200 372 C188 372 178 362 178 348Z"
          w={2} fill="rgba(201,168,76,0.08)" fade delay={2.1} />
        {/* Nostrils */}
        <AL d="M187 348 C187 343 191 340 195 342 C198 343 199 347 198 351" w={1.5} fade delay={2.18} />
        <AL d="M213 348 C213 343 209 340 205 342 C202 343 201 347 202 351" w={1.5} fade delay={2.22} />
      </svg>
    </motion.div>
  );
}
