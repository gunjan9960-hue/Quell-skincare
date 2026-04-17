"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { Minus, Plus, X } from "lucide-react";
import ProductBottle from "@/components/ProductBottle";
import type { Product } from "@/lib/products";

function cartBottleSize(product: Product) {
  if (product.size.startsWith("4")) return "4x3L" as const;
  if (product.size.startsWith("250")) return "250ml" as const;
  if (product.size.startsWith("1")) return "1L" as const;
  return "3L" as const;
}

export default function CartPage() {
  const { items, total, removeItem, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-light mb-4">Your Cart</h1>
        <p className="text-muted-foreground mb-8">Your cart is empty.</p>
        <Link
          href="/products"
          className="bg-foreground text-background px-8 py-3.5 text-sm tracking-widest uppercase hover:bg-accent transition-colors"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-light mb-10">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 border-b border-border pb-6">
              {/* Bottle thumbnail */}
              <Link href={`/products/${product.slug}`} className="w-24 h-32 bg-[#F5EFE8] flex-shrink-0 flex items-center justify-center rounded-sm hover:opacity-80 transition-opacity">
                <ProductBottle
                  size={cartBottleSize(product)}
                  side="front"
                  style={{ height: cartBottleSize(product) === "4x3L" ? "56px" : "88px", width: "auto" }}
                />
              </Link>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium leading-snug">{product.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{product.size}</p>
                  </div>
                  <button
                    onClick={() => removeItem(product.id)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-4">
                  {/* Quantity */}
                  <div className="flex items-center border border-border">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="px-2.5 py-1.5 hover:bg-secondary transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="px-4 py-1.5 text-sm min-w-[2.5rem] text-center">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="px-2.5 py-1.5 hover:bg-secondary transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  <span className="text-sm font-medium">
                    ₹{(product.price * quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-secondary p-6 h-fit space-y-4">
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-light">Order Summary</h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{total >= 999 ? "Free" : "₹99"}</span>
            </div>
            {total < 999 && (
              <p className="text-xs text-accent">
                Add ₹{(999 - total).toLocaleString("en-IN")} more for free shipping
              </p>
            )}
          </div>

          <div className="border-t border-border pt-4 flex justify-between font-medium">
            <span>Total</span>
            <span>₹{(total + (total < 999 ? 99 : 0)).toLocaleString("en-IN")}</span>
          </div>

          <Link
            href="/checkout"
            className="block w-full bg-foreground text-background text-center py-3.5 text-sm tracking-widest uppercase hover:bg-accent transition-colors"
          >
            Proceed to Checkout
          </Link>

          <Link
            href="/products"
            className="block w-full text-center text-sm tracking-wide underline underline-offset-4 hover:text-accent transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
