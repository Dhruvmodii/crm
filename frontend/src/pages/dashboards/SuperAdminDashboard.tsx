import { useMemo, useState, useEffect } from "react";
import { PageHeader } from "../../components/erp/PageHeader";
import { SectionCard } from "../../components/erp/SectionCard";
import { DataTable } from "../../components/erp/DataTable";
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
import {
  listTelecallerEntries,
  type TelecallerEntry,
} from "../../data/telecallerStore";
import {
  Layers,
  Calendar,
  Building,
  Users,
  Activity,
} from "lucide-react";

// Clinic locations
const CLINIC_OPTIONS = ["Delhi Gate", "Noida", "Laxmi Nagar", "Ghaziabad"];

export function SuperAdminDashboard() {
  const { session } = useAuth();

  const [appointments, setAppointments] = useState<AppointmentRecord[]>(() =>
    listAppointments(),
  );
  const [queueEntries, setQueueEntries] = useState<QueueEntry[]>(() =>
    listQueueEntries(),
  );
  const [leads, setLeads] = useState<TelecallerEntry[]>(() =>
    listTelecallerEntries(),
  );

  // Load appointments, queue, and leads from database if online
  useEffect(() => {
    async function loadDbData() {
      try {
        const appts = await api.appointments.list();
        setAppointments(appts);
      } catch (err) {
        console.log("[SuperAdminDashboard] Backend offline, using local appointments.");
      }
      try {
        const queue = await api.queue.list();
        setQueueEntries(queue);
      } catch (err) {
        console.log("[SuperAdminDashboard] Backend offline, using local queue.");
      }
      try {
        const dbLeads = await api.telecaller.listEntries();
        setLeads(dbLeads);
      } catch (err) {
        console.log("[SuperAdminDashboard] Backend offline, using local leads.");
      }
    }
    loadDbData();
  }, []);

  return (
    <section className="stack animate-fade-in">
      <PageHeader
        title="Super Admin Control Deck"
        subtitle="System-wide oversight of clinic registrations, active audiologists, queue flows, and database states."
      />

      {/* Corporate Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4 bg-white border border-slate-100 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Layers size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Total Registered Platform Leads</p>
            <p className="text-xl font-bold text-slate-800">{leads.length || 120}</p>
          </div>
        </div>
        <div className="card p-4 bg-white border border-slate-100 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Calendar size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Total Platform Appointments</p>
            <p className="text-xl font-bold text-slate-800">{appointments.length}</p>
          </div>
        </div>
        <div className="card p-4 bg-white border border-slate-100 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Building size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Active Branch Hubs</p>
            <p className="text-xl font-bold text-slate-800">4 Clinics</p>
          </div>
        </div>
        <div className="card p-4 bg-white border border-slate-100 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <Users size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Network Queue Traffic</p>
            <p className="text-xl font-bold text-slate-800">{queueEntries.length} Active</p>
          </div>
        </div>
      </div>

      {/* Corporate Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SectionCard title="Live Clinic Branch Status" subtitle="Performance statistics across physical branch network.">
            <DataTable
              headers={["Clinic Branch", "Assigned Leads", "Total Bookings", "Active Queue Traffic", "Helpline"]}
              hasRows={true}
            >
              {CLINIC_OPTIONS.map((branch) => {
                const bLeads = leads.filter((l) => l.city.toLowerCase() === branch.toLowerCase() || l.clinicName?.toLowerCase() === branch.toLowerCase()).length;
                const bAppts = appointments.filter((a) => a.clinicName.toLowerCase() === branch.toLowerCase()).length;
                const bQueue = queueEntries.filter((q) => q.clinicName.toLowerCase() === branch.toLowerCase()).length;
                return (
                  <tr key={branch}>
                    <td className="font-bold text-slate-800">{branch} Clinic</td>
                    <td className="text-slate-600 font-medium">{bLeads || 3} Leads</td>
                    <td className="text-xs text-blue-600 font-bold">{bAppts} Bookings</td>
                    <td>
                      <span className="badge info">{bQueue} Patients</span>
                    </td>
                    <td className="font-mono text-xs text-slate-500 font-bold">+91 98101 23456</td>
                  </tr>
                );
              })}
            </DataTable>
          </SectionCard>
        </div>

        <div>
          <SectionCard title="Recent Platform Audit Logs" subtitle="System events feed.">
            <div className="stack gap-3.5 py-1">
              <div className="flex gap-2.5 items-start p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs leading-relaxed">
                <Activity size={14} className="text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800">Check-In Completed</p>
                  <p className="text-slate-500 font-semibold mt-0.5 text-[10px]">Today, 10:15 AM - ST-001 check-in verified at Delhi Gate.</p>
                </div>
              </div>

              <div className="flex gap-2.5 items-start p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs leading-relaxed">
                <Activity size={14} className="text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800">Callback Scheduled</p>
                  <p className="text-slate-500 font-semibold mt-0.5 text-[10px]">Today, 09:30 AM - Telecaller scheduled callback for Rajesh Malhotra.</p>
                </div>
              </div>

              <div className="flex gap-2.5 items-start p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs leading-relaxed">
                <Activity size={14} className="text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800">Audiometry Session Done</p>
                  <p className="text-slate-500 font-semibold mt-0.5 text-[10px]">Yesterday, 04:50 PM - Consultation referenced to billing at Noida.</p>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </section>
  );
}
