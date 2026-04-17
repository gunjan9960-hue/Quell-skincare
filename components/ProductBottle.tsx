import React from "react";

export type BottleSize = "250ml" | "1L" | "3L" | "4x3L";
type BottleSide = "front" | "back";
type SubProps = { className?: string; style?: React.CSSProperties };

type Props = {
  size: BottleSize;
  side?: BottleSide;
  className?: string;
  style?: React.CSSProperties;
};

export default function ProductBottle({ size, side = "front", className = "", style }: Props) {
  if (size === "4x3L")  return <Pack4x3LFront className={className} style={style} />;
  if (size === "250ml") return side === "front"
    ? <TrialFront className={className} style={style} />
    : <TrialBack  className={className} style={style} />;
  if (size === "1L")    return side === "front"
    ? <Bottle1LFront className={className} style={style} />
    : <Bottle1LBack  className={className} style={style} />;
  return side === "front"
    ? <Pack3LFront className={className} style={style} />
    : <Pack3LBack  className={className} style={style} />;
}

// ─── Shared colour tokens ────────────────────────────────────────
const C = {
  terracotta: "#C17A5A",
  terracottaDark: "#A0603E",
  charcoal: "#1A1815",
  charcoalMid: "#2A2620",
  cream: "#FAF7F2",
  creamDark: "#EDE5DA",
  white: "#FFFFFF",
  pump: "#1A1815",
};

// ════════════════════════════════════════════════════════════════
// 250ml — CUTE LITTLE BOTTLE  (viewBox 160 × 300)
// Chubby round shoulders, short squat pump, terracotta top
// ════════════════════════════════════════════════════════════════
function TrialFront({ className, style }: SubProps) {
  return (
    <svg viewBox="0 0 160 300" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} style={style}>
      <defs>
        {/* Cylindrical body */}
        <linearGradient id="tr_body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#BEB6AA" />
          <stop offset="9%"   stopColor="#E8E0D4" />
          <stop offset="22%"  stopColor="#FFFEF9" />
          <stop offset="38%"  stopColor="#FFFFFF" />
          <stop offset="60%"  stopColor="#EEE6DC" />
          <stop offset="84%"  stopColor="#D4CCC0" />
          <stop offset="100%" stopColor="#C8C0B4" />
        </linearGradient>
        <linearGradient id="tr_cap" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#C17A5A" />
          <stop offset="40%"  stopColor="#D4896A" />
          <stop offset="100%" stopColor="#A8613C" />
        </linearGradient>
        <linearGradient id="tr_capTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#E0906E" />
          <stop offset="100%" stopColor="#B06848" />
        </linearGradient>
        <linearGradient id="tr_pump" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#3A3630" />
          <stop offset="50%"  stopColor="#1A1815" />
          <stop offset="100%" stopColor="#2E2A24" />
        </linearGradient>
        <linearGradient id="tr_label" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#F5EFE8" />
          <stop offset="10%"  stopColor="#FFFEF9" />
          <stop offset="50%"  stopColor="#FFFFFF" />
          <stop offset="90%"  stopColor="#FFFEF9" />
          <stop offset="100%" stopColor="#EEE8E0" />
        </linearGradient>
        <radialGradient id="tr_shadow" cx="50%" cy="30%" r="50%">
          <stop offset="0%"   stopColor="rgba(0,0,0,0.25)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <radialGradient id="tr_glow" cx="30%" cy="25%" r="45%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.80)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <filter id="tr_blur"><feGaussianBlur stdDeviation="1.2"/></filter>
      </defs>

      {/* ── Ground shadow ── */}
      <ellipse cx="80" cy="293" rx="44" ry="6" fill="rgba(0,0,0,0.12)" />

      {/* ── Nozzle head (horizontal spout) ── */}
      <rect x="68" y="8" width="7" height="26" rx="3.5" fill="url(#tr_pump)" />
      <rect x="69.5" y="9" width="2" height="24" rx="1" fill="rgba(255,255,255,0.20)" />
      {/* Horizontal spout tip */}
      <rect x="56" y="6" width="32" height="8" rx="4" fill="url(#tr_pump)" />
      <rect x="57" y="7" width="12" height="3" rx="1.5" fill="rgba(255,255,255,0.15)" />
      {/* Nozzle tip cap */}
      <circle cx="57" cy="10" r="4" fill={C.terracotta} />
      <circle cx="57" cy="10" r="2" fill={C.terracottaDark} />

      {/* ── Pump actuator (terracotta, cute round top) ── */}
      <rect x="50" y="32" width="60" height="20" rx="10" fill="url(#tr_cap)" />
      <rect x="50" y="32" width="60" height="10" rx="10" fill="url(#tr_capTop)" />
      <rect x="54" y="33" width="22" height="9" rx="5" fill="rgba(255,255,255,0.18)" />
      {/* tiny QUELL on actuator */}
      <text x="80" y="46" textAnchor="middle" fontSize="6" fontFamily="Georgia,serif"
        fill="#FAF7F2" fontWeight="700" letterSpacing="2">QUELL</text>

      {/* ── Pump collar ── */}
      <rect x="60" y="51" width="40" height="12" rx="4" fill={C.charcoalMid} />
      <rect x="62" y="52" width="6" height="10" rx="3" fill="rgba(255,255,255,0.10)" />

      {/* ── Neck (short & wide for cute bottle) ── */}
      <rect x="56" y="61" width="48" height="18" rx="5"
        fill="url(#tr_body)" />
      <rect x="60" y="62" width="5" height="16" rx="2.5" fill="rgba(255,255,255,0.28)" />

      {/* ── Chubby shoulder ── */}
      <path d="M28 79 C28 74 55 72 80 72 C105 72 132 74 132 79 L134 92 L26 92 Z"
        fill="url(#tr_body)" />

      {/* ── Main body (wide & round) ── */}
      <rect x="22" y="88" width="116" height="188" rx="22" fill="url(#tr_body)" />

      {/* Highlight strips */}
      <rect x="28" y="96" width="16" height="172" rx="8" fill="rgba(255,255,255,0.32)"
        filter="url(#tr_blur)" />
      <rect x="120" y="96" width="12" height="172" rx="6" fill="rgba(0,0,0,0.09)" />
      <rect x="130" y="110" width="5" height="148" rx="2.5" fill="rgba(255,255,255,0.08)" />

      {/* Specular */}
      <ellipse cx="44" cy="118" rx="16" ry="26" fill="url(#tr_glow)" />

      {/* ── Label area ── */}
      <rect x="29" y="98" width="102" height="170" rx="14" fill="url(#tr_label)" />

      {/* Terracotta top band */}
      <rect x="29" y="98" width="102" height="44" rx="14" fill={C.terracotta} />
      <rect x="29" y="120" width="102" height="22" fill={C.terracotta} />
      <rect x="31" y="99" width="38" height="4" rx="2" fill="rgba(255,255,255,0.18)" />

      {/* QUELL */}
      <text x="80" y="118" textAnchor="middle" fontSize="17" fontFamily="Georgia,serif"
        fontWeight="700" fill="#FAF7F2" letterSpacing="5">QUELL</text>
      {/* SKINCARE */}
      <text x="80" y="131" textAnchor="middle" fontSize="6" fontFamily="Arial,sans-serif"
        fill="rgba(250,245,240,0.80)" letterSpacing="3" fontWeight="600">SKINCARE</text>

      {/* Thin divider */}
      <rect x="29" y="142" width="102" height="1.5" fill={C.charcoal} opacity="0.18" />

      {/* Product title */}
      <text x="80" y="158" textAnchor="middle" fontSize="7" fontFamily="Georgia,serif"
        fill="#1A1A1A" fontWeight="700" letterSpacing="0.5">DRY SKIN REGIME</text>

      {/* 7 DAY TRIAL pill */}
      <rect x="36" y="163" width="88" height="18" rx="9" fill={C.terracotta} />
      <rect x="37" y="164" width="38" height="8" rx="4" fill="rgba(255,255,255,0.15)" />
      <text x="80" y="176" textAnchor="middle" fontSize="8" fontFamily="Arial,sans-serif"
        fill="#FFFFFF" fontWeight="800" letterSpacing="1.5">7 DAY TRIAL</text>

      {/* Cute descriptors */}
      <text x="80" y="196" textAnchor="middle" fontSize="6.5" fontFamily="Arial,sans-serif"
        fill="#777">Ceramide · EDTA · Niacinamide</text>

      {/* Volume badge */}
      <rect x="52" y="205" width="56" height="24" rx="12" fill="#F0EBE3"
        stroke={C.terracotta} strokeWidth="1" />
      <text x="80" y="222" textAnchor="middle" fontSize="13" fontFamily="Georgia,serif"
        fill={C.terracotta} fontWeight="600" letterSpacing="-0.5">250ml</text>

      {/* Footer */}
      <text x="80" y="248" textAnchor="middle" fontSize="5.5" fontFamily="Arial,sans-serif"
        fill="#BBB4AC">Dermatologist Tested · Made in India</text>

      {/* Bottom dome */}
      <ellipse cx="80" cy="276" rx="58" ry="10" fill="url(#tr_body)" />
      <ellipse cx="60" cy="274" rx="18" ry="4" fill="rgba(255,255,255,0.16)" />
    </svg>
  );
}

function TrialBack({ className, style }: SubProps) {
  return (
    <svg viewBox="0 0 160 300" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} style={style}>
      <defs>
        <linearGradient id="trb_body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#C8C0B4" />
          <stop offset="16%"  stopColor="#D4CCC0" />
          <stop offset="30%"  stopColor="#C0B8AA" />
          <stop offset="55%"  stopColor="#EEE6DC" />
          <stop offset="78%"  stopColor="#FFFEF9" />
          <stop offset="100%" stopColor="#BEB6AA" />
        </linearGradient>
      </defs>
      <ellipse cx="80" cy="293" rx="44" ry="6" fill="rgba(0,0,0,0.10)" />
      {/* pump back */}
      <rect x="68" y="8" width="7" height="26" rx="3.5" fill={C.charcoal} />
      <rect x="56" y="6" width="32" height="8" rx="4" fill={C.charcoal} />
      <circle cx="57" cy="10" r="4" fill={C.terracottaDark} />
      <rect x="50" y="32" width="60" height="20" rx="10" fill={C.terracotta} />
      <text x="80" y="46" textAnchor="middle" fontSize="6" fontFamily="Georgia,serif"
        fill="#FAF7F2" fontWeight="700" letterSpacing="2">QUELL</text>
      <rect x="60" y="51" width="40" height="12" rx="4" fill={C.charcoalMid} />
      <rect x="56" y="61" width="48" height="18" rx="5" fill="url(#trb_body)" />
      {/* shoulder + body */}
      <path d="M28 79 C28 74 55 72 80 72 C105 72 132 74 132 79 L134 92 L26 92 Z"
        fill="url(#trb_body)" />
      <rect x="22" y="88" width="116" height="188" rx="22" fill="url(#trb_body)" />
      <rect x="112" y="96" width="14" height="172" rx="7" fill="rgba(255,255,255,0.25)" />
      {/* label */}
      <rect x="29" y="98" width="102" height="170" rx="14" fill="#FEFCF9" />
      <rect x="29" y="98" width="102" height="44" rx="14" fill={C.terracotta} />
      <rect x="29" y="120" width="102" height="22" fill={C.terracotta} />
      <text x="80" y="118" textAnchor="middle" fontSize="17" fontFamily="Georgia,serif"
        fontWeight="700" fill="#FAF7F2" letterSpacing="5">QUELL</text>
      <text x="80" y="131" textAnchor="middle" fontSize="6" fontFamily="Arial,sans-serif"
        fill="rgba(250,245,240,0.80)" letterSpacing="3">SKINCARE</text>
      <rect x="29" y="142" width="102" height="1.5" fill={C.charcoal} opacity="0.15" />
      {/* HOW TO USE */}
      <text x="80" y="157" textAnchor="middle" fontSize="7" fontFamily="Arial,sans-serif"
        fill={C.terracotta} fontWeight="700" letterSpacing="2">HOW TO USE</text>
      {[
        "Apply to damp skin within 60 sec of",
        "showering. 1–2 pumps, face & body.",
        "Do not rinse. Use daily.",
      ].map((l, i) => (
        <text key={i} x="80" y={170 + i * 12} textAnchor="middle"
          fontSize="6" fontFamily="Arial,sans-serif" fill="#666">{l}</text>
      ))}
      <text x="80" y="215" textAnchor="middle" fontSize="7" fontFamily="Arial,sans-serif"
        fill={C.terracotta} fontWeight="700" letterSpacing="1.5">INGREDIENTS</text>
      {["Ceramide NP, AP, EOP · EDTA", "Niacinamide 4% · Hyaluronic Acid",
        "Glycerin · Panthenol (Vit B5)"].map((l, i) => (
        <text key={i} x="80" y={228 + i * 11} textAnchor="middle"
          fontSize="5.8" fontFamily="Arial,sans-serif" fill="#777">{l}</text>
      ))}
      <line x1="36" y1="258" x2="124" y2="258" stroke="#E8E0D5" strokeWidth="0.8" />
      {Array.from({ length: 22 }).map((_, i) => (
        <rect key={i} x={44 + i * 3} y="264" width={i % 3 === 0 ? 2 : 1.2} height="12"
          fill="#1A1A1A" opacity="0.55" />
      ))}
      <text x="80" y="283" textAnchor="middle" fontSize="5" fontFamily="monospace" fill="#AAA">
        8906123456797
      </text>
      <ellipse cx="80" cy="276" rx="58" ry="10" fill="url(#trb_body)" />
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════
// 1L — REAL PUMP BOTTLE  (viewBox 200 × 440)
// Tall, elegant, slim-neck pump bottle
// ════════════════════════════════════════════════════════════════
function Bottle1LFront({ className, style }: SubProps) {
  return (
    <svg viewBox="0 0 200 440" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} style={style}>
      <defs>
        <linearGradient id="b1_body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#C0B8AC" />
          <stop offset="8%"   stopColor="#DED6CA" />
          <stop offset="20%"  stopColor="#FFFEF9" />
          <stop offset="32%"  stopColor="#FFFFFF" />
          <stop offset="58%"  stopColor="#EDE5DB" />
          <stop offset="80%"  stopColor="#CEC6BA" />
          <stop offset="91%"  stopColor="#E0D8CE" />
          <stop offset="100%" stopColor="#D0C8BC" />
        </linearGradient>
        <linearGradient id="b1_neck" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#B8B0A4" />
          <stop offset="28%"  stopColor="#F8F4EE" />
          <stop offset="68%"  stopColor="#DEDAD2" />
          <stop offset="100%" stopColor="#C8C0B4" />
        </linearGradient>
        <linearGradient id="b1_cap" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#2E2A24" />
          <stop offset="38%"  stopColor="#1A1815" />
          <stop offset="72%"  stopColor="#141210" />
          <stop offset="100%" stopColor="#242018" />
        </linearGradient>
        <linearGradient id="b1_capTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#3C3830" />
          <stop offset="100%" stopColor="#1A1815" />
        </linearGradient>
        <linearGradient id="b1_pump" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#2A2620" />
          <stop offset="50%"  stopColor="#1A1815" />
          <stop offset="100%" stopColor="#222018" />
        </linearGradient>
        <linearGradient id="b1_label" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#F2ECE4" />
          <stop offset="8%"   stopColor="#FFFDF9" />
          <stop offset="50%"  stopColor="#FFFFFF" />
          <stop offset="92%"  stopColor="#FFFDF9" />
          <stop offset="100%" stopColor="#EDE8E0" />
        </linearGradient>
        <radialGradient id="b1_spec" cx="28%" cy="18%" r="42%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.78)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <filter id="b1_blur"><feGaussianBlur stdDeviation="1.5"/></filter>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="100" cy="431" rx="52" ry="7" fill="rgba(0,0,0,0.14)" />

      {/* ── Nozzle stem ── */}
      <rect x="96" y="10" width="8" height="46" rx="4" fill="url(#b1_pump)" />
      <rect x="97.5" y="11" width="2.5" height="44" rx="1.2" fill="rgba(255,255,255,0.20)" />
      {/* Nozzle spout */}
      <rect x="76" y="8" width="40" height="10" rx="5" fill="url(#b1_pump)" />
      <rect x="77" y="9" width="16" height="4" rx="2" fill="rgba(255,255,255,0.16)" />
      {/* Spout tip */}
      <rect x="74" y="13" width="8" height="5" rx="2.5" fill={C.charcoalMid} />

      {/* ── Actuator ── */}
      <rect x="68" y="54" width="64" height="24" rx="9" fill="url(#b1_cap)" />
      <rect x="68" y="54" width="64" height="11" rx="9" fill="url(#b1_capTop)" />
      {/* Terracotta ring */}
      <rect x="72" y="72" width="56" height="4" rx="2" fill={C.terracotta} />
      <rect x="72" y="72" width="22" height="2" rx="1" fill="rgba(255,200,150,0.35)" />
      <rect x="72" y="55" width="22" height="16" rx="6" fill="rgba(255,255,255,0.06)" />
      <text x="100" y="65" textAnchor="middle" fontSize="7" fontFamily="Georgia,serif"
        fill="#FAF7F2" fontWeight="700" letterSpacing="2.5">QUELL</text>

      {/* ── Collar ── */}
      <rect x="78" y="76" width="44" height="16" rx="4.5" fill="url(#b1_pump)" />
      <rect x="80" y="77" width="9" height="14" rx="3.5" fill="rgba(255,255,255,0.11)" />

      {/* ── Neck ── */}
      <rect x="80" y="90" width="40" height="30" rx="4" fill="url(#b1_neck)" />
      <rect x="84" y="91" width="6" height="28" rx="3" fill="rgba(255,255,255,0.34)" />
      <rect x="112" y="91" width="5" height="28" rx="2.5" fill="rgba(0,0,0,0.07)" />

      {/* ── Shoulder ── */}
      <path d="M44 120 C44 116 76 113 100 113 C124 113 156 116 156 120 L158 134 L42 134 Z"
        fill="url(#b1_body)" />

      {/* ── Body ── */}
      <rect x="38" y="130" width="124" height="278" rx="16" fill="url(#b1_body)" />

      {/* Highlight strips */}
      <rect x="44" y="138" width="18" height="262" rx="9" fill="rgba(255,255,255,0.30)"
        filter="url(#b1_blur)" />
      <rect x="148" y="138" width="12" height="262" rx="6" fill="rgba(0,0,0,0.09)" />
      <rect x="158" y="152" width="4" height="238" rx="2" fill="rgba(255,255,255,0.07)" />
      <ellipse cx="62" cy="162" rx="20" ry="32" fill="url(#b1_spec)" />

      {/* ── Label ── */}
      <rect x="46" y="142" width="108" height="256" rx="9" fill="url(#b1_label)" />

      {/* Charcoal top band */}
      <rect x="46" y="142" width="108" height="54" rx="9" fill={C.charcoal} />
      <rect x="46" y="168" width="108" height="28" fill={C.charcoal} />
      <rect x="48" y="143" width="44" height="4" rx="2" fill="rgba(255,255,255,0.06)" />

      {/* QUELL */}
      <text x="100" y="164" textAnchor="middle" fontSize="20" fontFamily="Georgia,serif"
        fontWeight="700" fill="#FAF7F2" letterSpacing="6">QUELL</text>
      {/* SKINCARE */}
      <text x="100" y="182" textAnchor="middle" fontSize="7" fontFamily="Arial,sans-serif"
        fill={C.terracotta} letterSpacing="3.5" fontWeight="600">SKINCARE</text>

      {/* Terracotta stripe */}
      <rect x="46" y="196" width="108" height="4" fill={C.terracotta} />
      <rect x="46" y="196" width="44" height="2" fill="rgba(255,200,150,0.35)" />

      {/* Product name */}
      <text x="100" y="218" textAnchor="middle" fontSize="8.5" fontFamily="Georgia,serif"
        fill="#1A1A1A" fontWeight="700" letterSpacing="0.5">DRY SKIN REGIME</text>

      {/* Pack pill */}
      <rect x="62" y="225" width="76" height="19" rx="9.5" fill="#F0EBE3"
        stroke="#E0D5C8" strokeWidth="0.8" />
      <text x="100" y="238" textAnchor="middle" fontSize="8" fontFamily="Arial,sans-serif"
        fill={C.terracotta} fontWeight="700" letterSpacing="1">1 MONTH REGIME</text>

      {/* Descriptors */}
      <text x="100" y="260" textAnchor="middle" fontSize="6.5" fontFamily="Arial,sans-serif"
        fill="#666">Barrier-First · Ceramide-Rich</text>
      <text x="100" y="272" textAnchor="middle" fontSize="6.5" fontFamily="Arial,sans-serif"
        fill="#666">Hard-Water Defense Formula</text>

      {/* Ingredient badges */}
      <rect x="48" y="282" width="44" height="30" rx="5" fill="#F0EBE3" stroke="#E0D5C8" strokeWidth="0.6" />
      <text x="70" y="294" textAnchor="middle" fontSize="5.8" fontFamily="Arial,sans-serif"
        fill={C.terracotta} fontWeight="700">CERAMIDE</text>
      <text x="70" y="304" textAnchor="middle" fontSize="5.2" fontFamily="Arial,sans-serif" fill="#888">NP · AP · EOP</text>

      <rect x="98" y="282" width="44" height="30" rx="5" fill="#F0EBE3" stroke="#E0D5C8" strokeWidth="0.6" />
      <text x="120" y="294" textAnchor="middle" fontSize="5.8" fontFamily="Arial,sans-serif"
        fill={C.terracotta} fontWeight="700">EDTA</text>
      <text x="120" y="304" textAnchor="middle" fontSize="5.2" fontFamily="Arial,sans-serif" fill="#888">Chelating</text>

      {/* Divider */}
      <line x1="58" y1="322" x2="142" y2="322" stroke="#E8E0D5" strokeWidth="0.8" />

      {/* Volume */}
      <text x="100" y="344" textAnchor="middle" fontSize="30" fontFamily="Georgia,serif"
        fill="#1A1A1A" fontWeight="300" letterSpacing="-1">1L</text>
      <text x="100" y="356" textAnchor="middle" fontSize="5.5" fontFamily="Arial,sans-serif"
        fill="#AAA" letterSpacing="2">NET VOLUME</text>

      {/* Footer */}
      <text x="100" y="376" textAnchor="middle" fontSize="5.5" fontFamily="Arial,sans-serif"
        fill="#C0B8B0">Dermatologist Tested · Made in India</text>

      {/* Bottom */}
      <ellipse cx="100" cy="408" rx="62" ry="10" fill="url(#b1_body)" />
      <ellipse cx="80" cy="406" rx="22" ry="4.5" fill="rgba(255,255,255,0.16)" />
    </svg>
  );
}

function Bottle1LBack({ className, style }: SubProps) {
  return (
    <svg viewBox="0 0 200 440" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} style={style}>
      <defs>
        <linearGradient id="b1r_body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#D0C8BC" />
          <stop offset="12%"  stopColor="#E0D8CE" />
          <stop offset="22%"  stopColor="#CEC6BA" />
          <stop offset="50%"  stopColor="#EDE5DB" />
          <stop offset="74%"  stopColor="#FFFEF9" />
          <stop offset="88%"  stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#C0B8AC" />
        </linearGradient>
        <filter id="b1r_blur"><feGaussianBlur stdDeviation="1.5"/></filter>
      </defs>

      <ellipse cx="100" cy="431" rx="52" ry="7" fill="rgba(0,0,0,0.12)" />
      {/* pump back */}
      <rect x="96" y="10" width="8" height="46" rx="4" fill={C.charcoal} />
      <rect x="76" y="8" width="40" height="10" rx="5" fill={C.charcoal} />
      <rect x="74" y="13" width="8" height="5" rx="2.5" fill={C.charcoalMid} />
      <rect x="68" y="54" width="64" height="24" rx="9" fill={C.charcoal} />
      <rect x="72" y="72" width="56" height="4" rx="2" fill={C.terracotta} />
      <text x="100" y="65" textAnchor="middle" fontSize="7" fontFamily="Georgia,serif"
        fill="#FAF7F2" fontWeight="700" letterSpacing="2.5">QUELL</text>
      <rect x="78" y="76" width="44" height="16" rx="4.5" fill={C.charcoalMid} />
      <rect x="80" y="90" width="40" height="30" rx="4" fill="url(#b1r_body)" />
      <path d="M44 120 C44 116 76 113 100 113 C124 113 156 116 156 120 L158 134 L42 134 Z"
        fill="url(#b1r_body)" />
      <rect x="38" y="130" width="124" height="278" rx="16" fill="url(#b1r_body)" />
      <rect x="150" y="138" width="14" height="262" rx="7" fill="rgba(255,255,255,0.28)" filter="url(#b1r_blur)" />
      {/* label */}
      <rect x="46" y="142" width="108" height="256" rx="9" fill="#FEFCF9" />
      <rect x="46" y="142" width="108" height="54" rx="9" fill={C.charcoal} />
      <rect x="46" y="168" width="108" height="28" fill={C.charcoal} />
      <text x="100" y="164" textAnchor="middle" fontSize="20" fontFamily="Georgia,serif"
        fontWeight="700" fill="#FAF7F2" letterSpacing="6">QUELL</text>
      <text x="100" y="182" textAnchor="middle" fontSize="7" fontFamily="Arial,sans-serif"
        fill={C.terracotta} letterSpacing="3.5" fontWeight="600">SKINCARE</text>
      <rect x="46" y="196" width="108" height="4" fill={C.terracotta} />

      {/* HOW TO USE */}
      <text x="100" y="218" textAnchor="middle" fontSize="7.5" fontFamily="Arial,sans-serif"
        fill={C.terracotta} fontWeight="700" letterSpacing="2">HOW TO USE</text>
      {[
        "Apply to damp skin within 60 seconds",
        "of showering. 2–3 pumps, face & body.",
        "Work in with gentle circular motions.",
        "Do not rinse. Use daily.",
      ].map((l, i) => (
        <text key={i} x="100" y={232 + i * 13} textAnchor="middle"
          fontSize="6.2" fontFamily="Arial,sans-serif" fill="#666">{l}</text>
      ))}

      <text x="100" y="294" textAnchor="middle" fontSize="7" fontFamily="Arial,sans-serif"
        fill={C.terracotta} fontWeight="700" letterSpacing="1.5">KEY INGREDIENTS</text>
      {[
        ["Ceramide NP, AP, EOP", "Rebuilds lipid barrier"],
        ["Disodium EDTA", "Chelates hard-water minerals"],
        ["Niacinamide 4%", "Brightens & soothes"],
        ["Hyaluronic Acid", "Deep hydration"],
        ["Panthenol (Vit B5)", "Barrier repair booster"],
      ].map(([n, d], i) => (
        <g key={n}>
          <circle cx="56" cy={308 + i * 16} r="2" fill={C.terracotta} />
          <text x="62" y={311 + i * 16} fontSize="6" fontFamily="Arial,sans-serif"
            fill="#1A1A1A" fontWeight="600">{n}</text>
          <text x="62" y={320 + i * 16} fontSize="5.5" fontFamily="Arial,sans-serif" fill="#888">{d}</text>
        </g>
      ))}

      <line x1="56" y1="390" x2="144" y2="390" stroke="#E8E0D5" strokeWidth="0.7" />
      {Array.from({ length: 28 }).map((_, i) => (
        <rect key={i} x={60 + i * 2.8} y="396" width={i % 3 === 0 ? 2.2 : 1.2} height="16"
          fill="#1A1A1A" opacity="0.55" />
      ))}
      <text x="100" y="420" textAnchor="middle" fontSize="5" fontFamily="monospace" fill="#AAA">
        8906123456780
      </text>
      <ellipse cx="100" cy="408" rx="62" ry="10" fill="url(#b1r_body)" />
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════
// 3L PACK — wide dispensing pack with pump  (viewBox 240 × 400)
// ════════════════════════════════════════════════════════════════
function Pack3LFront({ className, style }: SubProps) {
  return (
    <svg viewBox="0 0 240 400" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} style={style}>
      <defs>
        {/* Wide pack body — warm cream */}
        <linearGradient id="p3_body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#B8B0A4" />
          <stop offset="7%"   stopColor="#D8D0C4" />
          <stop offset="18%"  stopColor="#FFFEF9" />
          <stop offset="34%"  stopColor="#FFFFFF" />
          <stop offset="60%"  stopColor="#EDE5DA" />
          <stop offset="82%"  stopColor="#CCCAB8" />
          <stop offset="93%"  stopColor="#DED8CC" />
          <stop offset="100%" stopColor="#C8C0B4" />
        </linearGradient>
        <linearGradient id="p3_top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#E8E0D4" />
          <stop offset="100%" stopColor="#D0C8BC" />
        </linearGradient>
        <linearGradient id="p3_pump" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#2A2620" />
          <stop offset="45%"  stopColor="#1A1815" />
          <stop offset="100%" stopColor="#222018" />
        </linearGradient>
        <linearGradient id="p3_label" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#F0EAE2" />
          <stop offset="10%"  stopColor="#FFFDF9" />
          <stop offset="50%"  stopColor="#FFFFFF" />
          <stop offset="90%"  stopColor="#FFFDF9" />
          <stop offset="100%" stopColor="#EAE4DC" />
        </linearGradient>
        <radialGradient id="p3_spec" cx="25%" cy="18%" r="40%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.72)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <filter id="p3_blur"><feGaussianBlur stdDeviation="1.8"/></filter>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="120" cy="393" rx="82" ry="7" fill="rgba(0,0,0,0.14)" />

      {/* ── Large pump nozzle centred on wide pack ── */}
      {/* Stem */}
      <rect x="116" y="8" width="10" height="52" rx="5" fill="url(#p3_pump)" />
      <rect x="117.5" y="9" width="3" height="50" rx="1.5" fill="rgba(255,255,255,0.18)" />
      {/* Spout */}
      <rect x="86" y="6" width="56" height="14" rx="7" fill="url(#p3_pump)" />
      <rect x="88" y="7" width="22" height="5" rx="2.5" fill="rgba(255,255,255,0.15)" />
      <rect x="84" y="15" width="10" height="7" rx="3.5" fill={C.charcoalMid} />

      {/* ── Pump head / actuator ── */}
      <rect x="82" y="58" width="78" height="28" rx="12" fill={C.charcoal} />
      <rect x="82" y="58" width="78" height="14" rx="12" fill={C.charcoalMid} />
      {/* Terracotta ring */}
      <rect x="87" y="80" width="68" height="5" rx="2.5" fill={C.terracotta} />
      <rect x="87" y="80" width="28" height="2.5" fill="rgba(255,200,150,0.35)" />
      <text x="121" y="72" textAnchor="middle" fontSize="9" fontFamily="Georgia,serif"
        fill="#FAF7F2" fontWeight="700" letterSpacing="3">QUELL</text>

      {/* ── Collar / base of pump ── */}
      <rect x="94" y="85" width="54" height="18" rx="5" fill={C.charcoalMid} />
      <rect x="97" y="86" width="11" height="16" rx="4" fill="rgba(255,255,255,0.10)" />

      {/* ── Neck (wide pack has a wider neck) ── */}
      <rect x="90" y="101" width="62" height="22" rx="5" fill="url(#p3_top)" />
      <rect x="95" y="102" width="8" height="20" rx="4" fill="rgba(255,255,255,0.28)" />

      {/* ── Shoulder taper ── */}
      <path d="M20 123 C20 118 78 115 121 115 C164 115 220 118 220 123 L222 138 L18 138 Z"
        fill="url(#p3_body)" />

      {/* ── Wide pack body ── */}
      <rect x="14" y="134" width="212" height="244" rx="16" fill="url(#p3_body)" />

      {/* Highlight / shadow strips */}
      <rect x="20" y="142" width="22" height="228" rx="11" fill="rgba(255,255,255,0.32)"
        filter="url(#p3_blur)" />
      <rect x="210" y="142" width="14" height="228" rx="7" fill="rgba(0,0,0,0.10)" />
      <rect x="222" y="156" width="5" height="204" rx="2.5" fill="rgba(255,255,255,0.07)" />
      <ellipse cx="40" cy="170" rx="22" ry="38" fill="url(#p3_spec)" />

      {/* ── Label ── */}
      <rect x="22" y="146" width="196" height="224" rx="10" fill="url(#p3_label)" />

      {/* Charcoal band */}
      <rect x="22" y="146" width="196" height="60" rx="10" fill={C.charcoal} />
      <rect x="22" y="176" width="196" height="30" fill={C.charcoal} />
      <rect x="24" y="147" width="60" height="5" rx="2.5" fill="rgba(255,255,255,0.06)" />

      {/* QUELL large */}
      <text x="120" y="172" textAnchor="middle" fontSize="24" fontFamily="Georgia,serif"
        fontWeight="700" fill="#FAF7F2" letterSpacing="7">QUELL</text>
      {/* SKINCARE */}
      <text x="120" y="191" textAnchor="middle" fontSize="8" fontFamily="Arial,sans-serif"
        fill={C.terracotta} letterSpacing="4" fontWeight="600">SKINCARE</text>

      {/* Terracotta stripe */}
      <rect x="22" y="206" width="196" height="5" fill={C.terracotta} />
      <rect x="22" y="206" width="78" height="2.5" fill="rgba(255,200,150,0.30)" />

      {/* Product name */}
      <text x="120" y="228" textAnchor="middle" fontSize="10" fontFamily="Georgia,serif"
        fill="#1A1A1A" fontWeight="700" letterSpacing="0.8">DRY SKIN REGIME</text>

      {/* Pack pill */}
      <rect x="68" y="236" width="104" height="22" rx="11" fill="#F0EBE3"
        stroke="#E0D5C8" strokeWidth="0.8" />
      <text x="120" y="251" textAnchor="middle" fontSize="9.5" fontFamily="Arial,sans-serif"
        fill={C.terracotta} fontWeight="700" letterSpacing="1.2">3 MONTH REGIME</text>

      {/* Claims */}
      <text x="120" y="274" textAnchor="middle" fontSize="7.5" fontFamily="Arial,sans-serif"
        fill="#666">Barrier-First · Ceramide-Rich</text>
      <text x="120" y="286" textAnchor="middle" fontSize="7.5" fontFamily="Arial,sans-serif"
        fill="#666">Hard-Water Defense Formula</text>

      {/* Three ingredient badges in a row */}
      {[
        ["CERAMIDE", "NP · AP · EOP"],
        ["EDTA", "Chelating"],
        ["NIA", "cinamide 4%"],
      ].map(([title, sub], i) => (
        <g key={title}>
          <rect x={28 + i * 66} y="296" width="58" height="32" rx="6"
            fill="#F0EBE3" stroke="#E0D5C8" strokeWidth="0.6" />
          <text x={57 + i * 66} y="309" textAnchor="middle" fontSize="7"
            fontFamily="Arial,sans-serif" fill={C.terracotta} fontWeight="700">{title}</text>
          <text x={57 + i * 66} y="320" textAnchor="middle" fontSize="6"
            fontFamily="Arial,sans-serif" fill="#888">{sub}</text>
        </g>
      ))}

      {/* Divider + Volume */}
      <line x1="50" y1="338" x2="190" y2="338" stroke="#E8E0D5" strokeWidth="0.8" />
      <text x="120" y="360" textAnchor="middle" fontSize="34" fontFamily="Georgia,serif"
        fill="#1A1A1A" fontWeight="300" letterSpacing="-1.5">3L</text>
      <text x="120" y="372" textAnchor="middle" fontSize="6.5" fontFamily="Arial,sans-serif"
        fill="#AAA" letterSpacing="2">PACK · NET VOLUME</text>

      {/* Footer */}
      <text x="120" y="386" textAnchor="middle" fontSize="6" fontFamily="Arial,sans-serif"
        fill="#C0B8B0">Dermatologist Tested · Made in India</text>

      <ellipse cx="120" cy="378" rx="106" ry="12" fill="url(#p3_body)" />
      <ellipse cx="92" cy="375" rx="30" ry="5" fill="rgba(255,255,255,0.14)" />
    </svg>
  );
}

function Pack3LBack({ className, style }: SubProps) {
  return (
    <svg viewBox="0 0 240 400" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} style={style}>
      <defs>
        <linearGradient id="p3r_body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#C8C0B4" />
          <stop offset="14%"  stopColor="#DED8CC" />
          <stop offset="25%"  stopColor="#CCCAB8" />
          <stop offset="55%"  stopColor="#EDE5DA" />
          <stop offset="80%"  stopColor="#FFFEF9" />
          <stop offset="100%" stopColor="#B8B0A4" />
        </linearGradient>
        <filter id="p3r_blur"><feGaussianBlur stdDeviation="1.8"/></filter>
      </defs>
      <ellipse cx="120" cy="393" rx="82" ry="7" fill="rgba(0,0,0,0.12)" />
      <rect x="116" y="8" width="10" height="52" rx="5" fill={C.charcoal} />
      <rect x="86" y="6" width="56" height="14" rx="7" fill={C.charcoal} />
      <rect x="84" y="15" width="10" height="7" rx="3.5" fill={C.charcoalMid} />
      <rect x="82" y="58" width="78" height="28" rx="12" fill={C.charcoal} />
      <rect x="87" y="80" width="68" height="5" rx="2.5" fill={C.terracotta} />
      <text x="121" y="72" textAnchor="middle" fontSize="9" fontFamily="Georgia,serif"
        fill="#FAF7F2" fontWeight="700" letterSpacing="3">QUELL</text>
      <rect x="94" y="85" width="54" height="18" rx="5" fill={C.charcoalMid} />
      <rect x="90" y="101" width="62" height="22" rx="5" fill="url(#p3r_body)" />
      <path d="M20 123 C20 118 78 115 121 115 C164 115 220 118 220 123 L222 138 L18 138 Z"
        fill="url(#p3r_body)" />
      <rect x="14" y="134" width="212" height="244" rx="16" fill="url(#p3r_body)" />
      <rect x="206" y="142" width="16" height="228" rx="8" fill="rgba(255,255,255,0.26)" filter="url(#p3r_blur)" />
      {/* label */}
      <rect x="22" y="146" width="196" height="224" rx="10" fill="#FEFCF9" />
      <rect x="22" y="146" width="196" height="60" rx="10" fill={C.charcoal} />
      <rect x="22" y="176" width="196" height="30" fill={C.charcoal} />
      <text x="120" y="172" textAnchor="middle" fontSize="24" fontFamily="Georgia,serif"
        fontWeight="700" fill="#FAF7F2" letterSpacing="7">QUELL</text>
      <text x="120" y="191" textAnchor="middle" fontSize="8" fontFamily="Arial,sans-serif"
        fill={C.terracotta} letterSpacing="4" fontWeight="600">SKINCARE</text>
      <rect x="22" y="206" width="196" height="5" fill={C.terracotta} />

      <text x="120" y="226" textAnchor="middle" fontSize="8.5" fontFamily="Arial,sans-serif"
        fill={C.terracotta} fontWeight="700" letterSpacing="2.5">HOW TO USE</text>
      {[
        "Apply to damp skin within 60 seconds",
        "of showering. 2–3 pumps, face & body.",
        "Work in with gentle circular motions.",
        "Do not rinse. Use daily for best results.",
      ].map((l, i) => (
        <text key={i} x="120" y={240 + i * 14} textAnchor="middle"
          fontSize="6.8" fontFamily="Arial,sans-serif" fill="#666">{l}</text>
      ))}

      <text x="120" y="308" textAnchor="middle" fontSize="8" fontFamily="Arial,sans-serif"
        fill={C.terracotta} fontWeight="700" letterSpacing="2">KEY INGREDIENTS</text>
      {[
        ["Ceramide NP, AP, EOP", "Rebuilds lipid barrier"],
        ["Disodium EDTA", "Chelates hard-water minerals"],
        ["Niacinamide 4%", "Brightens & soothes"],
        ["Hyaluronic Acid", "Deep hydration"],
        ["Panthenol (Vit B5)", "Barrier repair"],
      ].map(([n, d], i) => (
        <g key={n}>
          <circle cx="38" cy={321 + i * 15} r="2.2" fill={C.terracotta} />
          <text x="45" y={324.5 + i * 15} fontSize="6.5" fontFamily="Arial,sans-serif"
            fill="#1A1A1A" fontWeight="600">{n}</text>
          <text x="45" y={333 + i * 15} fontSize="6" fontFamily="Arial,sans-serif" fill="#888">{d}</text>
        </g>
      ))}

      <line x1="30" y1="397" x2="210" y2="397" stroke="#E8E0D5" strokeWidth="0.7" />
      {Array.from({ length: 34 }).map((_, i) => (
        <rect key={i} x={34 + i * 3.2} y="378" width={i % 3 === 0 ? 2.4 : 1.4} height="17"
          fill="#1A1A1A" opacity="0.5" />
      ))}
      <ellipse cx="120" cy="378" rx="106" ry="12" fill="url(#p3r_body)" />
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════
// 4 × 3L PACK — four packs in a row with "×4" callout
// viewBox 900 × 460
// ════════════════════════════════════════════════════════════════
function Pack4x3LFront({ className, style }: SubProps) {
  // Each pack is scaled version of the 3L, placed side by side
  const packW = 180;  // scaled width per pack
  const packH = 340;
  const gap   = 12;
  const totalW = packW * 4 + gap * 3;
  const offsetX = (900 - totalW) / 2;
  const offsetY = 60;

  // One mini 3L pack rendered as SVG sub-elements at given x offset
  const MiniPack = ({ x }: { x: number }) => (
    <g transform={`translate(${x}, ${offsetY})`}>
      {/* ── Body ── */}
      <rect x="0" y="90" width={packW} height="240" rx="14"
        fill="url(#mp_body)" />

      {/* Highlight / shadow */}
      <rect x="6" y="98" width="18" height="224" rx="9"
        fill="rgba(255,255,255,0.28)" filter="url(#mp_blur)" />
      <rect x={packW - 18} y="98" width="12" height="224" rx="6"
        fill="rgba(0,0,0,0.09)" />

      {/* Shoulder */}
      <path d={`M0 90 C0 82 40 78 ${packW/2} 78 C${packW-40} 78 ${packW} 82 ${packW} 90 Z`}
        fill="url(#mp_body)" />

      {/* Neck */}
      <rect x={packW/2 - 28} y="58" width="56" height="24" rx="5"
        fill="url(#mp_top)" />
      <rect x={packW/2 - 24} y="59" width="8" height="22" rx="4"
        fill="rgba(255,255,255,0.24)" />

      {/* Collar */}
      <rect x={packW/2 - 22} y="47" width="44" height="14" rx="4"
        fill={C.charcoalMid} />

      {/* Actuator */}
      <rect x={packW/2 - 32} y="27" width="64" height="22" rx="9"
        fill={C.charcoal} />
      <rect x={packW/2 - 30} y="42" width="60" height="4" rx="2"
        fill={C.terracotta} />
      <text x={packW/2} y="40" textAnchor="middle" fontSize="8" fontFamily="Georgia,serif"
        fill="#FAF7F2" fontWeight="700" letterSpacing="2.5">QUELL</text>

      {/* Nozzle stem */}
      <rect x={packW/2 - 4} y="4" width="8" height="26" rx="4"
        fill={C.pump ?? C.charcoal} />
      <rect x={packW/2 - 4.5} y="5" width="2.5" height="24" rx="1.2"
        fill="rgba(255,255,255,0.18)" />
      {/* Spout */}
      <rect x={packW/2 - 24} y="2" width="48" height="10" rx="5"
        fill={C.charcoal} />
      <rect x={packW/2 - 22} y="3" width="18" height="4" rx="2"
        fill="rgba(255,255,255,0.14)" />

      {/* ── Label ── */}
      <rect x="8" y="100" width={packW - 16} height="222" rx="8"
        fill="url(#mp_label)" />

      {/* Top band */}
      <rect x="8" y="100" width={packW - 16} height="50" rx="8"
        fill={C.charcoal} />
      <rect x="8" y="124" width={packW - 16} height="26" fill={C.charcoal} />

      {/* QUELL on label */}
      <text x={packW/2} y="119" textAnchor="middle" fontSize="18" fontFamily="Georgia,serif"
        fontWeight="700" fill="#FAF7F2" letterSpacing="5">QUELL</text>
      <text x={packW/2} y="136" textAnchor="middle" fontSize="6.5" fontFamily="Arial,sans-serif"
        fill={C.terracotta} letterSpacing="3" fontWeight="600">SKINCARE</text>

      {/* Terracotta stripe */}
      <rect x="8" y="150" width={packW - 16} height="4" fill={C.terracotta} />

      {/* Product text */}
      <text x={packW/2} y="168" textAnchor="middle" fontSize="8" fontFamily="Georgia,serif"
        fill="#1A1A1A" fontWeight="700" letterSpacing="0.5">DRY SKIN</text>
      <text x={packW/2} y="180" textAnchor="middle" fontSize="8" fontFamily="Georgia,serif"
        fill="#1A1A1A" fontWeight="700" letterSpacing="0.5">REGIME</text>

      {/* Volume */}
      <text x={packW/2} y="216" textAnchor="middle" fontSize="28" fontFamily="Georgia,serif"
        fill="#1A1A1A" fontWeight="300" letterSpacing="-1">3L</text>
      <text x={packW/2} y="227" textAnchor="middle" fontSize="5.5" fontFamily="Arial,sans-serif"
        fill="#AAA" letterSpacing="1.5">NET VOLUME</text>

      {/* Ceramide badge */}
      <rect x={packW/2 - 36} y="238" width="72" height="22" rx="5"
        fill="#F0EBE3" stroke="#E0D5C8" strokeWidth="0.6" />
      <text x={packW/2} y="248" textAnchor="middle" fontSize="6" fontFamily="Arial,sans-serif"
        fill={C.terracotta} fontWeight="700">CERAMIDE</text>
      <text x={packW/2} y="257" textAnchor="middle" fontSize="5.5" fontFamily="Arial,sans-serif"
        fill="#888">NP · AP · EOP</text>

      {/* Footer */}
      <text x={packW/2} y="298" textAnchor="middle" fontSize="5.5" fontFamily="Arial,sans-serif"
        fill="#CCC">Made in India</text>

      {/* Bottom */}
      <ellipse cx={packW/2} cy={packH - 10} rx={packW/2 - 6} ry="10"
        fill="url(#mp_body)" />
    </g>
  );

  return (
    <svg viewBox="0 0 900 460" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} style={style}>
      <defs>
        <linearGradient id="mp_body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#B8B0A4" />
          <stop offset="10%"  stopColor="#D8D0C4" />
          <stop offset="22%"  stopColor="#FFFEF9" />
          <stop offset="38%"  stopColor="#FFFFFF" />
          <stop offset="62%"  stopColor="#EDE5DA" />
          <stop offset="84%"  stopColor="#CCCAB8" />
          <stop offset="100%" stopColor="#C4BEB2" />
        </linearGradient>
        <linearGradient id="mp_top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#E8E0D4" />
          <stop offset="100%" stopColor="#D0C8BC" />
        </linearGradient>
        <linearGradient id="mp_label" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#F0EAE2" />
          <stop offset="10%"  stopColor="#FFFDF9" />
          <stop offset="50%"  stopColor="#FFFFFF" />
          <stop offset="90%"  stopColor="#FFFDF9" />
          <stop offset="100%" stopColor="#EAE4DC" />
        </linearGradient>
        <filter id="mp_blur"><feGaussianBlur stdDeviation="1.5"/></filter>
      </defs>

      {/* Ground shadow under all 4 packs */}
      <ellipse cx="450" cy="450" rx="410" ry="10" fill="rgba(0,0,0,0.12)" />

      {/* 4 packs */}
      {[0,1,2,3].map(i => (
        <MiniPack key={i} x={offsetX + i * (packW + gap)} />
      ))}

      {/* ── Top ribbon banner ── */}
      <rect x="0" y="0" width="900" height="46" fill={C.charcoal} />
      <rect x="0" y="40" width="900" height="6" fill={C.terracotta} />
      <text x="450" y="29" textAnchor="middle" fontSize="15" fontFamily="Georgia,serif"
        fill="#FAF7F2" fontWeight="700" letterSpacing="6">
        12 MONTHS · YEARLY PACK
      </text>

      {/* ── × 4 PACKS callout badge ── */}
      <rect x="350" y="406" width="200" height="44" rx="22" fill={C.terracotta} />
      <rect x="352" y="408" width="100" height="12" rx="8"
        fill="rgba(255,255,255,0.15)" />
      <text x="450" y="424" textAnchor="middle" fontSize="11" fontFamily="Arial,sans-serif"
        fill="#FFFFFF" fontWeight="800" letterSpacing="2">× 4 PACKS INCLUDED</text>
      <text x="450" y="441" textAnchor="middle" fontSize="8" fontFamily="Arial,sans-serif"
        fill="rgba(255,255,255,0.80)" letterSpacing="1">Total 12L · Save ₹796</text>
    </svg>
  );
}

