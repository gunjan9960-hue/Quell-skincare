"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, openDrawer } = useCart();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-[family-name:var(--font-cormorant)] text-xl sm:text-2xl font-semibold tracking-[0.15em] sm:tracking-[0.2em] uppercase">
            QUELL
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm tracking-wide">
            <Link href="/products" className="hover:text-accent transition-colors">
              Shop
            </Link>
            <Link href="/science" className="hover:text-accent transition-colors">
              The Science
            </Link>
            <Link href="/hard-water" className="hover:text-accent transition-colors">
              Hard Water &amp; Skin
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Account / Login */}
            <Link
              href={user ? "/account" : "/login"}
              className="relative hover:text-accent transition-colors flex items-center gap-1.5"
              title={user ? `Signed in as ${user.name}` : "Sign In"}
            >
              <User size={20} />
              {user && (
                <span className="hidden sm:inline text-xs tracking-wide text-muted-foreground max-w-[80px] truncate">
                  {user.name.split(" ")[0]}
                </span>
              )}
              {!user && (
                <span className="hidden sm:inline flex items-center gap-1.5 text-xs tracking-widest uppercase text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Sign In
                </span>
              )}
            </Link>

            {/* Cart — opens drawer */}
            <button
              onClick={openDrawer}
              className="relative hover:text-accent transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-accent text-accent-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            <button
              className="md:hidden hover:text-accent transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="flex flex-col px-4 py-4 gap-4 text-sm tracking-wide">
            <Link href="/products" onClick={() => setMobileOpen(false)}>Shop</Link>
            <Link href="/science" onClick={() => setMobileOpen(false)}>The Science</Link>
            <Link href="/hard-water" onClick={() => setMobileOpen(false)}>Hard Water &amp; Skin</Link>
            <Link href={user ? "/account" : "/login"} onClick={() => setMobileOpen(false)}>
              {user ? `My Account (${user.name.split(" ")[0]})` : "Sign In"}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
