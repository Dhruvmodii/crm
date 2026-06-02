import { useAuth } from "../auth/AuthContext";
import { TelecallerDashboard } from "./dashboards/TelecallerDashboard";
import { FrontOfficeDashboard } from "./dashboards/FrontOfficeDashboard";
import { AudiologistDashboard } from "./dashboards/AudiologistDashboard";
import { BranchManagerDashboard } from "./dashboards/BranchManagerDashboard";
import { FinanceDashboard } from "./dashboards/FinanceDashboard";
import { SuperAdminDashboard } from "./dashboards/SuperAdminDashboard";
import { PageHeader } from "../components/erp/PageHeader";
import { User } from "lucide-react";

export function DashboardPage() {
  const { session } = useAuth();

  // Render the appropriate dashboard component based on the user's role
  switch (session?.role) {
    case "telecaller":
      return <TelecallerDashboard />;
    case "front_office_executive":
      return <FrontOfficeDashboard />;
    case "audiologist":
      return <AudiologistDashboard />;
    case "branch_manager":
      return <BranchManagerDashboard />;
    case "finance_team":
      return <FinanceDashboard />;
    case "super_admin":
      return <SuperAdminDashboard />;
    default:
      return (
        <section className="stack">
          <PageHeader
            title="Workspace Dashboard"
            subtitle="Quickly jump into daily operations with a clean role-aware workspace."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card p-4 bg-white border border-slate-100 rounded-2xl flex items-center gap-4 shadow-sm">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <User size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Total Registered Users</p>
                <p className="text-xl font-bold text-slate-800">12</p>
              </div>
            </div>
          </div>
        </section>
      );
  }
}
