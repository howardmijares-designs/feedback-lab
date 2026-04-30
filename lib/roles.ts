// Role / seniority taxonomy for the AI Factory Feedback Lab volunteer pool.
// Free-text in the DB so renaming doesn't require a migration; the dropdown
// is the source of truth at write time. Phase 2 may promote this to a
// dedicated `roles` table once the taxonomy stabilizes.

export const ROLE_LEVELS = [
  "Executive Director",
  "Director",
  "Head of Section / Section Manager",
  "Senior Specialist / Senior Advisor",
  "Specialist / Advisor",
  "Analyst / Associate",
  "Other",
] as const;

export type RoleLevel = (typeof ROLE_LEVELS)[number];

export function isRoleLevel(value: string): value is RoleLevel {
  return (ROLE_LEVELS as readonly string[]).includes(value);
}
