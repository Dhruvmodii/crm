import { useAuth } from "../auth/AuthContext";
import { TelecallerDashboard } from "./dashboards/TelecallerDashboard";
import { FrontOfficeDashboard } from "./dashboards/FrontOfficeDashboard";
import { AudiologistDashboard } from "./dashboards/AudiologistDashboard";
import { BranchManagerDashboard } from "./dashboards/BranchManagerDashboard";
import { FinanceDashboard } from "./dashboards/FinanceDashboard";
import { SuperAdminDashboard } from "./dashboards/SuperAdminDashboard";
import { APP_ROUTES } from "../routing/routeConfig";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  PhoneCall,
  CalendarClock,
  Calendar,
  LogIn,
  ListOrdered,
  Volume2,
  Ear,
  CreditCard,
  Wrench,
  Package,
  Briefcase,
  TrendingUp,
  Settings,
  Activity,
} from "lucide-react";

const ROUTE_ICONS: Record<string, any> = {
  "/": LayoutDashboard,
  "/patients": Users,
  "/crm/leads": PhoneCall,
  "/crm/follow-ups": CalendarClock,
  "/crm/appointments": Calendar,
  "/reception/check-in": LogIn,
  "/reception/queue": ListOrdered,
  "/audiology/assessments": Volume2,
  "/audiology/trials": Ear,
  "/billing/invoices": CreditCard,
  "/repair/tickets": Wrench,
  "/inventory/stock": Package,
  "/hr/operations": Briefcase,
  "/analytics": TrendingUp,
  "/settings": Settings,
};

export function DashboardPage() {
  const { session } = useAuth();

  if (!session) return null;

  // Filter routes that the current user has access to (excluding the dashboard itself)
  const allowedRoutes = APP_ROUTES.filter(
    (route) => route.path !== "/" && route.showInNav && route.roles.includes(session.role)
  );

  return (
    <div className="stack gap-8">
      {/* Centered Launchpad Portal */}
      <section className="stack gap-6 text-center py-4 max-w-5xl mx-auto w-full">
        <div className="stack gap-1.5">
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">
            Welcome to Softone ERP
          </h1>
          <p className="text-slate-500 font-semibold text-sm">
            Select a module below to manage your daily healthcare and clinic operations.
          </p>
        </div>

        {/* Launchpad Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
          {allowedRoutes.map((route) => {
            const IconComponent = ROUTE_ICONS[route.path] || Activity;
            return (
              <Link
                key={route.path}
                to={route.path}
                className="card p-5 bg-white border border-slate-200/80 hover:border-blue-500 hover:shadow-md hover:shadow-blue-50/50 rounded-2xl text-left transition-all flex flex-col gap-3 group cursor-pointer decoration-none"
              >
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl w-fit group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <IconComponent size={20} />
                </div>
                <div className="stack compact">
                  <h4 className="font-black text-slate-800 text-sm group-hover:text-blue-600 transition-colors">
                    {route.label}
                  </h4>
                  <p className="text-xs text-slate-400 font-semibold leading-relaxed mt-1">
                    {route.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Role-Specific Dashboard Metrics & Tables */}
      <div className="border-t border-slate-200/60 pt-8">
        {session.role === "telecaller" && <TelecallerDashboard />}
        {session.role === "front_office_executive" && <FrontOfficeDashboard />}
        {session.role === "audiologist" && <AudiologistDashboard />}
        {session.role === "branch_manager" && <BranchManagerDashboard />}
        {session.role === "finance_team" && <FinanceDashboard />}
        {session.role === "super_admin" && <SuperAdminDashboard />}
      </div>
    </div>
  );
}
