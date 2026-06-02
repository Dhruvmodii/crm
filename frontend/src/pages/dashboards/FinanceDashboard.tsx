import { useMemo, useState, useEffect } from "react";
import { PageHeader } from "../../components/erp/PageHeader";
import { SectionCard } from "../../components/erp/SectionCard";
import { DataTable } from "../../components/erp/DataTable";
import { useToast } from "../../layout/ToastProvider";
import { useAuth } from "../../auth/AuthContext";
import { api } from "../../services/api";
import {
  listAppointments,
  type AppointmentRecord,
} from "../../data/appointmentStore";
import { readReceptionDaySummary } from "../../data/receptionStore";
import {
  TrendingUp,
  CreditCard,
  CheckCircle,
  Users,
} from "lucide-react";

export function FinanceDashboard() {
  const { session } = useAuth();
  const { pushToast } = useToast();

  const [appointments, setAppointments] = useState<AppointmentRecord[]>(() =>
    listAppointments(),
  );

  // Load appointments from database if online
  useEffect(() => {
    async function loadDbAppointments() {
      try {
        const appts = await api.appointments.list();
        setAppointments(appts);
      } catch (err) {
        console.log("[FinanceDashboard] Backend offline, using local appointments.");
      }
    }
    loadDbAppointments();
  }, []);

  const readEodSummary = useMemo(() => {
    return readReceptionDaySummary();
  }, []);

  const totalEstimatedRev = appointments.length * 1500;
  const reportedEodCash = readEodSummary ? readEodSummary.physicalCash : 0;
  const onlineCollected = readEodSummary ? readEodSummary.onlineCollected : 0;

  return (
    <section className="stack animate-fade-in">
      <PageHeader
        title="Finance and Treasury Controls"
        subtitle={`Welcome, ${session?.fullName}. Auditing multi-branch registries, cash flows, and platform invoice settlements.`}
      />

      {/* Finance Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4 bg-white border border-slate-100 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <TrendingUp size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Estimated Platform Revenue</p>
            <p className="text-xl font-bold text-slate-800">INR {totalEstimatedRev.toLocaleString()}</p>
          </div>
        </div>
        <div className="card p-4 bg-white border border-slate-100 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <CreditCard size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Reported EOD Cash</p>
            <p className="text-xl font-bold text-slate-800">INR {reportedEodCash.toLocaleString()}</p>
          </div>
        </div>
        <div className="card p-4 bg-white border border-slate-100 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <CheckCircle size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Online Collections Today</p>
            <p className="text-xl font-bold text-slate-800">INR {onlineCollected.toLocaleString()}</p>
          </div>
        </div>
        <div className="card p-4 bg-white border border-slate-100 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-slate-50 text-slate-600 rounded-xl">
            <Users size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Sales Trials Logged</p>
            <p className="text-xl font-bold text-slate-800">{readEodSummary ? readEodSummary.sales : 0} Devices</p>
          </div>
        </div>
      </div>

      {/* Finance auditing grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SectionCard title="Corporate Daily Cash Reconciliation Feed" subtitle="Audit checklist of active physical branches cash logs.">
            <DataTable
              headers={["Branch Name", "Expected Balance", "Physical Reported", "Online Logged", "Reconciliation Status"]}
              hasRows={true}
            >
              <tr>
                <td className="font-bold text-slate-800">Delhi Gate Branch</td>
                <td className="text-slate-600 font-semibold">INR {totalEstimatedRev > 0 ? (totalEstimatedRev * 0.4).toLocaleString() : "4,500"}</td>
                <td className="text-slate-600 font-semibold">INR {reportedEodCash > 0 ? reportedEodCash.toLocaleString() : "4,500"}</td>
                <td className="text-slate-600 font-semibold">INR {onlineCollected > 0 ? onlineCollected.toLocaleString() : "3,200"}</td>
                <td>
                  <span className="badge ok">Matched</span>
                </td>
              </tr>
              <tr>
                <td className="font-bold text-slate-800">Noida Branch</td>
                <td className="text-slate-600 font-semibold">INR 8,500</td>
                <td className="text-slate-600 font-semibold">INR 8,500</td>
                <td className="text-slate-600 font-semibold">INR 2,800</td>
                <td>
                  <span className="badge ok">Verified</span>
                </td>
              </tr>
              <tr>
                <td className="font-bold text-slate-800">Laxmi Nagar Branch</td>
                <td className="text-slate-600 font-semibold">INR 6,000</td>
                <td className="text-slate-600 font-semibold">INR 5,800</td>
                <td className="text-slate-600 font-semibold">INR 1,200</td>
                <td>
                  <span className="badge warn">Variance Alert</span>
                </td>
              </tr>
            </DataTable>
          </SectionCard>
        </div>

        <div>
          <SectionCard title="Financial Controls Room" subtitle="System-wide ledger lock checks.">
            <div className="stack gap-3 py-1">
              <button
                onClick={() => pushToast("Ledger verified and locked for the current cycle.", "success")}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all border-none cursor-pointer text-center"
                type="button"
              >
                🔒 Lock Daily Ledger
              </button>
              <button
                onClick={() => pushToast("Variance report filed directly to general manager.", "success")}
                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all border-none cursor-pointer text-center"
                type="button"
              >
                📄 File Variance Report
              </button>
            </div>
          </SectionCard>
        </div>
      </div>
    </section>
  );
}
