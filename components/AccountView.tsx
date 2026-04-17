"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export default function AccountView() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace("/login?from=/account");
  }, [user, router]);

  if (!user) return null;

  return (
    <div>
      <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">Your Account</p>
      <h1 className="font-[family-name:var(--font-cormorant)] text-5xl font-light leading-none mb-8">
        Welcome back{user.name ? `, ${user.name.split(" ")[0]}` : ""}.
      </h1>

      {/* Profile card */}
      <div className="border border-border p-6 mb-8">
        <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">Profile</p>
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex gap-3">
            <span className="text-muted-foreground w-20">Signed in via</span>
            <span className="font-medium capitalize">{user.method}</span>
          </div>
          {user.email && (
            <div className="flex gap-3">
              <span className="text-muted-foreground w-20">Email</span>
              <span>{user.email}</span>
            </div>
          )}
          {user.phone && (
            <div className="flex gap-3">
              <span className="text-muted-foreground w-20">Mobile</span>
              <span>+91 {user.phone}</span>
            </div>
          )}
        </div>
      </div>

      {/* Orders placeholder */}
      <div className="border border-border p-6 mb-8">
        <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">Your Orders</p>
        <p className="text-sm text-muted-foreground">
          No orders yet.{" "}
          <Link href="/products" className="underline underline-offset-4 hover:text-accent transition-colors">
            Shop the regime →
          </Link>
        </p>
      </div>

      <button
        onClick={() => { logout(); router.push("/"); }}
        className="border border-foreground/30 px-6 py-2.5 text-xs tracking-widest uppercase hover:bg-secondary transition-colors text-muted-foreground"
      >
        Sign Out
      </button>
    </div>
  );
}
