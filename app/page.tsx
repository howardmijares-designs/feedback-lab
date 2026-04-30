"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ROLE_LEVELS } from "@/lib/roles";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DGE_DOMAINS = ["dge.gov.ae", "adge.gov.ae"];

type FieldErrors = Partial<
  Record<"fullName" | "jobTitle" | "email" | "roleLevel" | "form", string>
>;

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [roleLevel, setRoleLevel] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);

  function validateClient() {
    const next: FieldErrors = {};
    if (!fullName.trim()) next.fullName = "Please enter your full name";
    if (!jobTitle.trim()) next.jobTitle = "Please enter your DGE job title";
    if (!roleLevel) next.roleLevel = "Please pick your role / seniority";
    if (!email.trim()) {
      next.email = "Please enter your DGE email";
    } else if (!EMAIL_RE.test(email)) {
      next.email = "Enter a valid email address";
    } else {
      const domain = email.split("@")[1]?.toLowerCase() ?? "";
      if (!DGE_DOMAINS.some((d) => domain === d || domain.endsWith("." + d))) {
        next.email = "Please use your DGE email address";
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validateClient()) return;
    setLoading(true);
    // MVP demo: simulate latency, persist to sessionStorage, route forward.
    await new Promise((r) => setTimeout(r, 600));
    sessionStorage.setItem(
      "volunteerSubmission",
      JSON.stringify({
        fullName: fullName.trim(),
        jobTitle: jobTitle.trim(),
        email: email.trim(),
        roleLevel,
        submittedAt: new Date().toISOString(),
      })
    );
    router.push("/thank-you");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-[16px] py-[48px]">
      <div className="w-full max-w-[540px]">
        <div className="overflow-hidden rounded-[16px] border border-[var(--stroke-primary)] bg-[var(--surface-primary)] shadow-[0_4px_8px_0_rgba(0,0,0,0.06)]">
          {/* Banner */}
          <div className="relative h-[180px] w-full overflow-hidden bg-[var(--color-primary-950)]">
            <Image
              src="/Banner - What we do.jpg"
              alt="DGE colleagues collaborating"
              fill
              priority
              sizes="540px"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-[rgba(22,43,84,0.55)] via-transparent to-transparent"
            />
            <span className="absolute left-[20px] top-[20px] inline-flex h-[24px] items-center rounded-full bg-[rgba(255,255,255,0.92)] px-[10px] text-[12px] font-medium leading-[16px] text-[var(--color-primary-700)] backdrop-blur-sm">
              AI Factory · DGE
            </span>
          </div>

          <div className="p-[32px]">
            <header className="mb-[24px]">
              <h1 className="whitespace-nowrap text-[18px] font-semibold leading-[24px] tracking-[-0.01em] text-[var(--text-primary)]">
                Join the AI Factory feedback lab research panel
              </h1>
              <p className="mt-[8px] text-[12px] leading-[18px] text-[var(--text-tertiary)]">
                Be part of shaping AI products for the Abu Dhabi government.
                Volunteer for occasional feedback sessions and share your
                perspective on the tools we&apos;re building at AI Factory.
                We&apos;ll only reach out when your experience is relevant — no
                spam, just meaningful, impactful input.
              </p>
            </header>

            <form onSubmit={onSubmit} noValidate className="flex flex-col gap-[16px]">
              <Input
                label="Full name"
                placeholder="e.g. Aisha Al Mazrouei"
                autoComplete="name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                error={errors.fullName}
              />
              <Input
                label="DGE job title"
                placeholder="e.g. Senior Policy Advisor"
                autoComplete="organization-title"
                required
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                error={errors.jobTitle}
              />
              <Select
                label="Role / seniority"
                placeholder="Select your role / seniority"
                required
                value={roleLevel}
                onChange={(e) => setRoleLevel(e.target.value)}
                options={ROLE_LEVELS}
                error={errors.roleLevel}
              />
              <Input
                label="DGE email"
                type="email"
                placeholder="you@dge.gov.ae"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                hint="We use this only to invite you to research sessions."
              />

              <ul className="mt-[4px] flex flex-col gap-[6px] text-[12px] leading-[16px] text-[var(--text-tertiary)]">
                <li className="flex gap-[8px]">
                  <span aria-hidden className="text-[var(--color-primary-600)]">•</span>
                  <span>1–3 invitations per quarter, never marketing.</span>
                </li>
                <li className="flex gap-[8px]">
                  <span aria-hidden className="text-[var(--color-primary-600)]">•</span>
                  <span>Sessions are 15–45 mins, in person at DGE or remotely via MS Teams.</span>
                </li>
                <li className="flex gap-[8px]">
                  <span aria-hidden className="text-[var(--color-primary-600)]">•</span>
                  <span>Your details shall stay within the AI Factory design research team.</span>
                </li>
              </ul>

              {errors.form && (
                <p className="text-[12px] leading-[16px] text-[var(--color-error-600)]">
                  {errors.form}
                </p>
              )}

              <Button
                type="submit"
                size="lg"
                loading={loading}
                className="mt-[12px] w-full"
              >
                {loading ? "Joining…" : "Join the panel"}
              </Button>
            </form>
          </div>
        </div>

        <p className="mt-[16px] text-center text-[12px] leading-[18px] text-[var(--text-tertiary)]">
          Do you have questions or a design research idea you want to explore?
          <br />
          Contact the AI Factory design research team lead @{" "}
          <a
            href="mailto:howard.mijares@dge.gov.ae"
            className="font-medium text-[var(--color-primary-700)] hover:underline"
          >
            howard.mijares@dge.gov.ae
          </a>
        </p>
      </div>
    </main>
  );
}
