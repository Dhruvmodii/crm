export const SLOT_OPTIONS = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
] as const;

export type AppointmentSlot = (typeof SLOT_OPTIONS)[number];

export interface AppointmentRecord {
  id: string;
  patientName: string;
  mobileNumber: string;
  clinicName: string;
  date: string;
  slot: AppointmentSlot;
  source: "telecaller" | "appointments_page" | "walk_in_block";
  status: "booked" | "arrived" | "completed" | "no_show" | "packed";
  bookedBy: string;
  createdAt: string;
}

const STORAGE_KEY = "softone.appointments.records";

function readRecords(): AppointmentRecord[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as AppointmentRecord[];
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

function writeRecords(records: AppointmentRecord[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function listAppointments(): AppointmentRecord[] {
  return readRecords().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function isSlotAvailable(
  clinicName: string,
  date: string,
  slot: AppointmentSlot,
): boolean {
  return !readRecords().some(
    (record) =>
      record.clinicName === clinicName &&
      record.date === date &&
      record.slot === slot &&
      record.status !== "completed" &&
      record.status !== "no_show",
  );
}

export function getAvailableSlots(
  clinicName: string,
  date: string,
): AppointmentSlot[] {
  return SLOT_OPTIONS.filter((slot) => isSlotAvailable(clinicName, date, slot));
}

export function createAppointment(
  payload: Omit<AppointmentRecord, "id" | "createdAt">,
): { ok: true; records: AppointmentRecord[] } | { ok: false; reason: string } {
  if (!isSlotAvailable(payload.clinicName, payload.date, payload.slot)) {
    return { ok: false, reason: "Selected slot is already packed/booked." };
  }

  const records = readRecords();
  const next: AppointmentRecord = {
    ...payload,
    id: `ST-${String(records.length + 1).padStart(3, "0")}`,
    createdAt: new Date().toISOString(),
  };
  records.push(next);
  writeRecords(records);
  return { ok: true, records: listAppointments() };
}

export function updateAppointmentStatus(
  id: string,
  status: AppointmentRecord["status"],
): AppointmentRecord[] {
  const records = readRecords();
  const index = records.findIndex((r) => r.id === id);
  if (index >= 0) {
    records[index].status = status;
    writeRecords(records);
  }
  return listAppointments();
}
