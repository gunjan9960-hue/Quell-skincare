"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, Check, Truck, RefreshCw, ShieldCheck, ChevronDown, ChevronUp } from "lucide-react";
import { Product, products } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import ProductBottle from "@/components/ProductBottle";
import BottleZoomModal from "@/components/BottleZoomModal";
import ProductCard from "@/components/ProductCard";

type BottleSize = "250ml" | "1L" | "3L" | "4x3L";
type BottleSide = "front" | "back";

function getBottleSize(product: Product): BottleSize {
  if (product.size.startsWith("4")) return "4x3L";
  if (product.size.startsWith("250")) return "250ml";
  if (product.size.startsWith("1")) return "1L";
  return "3L";
}

// Expandable section for mobile
function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between py-4 text-sm font-medium tracking-wide"
      >
        {title}
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && <div className="pb-5 text-sm text-muted-foreground leading-relaxed">{children}</div>}
    </div>
  );
}

export default function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [side, setSide] = useState<BottleSide>("front");
  const [zoom, setZoom] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "ingredients" | "howto">("description");
  const [added, setAdded] = useState(false);

  const bottleSize = getBottleSize(product);
  const otherProducts = products.filter((p) => p.id !== product.id);

  function handleAddToCart() {
    for (let i = 0; i < quantity; i++) addItem(product as never);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const shipping = product.price * quantity >= 999 ? 0 : 99;
  const total = product.price * quantity + shipping;

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground tracking-wide mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-foreground transition-colors">Products</Link>
          <span>/</span>
          <span className="text-foreground">{product.subtitle}</span>
        </nav>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* ── Left: Image panel ── */}
          <div className="flex flex-col gap-4">
            {/* Main image */}
            <div
              className="relative bg-[#F5EFE8] rounded-sm flex items-center justify-center overflow-hidden"
              style={{ minHeight: "480px" }}
            >
              <ProductBottle
                size={bottleSize}
                side={side}
                style={{ height: bottleSize === "4x3L" ? "280px" : "400px", width: "auto" }}
                className="drop-shadow-2xl"
              />

              {/* Zoom button */}
              <button
                onClick={() => setZoom(true)}
                className="absolute top-4 right-4 bg-white/80 hover:bg-white border border-border/40 rounded-sm px-3 py-1.5 text-[10px] tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors backdrop-blur-sm"
              >
                ⊕ Zoom
              </button>

              {product.badge && (
                <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-[10px] tracking-widest uppercase px-2.5 py-1">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Front / Back toggle thumbnails */}
            {bottleSize !== "4x3L" && (
              <div className="flex gap-3">
                {(["front", "back"] as BottleSide[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSide(s)}
                    className={`flex-1 bg-[#F5EFE8] rounded-sm flex items-center justify-center py-3 border-2 transition-colors ${
                      side === s ? "border-accent" : "border-transparent hover:border-border"
                    }`}
                    style={{ minHeight: "80px" }}
                  >
                    <ProductBottle
                      size={bottleSize}
                      side={s}
                      style={{ height: "60px", width: "auto" }}
                    />
                    <span className="sr-only">{s} label</span>
                  </button>
                ))}
              </div>
            )}

            {/* Trust strip */}
            <div className="grid grid-cols-3 gap-3 mt-2">
              {[
                { icon: <Truck size={15} />, label: "Free shipping above ₹999" },
                { icon: <RefreshCw size={15} />, label: "Easy 7-day returns" },
                { icon: <ShieldCheck size={15} />, label: "Dermatologist tested" },
              ].map((t) => (
                <div key={t.label} className="flex flex-col items-center gap-1.5 text-center border border-border/50 py-3 px-2 rounded-sm">
                  <span className="text-accent">{t.icon}</span>
                  <span className="text-[10px] text-muted-foreground leading-tight tracking-wide">{t.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Info panel ── */}
          <div className="flex flex-col">

            {/* Brand / name */}
            <p className="text-xs tracking-[0.2em] uppercase text-accent mb-2">QUELL Skincare</p>
            <h1 className="font-[family-name:var(--font-cormorant)] text-4xl sm:text-5xl font-light leading-tight mb-1">
              {product.name}
            </h1>
            <p className="text-lg text-muted-foreground font-light mb-4">{product.subtitle}</p>

            {/* Founder's experience badge */}
            <div className="flex items-center gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 border border-accent/40 text-accent text-[10px] tracking-widest uppercase px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                From Founder&apos;s Personal Experience
              </span>
            </div>

            {/* Price block */}
            <div className="flex items-baseline gap-3 mb-1">
              <span className="font-[family-name:var(--font-cormorant)] text-5xl font-semibold">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.highlight && (
                <span className="text-sm text-accent font-medium">{product.highlight}</span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mb-6">{product.perMonth} · Inclusive of all taxes</p>

            {/* Pack details pills */}
            <div className="flex flex-wrap gap-2 mb-7">
              {[
                product.size,
                product.duration,
                `${product.perMonth.split(" ")[0]} per month`,
              ].map((detail) => (
                <span
                  key={detail}
                  className="border border-border text-xs tracking-wide px-3 py-1.5 text-muted-foreground"
                >
                  {detail}
                </span>
              ))}
            </div>

            {/* Key benefits */}
            <ul className="space-y-2 mb-8">
              {product.keyBenefits.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <Check size={14} className="text-accent mt-0.5 flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>

            {/* Quantity + CTA */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center border border-border">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-3 hover:bg-secondary transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="px-5 py-3 text-sm min-w-[3rem] text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-3 hover:bg-secondary transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3.5 text-sm tracking-widest uppercase transition-colors font-medium ${
                  added
                    ? "bg-accent text-accent-foreground"
                    : "bg-foreground text-background hover:bg-accent"
                }`}
              >
                {added ? "✓ Added to Cart" : "Add to Cart"}
              </button>
            </div>

            {/* Buy now */}
            <Link
              href="/checkout"
              onClick={() => { for (let i = 0; i < quantity; i++) addItem(product as never); }}
              className="block w-full text-center border border-foreground py-3.5 text-sm tracking-widest uppercase hover:bg-foreground hover:text-background transition-colors mb-6"
            >
              Buy Now
            </Link>

            {/* Shipping note */}
            <p className="text-xs text-muted-foreground text-center mb-8">
              {total >= 999
                ? "✓ Free shipping on this order"
                : `Add ₹${(999 - product.price * quantity).toLocaleString("en-IN")} more for free shipping`}
            </p>

            {/* ── Tabs (desktop) ── */}
            <div className="hidden sm:block border-t border-border pt-6">
              <div className="flex gap-6 mb-5 border-b border-border">
                {(["description", "ingredients", "howto"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-xs tracking-widest uppercase transition-colors ${
                      activeTab === tab
                        ? "border-b-2 border-foreground text-foreground -mb-px"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab === "description" ? "Description" : tab === "ingredients" ? "Ingredients" : "How to Use"}
                  </button>
                ))}
              </div>

              {activeTab === "description" && (
                <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
              )}

              {activeTab === "ingredients" && (
                <ul className="space-y-3">
                  {product.ingredients.map((ing) => (
                    <li key={ing.name} className="text-sm">
                      <span className="font-medium">{ing.name}</span>
                      <span className="text-muted-foreground"> — {ing.role}</span>
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === "howto" && (
                <ol className="space-y-2.5 list-decimal list-inside">
                  {product.howToUse.map((step, i) => (
                    <li key={i} className="text-sm text-muted-foreground leading-relaxed">{step}</li>
                  ))}
                </ol>
              )}
            </div>

            {/* ── Accordion (mobile) ── */}
            <div className="sm:hidden border-t border-border">
              <Accordion title="Description">
                <p>{product.description}</p>
              </Accordion>
              <Accordion title="Ingredients">
                <ul className="space-y-2.5">
                  {product.ingredients.map((ing) => (
                    <li key={ing.name}>
                      <span className="font-medium text-foreground">{ing.name}</span> — {ing.role}
                    </li>
                  ))}
                </ul>
              </Accordion>
              <Accordion title="How to Use">
                <ol className="space-y-2 list-decimal list-inside">
                  {product.howToUse.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </Accordion>
            </div>
          </div>
        </div>

        {/* ── Why QUELL banner ── */}
        <div className="mt-20 bg-secondary rounded-sm p-10 sm:p-14 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            {
              stat: "85%",
              label: "of India has hard water",
              sub: "Your skin fights this every single day.",
            },
            {
              stat: "7 days",
              label: "to visible barrier repair",
              sub: "Ceramides start working from the first use.",
            },
            {
              stat: "3 types",
              label: "of ceramides in every bottle",
              sub: "NP, AP & EOP — the exact ones your skin makes.",
            },
          ].map((item) => (
            <div key={item.stat}>
              <p className="font-[family-name:var(--font-cormorant)] text-5xl font-light text-accent mb-1">{item.stat}</p>
              <p className="text-sm font-medium mb-1">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* ── You may also like ── */}
        {otherProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-light mb-8">
              You may also like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-2xl">
              {otherProducts.slice(0, 2).map((p, i) => (
                <ProductCard key={p.id} product={p} index={i + 1} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Zoom modal */}
      {zoom && (
        <BottleZoomModal
          size={bottleSize}
          side={side}
          onClose={() => setZoom(false)}
        />
      )}
    </>
  );
}
