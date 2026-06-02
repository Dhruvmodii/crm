import {
  LogOut,
  LayoutDashboard,
  Activity,
} from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export function AppShell() {
  const { session, signOut } = useAuth();
  const location = useLocation();

  if (!session) {
    return null;
  }

  const isDashboard = location.pathname === "/";

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col">
      {/* Topbar Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 shadow-sm backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* Brand Logo & Name */}
          <Link to="/" className="flex items-center gap-2.5 decoration-none group">
            <div className="p-2 bg-blue-600 text-white rounded-xl shadow-md shadow-blue-100 group-hover:bg-blue-700 transition-all">
              <Activity size={18} />
            </div>
            <span className="text-lg font-black tracking-tight text-blue-900 group-hover:text-blue-700 transition-colors">
              Softone ERP
            </span>
          </Link>

          {/* Home/Dashboard Link */}
          {!isDashboard && (
            <Link
              to="/"
              className="flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-black rounded-xl transition-all decoration-none border border-slate-200/60 hover:border-blue-200/60"
            >
              <LayoutDashboard size={14} />
              <span>Back to Dashboard</span>
            </Link>
          )}
        </div>

        {/* User Scoped Info & Numbers */}
        <div className="hidden lg:flex items-center gap-4 text-xs text-slate-500 font-semibold bg-slate-50 border border-slate-100 px-4 py-2 rounded-2xl">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">User:</span>
            <strong className="text-slate-700 font-bold">{session.fullName}</strong>
            <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-black rounded-md uppercase tracking-wider">
              {session.role.replace("_", " ")}
            </span>
          </div>
          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
          <span>Work: +91 98101 23456</span>
          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
          <span>Personal: +91 98765 43210</span>
          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
          <span className="text-blue-600 font-bold">
            {new Date().toLocaleDateString("en-US", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
          </span>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={signOut}
          className="flex items-center gap-2 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-black rounded-xl transition-all border border-rose-100 hover:border-rose-200 cursor-pointer"
          type="button"
        >
          <LogOut size={14} />
          <span>Sign Out</span>
        </button>
      </header>

      {/* Main Content Workspace */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8 box-border">
        <Outlet />
      </main>
    </div>
  );
}
