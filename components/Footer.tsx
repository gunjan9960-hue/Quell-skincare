import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-secondary mt-10 sm:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold tracking-[0.2em] uppercase mb-3">
              QUELL
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              India&apos;s first hard-water defense skincare brand. End the dryness.
            </p>
          </div>

          {/* Shop */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-4">Shop</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/products" className="hover:text-foreground transition-colors">All Packs</Link></li>
              <li><Link href="/products/quell-dry-skin-regime-30-day" className="hover:text-foreground transition-colors">30 Day Pack — ₹449</Link></li>
              <li><Link href="/products/quell-dry-skin-regime-quarter" className="hover:text-foreground transition-colors">Quarter Pack — ₹1,299</Link></li>
              <li><Link href="/products/quell-dry-skin-regime-yearly" className="hover:text-foreground transition-colors">Yearly Pack — ₹4,999</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-4">Help</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-foreground transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-4">Learn</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/science" className="hover:text-foreground transition-colors">The Science</Link></li>
              <li><Link href="/ingredients" className="hover:text-foreground transition-colors">Ingredients</Link></li>
              <li><Link href="/hard-water" className="hover:text-foreground transition-colors">Hard Water & Skin</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-muted-foreground">
          <p>© 2025 Quell Skincare. All rights reserved.</p>
          <p className="tracking-widest uppercase">End the dryness.</p>
        </div>
      </div>
    </footer>
  );
}
