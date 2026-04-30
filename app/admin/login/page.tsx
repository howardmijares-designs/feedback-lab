"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ADMIN_GATE_KEY = "adminDemoEmail";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim() || !EMAIL_RE.test(email)) {
      setError("Enter a valid email address");
      return;
    }
    setError(null);
    setLoading(true);
    // Demo gate: simulate the magic-link flow without actually sending one.
    await new Promise((r) => setTimeout(r, 500));
    sessionStorage.setItem(ADMIN_GATE_KEY, email.trim());
    router.push("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-[16px] py-[48px]">
      <div className="w-full max-w-[420px]">
        <div className="rounded-[16px] border border-[var(--stroke-primary)] bg-[var(--surface-primary)] p-[32px] shadow-[0_4px_8px_0_rgba(0,0,0,0.06)]">
          <header className="mb-[24px]">
            <span className="inline-flex h-[24px] items-center rounded-full bg-[var(--surface-highlight)] px-[10px] text-[12px] font-medium leading-[16px] text-[var(--color-primary-700)]">
              AI Factory · Admin
            </span>
            <h1 className="mt-[16px] text-[20px] font-semibold leading-[28px] tracking-[-0.01em] text-[var(--text-primary)]">
              Sign in to the volunteer dashboard
            </h1>
            <p className="mt-[8px] text-[12px] leading-[18px] text-[var(--text-tertiary)]">
              Researchers on the AI Factory team can access the volunteer pool
              repository to plan upcoming research sessions.
            </p>
            <p className="mt-[8px] inline-flex items-center gap-[6px] rounded-[8px] border border-[var(--color-primary-200)] bg-[var(--surface-highlight)] px-[10px] py-[6px] text-[11px] font-medium text-[var(--color-primary-700)]">
              MVP demo — any email signs you in
            </p>
          </header>

          <form onSubmit={onSubmit} className="flex flex-col gap-[16px]">
            <Input
              label="DGE email"
              type="email"
              placeholder="you@dge.gov.ae"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error ?? undefined}
            />
            <Button type="submit" size="lg" loading={loading} className="w-full">
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
