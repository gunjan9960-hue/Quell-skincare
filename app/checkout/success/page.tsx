import Link from "next/link";

export const metadata = { title: "Order Placed — QUELL" };

export default function SuccessPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center">
        {/* Checkmark */}
        <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-8">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">Order Confirmed</p>
        <h1 className="font-[family-name:var(--font-cormorant)] text-5xl font-light mb-4">
          Thank you.
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-2">
          Your order has been placed successfully.
        </p>
        <p className="text-sm text-muted-foreground mb-10">
          A confirmation will be sent to your WhatsApp or email shortly.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/products"
            className="bg-foreground text-background px-8 py-3.5 text-sm tracking-widest uppercase hover:bg-accent transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            href="/account"
            className="border border-border px-8 py-3.5 text-sm tracking-widest uppercase hover:bg-secondary transition-colors text-muted-foreground"
          >
            View My Account
          </Link>
        </div>
      </div>
    </div>
  );
}
