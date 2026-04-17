"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, ChevronRight, Lock } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";

// ── Types ─────────────────────────────────────────────────────────
type ContactForm = { name: string; email: string; phone: string };
type AddressForm = {
  line1: string; line2: string;
  city: string; state: string; pincode: string;
};
type PaymentMethod = "upi" | "card" | "cod";
type Step = 1 | 2 | 3 | 4;

const STATES = [
  "Andhra Pradesh","Assam","Bihar","Chhattisgarh","Delhi","Goa","Gujarat",
  "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
  "Maharashtra","Manipur","Meghalaya","Odisha","Punjab","Rajasthan","Tamil Nadu",
  "Telangana","Uttar Pradesh","Uttarakhand","West Bengal",
];

// ── Progress bar ──────────────────────────────────────────────────
function StepBar({ step }: { step: Step }) {
  const labels = ["Contact", "Address", "Payment", "Review"];
  return (
    <div className="flex items-center gap-0 mb-10">
      {labels.map((label, i) => {
        const n = (i + 1) as Step;
        const done = step > n;
        const active = step === n;
        return (
          <div key={label} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                  done
                    ? "bg-accent text-accent-foreground"
                    : active
                    ? "bg-foreground text-background"
                    : "border border-border text-muted-foreground"
                }`}
              >
                {done ? <Check size={12} /> : n}
              </div>
              <span
                className={`text-[10px] tracking-widest uppercase ${
                  active ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </div>
            {i < 3 && (
              <div
                className={`flex-1 h-px mx-2 mb-4 transition-colors ${
                  step > n ? "bg-accent" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Order summary sidebar ─────────────────────────────────────────
function OrderSummary({ compact = false }: { compact?: boolean }) {
  const { items, total } = useCart();
  const shipping = total >= 999 ? 0 : 99;

  return (
    <div className={compact ? "" : "bg-secondary p-6 rounded-sm"}>
      <h3 className="font-[family-name:var(--font-cormorant)] text-xl font-light mb-5">
        Order Summary
      </h3>
      <div className="space-y-3 mb-5">
        {items.map(({ product, quantity }) => (
          <div key={product.id} className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {product.subtitle}
              {quantity > 1 && <span className="ml-1 text-xs">×{quantity}</span>}
            </span>
            <span>₹{(product.price * quantity).toLocaleString("en-IN")}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-border pt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>₹{total.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span className={shipping === 0 ? "text-accent" : ""}>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
        </div>
        <div className="flex justify-between font-semibold text-base pt-2 border-t border-border">
          <span>Total</span>
          <span>₹{(total + shipping).toLocaleString("en-IN")}</span>
        </div>
      </div>
    </div>
  );
}

// ── Field component ───────────────────────────────────────────────
function Field({
  label, value, onChange, placeholder, type = "text", required = true,
}: {
  label: string; value: string;
  onChange: (v: string) => void;
  placeholder?: string; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-1.5">
        {label}{required && <span className="text-accent ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-border focus:border-foreground outline-none bg-transparent px-4 py-3 text-sm transition-colors placeholder:text-muted-foreground/40"
      />
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────
export default function CheckoutFlow() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState<Step>(1);
  const [contact, setContact] = useState<ContactForm>({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
  });
  const [address, setAddress] = useState<AddressForm>({
    line1: "", line2: "", city: "", state: "", pincode: "",
  });
  const [payment, setPayment] = useState<PaymentMethod>("upi");
  const [upiId, setUpiId] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [placing, setPlacing] = useState(false);

  const shipping = total >= 999 ? 0 : 99;

  // Redirect if cart empty
  if (items.length === 0 && step !== 4) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-light mb-4">Your cart is empty</h1>
        <Link href="/products" className="bg-foreground text-background px-8 py-3.5 text-sm tracking-widest uppercase hover:bg-accent transition-colors">
          Shop Now
        </Link>
      </div>
    );
  }

  async function placeOrder() {
    setPlacing(true);
    await new Promise((r) => setTimeout(r, 1400));
    clearCart();
    router.push("/checkout/success");
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Header */}
      <div className="mb-8">
        <Link href="/cart" className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">
          ← Back to Cart
        </Link>
        <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-light mt-3">Checkout</h1>
      </div>

      {/* Progress */}
      <StepBar step={step} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">

        {/* ── Left: form steps ── */}
        <div className="lg:col-span-2">

          {/* ── Step 1: Contact ── */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-light mb-6">Contact Details</h2>

              <Field label="Full Name" value={contact.name}
                onChange={(v) => setContact({ ...contact, name: v })} placeholder="Priya Sharma" />
              <Field label="Email" type="email" value={contact.email}
                onChange={(v) => setContact({ ...contact, email: v })} placeholder="priya@example.com" />
              <div>
                <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-1.5">
                  Mobile <span className="text-accent">*</span>
                </label>
                <div className="flex border border-border focus-within:border-foreground transition-colors">
                  <span className="flex items-center px-3 text-sm text-muted-foreground border-r border-border bg-secondary select-none">+91</span>
                  <input
                    type="tel" inputMode="numeric" maxLength={10}
                    value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value.replace(/\D/g, "") })}
                    placeholder="98XXXXXXXX"
                    className="flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted-foreground/40"
                  />
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!contact.name || !contact.phone}
                className="w-full bg-foreground text-background py-3.5 text-sm tracking-widest uppercase hover:bg-accent transition-colors disabled:opacity-40 flex items-center justify-center gap-2 mt-2"
              >
                Continue to Address <ChevronRight size={14} />
              </button>
            </div>
          )}

          {/* ── Step 2: Address ── */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-light mb-6">Delivery Address</h2>

              <Field label="Address Line 1" value={address.line1}
                onChange={(v) => setAddress({ ...address, line1: v })} placeholder="House / Flat / Block No." />
              <Field label="Address Line 2" value={address.line2} required={false}
                onChange={(v) => setAddress({ ...address, line2: v })} placeholder="Street / Area / Colony (optional)" />
              <div className="grid grid-cols-2 gap-4">
                <Field label="City" value={address.city}
                  onChange={(v) => setAddress({ ...address, city: v })} placeholder="Mumbai" />
                <Field label="Pincode" value={address.pincode}
                  onChange={(v) => setAddress({ ...address, pincode: v.replace(/\D/g, "").slice(0, 6) })} placeholder="400001" />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-1.5">
                  State <span className="text-accent">*</span>
                </label>
                <select
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  className="w-full border border-border focus:border-foreground outline-none bg-transparent px-4 py-3 text-sm transition-colors text-foreground"
                >
                  <option value="" className="bg-background">Select state…</option>
                  {STATES.map((s) => (
                    <option key={s} value={s} className="bg-background">{s}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3.5 border border-border text-sm tracking-widest uppercase hover:bg-secondary transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!address.line1 || !address.city || !address.state || address.pincode.length !== 6}
                  className="flex-1 bg-foreground text-background py-3.5 text-sm tracking-widest uppercase hover:bg-accent transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
                >
                  Continue to Payment <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* ── Step 3: Payment ── */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-light mb-6">Payment Method</h2>

              {/* Method selector */}
              <div className="space-y-3">
                {([
                  { id: "upi", label: "UPI", sub: "Google Pay, PhonePe, Paytm" },
                  { id: "card", label: "Credit / Debit Card", sub: "Visa, Mastercard, RuPay" },
                  { id: "cod", label: "Cash on Delivery", sub: "Pay when your order arrives" },
                ] as { id: PaymentMethod; label: string; sub: string }[]).map((m) => (
                  <label
                    key={m.id}
                    className={`flex items-center gap-4 border px-5 py-4 cursor-pointer transition-colors ${
                      payment === m.id ? "border-foreground bg-secondary" : "border-border hover:border-foreground/40"
                    }`}
                  >
                    <input
                      type="radio" name="payment" value={m.id}
                      checked={payment === m.id}
                      onChange={() => setPayment(m.id)}
                      className="accent-foreground"
                    />
                    <div>
                      <p className="text-sm font-medium">{m.label}</p>
                      <p className="text-xs text-muted-foreground">{m.sub}</p>
                    </div>
                  </label>
                ))}
              </div>

              {/* UPI input */}
              {payment === "upi" && (
                <Field label="UPI ID" value={upiId} onChange={setUpiId}
                  placeholder="yourname@upi" />
              )}

              {/* Card inputs */}
              {payment === "card" && (
                <div className="space-y-4">
                  <Field label="Card Number" value={cardNum}
                    onChange={(v) => setCardNum(v.replace(/\D/g, "").slice(0, 16))} placeholder="1234 5678 9012 3456" />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Expiry (MM/YY)" value={cardExpiry}
                      onChange={(v) => setCardExpiry(v.replace(/[^0-9/]/g, "").slice(0, 5))} placeholder="08/28" />
                    <Field label="CVV" value={cardCvv}
                      onChange={(v) => setCardCvv(v.replace(/\D/g, "").slice(0, 4))} placeholder="•••" type="password" />
                  </div>
                </div>
              )}

              {/* COD note */}
              {payment === "cod" && (
                <div className="bg-secondary border border-border px-5 py-4 text-sm text-muted-foreground">
                  Cash on delivery available for all orders. Please keep exact change ready.
                </div>
              )}

              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Lock size={11} /> 256-bit SSL encrypted · Your payment is secure
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3.5 border border-border text-sm tracking-widest uppercase hover:bg-secondary transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="flex-1 bg-foreground text-background py-3.5 text-sm tracking-widest uppercase hover:bg-accent transition-colors flex items-center justify-center gap-2"
                >
                  Review Order <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* ── Step 4: Review & Place Order ── */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-light mb-6">Review Your Order</h2>

              {/* Review sections */}
              {[
                {
                  title: "Contact", editStep: 1 as Step,
                  lines: [contact.name, contact.email, `+91 ${contact.phone}`].filter(Boolean),
                },
                {
                  title: "Delivery Address", editStep: 2 as Step,
                  lines: [address.line1, address.line2, `${address.city}, ${address.state} – ${address.pincode}`].filter(Boolean),
                },
                {
                  title: "Payment", editStep: 3 as Step,
                  lines: [
                    payment === "upi" ? `UPI — ${upiId}` :
                    payment === "card" ? `Card ending ••••${cardNum.slice(-4)}` :
                    "Cash on Delivery",
                  ],
                },
              ].map((section) => (
                <div key={section.title} className="border border-border p-5">
                  <div className="flex justify-between items-start mb-3">
                    <p className="text-xs tracking-widest uppercase text-muted-foreground">{section.title}</p>
                    <button
                      onClick={() => setStep(section.editStep)}
                      className="text-xs tracking-widest uppercase text-accent hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                  {section.lines.map((l) => (
                    <p key={l} className="text-sm text-foreground leading-relaxed">{l}</p>
                  ))}
                </div>
              ))}

              {/* Mobile order summary */}
              <div className="lg:hidden">
                <OrderSummary compact />
              </div>

              <button
                onClick={placeOrder}
                disabled={placing}
                className="w-full bg-accent text-accent-foreground py-4 text-sm tracking-widest uppercase hover:bg-foreground transition-colors disabled:opacity-60 font-medium"
              >
                {placing ? "Placing Order…" : `Place Order · ₹${(total + shipping).toLocaleString("en-IN")}`}
              </button>

              <p className="text-xs text-muted-foreground text-center">
                By placing this order you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          )}
        </div>

        {/* ── Right: Order summary (sticky, desktop) ── */}
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
