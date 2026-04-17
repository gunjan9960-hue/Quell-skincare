"use client";

import { useEffect, useRef } from "react";
import ProductBottle from "@/components/ProductBottle";

type BottleSize = "250ml" | "1L" | "3L" | "4x3L";
type BottleSide = "front" | "back";

interface Props {
  size: BottleSize;
  side: BottleSide;
  onClose: () => void;
}

export default function BottleZoomModal({ size, side, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const bottleHeight = size === "4x3L" ? "340px" : size === "250ml" ? "400px" : "520px";

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(10,8,6,0.82)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/* Panel */}
      <div
        className="relative bg-[#FAF7F2] rounded-sm shadow-2xl flex flex-col items-center gap-6 p-8 sm:p-12"
        style={{ maxWidth: "min(92vw, 520px)", width: "100%" }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-foreground/40 hover:text-foreground transition-colors text-xs tracking-widest uppercase"
          aria-label="Close"
        >
          ✕ close
        </button>

        {/* Side label */}
        <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30">
          {side === "front" ? "Front" : "Back"} label
        </p>

        {/* Bottle — large */}
        <div className="flex items-center justify-center w-full">
          <ProductBottle
            size={size}
            side={side}
            style={{
              height: bottleHeight,
              width: "auto",
              filter: "drop-shadow(0 24px 40px rgba(0,0,0,0.18))",
              transition: "transform 0.3s ease",
            }}
          />
        </div>

        {/* Hint */}
        <p className="text-[10px] tracking-widest uppercase text-foreground/25">
          press esc or click outside to close
        </p>
      </div>
    </div>
  );
}
