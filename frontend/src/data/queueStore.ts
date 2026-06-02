export interface QueueEntry {
  id: string;
  patientName: string;
  clinicName: string;
  status: "waiting" | "in_consultation" | "testing" | "billing";
  waitingSinceIso: string;
  mobileNumber?: string;
  arrivalType?: "walk_in" | "appointment" | "call_converted";
}

const STORAGE_KEY = "softone.queue.entries";

function readEntries(): QueueEntry[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as QueueEntry[];
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

function writeEntries(entries: QueueEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function listQueueEntries(): QueueEntry[] {
  return readEntries().sort((a, b) => b.waitingSinceIso.localeCompare(a.waitingSinceIso));
}

export function addQueueEntry(
  entry: Omit<QueueEntry, "id" | "waitingSinceIso">,
): QueueEntry[] {
  const entries = readEntries();
  entries.push({
    ...entry,
    id: `Q-${String(entries.length + 1).padStart(4, "0")}`,
    waitingSinceIso: new Date().toISOString(),
  });
  writeEntries(entries);
  return listQueueEntries();
}

export function updateQueueStatus(
  queueId: string,
  status: QueueEntry["status"],
): QueueEntry[] {
  const updated = readEntries().map((entry) =>
    entry.id === queueId ? { ...entry, status } : entry,
  );
  writeEntries(updated);
  return listQueueEntries();
}
