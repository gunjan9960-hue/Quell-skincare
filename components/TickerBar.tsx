"use client";

import { useRef } from "react";

const items = [
  "85% of India has hard water",
  "Ceramide-first formula",
  "Dermatologist tested",
  "Chelating EDTA technology",
  "7-day visible barrier repair",
  "Fragrance-free · Paraben-free",
  "Made for Indian conditions",
];

export default function TickerBar() {
  const trackRef = useRef<HTMLDivElement>(null);

  function pause() {
    if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
  }
  function resume() {
    if (trackRef.current) trackRef.current.style.animationPlayState = "running";
  }

  const content = items.map((item, i) => (
    <span key={i} className="inline-flex items-center gap-5 px-5">
      <span>{item}</span>
      <span className="text-background/20 text-[7px] select-none">◆</span>
    </span>
  ));

  return (
    <div
      className="bg-foreground text-background py-3 overflow-hidden select-none"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div
        ref={trackRef}
        className="inline-flex whitespace-nowrap text-xs tracking-widest uppercase"
        style={{ animation: "marquee 32s linear infinite" }}
      >
        {content}{content}
      </div>
    </div>
  );
}
