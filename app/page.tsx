import Link from "next/link";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import ProductBottle from "@/components/ProductBottle";
import SkinAnimation from "@/components/SkinAnimation";
import ScrollReveal from "@/components/ScrollReveal";
import TickerBar from "@/components/TickerBar";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="lg:min-h-[90vh] flex items-center bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* LHS — Skin Animation */}
            <div className="skin-wrap order-2 lg:order-1 h-[420px] sm:h-[520px] lg:h-[580px] rounded-sm overflow-hidden shadow-xl">
              <SkinAnimation />
            </div>

            {/* RHS — Text */}
            <div className="order-1 lg:order-2">
              {/* Founder teaser */}
              <Link
                href="/our-story"
                className="hero-quote-anim inline-block mb-5 text-sm font-[family-name:var(--font-cormorant)] italic text-muted-foreground hover:text-accent transition-colors link-anim-underline"
              >
                &ldquo;I scratched my arms in every meeting for 3 years.&rdquo; — Gunjan, Founder · Read my story →
              </Link>

              {/* Social proof badge */}
              <div className="hero-badge-anim inline-flex items-center gap-2 bg-secondary border border-border px-3 py-1.5 mb-5 ml-4">
                <span className="text-accent text-xs">★</span>
                <span className="text-xs font-medium text-foreground">India&apos;s First Dry Skin Resistant Regime</span>
              </div>

              <h1 className="font-[family-name:var(--font-cormorant)] text-5xl sm:text-7xl lg:text-8xl font-light leading-none tracking-tight mb-5 sm:mb-6">
                <span className="hero-line-1 block">End the</span>
                <span className="hero-line-2 block italic">dryness.</span>
              </h1>

              <p className="hero-subline-anim text-muted-foreground text-lg leading-relaxed mb-8 max-w-md">
                Tight skin after every shower. Itching you can&apos;t ignore.
                Products that work for an hour, then nothing.
                Quell is what actually fixes it.
              </p>

              <div className="hero-buttons-anim flex flex-col sm:flex-row gap-3 sm:gap-4 flex-wrap">
                <Link
                  href="/products"
                  className="bg-foreground text-background px-8 py-3.5 text-sm tracking-widest uppercase hover:bg-accent transition-colors text-center"
                >
                  Shop Now
                </Link>
                <Link
                  href="/science"
                  className="border border-foreground px-8 py-3.5 text-sm tracking-widest uppercase hover:bg-secondary transition-colors text-center"
                >
                  The Science
                </Link>
              </div>

              {/* Urgency line */}
              <p className="hero-urgency-anim text-xs text-muted-foreground mt-3">
                <Link href="/products/quell-dry-skin-regime-7-day-trial" className="link-anim-underline hover:text-accent transition-colors">
                  Try the 7-day pack — ₹149, risk free
                </Link>
              </p>

              {/* Stats */}
              <div className="hero-stats-anim flex flex-wrap items-center gap-x-5 gap-y-4 mt-8 pt-7 border-t border-border">
                <div>
                  <p className="text-xl sm:text-2xl font-[family-name:var(--font-cormorant)] font-light italic">Founder&apos;s skin</p>
                  <p className="text-xs text-muted-foreground tracking-wide">Built from lived experience</p>
                </div>
                <div className="w-px h-7 bg-border" />
                <div>
                  <p className="text-xl sm:text-2xl font-[family-name:var(--font-cormorant)] font-light">85%</p>
                  <p className="text-xs text-muted-foreground tracking-wide">India has hard water</p>
                </div>
                <div className="w-px h-7 bg-border" />
                <div>
                  <p className="text-xl sm:text-2xl font-[family-name:var(--font-cormorant)] font-light">7 days</p>
                  <p className="text-xs text-muted-foreground tracking-wide">Visible barrier repair</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Ticker bar */}
      <ScrollReveal className="w-full">
        <TickerBar />
      </ScrollReveal>

      {/* Brand Story Banner */}
      <ScrollReveal>
      <section className="bg-secondary py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">Why Quell</p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-5xl font-light leading-snug mb-6">
              Your skin is trying.<br />
              <span className="italic">Indian conditions make it harder.</span><br />
              We fix that.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Hard water leaves calcium and magnesium deposits on your skin after every shower.
              Over time, this disrupts your skin&apos;s lipid barrier — causing dryness, tightness, and sensitivity.
              Every Quell product is formulated to chelate, repair, and defend.
            </p>
            <Link
              href="/science"
              className="text-sm tracking-widest uppercase underline underline-offset-4 hover:text-accent transition-colors"
            >
              Read the science →
            </Link>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* Ingredients spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <ScrollReveal className="text-center mb-12">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">What&apos;s Inside</p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light">Key Ingredients</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {[
            {
              name: "Ceramide Complex",
              role: "Barrier Rebuilder",
              description: "Three ceramide types (NP, AP, EOP) that mimic your skin's natural lipid matrix.",
            },
            {
              name: "EDTA (Chelating Agent)",
              role: "Hard Water Fighter",
              description: "Binds and removes calcium and magnesium deposits left by hard water.",
            },
            {
              name: "Niacinamide",
              role: "Brightener + Soother",
              description: "Reduces post-inflammatory marks, minimizes pores, and strengthens barrier.",
            },
          ].map((ingredient, i) => (
            <ScrollReveal key={ingredient.name} delay={i * 100}>
              <div className="border border-border p-6 sm:p-8 h-full">
                <p className="text-xs tracking-widest uppercase text-accent mb-3">{ingredient.role}</p>
                <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-light mb-3">
                  {ingredient.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{ingredient.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Trial Hero Banner */}
      <ScrollReveal>
      <section className="py-10 sm:py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1A1815] rounded-sm overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-0">

            {/* Left — bottle visual */}
            <div className="flex items-center justify-center bg-[#C17A5A]/10 py-10 sm:py-14 px-6 sm:px-8">
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 bg-[#C17A5A]/30 rounded-full blur-3xl" />
                <ProductBottle
                  size="250ml"
                  side="front"
                  style={{ height: "260px", width: "auto", filter: "drop-shadow(0 20px 40px rgba(193,122,90,0.35))" }}
                  className="sm:!h-[340px]"
                />
              </div>
            </div>

            {/* Right — copy */}
            <div className="flex flex-col justify-center px-6 sm:px-10 py-10 sm:py-14">
              <span className="inline-flex items-center gap-2 bg-[#C17A5A] text-white text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 w-fit mb-5 sm:mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                New — Try Before You Commit
              </span>

              <h2 className="font-[family-name:var(--font-cormorant)] text-4xl sm:text-5xl lg:text-6xl font-light leading-tight text-white mb-3">
                7 Day<br /><span className="italic text-[#C17A5A]">Trial Pack</span>
              </h2>

              <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-2">
                250ml · Same full formula. Zero risk.
              </p>
              <p className="text-white/40 text-sm mb-6 sm:mb-8">
                Feel real barrier repair in your first week — then decide.
              </p>

              <div className="flex items-baseline gap-3 mb-6 sm:mb-8">
                <span className="font-[family-name:var(--font-cormorant)] text-4xl sm:text-5xl font-semibold text-white">₹149</span>
                <span className="text-white/40 text-sm line-through">₹215</span>
                <span className="text-[#C17A5A] text-sm font-medium">Risk-free trial</span>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/products/quell-dry-skin-regime-7-day-trial"
                  className="bg-[#C17A5A] text-white px-6 sm:px-8 py-3 sm:py-3.5 text-sm tracking-widest uppercase hover:bg-[#A8613C] transition-colors"
                >
                  Try for ₹149
                </Link>
                <Link
                  href="/products"
                  className="border border-white/20 text-white/70 px-6 sm:px-8 py-3 sm:py-3.5 text-sm tracking-widest uppercase hover:border-white/50 hover:text-white transition-colors"
                >
                  See All Packs
                </Link>
              </div>

              <p className="text-white/25 text-[10px] tracking-widest uppercase mt-6">
                Free shipping above ₹999 · Dermatologist tested
              </p>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* Reviews strip */}
      <ScrollReveal>
      <section className="bg-secondary py-14 sm:py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">What People Say</p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-light">Real skin. Real results.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                quote: "Finally something that actually works after my shower. My skin stopped feeling tight within a week.",
                name: "Priya M.",
                location: "Bengaluru",
              },
              {
                quote: "I thought dry skin was just my skin type. Turns out it was my water all along.",
                name: "Rohan S.",
                location: "Delhi",
              },
              {
                quote: "The 7-day trial convinced me. I'm now on my third monthly bottle.",
                name: "Ananya K.",
                location: "Mumbai",
              },
            ].map((review, i) => (
              <ScrollReveal key={review.name} delay={i * 100}>
                <div className="bg-background border border-border p-6 sm:p-8 flex flex-col gap-4 h-full">
                  <p className="text-accent tracking-widest text-sm">★★★★★</p>
                  <p className="text-sm leading-relaxed text-foreground flex-1">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-medium">{review.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{review.location}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* Products section */}
      <ScrollReveal>
      <section className="bg-background py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-sm text-muted-foreground mb-3 font-[family-name:var(--font-cormorant)] italic">
              One formula. Built around your water, your skin, your life.
            </p>
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">One Regime. Four Commitments.</p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl font-light mb-2">Quell Dry Skin Regime</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* Founder's Story */}
      <ScrollReveal>
      <section className="bg-secondary border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 lg:gap-20 items-start">

            {/* Left — story */}
            <div>
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-6">Founder&apos;s Story</p>
              <div className="relative">
                <span className="font-[family-name:var(--font-cormorant)] text-[120px] sm:text-[160px] leading-none text-accent/15 absolute -top-6 -left-4 select-none" aria-hidden>
                  &ldquo;
                </span>
                <div className="relative pl-4 sm:pl-6">
                  <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-5xl font-light leading-tight mb-8">
                    I scratched my arms in every meeting for three years.
                  </h2>
                  <div className="space-y-5 text-muted-foreground leading-relaxed">
                    <p>
                      Dry, tight, itchy skin that no cream could fix for more than an hour. I thought it was just my skin type.
                      I wore full sleeves in summer. I&apos;d catch myself scratching without even realising it.
                    </p>
                    <p>
                      It took me years to discover the actual cause — hard water. Every shower was silently stripping my skin
                      barrier. No moisturiser could keep up.
                    </p>
                    <p>
                      I looked for something built to actually fix this. There was nothing. So I made QUELL — ceramide-first,
                      barrier-focused, made for the skin conditions most Indians actually live with.
                    </p>
                    <p className="text-foreground font-medium">
                      If dry skin has ever made you feel less comfortable in your own body, this is for you.
                    </p>
                  </div>
                  <p className="mt-8 text-sm tracking-wide text-muted-foreground">— Gunjan Maheshwari, Founder</p>
                </div>
              </div>
            </div>

            {/* Right — founder card */}
            <div className="lg:pt-16">
              <div className="border border-border bg-background p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-5">
                  <span className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold text-accent tracking-wider">GM</span>
                </div>
                <p className="font-[family-name:var(--font-cormorant)] text-xl font-light mb-1">Gunjan Maheshwari</p>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">Founder, QUELL</p>
                <div className="w-8 h-px bg-accent/40 mx-auto mb-4" />
                <p className="text-xs text-muted-foreground italic mb-5">Built from personal experience</p>
                <Link
                  href="/our-story"
                  className="text-xs tracking-widest uppercase underline underline-offset-4 hover:text-accent transition-colors"
                >
                  Read the full story →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
      </ScrollReveal>
    </>
  );
}
