import type { Role } from "../types/auth";

export interface AppRouteDefinition {
  path: string;
  label: string;
  description: string;
  roles: Role[];
  showInNav: boolean;
  group?: "core" | "clinical" | "finance" | "admin";
}

export const APP_ROUTES: AppRouteDefinition[] = [
  {
    path: "/",
    label: "Dashboard",
    description: "Role-aware summary and quick module launch.",
    roles: [
      "super_admin",
      "branch_manager",
      "front_office_executive",
      "audiologist",
      "telecaller",
      "finance_team",
    ],
    showInNav: true,
    group: "core",
  },
  {
    path: "/patients",
    label: "Patients",
    description: "Patient directory with lifecycle and status insights.",
    roles: [
      "super_admin",
      "branch_manager",
      "front_office_executive",
      "audiologist",
      "telecaller",
      "finance_team",
    ],
    showInNav: true,
    group: "core",
  },
  {
    path: "/admin/users",
    label: "Admin Users",
    description: "Create users, assign roles, branch access.",
    roles: ["super_admin", "branch_manager"],
    showInNav: false,
    group: "admin",
  },
  {
    path: "/crm/leads",
    label: "CRM Leads",
    description: "Lead pipeline, call outcomes, next follow-ups.",
    roles: [
      "super_admin",
      "branch_manager",
      "telecaller",
    ],
    showInNav: true,
    group: "core",
  },
  {
    path: "/crm/follow-ups",
    label: "Follow-up Calendar",
    description: "Date/time tracking for missed calls and scheduled callbacks.",
    roles: [
      "super_admin",
      "branch_manager",
      "telecaller",
    ],
    showInNav: true,
    group: "core",
  },
  {
    path: "/crm/appointments",
    label: "Appointments",
    description: "Book slots and prepare QR-based check-in.",
    roles: [
      "super_admin",
      "branch_manager",
      "telecaller",
      "front_office_executive",
    ],
    showInNav: true,
    group: "core",
  },
  {
    path: "/reception/check-in",
    label: "Reception Check-In",
    description: "Walk-in, appointment, and call-converted arrivals.",
    roles: [
      "super_admin",
      "branch_manager",
      "front_office_executive",
    ],
    showInNav: true,
    group: "core",
  },
  {
    path: "/reception/queue",
    label: "Reception Queue",
    description: "Token queue with waiting-time visibility.",
    roles: [
      "super_admin",
      "branch_manager",
      "front_office_executive",
      "audiologist",
    ],
    showInNav: true,
    group: "core",
  },
  {
    path: "/audiology/assessments",
    label: "Audiology Assessment",
    description: "PTA/OAE/BERA forms and audiogram uploads.",
    roles: [
      "super_admin",
      "branch_manager",
      "audiologist",
    ],
    showInNav: true,
    group: "clinical",
  },
  {
    path: "/audiology/trials",
    label: "Trials",
    description: "Trial assignment, serial tracking, outcomes.",
    roles: [
      "super_admin",
      "branch_manager",
      "audiologist",
      "front_office_executive",
    ],
    showInNav: true,
    group: "clinical",
  },
  {
    path: "/billing/invoices",
    label: "Billing",
    description: "Cash/UPI invoices and receipt tracking.",
    roles: [
      "super_admin",
      "branch_manager",
      "finance_team",
      "front_office_executive",
    ],
    showInNav: true,
    group: "finance",
  },
  {
    path: "/repair/tickets",
    label: "Repairs",
    description: "Branch-main-company status trail.",
    roles: [
      "super_admin",
      "branch_manager",
    ],
    showInNav: true,
    group: "clinical",
  },
  {
    path: "/inventory/stock",
    label: "Inventory",
    description: "Stock, serial numbers, and branch transfers.",
    roles: [
      "super_admin",
      "branch_manager",
      "finance_team",
    ],
    showInNav: true,
    group: "finance",
  },
  {
    path: "/therapy/cases",
    label: "Speech Therapy",
    description: "Speech therapy planning, sessions, and progress closure.",
    roles: [
      "super_admin",
      "branch_manager",
    ],
    showInNav: false,
    group: "clinical",
  },
  {
    path: "/hr/operations",
    label: "HR Operations",
    description: "Recruitment to exit flow with HR MIS checkpoints.",
    roles: [
      "super_admin",
      "branch_manager",
      "finance_team",
    ],
    showInNav: true,
    group: "admin",
  },
  {
    path: "/analytics",
    label: "Analytics",
    description: "Cross-branch performance, conversion, and revenue analytics.",
    roles: [
      "super_admin",
      "branch_manager",
      "finance_team",
    ],
    showInNav: true,
    group: "finance",
  },
  {
    path: "/reports/branch",
    label: "Reports",
    description: "EOD, conversion, revenue, and trial insights.",
    roles: [
      "super_admin",
      "branch_manager",
      "finance_team",
    ],
    showInNav: false,
    group: "finance",
  },
  {
    path: "/settings",
    label: "Clinic Branches",
    description: "Addresses, locations, and branch contact directories.",
    roles: [
      "super_admin",
      "branch_manager",
      "front_office_executive",
      "audiologist",
      "telecaller",
      "finance_team",
    ],
    showInNav: true,
    group: "admin",
  },
];
