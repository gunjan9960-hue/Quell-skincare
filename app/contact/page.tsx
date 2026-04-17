"use client";

import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main>
      {/* Hero */}
      <section className="bg-secondary py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">Contact</p>
          <h1 className="font-[family-name:var(--font-cormorant)] text-5xl sm:text-6xl font-light leading-tight">
            Get in touch
          </h1>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Left — info */}
          <div>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Whether you have a question about the formula, an order issue, or just want to say hi
              — we read every message and reply within 24 hours.
            </p>

            <div className="space-y-8">
              <div>
                <p className="text-xs tracking-widest uppercase text-accent mb-2">Email</p>
                <p className="text-sm">hello@quellskincare.in</p>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase text-accent mb-2">WhatsApp</p>
                <p className="text-sm">+91 99999 00000</p>
                <p className="text-xs text-muted-foreground mt-1">Mon–Sat, 10am–6pm IST</p>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase text-accent mb-2">Returns & Orders</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  For returns, refunds, or order status — include your order ID in the message and we&apos;ll sort it quickly.
                </p>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div>
            {sent ? (
              <div className="border border-border p-10 text-center">
                <p className="font-[family-name:var(--font-cormorant)] text-3xl font-light mb-3">Message sent.</p>
                <p className="text-sm text-muted-foreground">We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">Message</label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors resize-none"
                    placeholder="What would you like to know?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-foreground text-background py-3.5 text-sm tracking-widest uppercase hover:bg-accent transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

        </div>
      </section>
    </main>
  );
}
