"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Submission {
  fullName: string;
  jobTitle: string;
  roleLevel?: string;
  email: string;
  submittedAt: string;
}

export default function ThankYouPage() {
  const router = useRouter();
  const [data, setData] = useState<Submission | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("volunteerSubmission");
    if (!raw) {
      router.replace("/");
      return;
    }
    try {
      setData(JSON.parse(raw) as Submission);
    } catch {
      router.replace("/");
    }
  }, [router]);

  if (!data) return null;

  const firstName = data.fullName.split(" ")[0];

  function handleDone() {
    sessionStorage.removeItem("volunteerSubmission");
    router.push("/");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-[16px] py-[48px]">
      <div className="w-full max-w-[540px]">
        <div className="overflow-hidden rounded-[16px] border border-[var(--stroke-primary)] bg-[var(--surface-primary)] shadow-[0_4px_8px_0_rgba(0,0,0,0.06)]">
          {/* Banner */}
          <div className="relative h-[180px] w-full overflow-hidden bg-[var(--color-primary-950)]">
            <Image
              src="/Banner - Seamless Experiences.jpg"
              alt="DGE colleague using a mobile device"
              fill
              priority
              sizes="540px"
              className="object-cover object-[center_20%]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-[rgba(22,43,84,0.55)] via-transparent to-transparent"
            />
            {/* Success badge */}
            <div className="absolute left-[20px] top-[20px] inline-flex h-[28px] items-center gap-[6px] rounded-full bg-[var(--color-success-600)] px-[12px] text-[12px] font-medium leading-[16px] text-white shadow-[0_2px_4px_rgba(0,0,0,0.12)]">
              <svg
                viewBox="0 0 16 16"
                aria-hidden
                className="h-[14px] w-[14px]"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 8l3.5 3.5L13 5" />
              </svg>
              Volunteer sign up success
            </div>
          </div>

          <div className="p-[32px]">
            <header className="mb-[20px]">
              <h1 className="text-[20px] font-semibold leading-[28px] tracking-[-0.01em] text-[var(--text-primary)]">
                Thank you for volunteering, {firstName}.
              </h1>
              <p className="mt-[8px] text-[12px] leading-[18px] text-[var(--text-tertiary)]">
                You&apos;re now part of the AI Factory feedback lab research panel.
                Together we will co-build and co-design AI products for government
                employees and partners via your unique perspectives that will
                effectively help shape what we ship to Abu Dhabi government teams.
              </p>
            </header>

            {/* Submitted recap */}
            <div className="mb-[20px] rounded-[12px] border border-[var(--stroke-primary)] bg-[var(--surface-tertiary)] p-[16px]">
              <p className="mb-[10px] text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">
                Your volunteer details
              </p>
              <dl className="flex flex-col gap-[6px]">
                <div className="flex items-baseline justify-between gap-[12px]">
                  <dt className="text-[12px] leading-[18px] text-[var(--text-tertiary)]">
                    Name
                  </dt>
                  <dd className="text-right text-[12px] font-medium leading-[18px] text-[var(--text-primary)]">
                    {data.fullName}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-[12px]">
                  <dt className="text-[12px] leading-[18px] text-[var(--text-tertiary)]">
                    Job title
                  </dt>
                  <dd className="text-right text-[12px] font-medium leading-[18px] text-[var(--text-primary)]">
                    {data.jobTitle}
                  </dd>
                </div>
                {data.roleLevel && (
                  <div className="flex items-baseline justify-between gap-[12px]">
                    <dt className="text-[12px] leading-[18px] text-[var(--text-tertiary)]">
                      Role / seniority
                    </dt>
                    <dd className="text-right text-[12px] font-medium leading-[18px] text-[var(--text-primary)]">
                      {data.roleLevel}
                    </dd>
                  </div>
                )}
                <div className="flex items-baseline justify-between gap-[12px]">
                  <dt className="text-[12px] leading-[18px] text-[var(--text-tertiary)]">
                    Email
                  </dt>
                  <dd className="text-right text-[12px] font-medium leading-[18px] text-[var(--color-primary-700)]">
                    {data.email}
                  </dd>
                </div>
              </dl>
            </div>

            {/* What happens next */}
            <div className="mb-[20px]">
              <p className="mb-[12px] text-[13px] font-semibold leading-[20px] text-[var(--text-primary)]">
                What happens next
              </p>
              <ol className="flex flex-col gap-[10px]">
                {[
                  "We've added you to the AI Factory Feedback Lab research panel volunteer pool, which makes you searchable when exploring research sessions.",
                  "When a research study matches your role, we email you with the topic, dates, and time commitment, and do a follow-up direct message via MS Teams.",
                  "Once you have the research invitation details and context, you can then decide to accept and partake, or decline and take a pass — no pressure, no spam follow-ups.",
                ].map((step, i) => (
                  <li key={i} className="flex gap-[12px]">
                    <span className="mt-[1px] flex h-[20px] w-[20px] flex-none items-center justify-center rounded-full bg-[var(--surface-highlight)] text-[11px] font-semibold text-[var(--color-primary-700)]">
                      {i + 1}
                    </span>
                    <span className="text-[12px] leading-[18px] text-[var(--text-secondary)]">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Deliverability tip */}
            <div className="rounded-[12px] border border-[var(--color-primary-200)] bg-[var(--surface-highlight)] p-[14px]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--color-primary-700)]">
                One quick favor
              </p>
              <p className="mt-[6px] text-[12px] leading-[18px] text-[var(--text-secondary)]">
                Save{" "}
                <a
                  href="mailto:howard.mijares@dge.gov.ae"
                  className="font-medium text-[var(--color-primary-700)] hover:underline"
                >
                  howard.mijares@dge.gov.ae
                </a>{" "}
                to your contacts so research invites land in your inbox, not spam.
              </p>
            </div>

            <div className="mt-[24px]">
              <Button
                type="button"
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleDone}
              >
                Done
              </Button>
            </div>
          </div>
        </div>

        <p className="mt-[16px] text-center text-[12px] leading-[18px] text-[var(--text-tertiary)]">
          Know a colleague who&apos;d contribute? Forward them the form link.
        </p>
      </div>
    </main>
  );
}
