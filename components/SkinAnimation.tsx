"use client";

import { useEffect, useRef } from "react";

// ── Types ─────────────────────────────────────────────────────────
type Particle   = { x: number; y: number; vx: number; vy: number; opacity: number; size: number; color: string; isStar: boolean };
type TrailPoint = { x: number; y: number; age: number };

// ── Q path ────────────────────────────────────────────────────────
function buildQPath(W: number, H: number, count = 480) {
  const cx = W * 0.50, cy = H * 0.46;
  const rx = W * 0.30, ry = H * 0.32;
  const pts: { x: number; y: number; isTail?: boolean }[] = [];

  const circleCount = Math.round(count * 0.80);
  for (let i = 0; i <= circleCount; i++) {
    const a = -Math.PI / 2 + (i / circleCount) * Math.PI * 2;
    pts.push({ x: cx + Math.cos(a) * rx, y: cy + Math.sin(a) * ry });
  }

  const tailCount = count - circleCount;
  const tailA = Math.PI * 0.20;
  const tsx = cx + Math.cos(tailA) * rx * 0.45;
  const tsy = cy + Math.sin(tailA) * ry * 0.45;
  const tex = cx + rx * 1.10;
  const tey = cy + ry * 0.92;
  for (let i = 1; i <= tailCount; i++) {
    const t = i / tailCount;
    pts.push({
      x: tsx + (tex - tsx) * t,
      y: tsy + (tey - tsy) * t - Math.sin(t * Math.PI) * H * 0.03,
      isTail: true,
    });
  }
  return pts;
}

// ── Sparkles ──────────────────────────────────────────────────────
const PALETTE = ["#E8A882", "#F5CDB4", "#FFFFFF", "#C17A5A", "#D4956A", "#F0E0D0", "#E8C4A0"];

function spawnParticles(particles: Particle[], x: number, y: number, burst = false) {
  const n = burst ? 14 : 3;
  for (let i = 0; i < n; i++) {
    const angle = Math.random() * Math.PI * 2;
    const spd   = burst ? 1.5 + Math.random() * 3.5 : 0.5 + Math.random() * 1.8;
    particles.push({
      x: x + (Math.random() - 0.5) * (burst ? 35 : 18),
      y: y + (Math.random() - 0.5) * (burst ? 35 : 18),
      vx: Math.cos(angle) * spd * 0.7,
      vy: -Math.abs(Math.sin(angle)) * spd - 0.5,
      opacity: 0.85 + Math.random() * 0.15,
      size: burst ? 2 + Math.random() * 3.5 : 1.5 + Math.random() * 2.2,
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      isStar: burst && Math.random() > 0.45,
    });
  }
}

// ── Star shape ────────────────────────────────────────────────────
function star(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4 - Math.PI / 2;
    const R = i % 2 === 0 ? r : r * 0.42;
    i === 0 ? ctx.moveTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R)
            : ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
  }
  ctx.closePath();
  ctx.fill();
}

// ── Wand tip ──────────────────────────────────────────────────────
function drawWand(ctx: CanvasRenderingContext2D, x: number, y: number, trail: TrailPoint[], isTail: boolean) {
  if (trail.length > 1) {
    for (let i = 1; i < trail.length; i++) {
      const t = i / trail.length;
      ctx.save();
      ctx.strokeStyle = `rgba(220,148,100,${t * t * 0.65})`;
      ctx.lineWidth   = t * (isTail ? 9 : 6);
      ctx.lineCap     = "round";
      ctx.shadowColor = "#C17A5A";
      ctx.shadowBlur  = isTail ? 22 : 14;
      ctx.beginPath();
      ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
      ctx.lineTo(trail[i].x,     trail[i].y);
      ctx.stroke();
      ctx.restore();
    }
  }

  const halo = ctx.createRadialGradient(x, y, 0, x, y, isTail ? 55 : 42);
  halo.addColorStop(0,   `rgba(232,168,130,${isTail ? 0.55 : 0.42})`);
  halo.addColorStop(0.5, `rgba(193,122, 90,${isTail ? 0.18 : 0.12})`);
  halo.addColorStop(1,   "rgba(193,122,90,0)");
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(x, y, isTail ? 55 : 42, 0, Math.PI * 2);
  ctx.fill();

  const orb = ctx.createRadialGradient(x - 2, y - 2, 0, x, y, isTail ? 13 : 9);
  orb.addColorStop(0,   "#FFFFFF");
  orb.addColorStop(0.4, isTail ? "#F0C4A0" : "#E8B090");
  orb.addColorStop(1,   "#C17A5A");
  ctx.save();
  ctx.shadowColor = "#C17A5A";
  ctx.shadowBlur  = isTail ? 28 : 18;
  ctx.fillStyle   = orb;
  ctx.beginPath();
  ctx.arc(x, y, isTail ? 13 : 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

// ── Text helpers ──────────────────────────────────────────────────
function drawDryLabel(ctx: CanvasRenderingContext2D, W: number, H: number, alpha: number) {
  if (alpha <= 0) return;
  ctx.save();
  ctx.globalAlpha    = alpha;
  ctx.textAlign      = "center";
  ctx.textBaseline   = "middle";

  // Strong dark scrim so text is always legible over any photo
  const scrim = ctx.createLinearGradient(0, 0, 0, H * 0.34);
  scrim.addColorStop(0,   "rgba(0,0,0,0.72)");
  scrim.addColorStop(0.7, "rgba(0,0,0,0.30)");
  scrim.addColorStop(1,   "rgba(0,0,0,0)");
  ctx.fillStyle = scrim;
  ctx.fillRect(0, 0, W, H * 0.34);

  // "DRY SKIN" — solid white with shadow
  ctx.shadowColor = "rgba(0,0,0,0.7)";
  ctx.shadowBlur  = 10;
  ctx.fillStyle   = "#FFFFFF";
  ctx.font        = `400 ${W * 0.060}px Georgia, serif`;
  ctx.fillText("DRY SKIN", W * 0.5, H * 0.095, W * 0.85);

  // "FEELING TIGHT?" — slightly smaller, warm off-white
  ctx.shadowBlur  = 8;
  ctx.fillStyle   = "rgba(255,230,210,0.95)";
  ctx.font        = `300 ${W * 0.036}px Georgia, serif`;
  ctx.fillText("FEELING TIGHT?", W * 0.5, H * 0.162, W * 0.85);

  ctx.restore();
}

function drawEndText(ctx: CanvasRenderingContext2D, W: number, H: number, alpha: number) {
  if (alpha <= 0) return;
  ctx.save();
  ctx.globalAlpha    = alpha;
  ctx.textAlign      = "center";
  ctx.textBaseline   = "middle";

  // Strong dark scrim at bottom behind QUELL text
  const scrim = ctx.createLinearGradient(0, H * 0.62, 0, H);
  scrim.addColorStop(0, "rgba(0,0,0,0)");
  scrim.addColorStop(1, "rgba(0,0,0,0.78)");
  ctx.fillStyle = scrim;
  ctx.fillRect(0, 0, W, H);

  // "QUELL" — white with strong terracotta glow
  ctx.shadowColor = "rgba(193,122,90,1.0)";
  ctx.shadowBlur  = 28;
  ctx.fillStyle   = "#FFFFFF";
  ctx.font        = `600 ${W * 0.11}px Georgia, serif`;
  ctx.fillText("QUELL", W * 0.5, H * 0.79, W * 0.85);

  // "Ending Dryness." — clean warm white, no shadow
  ctx.shadowBlur  = 0;
  ctx.fillStyle   = "rgba(255,235,215,1.0)";
  ctx.font        = `300 ${W * 0.038}px Georgia, serif`;
  ctx.fillText("Ending Dryness.", W * 0.5, H * 0.875, W * 0.80);

  ctx.restore();
}

// ── Component ─────────────────────────────────────────────────────
export default function SkinAnimation() {
  const bgRef      = useRef<HTMLCanvasElement>(null);
  const revealRef  = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const rafRef     = useRef<number>(0);

  useEffect(() => {
    const bg      = bgRef.current;
    const reveal  = revealRef.current;
    const overlay = overlayRef.current;
    if (!bg || !reveal || !overlay) return;

    const W = bg.width, H = bg.height;
    const bgCtx  = bg.getContext("2d")!;
    const rvCtx  = reveal.getContext("2d")!;
    const ovCtx  = overlay.getContext("2d")!;

    const qPath = buildQPath(W, H, 480);

    let pathIdx      = 0;
    let phase: "sweep" | "complete" | "hold" | "fade" = "sweep";
    let holdTimer    = 0;
    let fadeAlpha    = 0;
    let completeFade = 0;
    let textAlpha    = 0;
    let labelAlpha   = 1;   // "DRY SKIN FEELING TIGHT" opacity
    let particles: Particle[] = [];
    const trail: TrailPoint[] = [];

    const TRAIL_LEN   = 28;
    const BRUSH_R     = 115;
    const SPEED       = 2.2;
    const HOLD_FRAMES = 270;    // ~4.5s at 60fps
    const FADE_STEP   = 0.014;

    // Offscreen canvases hold the two photos
    const smoothOff = document.createElement("canvas");
    smoothOff.width = W; smoothOff.height = H;
    const soCtx = smoothOff.getContext("2d")!;

    const dryOff = document.createElement("canvas");
    dryOff.width = W; dryOff.height = H;
    const doCtx = dryOff.getContext("2d")!;

    // Gradient shown while images load
    const grad = bgCtx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, "#F5EDE6");
    grad.addColorStop(1, "#D4956A");
    bgCtx.fillStyle = grad;
    bgCtx.fillRect(0, 0, W, H);

    let loaded = 0;
    const onLoad = () => {
      if (++loaded < 2) return;
      soCtx.drawImage(smoothImg, 0, 0, W, H);
      doCtx.drawImage(dryImg, 0, 0, W, H);
      // Paint dry photo + initial label onto bg canvas
      bgCtx.drawImage(dryOff, 0, 0, W, H);
      drawDryLabel(bgCtx, W, H, 1);
      loop();
    };

    const dryImg    = new Image(); dryImg.onload    = onLoad; dryImg.src = "/images/dry-skin.png";
    const smoothImg = new Image(); smoothImg.onload = onLoad; smoothImg.src = "/images/smooth-skin.png";

    // Reveal brush — paints smooth photo through a circular clip
    function paintReveal(x: number, y: number) {
      rvCtx.save();
      rvCtx.beginPath();
      rvCtx.arc(x, y, BRUSH_R, 0, Math.PI * 2);
      rvCtx.clip();
      rvCtx.drawImage(smoothOff, 0, 0, W, H);
      const feather = rvCtx.createRadialGradient(x, y, BRUSH_R * 0.5, x, y, BRUSH_R);
      feather.addColorStop(0, "rgba(0,0,0,0)");
      feather.addColorStop(1, "rgba(0,0,0,0.5)");
      rvCtx.globalCompositeOperation = "destination-out";
      rvCtx.fillStyle = feather;
      rvCtx.fillRect(0, 0, W, H);
      rvCtx.restore();
    }

    function loop() {
      ovCtx.clearRect(0, 0, W, H);

      // ── SWEEP — wand traces the Q ─────────────────────────────
      if (phase === "sweep") {
        // Label fades out over the first 30% of the path
        labelAlpha = Math.max(0, 1 - pathIdx / (qPath.length * 0.30));

        for (let s = 0; s < SPEED; s++) {
          if (pathIdx >= qPath.length) break;
          paintReveal(qPath[Math.floor(pathIdx)].x, qPath[Math.floor(pathIdx)].y);
          pathIdx++;
        }

        const idx    = Math.min(Math.floor(pathIdx), qPath.length - 1);
        const cur    = qPath[idx];
        const isTail = !!cur.isTail;

        trail.push({ x: cur.x, y: cur.y, age: 0 });
        if (trail.length > TRAIL_LEN) trail.shift();

        spawnParticles(particles, cur.x, cur.y);
        if (isTail && Math.random() > 0.4) spawnParticles(particles, cur.x, cur.y);

        if (pathIdx >= qPath.length) {
          spawnParticles(particles, cur.x, cur.y, true);
          phase        = "complete";
          completeFade = 0;
          labelAlpha   = 0;
        }

        // Redraw bg with fading label
        bgCtx.clearRect(0, 0, W, H);
        bgCtx.drawImage(dryOff, 0, 0, W, H);
        if (labelAlpha > 0) drawDryLabel(bgCtx, W, H, labelAlpha);

        drawWand(ovCtx, cur.x, cur.y, trail, isTail);
      }

      // ── COMPLETE — dry fades to smooth ────────────────────────
      else if (phase === "complete") {
        completeFade += 0.025;
        bgCtx.clearRect(0, 0, W, H);
        bgCtx.drawImage(dryOff, 0, 0, W, H);
        bgCtx.globalAlpha = Math.min(1, completeFade);
        bgCtx.drawImage(smoothOff, 0, 0, W, H);
        bgCtx.globalAlpha = 1;

        if (completeFade > 0.5) textAlpha = Math.min(1, textAlpha + 0.008); // ~2s fade-in

        if (completeFade >= 1) {
          rvCtx.clearRect(0, 0, W, H);
          phase = "hold"; holdTimer = 0;
        }
      }

      // ── HOLD — show result ────────────────────────────────────
      else if (phase === "hold") {
        textAlpha = Math.min(1, textAlpha + 0.008);
        if (++holdTimer >= HOLD_FRAMES) { phase = "fade"; fadeAlpha = 0; }
      }

      // ── FADE — smooth fades back to dry ───────────────────────
      else if (phase === "fade") {
        fadeAlpha += FADE_STEP;
        textAlpha  = Math.max(0, textAlpha - 0.007); // ~2.4s fade-out

        bgCtx.clearRect(0, 0, W, H);
        bgCtx.drawImage(smoothOff, 0, 0, W, H);
        bgCtx.globalAlpha = Math.min(1, fadeAlpha);
        bgCtx.drawImage(dryOff, 0, 0, W, H);
        bgCtx.globalAlpha = 1;

        if (fadeAlpha >= 1) {
          bgCtx.clearRect(0, 0, W, H);
          bgCtx.drawImage(dryOff, 0, 0, W, H);
          drawDryLabel(bgCtx, W, H, 1);   // restore label for next loop
          rvCtx.clearRect(0, 0, W, H);
          trail.length = 0;
          particles    = [];
          pathIdx      = 0;
          textAlpha    = 0;
          labelAlpha   = 1;
          phase        = "sweep";
        }
      }

      // ── Particles ─────────────────────────────────────────────
      particles = particles.filter(p => p.opacity > 0.02);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy; p.vy += 0.04; p.opacity *= 0.953;
        ovCtx.save();
        ovCtx.globalAlpha = p.opacity;
        ovCtx.fillStyle   = p.color;
        ovCtx.shadowColor = p.color;
        ovCtx.shadowBlur  = 8;
        p.isStar
          ? star(ovCtx, p.x, p.y, p.size)
          : (ovCtx.beginPath(), ovCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2), ovCtx.fill());
        ovCtx.restore();
      }

      drawEndText(ovCtx, W, H, textAlpha);

      rafRef.current = requestAnimationFrame(loop);
    }

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-sm"
      style={{ background: "linear-gradient(160deg,#F5EDE6 0%,#D4956A 100%)" }}
    >
      <canvas ref={bgRef}      width={600} height={800} className="absolute inset-0 w-full h-full object-cover" />
      <canvas ref={revealRef}  width={600} height={800} className="absolute inset-0 w-full h-full object-cover" />
      <canvas ref={overlayRef} width={600} height={800} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
    </div>
  );
}
