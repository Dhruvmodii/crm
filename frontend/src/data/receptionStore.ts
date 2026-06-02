const STORAGE_KEY = "softone.reception.day-summary";

export interface ReceptionDaySummary {
  date: string;
  expectedCash: number;
  physicalCash: number;
  onlineCollected: number;
  footfall: number;
  trials: number;
  sales: number;
  pendingFollowUps: number;
}

export function saveReceptionDaySummary(payload: ReceptionDaySummary) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function readReceptionDaySummary(): ReceptionDaySummary | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ReceptionDaySummary;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}
