"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ROLE_LEVELS } from "@/lib/roles";
import type { Volunteer } from "@/lib/mock-volunteers";

const ROLE_FILTER_OPTIONS = [
  { label: "All roles", value: "" },
  ...ROLE_LEVELS.map((r) => ({ label: r, value: r })),
];

export function VolunteerTable({ volunteers }: { volunteers: Volunteer[] }) {
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return volunteers.filter((v) => {
      if (roleFilter && v.roleLevel !== roleFilter) return false;
      if (!q) return true;
      return (
        v.fullName.toLowerCase().includes(q) ||
        v.email.toLowerCase().includes(q) ||
        v.jobTitle.toLowerCase().includes(q)
      );
    });
  }, [volunteers, query, roleFilter]);

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-[16px] grid grid-cols-1 gap-[12px] sm:grid-cols-[1fr_240px]">
        <Input
          placeholder="Search by name, email, or job title…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Select
          placeholder="Filter by role"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          options={ROLE_FILTER_OPTIONS}
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-[12px] border border-[var(--stroke-primary)] bg-[var(--surface-primary)]">
        <table className="w-full text-left text-[12px] leading-[18px]">
          <thead>
            <tr className="border-b border-[var(--stroke-primary)] bg-[var(--surface-tertiary)] text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">
              <th className="px-[16px] py-[10px]">Name</th>
              <th className="px-[16px] py-[10px]">Job title</th>
              <th className="px-[16px] py-[10px]">Role</th>
              <th className="px-[16px] py-[10px]">Email</th>
              <th className="px-[16px] py-[10px]">Joined</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-[16px] py-[32px] text-center text-[var(--text-tertiary)]">
                  {volunteers.length === 0
                    ? "No volunteers yet. Share the form link with DGE colleagues."
                    : "No matches. Try a different search or role filter."}
                </td>
              </tr>
            ) : (
              filtered.map((v) => (
                <tr
                  key={v.id}
                  className="border-b border-[var(--stroke-primary)] last:border-b-0 hover:bg-[var(--surface-tertiary)]"
                >
                  <td className="px-[16px] py-[12px] font-medium text-[var(--text-primary)]">
                    {v.fullName}
                  </td>
                  <td className="px-[16px] py-[12px] text-[var(--text-secondary)]">{v.jobTitle}</td>
                  <td className="px-[16px] py-[12px] text-[var(--text-secondary)]">{v.roleLevel}</td>
                  <td className="px-[16px] py-[12px]">
                    <a
                      href={`mailto:${v.email}`}
                      className="text-[var(--color-primary-700)] hover:underline"
                    >
                      {v.email}
                    </a>
                  </td>
                  <td className="px-[16px] py-[12px] text-[var(--text-tertiary)]">
                    {formatDate(v.createdAt)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-[12px] text-[11px] leading-[16px] text-[var(--text-tertiary)]">
        Showing {filtered.length} of {volunteers.length}.
      </p>
    </div>
  );
}

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Dubai",
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso.slice(0, 10);
  }
}
