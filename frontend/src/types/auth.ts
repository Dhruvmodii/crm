export const ALL_ROLES = [
  "super_admin",
  "branch_manager",
  "front_office_executive",
  "audiologist",
  "telecaller",
  "finance_team",
] as const;

export type Role = (typeof ALL_ROLES)[number];

export interface UserSession {
  userId: string;
  fullName: string;
  role: Role;
  clinicName: string | null;
}

export interface LoginPayload {
  username: string;
  password: string;
  role: Role;
}

export const ROLE_LABELS: Record<Role, string> = {
  super_admin: "Super Admin",
  branch_manager: "Branch Manager",
  front_office_executive: "Front Office Executive",
  audiologist: "Audiologist",
  telecaller: "Telecaller",
  finance_team: "Finance Team",
};
