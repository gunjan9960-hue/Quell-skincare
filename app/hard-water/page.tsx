import Link from "next/link";

export const metadata = { title: "Hard Water & Skin — QUELL Skincare" };

const cities = [
  { city: "Delhi", ppm: "380–420", level: "Very Hard" },
  { city: "Mumbai", ppm: "120–180", level: "Hard" },
  { city: "Bangalore", ppm: "180–250", level: "Hard" },
  { city: "Chennai", ppm: "200–280", level: "Hard" },
  { city: "Hyderabad", ppm: "220–310", level: "Hard" },
  { city: "Pune", ppm: "160–220", level: "Hard" },
  { city: "Ahmedabad", ppm: "280–360", level: "Very Hard" },
  { city: "Jaipur", ppm: "300–400", level: "Very Hard" },
];

const symptoms = [
  { title: "Tight, dry skin after showering", detail: "If your skin feels tight within 10 minutes of getting out of the shower, hard water mineral deposits are disrupting your barrier." },
  { title: "Moisturiser isn't working", detail: "Hard water deposits sit on top of your skin and reduce absorption. You're applying product over a mineral film — not skin." },
  { title: "Flaky patches that don't go away", detail: "Chronic barrier disruption leads to desquamation (skin shedding) faster than normal. The flakiness is dead cells, not dryness per se." },
  { title: "Sensitivity that appeared out of nowhere", detail: "A compromised lipid barrier lets irritants in more easily. Fragrance, pollution, even fabric can trigger reactions." },
  { title: "Dullness that skincare can't fix", detail: "Mineral deposits scatter light and give skin a grey, chalky appearance. No serum fixes this — you need to chelate the minerals." },
];

export default function HardWaterPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-secondary py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">Hard Water & Skin</p>
          <h1 className="font-[family-name:var(--font-cormorant)] text-5xl sm:text-7xl font-light leading-tight mb-6">
            85% of India<br />
            <span className="italic">has hard water.</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mb-10">
            Hard water is tap water with high concentrations of dissolved calcium and magnesium.
            It&apos;s invisible. It leaves no stain. But every shower deposits a microscopic mineral
            film on your skin — and over time, that film destroys your barrier.
          </p>
          <div className="flex gap-8">
            <div>
              <p className="font-[family-name:var(--font-cormorant)] text-5xl font-light">85%</p>
              <p className="text-xs text-muted-foreground tracking-wide mt-1">of India has hard water</p>
            </div>
            <div className="w-px bg-border" />
            <div>
              <p className="font-[family-name:var(--font-cormorant)] text-5xl font-light">200+</p>
              <p className="text-xs text-muted-foreground tracking-wide mt-1">ppm in most Indian cities</p>
            </div>
            <div className="w-px bg-border" />
            <div>
              <p className="font-[family-name:var(--font-cormorant)] text-5xl font-light">365</p>
              <p className="text-xs text-muted-foreground tracking-wide mt-1">days of damage per year</p>
            </div>
          </div>
        </div>
      </section>

      {/* City hardness table */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">Your City</p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light">Water hardness across India</h2>
          <p className="text-muted-foreground mt-3 text-sm">Anything above 150 ppm is considered hard. Above 300 ppm is very hard.</p>
        </div>
        <div className="border border-border overflow-hidden">
          <div className="grid grid-cols-3 bg-foreground text-background text-xs tracking-widest uppercase px-6 py-3">
            <span>City</span>
            <span>Hardness (ppm CaCO₃)</span>
            <span>Classification</span>
          </div>
          {cities.map((c, i) => (
            <div key={c.city} className={`grid grid-cols-3 px-6 py-4 text-sm ${i % 2 === 0 ? "bg-background" : "bg-secondary"}`}>
              <span className="font-medium">{c.city}</span>
              <span className="text-muted-foreground">{c.ppm}</span>
              <span className={c.level === "Very Hard" ? "text-accent font-medium" : "text-muted-foreground"}>{c.level}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">Source: BIS / State water authority data, 2023</p>
      </section>

      {/* Symptoms */}
      <section className="bg-secondary py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">Signs You&apos;re Affected</p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light">Five symptoms of hard water skin</h2>
          </div>
          <div className="space-y-0">
            {symptoms.map((s, i) => (
              <div key={s.title} className={`py-8 grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4 sm:gap-12 ${i < symptoms.length - 1 ? "border-b border-border" : ""}`}>
                <h3 className="font-[family-name:var(--font-cormorant)] text-xl font-light">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What QUELL does */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">The Solution</p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light leading-snug mb-6">
              You can&apos;t change your water.<br />
              <span className="italic">You can change what it does to your skin.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              QUELL uses EDTA — a pharmaceutical-grade chelating agent — to bind and neutralise the
              calcium and magnesium ions that hard water leaves behind. Applied after your shower,
              it intercepts the damage before it compounds.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Paired with three ceramide types and niacinamide, it repairs what hard water has already
              degraded — and defends against what&apos;s coming tomorrow.
            </p>
            <Link
              href="/science"
              className="text-sm tracking-widest uppercase underline underline-offset-4 hover:text-accent transition-colors"
            >
              Read the full science →
            </Link>
          </div>
          <div className="bg-secondary border border-border p-8 space-y-6">
            {[
              ["EDTA chelates minerals", "Applied to damp skin, EDTA binds hard water deposits before they can damage the barrier."],
              ["Ceramides rebuild", "Three ceramide types restack the lipid layer that hard water has degraded."],
              ["Niacinamide defends", "Upregulates natural ceramide production and reduces inflammation."],
            ].map(([title, body]) => (
              <div key={title}>
                <p className="text-xs tracking-widest uppercase text-accent mb-2">{title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-foreground text-background py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light mb-4">
            Start with 7 days. See the difference.
          </h2>
          <p className="text-background/60 mb-8">₹149 trial pack — free shipping on orders above ₹999.</p>
          <Link
            href="/products"
            className="inline-block bg-accent text-white px-8 py-3.5 text-sm tracking-widest uppercase hover:bg-accent/80 transition-colors"
          >
            Shop QUELL
          </Link>
        </div>
      </section>
    </main>
  );
}
