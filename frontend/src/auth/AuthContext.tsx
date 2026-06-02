import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { LoginPayload, UserSession } from "../types/auth";
import { api } from "../services/api";

interface AuthContextValue {
  session: UserSession | null;
  signIn: (payload: LoginPayload) => Promise<{ ok: boolean; error?: string; isFallback?: boolean }>;
  signOut: () => void;
}

const SESSION_STORAGE_KEY = "softone.erp.session";

const AuthContext = createContext<AuthContextValue | null>(null);

function toDisplayName(username: string): string {
  return username
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => `${word[0]?.toUpperCase() ?? ""}${word.slice(1)}`)
    .join(" ");
}

function toUserId(username: string): string {
  return username.trim().toLowerCase().replace(/\s+/g, ".");
}

function canAccessAllBranches(role: UserSession["role"]): boolean {
  return role === "super_admin";
}

function createSession(payload: LoginPayload): UserSession {
  return {
    userId: toUserId(payload.username),
    fullName: toDisplayName(payload.username),
    role: payload.role,
    clinicName: canAccessAllBranches(payload.role) ? null : "Pilot Branch",
  };
}

function readSessionFromStorage(): UserSession | null {
  // Force fresh login each reload for now.
  return null;

  /*
  const serialized = localStorage.getItem(SESSION_STORAGE_KEY);

  if (!serialized) {
    return null;
  }

  try {
    return JSON.parse(serialized) as UserSession;
  } catch {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    return null;
  }
  */
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<UserSession | null>(() =>
    readSessionFromStorage(),
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      async signIn(payload) {
        // 1. Try real database login via Flask API
        const response = await api.auth.login(payload);
        if (response.ok && response.session) {
          setSession(response.session);
          localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(response.session));
          return { ok: true };
        }

        // 2. Fallback to local mock login if backend is unreachable
        if (response.error && response.error.includes("Cannot connect to backend")) {
          console.warn("[Auth] Backend is offline. Falling back to local mock session.");
          const nextSession = createSession(payload);
          setSession(nextSession);
          localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(nextSession));
          return { ok: true, isFallback: true };
        }

        return { ok: false, error: response.error };
      },
      signOut() {
        setSession(null);
        localStorage.removeItem(SESSION_STORAGE_KEY);
      },
    }),
    [session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return auth;
}
