"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import ProductBottle from "@/components/ProductBottle";
import type { Product } from "@/lib/products";

function bottleSize(product: Product) {
  if (product.size.startsWith("4")) return "4x3L" as const;
  if (product.size.startsWith("1")) return "1L" as const;
  return "3L" as const;
}

export default function CartDrawer() {
  const { items, itemCount, total, drawerOpen, closeDrawer, removeItem, updateQuantity } = useCart();
  const shipping = total >= 999 ? 0 : 99;

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeDrawer(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeDrawer]);

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-background shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} />
            <span className="text-sm font-medium tracking-wide">Your Cart</span>
            {/* Live count badge */}
            {itemCount > 0 && (
              <span className="bg-accent text-accent-foreground text-xs font-semibold px-2 py-0.5 rounded-full min-w-[1.5rem] text-center">
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={closeDrawer}
            className="text-muted-foreground hover:text-foreground transition-colors p-1"
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-4 text-center">
              <ShoppingBag size={36} className="text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">Your cart is empty.</p>
              <button
                onClick={closeDrawer}
                className="text-xs tracking-widest uppercase underline underline-offset-4 hover:text-accent transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-5">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-4 pb-5 border-b border-border/50 last:border-0">
                  {/* Bottle thumbnail */}
                  <div className="w-16 h-20 bg-[#F5EFE8] rounded-sm flex items-center justify-center flex-shrink-0">
                    <ProductBottle
                      size={bottleSize(product)}
                      side="front"
                      style={{
                        height: bottleSize(product) === "4x3L" ? "40px" : "64px",
                        width: "auto",
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <p className="text-xs text-muted-foreground tracking-wide">{product.name}</p>
                        <p className="text-sm font-medium leading-snug">{product.subtitle}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{product.size}</p>
                      </div>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="text-muted-foreground/50 hover:text-foreground transition-colors flex-shrink-0 mt-0.5"
                        aria-label="Remove"
                      >
                        <X size={14} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity controls */}
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="px-2 py-1.5 hover:bg-secondary transition-colors"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="px-3 py-1.5 text-sm font-medium min-w-[2rem] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="px-2 py-1.5 hover:bg-secondary transition-colors"
                        >
                          <Plus size={11} />
                        </button>
                      </div>

                      <span className="text-sm font-semibold">
                        ₹{(product.price * quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer — only when cart has items */}
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-5 space-y-4">
            {/* Free shipping progress */}
            {total < 999 && (
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                  <span>Add ₹{(999 - total).toLocaleString("en-IN")} for free shipping</span>
                  <span>{Math.round((total / 999) * 100)}%</span>
                </div>
                <div className="h-1 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (total / 999) * 100)}%` }}
                  />
                </div>
              </div>
            )}
            {total >= 999 && (
              <p className="text-xs text-accent text-center tracking-wide">
                ✓ You qualify for free shipping
              </p>
            )}

            {/* Totals */}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className={shipping === 0 ? "text-accent" : ""}>
                {shipping === 0 ? "Free" : `₹${shipping}`}
              </span>
            </div>
            <div className="flex justify-between font-semibold border-t border-border pt-3">
              <span>Total</span>
              <span>₹{(total + shipping).toLocaleString("en-IN")}</span>
            </div>

            {/* CTAs */}
            <Link
              href="/checkout"
              onClick={closeDrawer}
              className="block w-full bg-foreground text-background text-center py-3.5 text-sm tracking-widest uppercase hover:bg-accent transition-colors font-medium"
            >
              Checkout · ₹{(total + shipping).toLocaleString("en-IN")}
            </Link>
            <Link
              href="/cart"
              onClick={closeDrawer}
              className="block w-full text-center text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
            >
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
