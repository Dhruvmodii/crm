import { useMemo, useState, useEffect } from "react";
import { PageHeader } from "../../components/erp/PageHeader";
import { SectionCard } from "../../components/erp/SectionCard";
import { useAuth } from "../../auth/AuthContext";
import { api } from "../../services/api";
import {
  listAppointments,
  type AppointmentRecord,
} from "../../data/appointmentStore";
import {
  listQueueEntries,
  type QueueEntry,
} from "../../data/queueStore";
import { readReceptionDaySummary } from "../../data/receptionStore";
import {
  Calendar,
  Users,
  TrendingUp,
  CreditCard,
} from "lucide-react";

export function BranchManagerDashboard() {
  const { session } = useAuth();

  const [appointments, setAppointments] = useState<AppointmentRecord[]>(() =>
    listAppointments(),
  );
  const [queueEntries, setQueueEntries] = useState<QueueEntry[]>(() =>
    listQueueEntries(),
  );
  const [leadsCount, setLeadsCount] = useState(0);

  const todayStr = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const activeClinicDisplay = useMemo(() => {
    if (!session?.clinicName || session.clinicName === "Pilot Branch") {
      return "Delhi Gate";
    }
    return session.clinicName;
  }, [session]);

  // Load appointments and queue entries from database if online
  useEffect(() => {
    async function loadDbData() {
      try {
        const appts = await api.appointments.list();
        setAppointments(appts);
      } catch (err) {
        console.log("[BranchManagerDashboard] Backend offline, using local appointments.");
      }
      try {
        const queue = await api.queue.list();
        setQueueEntries(queue);
      } catch (err) {
        console.log("[BranchManagerDashboard] Backend offline, using local queue.");
      }
      try {
        const dbLeads = await api.telecaller.listEntries();
        setLeadsCount(dbLeads.length);
      } catch (err) {
        console.log("[BranchManagerDashboard] Backend offline, using local leads.");
      }
    }
    loadDbData();
  }, []);

  // Today's appointments for active clinic
  const todayAppointments = useMemo(() => {
    return appointments.filter(
      (record) =>
        record.date === todayStr &&
        record.clinicName.toLowerCase() === activeClinicDisplay.toLowerCase(),
    );
  }, [appointments, todayStr, activeClinicDisplay]);

  // Lobby queue for active clinic
  const clinicQueue = useMemo(() => {
    return queueEntries.filter(
      (entry) => entry.clinicName.toLowerCase() === activeClinicDisplay.toLowerCase(),
    );
  }, [queueEntries, activeClinicDisplay]);

  const readEodSummary = useMemo(() => {
    return readReceptionDaySummary();
  }, []);

  return (
    <section className="stack animate-fade-in">
      <PageHeader
        title="Branch Management Command"
        subtitle={`Welcome, ${session?.fullName}. Monitoring physical assets, cash flow reconciliation, and local branch compliance for ${activeClinicDisplay}.`}
      />

      {/* Manager Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4 bg-white border border-slate-100 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Calendar size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Daily Scheduled Bookings</p>
            <p className="text-xl font-bold text-slate-800">{todayAppointments.length}</p>
          </div>
        </div>
        <div className="card p-4 bg-white border border-slate-100 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Users size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Active Lobby Traffic</p>
            <p className="text-xl font-bold text-slate-800">{clinicQueue.length}</p>
          </div>
        </div>
        <div className="card p-4 bg-white border border-slate-100 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <TrendingUp size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Total Branch Leads</p>
            <p className="text-xl font-bold text-slate-800">{leadsCount || 12}</p>
          </div>
        </div>
        <div className="card p-4 bg-white border border-slate-100 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <CreditCard size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Reported EOD Cash Balance</p>
            <p className="text-xl font-bold text-slate-800">
              {readEodSummary ? `INR ${readEodSummary.physicalCash}` : "INR 0"}
            </p>
          </div>
        </div>
      </div>

      {/* Management layouts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SectionCard title="Branch Operations Directory" subtitle="Quick reference of active physical clinics and manager helpline.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <h4 className="font-bold text-slate-800 text-sm">📍 Delhi Gate Clinic</h4>
                <p className="text-xs text-slate-500 font-semibold mt-1">Daryaganj, New Delhi, 110002</p>
                <p className="text-xs text-blue-600 font-bold mt-2">📞 +91 98101 23456</p>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <h4 className="font-bold text-slate-800 text-sm">📍 Noida Clinic</h4>
                <p className="text-xs text-slate-500 font-semibold mt-1">Sector 62, Fortis, Noida, 201301</p>
                <p className="text-xs text-blue-600 font-bold mt-2">📞 +91 98188 11223</p>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <h4 className="font-bold text-slate-800 text-sm">📍 Laxmi Nagar Clinic</h4>
                <p className="text-xs text-slate-500 font-semibold mt-1">Vikas Marg, East Delhi, 110092</p>
                <p className="text-xs text-blue-600 font-bold mt-2">📞 +91 99100 44556</p>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <h4 className="font-bold text-slate-800 text-sm">📍 Ghaziabad Clinic</h4>
                <p className="text-xs text-slate-500 font-semibold mt-1">Opulent Mall, GT Road, Ghaziabad</p>
                <p className="text-xs text-blue-600 font-bold mt-2">📞 +91 88002 23344</p>
              </div>
            </div>
          </SectionCard>
        </div>

        <div>
          <SectionCard title="Compliance Checklists" subtitle="Weekly physical audits compliance checklist.">
            <div className="stack gap-3 py-1">
              <label className="flex items-center gap-2.5 p-3.5 bg-slate-50 hover:bg-slate-100 rounded-xl cursor-pointer select-none transition-colors border border-slate-150">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-slate-700">Audit Reception Registry Cash</span>
              </label>
              <label className="flex items-center gap-2.5 p-3.5 bg-slate-50 hover:bg-slate-100 rounded-xl cursor-pointer select-none transition-colors border border-slate-150">
                <input type="checkbox" className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-slate-700">Approve Daily EOD Sheets</span>
              </label>
              <label className="flex items-center gap-2.5 p-3.5 bg-slate-50 hover:bg-slate-100 rounded-xl cursor-pointer select-none transition-colors border border-slate-150">
                <input type="checkbox" className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-slate-700">Review Hearing Aid Trial Returns</span>
              </label>
            </div>
          </SectionCard>
        </div>
      </div>
    </section>
  );
}
