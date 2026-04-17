// Natural riverbank background — mud, water, pebbles in Quell brand tones
// Each card variant shifts the composition slightly

type Props = { variant?: 0 | 1 | 2 };

export default function RiverbankBg({ variant = 0 }: Props) {
  const id = `rb-${variant}`;

  // Shift water/mud proportions per variant
  const waterH  = [0.32, 0.28, 0.36][variant]; // how high water reaches (fraction from bottom)
  const mudH    = [0.52, 0.56, 0.48][variant]; // wet mud band
  const pebbles = pebbleData[variant];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 520"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
      aria-hidden
    >
      <defs>
        {/* Sky-warm haze */}
        <linearGradient id={`sky-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#F5EDE0" />
          <stop offset="60%"  stopColor="#EDD9BE" />
          <stop offset="100%" stopColor="#D4B08A" />
        </linearGradient>

        {/* Wet mud */}
        <linearGradient id={`mud-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#8B5E3C" />
          <stop offset="40%"  stopColor="#6B4426" />
          <stop offset="100%" stopColor="#4E3018" />
        </linearGradient>

        {/* Dry cracked clay bank */}
        <linearGradient id={`clay-${id}`} x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%"   stopColor="#C4956A" />
          <stop offset="50%"  stopColor="#A0724A" />
          <stop offset="100%" stopColor="#7A5030" />
        </linearGradient>

        {/* Water */}
        <linearGradient id={`water-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#8BAAB8" stopOpacity="0.65" />
          <stop offset="50%"  stopColor="#7090A0" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#5A7888" stopOpacity="0.85" />
        </linearGradient>

        {/* Water shimmer overlay */}
        <linearGradient id={`shimmer-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="white" stopOpacity="0" />
          <stop offset="30%"  stopColor="white" stopOpacity="0.12" />
          <stop offset="55%"  stopColor="white" stopOpacity="0.22" />
          <stop offset="70%"  stopColor="white" stopOpacity="0.08" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>

        {/* Terracotta mud highlight */}
        <radialGradient id={`tcotta-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#C17A5A" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#C17A5A" stopOpacity="0" />
        </radialGradient>

        {/* Noise/grain */}
        <filter id={`grain-${id}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="grey" />
          <feBlend in="SourceGraphic" in2="grey" mode="multiply" result="blended" />
          <feComposite in="blended" in2="SourceGraphic" operator="in" />
        </filter>

        <filter id={`softblur-${id}`}>
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
      </defs>

      {/* ── Sky / dry earth top ── */}
      <rect width="400" height="520" fill={`url(#sky-${id})`} />

      {/* ── Dry cracked clay bank (mid section) ── */}
      <path
        d={`M0 ${520 * (1 - mudH - 0.04)}
            Q80 ${520 * (1 - mudH - 0.08)} 160 ${520 * (1 - mudH - 0.02)}
            Q260 ${520 * (1 - mudH + 0.04)} 400 ${520 * (1 - mudH)}
            L400 520 L0 520 Z`}
        fill={`url(#clay-${id})`}
      />

      {/* ── Terracotta bloom ── */}
      <ellipse
        cx={[140, 260, 200][variant]}
        cy={520 * (1 - mudH + 0.08)}
        rx="180" ry="90"
        fill={`url(#tcotta-${id})`}
      />

      {/* ── Wet mud band ── */}
      <path
        d={`M0 ${520 * (1 - mudH + 0.06)}
            Q100 ${520 * (1 - mudH + 0.02)} 200 ${520 * (1 - mudH + 0.07)}
            Q300 ${520 * (1 - mudH + 0.12)} 400 ${520 * (1 - mudH + 0.06)}
            L400 ${520 * (1 - waterH + 0.06)}
            Q300 ${520 * (1 - waterH + 0.02)} 200 ${520 * (1 - waterH + 0.06)}
            Q100 ${520 * (1 - waterH + 0.10)} 0 ${520 * (1 - waterH + 0.04)} Z`}
        fill={`url(#mud-${id})`}
        opacity="0.85"
      />

      {/* ── Mud cracks ── */}
      {mudCracks[variant].map((c, i) => (
        <path key={i} d={c} stroke="#3A2210" strokeWidth="0.7" fill="none" opacity="0.45" />
      ))}

      {/* ── Water ── */}
      <path
        d={`M0 ${520 * (1 - waterH + 0.04)}
            Q60  ${520 * (1 - waterH - 0.01)} 130 ${520 * (1 - waterH + 0.03)}
            Q200 ${520 * (1 - waterH + 0.07)} 280 ${520 * (1 - waterH + 0.02)}
            Q340 ${520 * (1 - waterH - 0.02)} 400 ${520 * (1 - waterH + 0.03)}
            L400 520 L0 520 Z`}
        fill={`url(#water-${id})`}
      />

      {/* ── Water ripple lines ── */}
      {waterRipples[variant].map((r, i) => (
        <path key={i} d={r.d} stroke="white" strokeWidth={r.w} fill="none" opacity={r.o} />
      ))}

      {/* ── Water shimmer ── */}
      <rect
        x="0" y={520 * (1 - waterH)}
        width="400" height={520 * waterH}
        fill={`url(#shimmer-${id})`}
      />

      {/* ── Pebbles ── */}
      {pebbles.map((p, i) => (
        <ellipse key={i} cx={p.x} cy={p.y} rx={p.rx} ry={p.ry}
          fill={p.fill} opacity={p.o}
          transform={`rotate(${p.r},${p.x},${p.y})`} />
      ))}

      {/* ── Small stones near waterline ── */}
      {smallStones[variant].map((s, i) => (
        <ellipse key={i} cx={s.x} cy={s.y} rx={s.rx} ry={s.ry}
          fill={s.c} opacity="0.6" />
      ))}

      {/* ── Grain texture overlay ── */}
      <rect width="400" height="520" fill="rgba(180,130,80,0.04)" filter={`url(#grain-${id})`} />
    </svg>
  );
}

// ── Static data per variant ──────────────────────────────────────

const mudCracks = [
  // variant 0
  [
    "M60 285 Q75 292 68 305 Q80 312 72 324",
    "M150 272 Q162 280 155 295 Q168 300 160 315",
    "M240 280 Q250 290 244 302",
    "M320 268 Q330 278 325 292 Q335 298 328 310",
    "M100 300 Q108 305 104 316",
    "M280 295 Q290 302 286 312 Q295 318 290 328",
  ],
  // variant 1
  [
    "M40 295 Q55 302 48 316 Q60 322 54 334",
    "M130 280 Q142 288 136 300 Q148 306 141 318",
    "M220 290 Q232 298 226 310",
    "M310 275 Q322 284 316 298 Q326 304 320 315",
    "M170 308 Q178 314 174 324",
    "M260 285 Q270 292 266 302 Q275 308 270 320",
  ],
  // variant 2
  [
    "M50 278 Q64 286 58 298 Q70 305 64 316",
    "M160 265 Q172 274 166 286 Q178 292 172 303",
    "M250 275 Q260 284 255 295",
    "M340 272 Q350 281 345 294 Q354 300 349 311",
    "M110 295 Q118 300 114 312",
    "M295 288 Q305 295 300 306 Q310 312 304 322",
  ],
];

const waterRipples = [
  [
    { d: "M20 390 Q100 383 180 390 Q260 397 380 388", w: 0.8, o: 0.20 },
    { d: "M0 408  Q90 401 170 408 Q250 415 400 405", w: 0.6, o: 0.15 },
    { d: "M30 426 Q120 419 210 426 Q300 433 400 424", w: 0.5, o: 0.12 },
    { d: "M0 444  Q80 437 160 444 Q240 451 400 442", w: 0.4, o: 0.10 },
  ],
  [
    { d: "M10 375 Q100 368 190 375 Q280 382 400 373", w: 0.8, o: 0.20 },
    { d: "M0 393  Q85 386 165 393 Q245 400 400 391", w: 0.6, o: 0.15 },
    { d: "M20 411 Q110 404 200 411 Q290 418 400 409", w: 0.5, o: 0.12 },
    { d: "M0 430  Q80 423 165 430 Q250 437 400 428", w: 0.4, o: 0.10 },
  ],
  [
    { d: "M0 400  Q90 393 175 400 Q260 407 400 398", w: 0.8, o: 0.20 },
    { d: "M15 418 Q100 411 185 418 Q270 425 400 416", w: 0.6, o: 0.15 },
    { d: "M0 436  Q85 429 165 436 Q245 443 400 434", w: 0.5, o: 0.12 },
    { d: "M20 454 Q110 447 200 454 Q290 461 400 452", w: 0.4, o: 0.10 },
  ],
];

const pebbleData = [
  [
    { x: 42,  y: 338, rx: 9,  ry: 6,  r: 15,  fill: "#9E7452", o: 0.75 },
    { x: 88,  y: 352, rx: 6,  ry: 4,  r: -20, fill: "#B8926A", o: 0.70 },
    { x: 160, y: 344, rx: 11, ry: 7,  r: 8,   fill: "#7A5535", o: 0.80 },
    { x: 220, y: 355, rx: 7,  ry: 5,  r: -12, fill: "#C17A5A", o: 0.65 },
    { x: 285, y: 340, rx: 9,  ry: 6,  r: 25,  fill: "#8B6245", o: 0.72 },
    { x: 350, y: 350, rx: 6,  ry: 4,  r: -8,  fill: "#A07050", o: 0.68 },
    { x: 120, y: 360, rx: 5,  ry: 3,  r: 35,  fill: "#6B4A28", o: 0.60 },
    { x: 310, y: 358, rx: 8,  ry: 5,  r: -18, fill: "#9A7252", o: 0.70 },
  ],
  [
    { x: 30,  y: 350, rx: 8,  ry: 5,  r: 20,  fill: "#A07858", o: 0.72 },
    { x: 75,  y: 362, rx: 5,  ry: 3,  r: -15, fill: "#C09070", o: 0.65 },
    { x: 140, y: 355, rx: 10, ry: 6,  r: 10,  fill: "#7E5838", o: 0.78 },
    { x: 200, y: 368, rx: 6,  ry: 4,  r: -25, fill: "#B87A58", o: 0.68 },
    { x: 265, y: 352, rx: 8,  ry: 5,  r: 30,  fill: "#8A6040", o: 0.74 },
    { x: 340, y: 362, rx: 7,  ry: 4,  r: -10, fill: "#9E7250", o: 0.66 },
    { x: 108, y: 374, rx: 5,  ry: 3,  r: 40,  fill: "#6A4825", o: 0.58 },
    { x: 295, y: 370, rx: 9,  ry: 6,  r: -22, fill: "#987050", o: 0.72 },
  ],
  [
    { x: 55,  y: 330, rx: 9,  ry: 6,  r: 12,  fill: "#9C7250", o: 0.75 },
    { x: 105, y: 344, rx: 6,  ry: 4,  r: -18, fill: "#B88E68", o: 0.68 },
    { x: 175, y: 336, rx: 12, ry: 7,  r: 5,   fill: "#7C5432", o: 0.82 },
    { x: 235, y: 348, rx: 7,  ry: 5,  r: -14, fill: "#C07858", o: 0.63 },
    { x: 300, y: 332, rx: 9,  ry: 6,  r: 22,  fill: "#8A6042", o: 0.74 },
    { x: 370, y: 342, rx: 6,  ry: 4,  r: -6,  fill: "#9E6E4E", o: 0.70 },
    { x: 135, y: 352, rx: 5,  ry: 3,  r: 38,  fill: "#6C4A26", o: 0.62 },
    { x: 322, y: 350, rx: 8,  ry: 5,  r: -20, fill: "#9A704E", o: 0.68 },
  ],
];

const smallStones = [
  [
    { x: 55,  y: 372, rx: 4, ry: 2.5, c: "#7A5535" },
    { x: 110, y: 368, rx: 3, ry: 2,   c: "#9E7452" },
    { x: 185, y: 375, rx: 5, ry: 3,   c: "#5C3D1E" },
    { x: 250, y: 370, rx: 3, ry: 2,   c: "#8B6245" },
    { x: 330, y: 373, rx: 4, ry: 2.5, c: "#7A5535" },
    { x: 375, y: 368, rx: 3, ry: 2,   c: "#6B4A28" },
  ],
  [
    { x: 45,  y: 382, rx: 4, ry: 2.5, c: "#7E5838" },
    { x: 95,  y: 378, rx: 3, ry: 2,   c: "#A07858" },
    { x: 172, y: 385, rx: 5, ry: 3,   c: "#5E3F20" },
    { x: 238, y: 380, rx: 3, ry: 2,   c: "#8A6040" },
    { x: 315, y: 383, rx: 4, ry: 2.5, c: "#7E5838" },
    { x: 368, y: 378, rx: 3, ry: 2,   c: "#6A4825" },
  ],
  [
    { x: 62,  y: 365, rx: 4, ry: 2.5, c: "#7C5432" },
    { x: 118, y: 360, rx: 3, ry: 2,   c: "#9C7250" },
    { x: 196, y: 368, rx: 5, ry: 3,   c: "#5A3C1C" },
    { x: 258, y: 362, rx: 3, ry: 2,   c: "#8A6042" },
    { x: 338, y: 366, rx: 4, ry: 2.5, c: "#7C5432" },
    { x: 385, y: 360, rx: 3, ry: 2,   c: "#6C4A26" },
  ],
];
