"use client";

import { useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/products";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart-context";
import ProductBottle from "@/components/ProductBottle";
import RiverbankBg from "@/components/RiverbankBg";
import BottleZoomModal from "@/components/BottleZoomModal";

type BottleSize = "250ml" | "1L" | "3L" | "4x3L";
type BottleSide = "front" | "back";

function getBottleSize(product: Product): BottleSize {
  if (product.size.startsWith("4")) return "4x3L";
  if (product.size.startsWith("250")) return "250ml";
  if (product.size.startsWith("1")) return "1L";
  return "3L";
}

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addItem } = useCart();
  const [flipped, setFlipped] = useState(false);
  const [zoom, setZoom] = useState<{ side: BottleSide } | null>(null);
  const bottleSize = getBottleSize(product);
  const showBack   = bottleSize !== "4x3L";
  const bottleH    = bottleSize === "4x3L" ? "260px" : bottleSize === "250ml" ? "260px" : "320px";
  const bgVariant  = (index % 3) as 0 | 1 | 2;

  function openZoom(e: React.MouseEvent, side: BottleSide) {
    e.stopPropagation();
    setZoom({ side });
  }

  function isDesktop() {
    return typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }

  function handleMouseEnter() {
    if (showBack && isDesktop()) setFlipped(true);
  }

  function handleMouseLeave() {
    if (isDesktop()) setFlipped(false);
  }

  function handleClick() {
    if (!isDesktop() && showBack) setFlipped((f) => !f);
  }

  return (
    <>
      <div className="product-lift group border border-border/60 bg-card flex flex-col rounded-sm overflow-hidden shadow-sm">
        {/* ── Flip container ── */}
        <div
          className="relative cursor-pointer"
          style={{ perspective: "1200px" }}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            style={{
              transformStyle: "preserve-3d",
              transition: "transform 1.4s cubic-bezier(0.35, 0.1, 0.15, 1)",
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
              position: "relative",
            }}
          >
            {/* FRONT */}
            <div
              className="relative overflow-hidden flex items-center justify-center"
              style={{ backfaceVisibility: "hidden", minHeight: "360px" }}
            >
              <RiverbankBg variant={bgVariant} />

              {/* Bottle — large, centered */}
              <ProductBottle
                size={bottleSize}
                side="front"
                className="relative w-auto drop-shadow-2xl z-10"
                style={{ height: bottleH }}
              />

              {product.badge && (
                <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] tracking-widest uppercase rounded-none shadow-sm">
                  {product.badge}
                </Badge>
              )}

              {/* Zoom icon — front */}
              <button
                onClick={(e) => openZoom(e, "front")}
                className="absolute top-3 right-3 z-20 bg-background/70 hover:bg-background border border-border/50 rounded-sm px-2 py-1 text-[9px] tracking-widest uppercase text-foreground/50 hover:text-foreground transition-colors backdrop-blur-sm"
                title="Zoom in"
              >
                ⊕ zoom
              </button>

              {showBack && (
                <span className="absolute bottom-3 right-3 text-[9px] tracking-widest uppercase text-foreground/30 font-light">
                  tap to flip →
                </span>
              )}
            </div>

            {/* BACK */}
            {showBack && (
              <div
                className="absolute inset-0 overflow-hidden flex items-center justify-center"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  minHeight: "360px",
                }}
              >
                <RiverbankBg variant={bgVariant} />

                <ProductBottle
                  size={bottleSize}
                  side="back"
                  className="relative w-auto drop-shadow-2xl z-10"
                  style={{ height: "320px" }}
                />

                {/* Zoom icon — back */}
                <button
                  onClick={(e) => openZoom(e, "back")}
                  className="absolute top-3 right-3 z-20 bg-background/70 hover:bg-background border border-border/50 rounded-sm px-2 py-1 text-[9px] tracking-widest uppercase text-foreground/50 hover:text-foreground transition-colors backdrop-blur-sm"
                  title="Zoom in"
                >
                  ⊕ zoom
                </button>

                <span className="absolute bottom-3 left-3 text-[9px] tracking-widest uppercase text-foreground/30 font-light">
                  ← tap to flip
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── Info ── */}
        <div className="p-5 flex flex-col flex-1 gap-1 border-t border-border/50">
          <Link href={`/products/${product.slug}`}>
            <h3 className="text-sm font-semibold hover:text-accent transition-colors">{product.name}</h3>
          </Link>
          <p className="text-xs text-accent font-medium tracking-wide">{product.subtitle}</p>
          <p className="text-xs text-muted-foreground">{product.size} · {product.duration}</p>

          {product.highlight && (
            <p className="text-xs text-accent/70 mt-0.5">{product.highlight}</p>
          )}

          <div className="flex items-end justify-between mt-auto pt-4">
            <span className="text-xl font-[family-name:var(--font-cormorant)] font-semibold">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            <button
              onClick={() => addItem(product as never)}
              className="cart-fill-btn border border-foreground px-4 py-2 text-xs tracking-widest uppercase"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Zoom modal */}
      {zoom && (
        <BottleZoomModal
          size={bottleSize}
          side={zoom.side}
          onClose={() => setZoom(null)}
        />
      )}
    </>
  );
}
