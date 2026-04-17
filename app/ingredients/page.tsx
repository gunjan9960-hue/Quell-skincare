import Link from "next/link";

export const metadata = { title: "Ingredients — QUELL Skincare" };

const ingredients = [
  {
    name: "Ceramide NP",
    category: "Barrier Lipid",
    color: "text-accent",
    whatItIs: "A naturally occurring ceramide subtype (Ceramide 3) found in high concentration in healthy skin.",
    whatItDoes: "Forms the backbone of the skin's intercellular lipid matrix. Reduces transepidermal water loss (TEWL) by filling gaps between skin cells.",
    whyWeUseIt: "Hard water degrades ceramide NP specifically. Replenishing it is the single most important step in barrier repair.",
    clinicalData: "Clinical studies show 40–60% reduction in TEWL within 4 weeks of twice-daily application.",
  },
  {
    name: "Ceramide AP",
    category: "Barrier Lipid",
    color: "text-accent",
    whatItIs: "An alpha-hydroxy acid-based ceramide (Ceramide 6-II) that makes up ~10% of the skin's natural ceramide content.",
    whatItDoes: "Works in conjunction with Ceramide NP to restore lamellar body secretion and improve barrier integrity.",
    whyWeUseIt: "Ceramide AP targets the deeper layers of the stratum corneum, addressing damage that surface-only ceramides miss.",
    clinicalData: "Shown to improve skin smoothness and reduce fine lines when combined with NP and EOP.",
  },
  {
    name: "Ceramide EOP",
    category: "Barrier Lipid",
    color: "text-accent",
    whatItIs: "An ester-linked omega-hydroxy ceramide (Ceramide 1) that anchors the lipid bilayer to corneocytes.",
    whatItDoes: "Acts as the 'glue' that holds the lamellar lipid structure together. Without it, NP and AP can't form a coherent barrier.",
    whyWeUseIt: "Ceramide EOP is the least abundant but most structurally critical ceramide. Including all three types mimics the skin's natural lipid profile exactly.",
    clinicalData: "The NP+AP+EOP combination has been shown to be significantly more effective than any single ceramide alone.",
  },
  {
    name: "Disodium EDTA",
    category: "Chelating Agent",
    color: "text-foreground",
    whatItIs: "Ethylenediaminetetraacetic acid — a pharmaceutical-grade metal ion chelator.",
    whatItDoes: "Binds calcium and magnesium ions (the minerals in hard water) at the skin surface, neutralising them before they can damage the barrier.",
    whyWeUseIt: "No other skincare ingredient directly addresses hard water mineral deposits. EDTA is the only evidence-backed solution.",
    clinicalData: "Used in pharmaceutical formulations for decades. Shown to significantly reduce mineral ion concentration on skin surface within 5 minutes of application.",
  },
  {
    name: "Niacinamide 4%",
    category: "Barrier Strengthener",
    color: "text-foreground",
    whatItIs: "The active amide form of Vitamin B3. Used at 4% — the clinically validated effective concentration.",
    whatItDoes: "Upregulates ceramide synthesis in skin cells, reducing TEWL and improving barrier function. Also inhibits inflammatory cytokines and reduces hyperpigmentation.",
    whyWeUseIt: "Niacinamide doesn't just repair damage — it helps your skin produce more ceramides on its own, creating a compounding effect over time.",
    clinicalData: "Clinical trials show 4% niacinamide reduces TEWL by 24% and hyperpigmentation by 35–45% in 8 weeks.",
  },
  {
    name: "Hyaluronic Acid",
    category: "Humectant",
    color: "text-muted-foreground",
    whatItIs: "A naturally occurring polysaccharide found throughout the body. QUELL uses a multi-molecular-weight blend (high and low).",
    whatItDoes: "Draws water from the environment and deeper skin layers to the surface. High MW sits on top for surface hydration; low MW penetrates for deeper moisture.",
    whyWeUseIt: "Ceramide repair works best on well-hydrated skin. Hyaluronic acid creates the hydration environment that ceramides need to function optimally.",
    clinicalData: "Multi-weight HA shown to increase skin moisture content by 40–60% compared to single-weight HA.",
  },
  {
    name: "Glycerin",
    category: "Humectant",
    color: "text-muted-foreground",
    whatItIs: "A plant-derived humectant extracted from vegetable oils (coconut or palm-based). One of the most well-researched moisturising ingredients in skincare, used for over 200 years.",
    whatItDoes: "Pulls moisture from the air and from deeper skin layers up to the surface, then holds it there. Works as a water reservoir within the skin. Also strengthens the skin's natural moisturising factor (NMF) — the system responsible for keeping skin hydrated between washes.",
    whyWeUseIt: "Ceramides repair the barrier. Hyaluronic acid adds water. Glycerin locks it in. All three work together — removing any one of them weakens the entire system. For skin damaged by hard water, this triple-hydration approach is essential.",
    clinicalData: "Shown to increase skin hydration by up to 50% within 1 hour of application. Long-term use (4+ weeks) shown to restore impaired skin barrier function in clinical models of dry skin.",
    sourcingNote: "Our glycerin is vegetable-derived from plant oils. We are currently working toward organic certification for this ingredient.",
  },
  {
    name: "Panthenol (Vitamin B5)",
    category: "Barrier Repair",
    color: "text-muted-foreground",
    whatItIs: "Pro-vitamin B5, which converts to pantothenic acid in the skin — an essential nutrient for skin metabolism.",
    whatItDoes: "Penetrates to the dermis and stimulates skin cell proliferation and wound healing. Reduces inflammation and improves skin elasticity.",
    whyWeUseIt: "Panthenol complements ceramide repair by accelerating the regeneration of damaged skin cells. It's the recovery agent in the formula.",
    clinicalData: "Shown to accelerate barrier repair by 30–40% compared to untreated control in barrier disruption models.",
  },
] as const;

export default function IngredientsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-foreground text-background py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs tracking-widest uppercase text-background/40 mb-4">Ingredients</p>
          <h1 className="font-[family-name:var(--font-cormorant)] text-5xl sm:text-7xl font-light leading-tight mb-6">
            Nothing hidden.<br />
            <span className="italic text-accent">Everything explained.</span>
          </h1>
          <p className="text-background/60 text-lg leading-relaxed max-w-2xl">
            Every ingredient in QUELL is there for a specific, evidence-backed reason.
            No fillers. No fragrance. No shortcuts.
            Here&apos;s what each one does — and exactly why we chose it.
          </p>
        </div>
      </section>

      {/* Ingredients list */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-0">
          {ingredients.map((ing, i) => (
            <div key={ing.name}>
              <div
                className={`py-12 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 lg:gap-16 ${i < ingredients.length - 1 ? "border-b border-border" : ""}`}
              >
                {/* Left */}
                <div>
                  <p className={`text-xs tracking-widest uppercase mb-2 ${ing.color}`}>{ing.category}</p>
                  <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-light">{ing.name}</h2>
                </div>

                {/* Right */}
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">What it is</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{ing.whatItIs}</p>
                    </div>
                    <div>
                      <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">What it does</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{ing.whatItDoes}</p>
                    </div>
                    <div>
                      <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">Why we use it</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{ing.whyWeUseIt}</p>
                    </div>
                    <div>
                      <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">Clinical data</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{ing.clinicalData}</p>
                    </div>
                  </div>
                  {"sourcingNote" in ing && ing.sourcingNote && (
                    <p className="mt-5 text-xs text-muted-foreground italic border-t border-border pt-4">
                      {ing.sourcingNote}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How they work together */}
      <section className="bg-secondary py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl font-light mb-3">
              Seven ingredients. One system.
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl mx-auto">
              Each ingredient in QUELL targets a specific part of the dry skin problem.
              Together they form a complete repair system — not just a moisturiser.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border border-border overflow-hidden">
            {[
              {
                step: "Step 1 — Remove",
                label: "CHELATE",
                body: "EDTA binds and neutralises hard water mineral deposits the moment you apply it.",
              },
              {
                step: "Step 2 — Rebuild",
                label: "REPAIR",
                body: "Ceramide NP, AP & EOP rebuild the lipid barrier that hard water has stripped.",
              },
              {
                step: "Step 3 — Hold",
                label: "HYDRATE",
                body: "Glycerin, Hyaluronic Acid & Panthenol flood the repaired barrier with moisture and lock it in.",
              },
            ].map((col, i) => (
              <div
                key={col.label}
                className={`p-8 sm:p-10 ${i < 2 ? "sm:border-r border-b sm:border-b-0 border-border" : ""}`}
              >
                <p className="text-xs tracking-widest uppercase text-accent mb-3">{col.step}</p>
                <p className="font-[family-name:var(--font-cormorant)] text-2xl font-light mb-4">{col.label}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{col.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we don't use */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-light">What we don&apos;t use</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {["Fragrance", "Parabens", "Sulphates", "Mineral Oil", "Artificial Dyes", "Silicones"].map((item) => (
              <div key={item} className="border border-border bg-background py-4 px-2">
                <p className="text-xs tracking-wide line-through text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-border">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-light mb-4">
            Questions about the formula?
          </h2>
          <p className="text-muted-foreground mb-6 text-sm">Our team can walk you through anything.</p>
          <Link
            href="/contact"
            className="inline-block border border-foreground px-8 py-3 text-sm tracking-widest uppercase hover:bg-foreground hover:text-background transition-colors"
          >
            Ask Us
          </Link>
        </div>
      </section>
    </main>
  );
}
