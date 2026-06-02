import {
  AlertCircle,
  ArrowRight,
  BellRing,
  CircleCheckBig,
  Sparkles,
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { listAppointments } from "../data/appointmentStore";
import { listQueueEntries } from "../data/queueStore";
import { getTodayFollowUpCount } from "../data/telecallerStore";
import { useToast } from "./ToastProvider";

export function NotificationPanel() {
  const { session } = useAuth();
  const { pushToast } = useToast();
  const [tick, setTick] = useState(0);
  const [lastAppointmentCount, setLastAppointmentCount] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTick((prev) => prev + 1);
    }, 30000);
    return () => window.clearInterval(timer);
  }, []);

  const data = useMemo(() => {
    const clinic = session?.clinicName;
    const today = new Date().toISOString().slice(0, 10);
    const appointments = listAppointments().filter((item) => item.date === today);
    const clinicAppointments = clinic
      ? appointments.filter((item) => item.clinicName === clinic)
      : appointments;
    const queueWaiting = listQueueEntries().filter((item) =>
      clinic ? item.clinicName === clinic : true,
    ).length;

    return {
      todayFollowUps: getTodayFollowUpCount(),
      clinicAppointments: clinicAppointments.length,
      queueWaiting,
      totalAppointments: appointments.length,
    };
  }, [session?.clinicName, tick]);

  const chartData = useMemo(
    () => [
      { day: "Mon", calls: 18, converted: 6 },
      { day: "Tue", calls: 22, converted: 8 },
      { day: "Wed", calls: 20, converted: 7 },
      { day: "Thu", calls: 26, converted: 10 },
      { day: "Fri", calls: 24, converted: 9 },
    ],
    [],
  );

  const aiSuggestions = useMemo(() => {
    const suggestions: string[] = [];
    if (data.todayFollowUps > 5) {
      suggestions.push("Prioritize follow-ups pending more than 24 hours.");
    }
    if (data.queueWaiting > 4) {
      suggestions.push("Queue is heavy. Assign another reception desk.");
    }
    if (data.clinicAppointments > 12) {
      suggestions.push("High booking day. Trigger appointment reminder blast.");
    }
    if (suggestions.length === 0) {
      suggestions.push("System healthy. No urgent action required.");
    }
    return suggestions;
  }, [data.clinicAppointments, data.queueWaiting, data.todayFollowUps]);

  useEffect(() => {
    if (lastAppointmentCount !== 0 && data.clinicAppointments > lastAppointmentCount) {
      pushToast("New appointment added for your clinic.", "info");
      // Lightweight audible ping using Web Audio API.
      try {
        const audioCtx = new window.AudioContext();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.type = "sine";
        oscillator.frequency.value = 880;
        gainNode.gain.value = 0.03;
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.18);
      } catch {
        // Ignore browsers that block audio context without gesture.
      }
    }
    setLastAppointmentCount(data.clinicAppointments);
  }, [data.clinicAppointments, lastAppointmentCount, pushToast]);

  return (
    <section className="stack">
      <div className="notification-panel">
        <div className="notice-card glass">
          <span className="notice-label inline"><BellRing size={14} /> Today Follow-ups</span>
          <strong>{data.todayFollowUps}</strong>
        </div>
        <div className="notice-card glass">
          <span className="notice-label inline"><CircleCheckBig size={14} /> Appointments Today</span>
          <strong>{data.totalAppointments}</strong>
        </div>
        <div className="notice-card glass">
          <span className="notice-label inline"><AlertCircle size={14} /> Queue Waiting</span>
          <strong>{data.queueWaiting}</strong>
        </div>
      </div>

      <div className="grid two">
        <article className="card glass stack compact">
          <h2 className="inline"><Sparkles size={16} /> AI Assist Insights</h2>
          <ul className="checklist">
            {aiSuggestions.map((item) => (
              <li key={item} className="inline">
                <ArrowRight size={14} />
                {item}
              </li>
            ))}
          </ul>
          <div className="workflow-steps">
            {[
              "Lead",
              "Appointment",
              "Reception",
              "Audiology",
              "Trial",
              "Billing",
              "Completed",
            ].map((step, index) => (
              <span key={step} className={`step ${index < 4 ? "active" : ""}`}>
                {step}
              </span>
            ))}
          </div>
        </article>

        <article className="card glass stack compact">
          <h2>Call & Conversion Trend</h2>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="callsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.03} />
                  </linearGradient>
                </defs>
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="calls"
                  stroke="#2563EB"
                  strokeWidth={2}
                  fill="url(#callsGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="converted"
                  stroke="#111827"
                  strokeWidth={1.5}
                  fillOpacity={0}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>
      </div>
    </section>
  );
}
