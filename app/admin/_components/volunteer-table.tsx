"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ROLE_LEVELS } from "@/lib/roles";
import type { Volunteer } from "@/lib/mock-volunteers";

const ROLE_FILTER_OPTIONS = [
  { label: "All roles", value: "" },
  ...ROLE_LEVELS.map((r) => ({ label: r, value: r })),
];

const ADMIN_EDITS_KEY = "adminVolunteerEdits";

interface AdminEdit {
  participations: number;
  notes: string;
}
type AdminEdits = Record<string, AdminEdit>;

export function VolunteerTable({ volunteers }: { volunteers: Volunteer[] }) {
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [edits, setEdits] = useState<AdminEdits>({});

  // Hydrate from sessionStorage on mount, falling back to seeded values.
  useEffect(() => {
    const seeded: AdminEdits = {};
    for (const v of volunteers) {
      seeded[v.id] = {
        participations: v.participations ?? 0,
        notes: v.notes ?? "",
      };
    }
    try {
      const raw = sessionStorage.getItem(ADMIN_EDITS_KEY);
      if (raw) {
        const stored = JSON.parse(raw) as AdminEdits;
        for (const id of Object.keys(stored)) {
          seeded[id] = { ...seeded[id], ...stored[id] };
        }
      }
    } catch {
      // ignore
    }
    setEdits(seeded);
  }, [volunteers]);

  function updateEdit(id: string, mutate: (e: AdminEdit) => AdminEdit) {
    setEdits((prev) => {
      const current = prev[id] ?? { participations: 0, notes: "" };
      const next: AdminEdits = { ...prev, [id]: mutate(current) };
      try {
        sessionStorage.setItem(ADMIN_EDITS_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }

  function changeParticipations(id: string, delta: number) {
    updateEdit(id, (e) => ({
      ...e,
      participations: Math.max(0, e.participations + delta),
    }));
  }

  function changeNotes(id: string, value: string) {
    updateEdit(id, (e) => ({ ...e, notes: value }));
  }

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
      <div className="overflow-x-auto rounded-[12px] border border-[var(--stroke-primary)] bg-[var(--surface-primary)]">
        <table className="w-full text-left text-[12px] leading-[18px]">
          <thead>
            <tr className="border-b border-[var(--stroke-primary)] bg-[var(--surface-tertiary)] text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">
              <th className="px-[16px] py-[10px]">Name</th>
              <th className="px-[16px] py-[10px]">Job title</th>
              <th className="px-[16px] py-[10px]">Role</th>
              <th className="px-[16px] py-[10px]">Email</th>
              <th className="px-[16px] py-[10px]">Joined</th>
              <th className="px-[16px] py-[10px]">Participations</th>
              <th className="px-[16px] py-[10px]">Admin notes</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-[16px] py-[32px] text-center text-[var(--text-tertiary)]">
                  {volunteers.length === 0
                    ? "No volunteers yet. Share the form link with DGE colleagues."
                    : "No matches. Try a different search or role filter."}
                </td>
              </tr>
            ) : (
              filtered.map((v) => {
                const e = edits[v.id] ?? {
                  participations: v.participations ?? 0,
                  notes: v.notes ?? "",
                };
                return (
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
                    <td className="px-[16px] py-[12px]">
                      <div className="inline-flex items-center gap-[6px]">
                        <button
                          type="button"
                          aria-label={`Decrease participations for ${v.fullName}`}
                          onClick={() => changeParticipations(v.id, -1)}
                          disabled={e.participations <= 0}
                          className="inline-flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-[6px] border border-[var(--stroke-primary)] bg-[var(--surface-primary)] text-[var(--text-secondary)] hover:bg-[var(--surface-tertiary)] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          −
                        </button>
                        <span className="min-w-[20px] text-center text-[13px] font-medium text-[var(--text-primary)]">
                          {e.participations}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase participations for ${v.fullName}`}
                          onClick={() => changeParticipations(v.id, 1)}
                          className="inline-flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-[6px] border border-[var(--stroke-primary)] bg-[var(--surface-primary)] text-[var(--text-secondary)] hover:bg-[var(--surface-tertiary)]"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-[16px] py-[12px]">
                      <input
                        type="text"
                        value={e.notes}
                        onChange={(ev) => changeNotes(v.id, ev.target.value)}
                        placeholder="Add a note…"
                        aria-label={`Admin notes for ${v.fullName}`}
                        className="h-[28px] w-[220px] rounded-[6px] border border-[var(--stroke-primary)] bg-[var(--surface-primary)] px-[8px] text-[12px] leading-[16px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--color-primary-500)] focus:outline-none"
                      />
                    </td>
                  </tr>
                );
              })
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
