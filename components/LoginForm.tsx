"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

type Step = "choose" | "phone" | "otp" | "done";

export default function LoginForm() {
  const { loginWithGoogle, loginWithWhatsApp, sendOTP, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("from") ?? "/account";

  const [step, setStep] = useState<Step>("choose");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  async function handleGoogle() {
    setError("");
    await loginWithGoogle();
    router.push(redirect);
  }

  async function handleSendOTP() {
    setError("");
    if (!/^\d{10}$/.test(phone)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    await sendOTP(phone);
    setOtpSent(true);
    setStep("otp");
  }

  async function handleVerifyOTP() {
    setError("");
    if (otp.length !== 6) {
      setError("Enter the 6-digit OTP sent to your WhatsApp.");
      return;
    }
    const ok = await loginWithWhatsApp(phone, otp);
    if (ok) {
      router.push(redirect);
    } else {
      setError("Incorrect OTP. Please try again. (Demo: use 123456)");
    }
  }

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">Your Account</p>
        <h1 className="font-[family-name:var(--font-cormorant)] text-5xl font-light leading-none">
          Sign In
        </h1>
        <p className="text-sm text-muted-foreground mt-3">
          Sign in to place orders and track your regime.
        </p>
      </div>

      {/* ── Choose method ── */}
      {step === "choose" && (
        <div className="flex flex-col gap-4">
          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="flex items-center justify-center gap-3 border border-foreground/20 bg-background hover:bg-secondary py-3.5 px-6 text-sm tracking-wide transition-colors disabled:opacity-50"
          >
            {/* Google "G" icon */}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
              <path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            {loading ? "Signing in…" : "Continue with Google"}
          </button>

          <div className="flex items-center gap-3 text-muted-foreground text-xs tracking-widest uppercase">
            <div className="flex-1 h-px bg-border" />
            or
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* WhatsApp */}
          <button
            onClick={() => setStep("phone")}
            className="flex items-center justify-center gap-3 border border-foreground/20 bg-background hover:bg-secondary py-3.5 px-6 text-sm tracking-wide transition-colors"
          >
            {/* WhatsApp icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
            Continue with WhatsApp OTP
          </button>
        </div>
      )}

      {/* ── Phone entry ── */}
      {step === "phone" && (
        <div className="flex flex-col gap-5">
          <div>
            <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">
              Mobile Number
            </label>
            <div className="flex border border-border focus-within:border-foreground transition-colors">
              <span className="flex items-center px-3 text-sm text-muted-foreground border-r border-border bg-secondary select-none">
                +91
              </span>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                placeholder="98XXXXXXXX"
                className="flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted-foreground/50"
              />
            </div>
            <p className="text-[10px] text-muted-foreground mt-1.5 tracking-wide">
              An OTP will be sent to your WhatsApp number.
            </p>
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <button
            onClick={handleSendOTP}
            disabled={loading}
            className="bg-foreground text-background py-3.5 text-sm tracking-widest uppercase hover:bg-accent transition-colors disabled:opacity-50"
          >
            {loading ? "Sending…" : "Send OTP on WhatsApp"}
          </button>
          <button
            onClick={() => { setStep("choose"); setError(""); }}
            className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back
          </button>
        </div>
      )}

      {/* ── OTP entry ── */}
      {step === "otp" && (
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-sm text-muted-foreground mb-5">
              We sent a 6-digit OTP to your WhatsApp{" "}
              <span className="text-foreground font-medium">+91 {phone}</span>.
            </p>

            <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">
              Enter OTP
            </label>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="• • • • • •"
              className="w-full border border-border focus:border-foreground outline-none bg-transparent px-4 py-3 text-xl tracking-[0.6em] text-center transition-colors placeholder:text-muted-foreground/30"
            />
            <p className="text-[10px] text-muted-foreground mt-1.5">
              Demo mode — use <span className="font-semibold text-foreground">123456</span> as the OTP.
            </p>
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <button
            onClick={handleVerifyOTP}
            disabled={loading}
            className="bg-foreground text-background py-3.5 text-sm tracking-widest uppercase hover:bg-accent transition-colors disabled:opacity-50"
          >
            {loading ? "Verifying…" : "Verify & Sign In"}
          </button>

          <div className="flex justify-between text-xs text-muted-foreground">
            <button
              onClick={() => { setStep("phone"); setOtp(""); setError(""); }}
              className="hover:text-foreground transition-colors tracking-widest uppercase"
            >
              ← Change number
            </button>
            <button
              onClick={() => { sendOTP(phone); setOtp(""); setError(""); }}
              className="hover:text-foreground transition-colors tracking-widest uppercase"
            >
              Resend OTP
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
