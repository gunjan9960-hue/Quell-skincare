import Link from "next/link";

export const metadata = { title: "The Science — QUELL Skincare" };

const steps = [
  {
    step: "01",
    title: "Hard water deposits land on your skin",
    body: "Every shower leaves behind calcium and magnesium ions. They don't rinse off — they bind to your skin's surface and stay.",
  },
  {
    step: "02",
    title: "Your lipid barrier degrades",
    body: "Mineral deposits disrupt the tight junction between skin cells. Your natural ceramide layer thins. Transepidermal water loss (TEWL) goes up.",
  },
  {
    step: "03",
    title: "Chronic dryness, tightness, sensitivity",
    body: "Without a healthy barrier, water evaporates faster than your skin can replenish it. The result: persistent dryness that moisturiser alone can't fix.",
  },
  {
    step: "04",
    title: "QUELL chelates, repairs, defends",
    body: "EDTA binds and neutralises the mineral deposits. Ceramides NP, AP, and EOP restack the lipid layer. Niacinamide reduces inflammation and rebuilds skin protein.",
  },
];

const studies = [
  {
    claim: "Ceramides restore the skin barrier",
    detail: "Clinical studies show topical ceramide application significantly reduces TEWL and improves skin hydration within 2–4 weeks of daily use.",
    source: "J Dermatol Sci, 2018",
  },
  {
    claim: "EDTA chelates hard-water minerals",
    detail: "Disodium EDTA is a well-established chelating agent that binds calcium and magnesium ions, preventing them from interacting with the skin's surface proteins.",
    source: "Int J Cosmetic Sci, 2021",
  },
  {
    claim: "Hard water accelerates skin barrier damage",
    detail: "Bathing with hard water (>200 ppm CaCO₃) significantly increases skin surface pH and reduces barrier function compared to softened water.",
    source: "J Invest Dermatology, 2020",
  },
  {
    claim: "Niacinamide reduces inflammation markers",
    detail: "4% niacinamide reduces IL-1α, IL-8 and significantly improves erythema and hyperpigmentation in 8 weeks of use.",
    source: "Br J Dermatol, 2019",
  },
];

export default function SciencePage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-foreground text-background py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs tracking-widest uppercase text-background/40 mb-4">The Science</p>
          <h1 className="font-[family-name:var(--font-cormorant)] text-5xl sm:text-7xl font-light leading-tight mb-6">
            Why your skin is dry.<br />
            <span className="italic text-accent">What we do about it.</span>
          </h1>
          <p className="text-background/60 text-lg leading-relaxed max-w-2xl mx-auto">
            Hard water is a chemical problem. QUELL is a chemical solution.
            Here&apos;s the exact mechanism.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">The Mechanism</p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light">How Hard Water Breaks Your Skin</h2>
        </div>
        <div className="space-y-0">
          {steps.map((s, i) => (
            <div key={s.step} className={`grid grid-cols-1 sm:grid-cols-[80px_1fr] gap-6 py-10 ${i < steps.length - 1 ? "border-b border-border" : ""}`}>
              <span className="font-[family-name:var(--font-cormorant)] text-5xl font-light text-accent/30 leading-none">{s.step}</span>
              <div>
                <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-light mb-2">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The fix */}
      <section className="bg-secondary py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">The Formula</p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light">Three actives. One system.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Ceramide NP + AP + EOP",
                role: "Barrier Rebuilder",
                detail: "Three ceramide subtypes that mimic your skin's natural intercellular lipid matrix. Applied together, they restack the lamellar structure that hard water degrades.",
              },
              {
                name: "Disodium EDTA",
                role: "Mineral Chelator",
                detail: "Binds calcium and magnesium ions at the skin surface — the exact minerals that hard water deposits after every shower. Neutralises the damage before it starts.",
              },
              {
                name: "Niacinamide 4%",
                role: "Barrier Strengthener",
                detail: "Upregulates ceramide synthesis, reduces TEWL, inhibits inflammatory cytokines. Clinically shown to improve barrier function in 4–8 weeks of use.",
              },
            ].map((item) => (
              <div key={item.name} className="bg-background border border-border p-8">
                <p className="text-xs tracking-widest uppercase text-accent mb-3">{item.role}</p>
                <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-light mb-3">{item.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research backing */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">Research Backed</p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light">The evidence base</h2>
        </div>
        <div className="space-y-0">
          {studies.map((s, i) => (
            <div key={s.claim} className={`py-8 ${i < studies.length - 1 ? "border-b border-border" : ""}`}>
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8">
                <div className="flex-1">
                  <h3 className="font-medium mb-2">{s.claim}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.detail}</p>
                </div>
                <span className="text-xs text-accent tracking-wide whitespace-nowrap">{s.source}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-foreground text-background py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light mb-4">
            Seven days is all it takes.
          </h2>
          <p className="text-background/60 mb-8">Try the Trial Pack — same full formula, zero risk.</p>
          <Link
            href="/products"
            className="inline-block bg-accent text-white px-8 py-3.5 text-sm tracking-widest uppercase hover:bg-accent/80 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </main>
  );
}
