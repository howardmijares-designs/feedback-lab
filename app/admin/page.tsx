"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MOCK_VOLUNTEERS, type Volunteer } from "@/lib/mock-volunteers";
import { VolunteerTable } from "./_components/volunteer-table";

const ADMIN_GATE_KEY = "adminDemoEmail";

interface SessionSubmission {
  fullName: string;
  jobTitle: string;
  email: string;
  roleLevel?: string;
  submittedAt: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [volunteers, setVolunteers] = useState<Volunteer[]>(MOCK_VOLUNTEERS);

  useEffect(() => {
    const gate = sessionStorage.getItem(ADMIN_GATE_KEY);
    if (!gate) {
      router.replace("/admin/login");
      return;
    }
    setAdminEmail(gate);

    // Fold in the most recent volunteer submission (if there is one) so the
    // demo experience feels live — the volunteer the admin just registered
    // appears at the top of the table.
    const raw = sessionStorage.getItem("volunteerSubmission");
    if (raw) {
      try {
        const sub = JSON.parse(raw) as SessionSubmission;
        if (
          sub.fullName &&
          sub.email &&
          !MOCK_VOLUNTEERS.some(
            (v) => v.email.toLowerCase() === sub.email.toLowerCase()
          )
        ) {
          const justSubmitted: Volunteer = {
            id: `live_${sub.email}`,
            fullName: sub.fullName,
            jobTitle: sub.jobTitle,
            email: sub.email,
            roleLevel: sub.roleLevel ?? "Other",
            createdAt: sub.submittedAt,
          };
          setVolunteers([justSubmitted, ...MOCK_VOLUNTEERS]);
        }
      } catch {
        // ignore
      }
    }
  }, [router]);

  function handleSignOut() {
    sessionStorage.removeItem(ADMIN_GATE_KEY);
    router.push("/admin/login");
  }

  if (!adminEmail) return null;

  return (
    <div>
      <header className="border-b border-[var(--stroke-primary)] bg-[var(--surface-primary)]">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-[24px] py-[16px]">
          <div className="flex items-center gap-[12px]">
            <span className="inline-flex h-[24px] items-center rounded-full bg-[var(--surface-highlight)] px-[10px] text-[12px] font-medium leading-[16px] text-[var(--color-primary-700)]">
              AI Factory · Admin
            </span>
            <span className="text-[14px] font-medium leading-[20px] text-[var(--text-primary)]">
              Volunteer pool
            </span>
          </div>
          <div className="flex items-center gap-[12px]">
            <span className="text-[12px] leading-[16px] text-[var(--text-tertiary)]">
              {adminEmail}
            </span>
            <button
              type="button"
              onClick={handleSignOut}
              className="cursor-pointer text-[12px] font-medium leading-[16px] text-[var(--color-primary-700)] hover:underline"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1100px] px-[24px] py-[32px]">
        <div className="mb-[20px] flex items-baseline justify-between gap-[16px]">
          <div>
            <h1 className="text-[20px] font-semibold leading-[28px] tracking-[-0.01em] text-[var(--text-primary)]">
              Volunteer pool
            </h1>
            <p className="mt-[4px] text-[12px] leading-[18px] text-[var(--text-tertiary)]">
              {volunteers.length} {volunteers.length === 1 ? "volunteer" : "volunteers"} signed up.
            </p>
          </div>
        </div>

        <VolunteerTable volunteers={volunteers} />
      </div>
    </div>
  );
}
