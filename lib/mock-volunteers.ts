// Seed data for the MVP demo. Plausible DGE-style volunteers across the
// role taxonomy in lib/roles.ts. Replace with real backend in Phase 1.

export interface Volunteer {
  id: string;
  fullName: string;
  jobTitle: string;
  email: string;
  roleLevel: string;
  createdAt: string; // ISO
}

export const MOCK_VOLUNTEERS: Volunteer[] = [
  {
    id: "v_001",
    fullName: "Aisha Al Mazrouei",
    jobTitle: "Senior Policy Advisor",
    email: "aisha.almazrouei@dge.gov.ae",
    roleLevel: "Senior Specialist / Senior Advisor",
    createdAt: "2026-04-22T08:14:00.000Z",
  },
  {
    id: "v_002",
    fullName: "Omar Hassan",
    jobTitle: "Director of Digital Services",
    email: "omar.hassan@dge.gov.ae",
    roleLevel: "Director",
    createdAt: "2026-04-23T11:02:00.000Z",
  },
  {
    id: "v_003",
    fullName: "Fatima Al Suwaidi",
    jobTitle: "Data Analyst",
    email: "fatima.alsuwaidi@dge.gov.ae",
    roleLevel: "Analyst / Associate",
    createdAt: "2026-04-23T15:47:00.000Z",
  },
  {
    id: "v_004",
    fullName: "Khalid Al Nuaimi",
    jobTitle: "Head of Citizen Experience",
    email: "khalid.alnuaimi@dge.gov.ae",
    roleLevel: "Head of Section / Section Manager",
    createdAt: "2026-04-24T09:30:00.000Z",
  },
  {
    id: "v_005",
    fullName: "Mariam Al Shamsi",
    jobTitle: "Product Specialist",
    email: "mariam.alshamsi@dge.gov.ae",
    roleLevel: "Specialist / Advisor",
    createdAt: "2026-04-24T13:18:00.000Z",
  },
  {
    id: "v_006",
    fullName: "Yousef Al Falasi",
    jobTitle: "Executive Director, Strategy",
    email: "yousef.alfalasi@dge.gov.ae",
    roleLevel: "Executive Director",
    createdAt: "2026-04-25T07:55:00.000Z",
  },
  {
    id: "v_007",
    fullName: "Noura Al Hosani",
    jobTitle: "Senior Service Designer",
    email: "noura.alhosani@dge.gov.ae",
    roleLevel: "Senior Specialist / Senior Advisor",
    createdAt: "2026-04-25T14:22:00.000Z",
  },
  {
    id: "v_008",
    fullName: "Saeed Al Marri",
    jobTitle: "Enterprise Architect",
    email: "saeed.almarri@dge.gov.ae",
    roleLevel: "Specialist / Advisor",
    createdAt: "2026-04-26T10:05:00.000Z",
  },
  {
    id: "v_009",
    fullName: "Reem Al Zaabi",
    jobTitle: "Section Manager, Innovation",
    email: "reem.alzaabi@dge.gov.ae",
    roleLevel: "Head of Section / Section Manager",
    createdAt: "2026-04-27T08:40:00.000Z",
  },
  {
    id: "v_010",
    fullName: "Hamdan Al Ketbi",
    jobTitle: "Research Associate",
    email: "hamdan.alketbi@dge.gov.ae",
    roleLevel: "Analyst / Associate",
    createdAt: "2026-04-28T12:11:00.000Z",
  },
  {
    id: "v_011",
    fullName: "Layla Al Qubaisi",
    jobTitle: "Director of Operations",
    email: "layla.alqubaisi@dge.gov.ae",
    roleLevel: "Director",
    createdAt: "2026-04-28T16:33:00.000Z",
  },
  {
    id: "v_012",
    fullName: "Tariq Al Ameri",
    jobTitle: "Programme Coordinator",
    email: "tariq.alameri@dge.gov.ae",
    roleLevel: "Other",
    createdAt: "2026-04-29T09:20:00.000Z",
  },
];
