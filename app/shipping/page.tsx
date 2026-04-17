import Link from "next/link";

export const metadata = { title: "Shipping & Returns — QUELL Skincare" };

export default function ShippingPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-secondary py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">Policies</p>
          <h1 className="font-[family-name:var(--font-cormorant)] text-5xl sm:text-6xl font-light leading-tight">
            Shipping & Returns
          </h1>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        {/* Shipping */}
        <div>
          <p className="text-xs tracking-widest uppercase text-accent mb-6">Shipping</p>
          <div className="space-y-0 border-t border-border">
            {[
              {
                title: "Free standard shipping",
                detail: "All orders above ₹999 ship free via our standard courier service. Delivery takes 5–7 business days across India.",
              },
              {
                title: "Standard shipping fee",
                detail: "Orders below ₹999 have a flat ₹99 shipping fee. Applied at checkout.",
              },
              {
                title: "Express shipping",
                detail: "Express delivery (2–3 business days) is available for ₹99 on all orders, regardless of order value. Select at checkout.",
              },
              {
                title: "Where we ship",
                detail: "We currently ship across India, including all major metros and tier-2 cities. Remote PIN codes may take an additional 2–3 days. International shipping is not available yet.",
              },
              {
                title: "Order processing",
                detail: "Orders placed before 2pm IST on weekdays are dispatched the same day. Orders placed after 2pm or on weekends are dispatched the next business day.",
              },
              {
                title: "Tracking",
                detail: "A tracking link is sent via WhatsApp and email once your order is dispatched. You can track your package in real time.",
              },
            ].map((item, i, arr) => (
              <div key={item.title} className={`py-7 ${i < arr.length - 1 ? "border-b border-border" : ""}`}>
                <h3 className="font-medium mb-2 text-sm">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Returns */}
        <div>
          <p className="text-xs tracking-widest uppercase text-accent mb-6">Returns & Refunds</p>
          <div className="space-y-0 border-t border-border">
            {[
              {
                title: "30-day satisfaction guarantee",
                detail: "If you're not happy with QUELL for any reason, contact us within 30 days of delivery and we'll issue a full refund. No questions asked.",
              },
              {
                title: "Return condition",
                detail: "We ask that the product is less than 50% used before requesting a return. This lets us understand how much of the product you've actually tried.",
              },
              {
                title: "How to request a return",
                detail: "Email hello@quellskincare.in or WhatsApp us at +91 99999 00000 with your order ID and reason. We'll arrange a pickup from your address at no cost.",
              },
              {
                title: "Refund timeline",
                detail: "Refunds are processed within 5–7 business days of us receiving the return. The credit will appear in your original payment method.",
              },
              {
                title: "Damaged or incorrect orders",
                detail: "If you receive a damaged product or the wrong item, contact us within 48 hours with a photo. We'll send a replacement immediately at no charge — no return necessary.",
              },
            ].map((item, i, arr) => (
              <div key={item.title} className={`py-7 ${i < arr.length - 1 ? "border-b border-border" : ""}`}>
                <h3 className="font-medium mb-2 text-sm">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Summary table */}
        <div>
          <p className="text-xs tracking-widest uppercase text-accent mb-6">Quick Reference</p>
          <div className="border border-border overflow-hidden">
            <div className="grid grid-cols-2 bg-foreground text-background text-xs tracking-widest uppercase px-6 py-3">
              <span>Service</span>
              <span>Details</span>
            </div>
            {[
              ["Standard shipping", "Free above ₹999 · ₹99 below · 5–7 days"],
              ["Express shipping", "₹99 · 2–3 days"],
              ["Order cutoff", "2pm IST weekdays"],
              ["Returns window", "30 days from delivery"],
              ["Refund timeline", "5–7 business days"],
              ["Damaged items", "Replacement dispatched same day"],
            ].map(([service, detail], i) => (
              <div key={service} className={`grid grid-cols-2 px-6 py-4 text-sm ${i % 2 === 0 ? "bg-background" : "bg-secondary"}`}>
                <span className="font-medium">{service}</span>
                <span className="text-muted-foreground">{detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact prompt */}
        <div className="border border-border p-8 text-center">
          <p className="text-muted-foreground text-sm mb-4">Still have questions about your order?</p>
          <Link
            href="/contact"
            className="inline-block border border-foreground px-8 py-3 text-sm tracking-widest uppercase hover:bg-foreground hover:text-background transition-colors"
          >
            Contact Us
          </Link>
        </div>

      </section>
    </main>
  );
}
