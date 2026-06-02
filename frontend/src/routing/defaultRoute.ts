import type { Role } from "../types/auth";
import { APP_ROUTES } from "./routeConfig";

export function getDefaultRouteForRole(role: Role): string {
  const route = APP_ROUTES.find(
    (entry) => entry.showInNav && entry.roles.includes(role),
  );
  return route?.path ?? "/unauthorized";
}
