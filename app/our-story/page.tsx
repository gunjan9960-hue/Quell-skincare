import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story — QUELL Skincare",
  description: "Why Gunjan Maheshwari built QUELL — India's first hard-water defense skincare brand.",
};

export default function OurStoryPage() {
  return (
    <main>
      {/* Full-bleed editorial header */}
      <section className="bg-secondary border-b border-border py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-8">Our Story</p>

          {/* Giant opening quote */}
          <div className="relative">
            <span
              className="font-[family-name:var(--font-cormorant)] text-[140px] sm:text-[200px] leading-none text-accent/10 absolute -top-8 -left-6 select-none pointer-events-none"
              aria-hidden
            >
              &ldquo;
            </span>
            <h1 className="font-[family-name:var(--font-cormorant)] text-4xl sm:text-5xl lg:text-6xl font-light leading-tight relative">
              I scratched my arms in every meeting for three years.
            </h1>
          </div>
        </div>
      </section>

      {/* Story body */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="space-y-7 text-lg leading-relaxed text-muted-foreground">
          <p>
            Dry, tight, itchy skin that no cream could fix for more than an hour. I wore full sleeves
            in summer. I&apos;d catch myself scratching in meetings, on calls, without even realising it.
          </p>

          <p className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-foreground italic">
            I thought it was just my skin type. I was wrong.
          </p>

          <p>
            Every shower was silently stripping my skin barrier — hard water minerals building up, day
            after day, undoing whatever I put on. No moisturiser could keep up with that kind of daily
            damage.
          </p>

          <p>
            I looked for something built to actually fix this — ceramide-first, with EDTA to fight the
            minerals, made for Indian skin and Indian conditions. There was nothing.
          </p>

          <p className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-foreground italic">
            So I made QUELL.
          </p>

          <p>
            If dry skin has ever made you feel less comfortable in your own body — this is for you.
          </p>
        </div>

        {/* Attribution */}
        <div className="mt-12 pt-10 border-t border-border flex items-center gap-5">
          <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
            <span className="font-[family-name:var(--font-cormorant)] text-lg font-semibold text-accent">GM</span>
          </div>
          <div>
            <p className="font-medium text-sm">Gunjan Maheshwari</p>
            <p className="text-xs text-muted-foreground tracking-wide mt-0.5">Founder, QUELL Skincare</p>
          </div>
        </div>
      </section>

      {/* What QUELL is */}
      <section className="bg-secondary border-t border-border py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-6">What QUELL Is</p>
          <div className="space-y-6">
            {[
              ["Ceramide-first", "Three ceramide types — NP, AP, EOP — that rebuild the exact lipid layer hard water degrades."],
              ["EDTA-powered", "A chelating agent that binds and neutralises mineral deposits before they damage your barrier."],
              ["Built for India", "Formulated for the specific conditions Indian skin faces — hard water, humidity, pollution, and AC dryness."],
            ].map(([title, body]) => (
              <div key={title} className="grid grid-cols-[140px_1fr] gap-6 items-start border-b border-border pb-6 last:border-0 last:pb-0">
                <p className="text-xs tracking-widest uppercase text-accent pt-0.5">{title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-24">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl sm:text-5xl font-light mb-3">
            Ready to end the dryness?
          </h2>
          <p className="text-muted-foreground mb-8 text-sm">
            Start with the 7 Day Trial — same full formula, ₹149, zero risk.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="bg-foreground text-background px-8 py-3.5 text-sm tracking-widest uppercase hover:bg-accent transition-colors"
            >
              Shop Now
            </Link>
            <Link
              href="/science"
              className="border border-foreground px-8 py-3.5 text-sm tracking-widest uppercase hover:bg-secondary transition-colors"
            >
              The Science
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
