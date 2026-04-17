"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    category: "The Product",
    items: [
      {
        q: "What is QUELL and who is it for?",
        a: "QUELL is India's first hard-water defense skincare brand. It's for anyone in India who showers with tap water — which is 85% of the population. If your skin feels tight after showering, if moisturiser doesn't seem to work, or if you have persistent dryness, QUELL is formulated for you.",
      },
      {
        q: "What's in the formula?",
        a: "The core actives are: Ceramide NP, AP, and EOP (three ceramide types that rebuild the skin's lipid barrier), Disodium EDTA (chelates calcium and magnesium deposits from hard water), Niacinamide 4% (barrier strengthener, reduces inflammation), Hyaluronic Acid (deep hydration), and Panthenol / Vitamin B5 (barrier repair). Full ingredients are on the label.",
      },
      {
        q: "Is it safe for sensitive skin?",
        a: "Yes. QUELL is fragrance-free, paraben-free, and dermatologist tested. All actives are at clinically validated concentrations. It's suitable for sensitive, dry, and combination skin.",
      },
      {
        q: "Can I use it on my face and body?",
        a: "Yes. The formula is designed for both face and body. Apply 1–2 pumps to face, 3–4 pumps to body. Use on damp skin within 60 seconds of showering.",
      },
    ],
  },
  {
    category: "How to Use",
    items: [
      {
        q: "When and how should I apply QUELL?",
        a: "Apply to damp skin within 60 seconds of stepping out of the shower. This is the critical window — your skin is still hydrated and the mineral deposits are freshest. Work in with gentle circular motions. Do not rinse off.",
      },
      {
        q: "Do I still need a moisturiser?",
        a: "QUELL is a leave-on treatment moisturiser — it functions as both the active treatment and your daily moisturiser. Most users don't need an additional moisturiser. If you have very dry skin, you can layer a plain ceramide cream on top.",
      },
      {
        q: "How long before I see results?",
        a: "Most users notice a difference in skin texture within 7 days. Visible barrier improvement (reduced tightness, less flakiness, better glow) typically shows in 2–4 weeks of daily use.",
      },
    ],
  },
  {
    category: "Packs & Pricing",
    items: [
      {
        q: "Which pack should I buy?",
        a: "Start with the 7 Day Trial Pack (₹149, 250ml) — it's the same formula, just smaller. If you're convinced after a week, move to the 30 Day Pack (₹449) or Quarter Pack (₹1,299) for better value.",
      },
      {
        q: "Why are the larger packs so much cheaper per ml?",
        a: "Manufacturing and packaging costs are largely fixed. A 3L pack costs us almost the same to produce as a 1L pack. We pass that saving directly to you. The Yearly Pack works out to ₹42/month.",
      },
      {
        q: "Is there a subscription option?",
        a: "Not yet — but it's coming. For now, the Quarter and Yearly packs give you the best price per day.",
      },
    ],
  },
  {
    category: "Orders & Shipping",
    items: [
      {
        q: "How long does delivery take?",
        a: "Standard delivery is 5–7 business days across India. Express delivery (2–3 days) is available for ₹99 extra. We ship from Mumbai via trusted courier partners.",
      },
      {
        q: "Is shipping free?",
        a: "Yes — free standard shipping on all orders above ₹999. Orders below ₹999 have a ₹99 shipping fee.",
      },
      {
        q: "Can I return the product?",
        a: "Yes. If you're not satisfied within 30 days of delivery, contact us at hello@quellskincare.in and we'll arrange a full refund. No questions asked. We only ask that the bottle is less than 50% used.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left hover:text-accent transition-colors"
      >
        <span className="font-medium text-sm leading-relaxed">{q}</span>
        {open ? <Minus size={16} className="flex-shrink-0 mt-0.5 text-accent" /> : <Plus size={16} className="flex-shrink-0 mt-0.5 text-muted-foreground" />}
      </button>
      {open && (
        <p className="text-sm text-muted-foreground leading-relaxed pb-5 pr-8">{a}</p>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-secondary py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">FAQ</p>
          <h1 className="font-[family-name:var(--font-cormorant)] text-5xl sm:text-6xl font-light leading-tight mb-4">
            Common questions
          </h1>
          <p className="text-muted-foreground">
            Can&apos;t find what you&apos;re looking for?{" "}
            <Link href="/contact" className="underline underline-offset-4 hover:text-accent transition-colors">
              Contact us
            </Link>
          </p>
        </div>
      </section>

      {/* FAQ sections */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {faqs.map((section) => (
            <div key={section.category}>
              <p className="text-xs tracking-widest uppercase text-accent mb-6">{section.category}</p>
              <div className="border-t border-border">
                {section.items.map((item) => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still have questions */}
      <section className="bg-secondary py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-light mb-3">Still have a question?</h2>
          <p className="text-muted-foreground mb-6 text-sm">We typically reply within 24 hours.</p>
          <Link
            href="/contact"
            className="inline-block border border-foreground px-8 py-3 text-sm tracking-widest uppercase hover:bg-foreground hover:text-background transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </main>
  );
}
