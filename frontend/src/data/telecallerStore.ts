export type LeadType =
  | "new_enquiry"
  | "trial_follow_up"
  | "old_patient"
  | "reactivation"
  | "pending_decision";

export type CallOutcome =
  | "appointment_fixed"
  | "follow_up_scheduled"
  | "not_interested"
  | "invalid_number";

export interface TelecallerEntry {
  id: string;
  createdBy: string;
  city: string;
  patientName: string;
  mobileNumber: string;
  whatsappNumber: string;
  leadType: LeadType;
  responseType: "positive" | "negative";
  callConnected: boolean;
  callNotes: string;
  callOutcome: CallOutcome;
  followUpRequired: boolean;
  followUpReason: string;
  followUpDate: string;
  followUpTime: string;
  appointmentBooked: boolean;
  clinicName: string;
  appointmentDate: string;
  appointmentSlot: string;
  qrToken: string | null;
  qrPayload: string | null;
  createdAt: string;
}

const STORAGE_KEY = "softone.telecaller.entries";

function readEntries(): TelecallerEntry[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as TelecallerEntry[];
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

function writeEntries(entries: TelecallerEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function listTelecallerEntries(): TelecallerEntry[] {
  return readEntries().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function saveTelecallerEntry(entry: TelecallerEntry): TelecallerEntry[] {
  const entries = readEntries();
  entries.push(entry);
  writeEntries(entries);
  return listTelecallerEntries();
}

export function upsertTelecallerEntry(entry: TelecallerEntry): TelecallerEntry[] {
  const entries = readEntries();
  const index = entries.findIndex((item) => item.id === entry.id);
  if (index >= 0) {
    entries[index] = entry;
  } else {
    entries.push(entry);
  }
  writeEntries(entries);
  return listTelecallerEntries();
}

export function findEntryByQrToken(qrToken: string): TelecallerEntry | null {
  if (!qrToken.trim()) return null;
  const token = qrToken.trim().toUpperCase();
  return readEntries().find((entry) => entry.qrToken?.toUpperCase() === token) ?? null;
}

export function listFollowUpEntries(): TelecallerEntry[] {
  return listTelecallerEntries().filter((entry) => entry.followUpRequired);
}

export function getTodayFollowUpCount(): number {
  const today = new Date().toISOString().slice(0, 10);
  return readEntries().filter(
    (entry) => entry.followUpRequired && entry.followUpDate === today,
  ).length;
}

export function findEntryByMobileNumber(
  mobileNumber: string,
): TelecallerEntry | null {
  const normalized = mobileNumber.trim();
  if (!normalized) return null;
  return (
    readEntries()
      .slice()
      .reverse()
      .find((entry) => entry.mobileNumber.trim() === normalized) ?? null
  );
}
