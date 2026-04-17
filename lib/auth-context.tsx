"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type AuthUser = {
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
  method: "google" | "whatsapp";
};

type AuthState = {
  user: AuthUser | null;
  loading: boolean;
};

type AuthContextValue = AuthState & {
  loginWithGoogle: () => Promise<void>;
  loginWithWhatsApp: (phone: string, otp: string) => Promise<boolean>;
  sendOTP: (phone: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);

  // Mock Google OAuth — in production, use next-auth or @react-oauth/google
  async function loginWithGoogle() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200)); // simulate OAuth round-trip
    setUser({
      name: "Gunjan",
      email: "user@example.com",
      avatar: undefined,
      method: "google",
    });
    setLoading(false);
  }

  // Mock OTP send — in production, call Twilio/MSG91 WhatsApp API
  async function sendOTP(phone: string) {
    setLoading(true);
    console.log(`[AUTH] Sending OTP to WhatsApp +91${phone}`);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
  }

  // Mock OTP verify — in production, verify against your backend/session
  async function loginWithWhatsApp(phone: string, otp: string): Promise<boolean> {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    // Accept "123456" as valid OTP in demo mode
    if (otp === "123456") {
      setUser({ name: `+91 ${phone}`, phone, method: "whatsapp" });
      setLoading(false);
      return true;
    }
    setLoading(false);
    return false;
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, loginWithWhatsApp, sendOTP, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
