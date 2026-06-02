import { useState } from "react";

type DecisionStatus = "purchased" | "re_trial" | "follow_up" | "lost";

export function CounsellingCasesPage() {
  const [patientId, setPatientId] = useState("");
  const [modelDiscussed, setModelDiscussed] = useState("");
  const [status, setStatus] = useState<DecisionStatus>("follow_up");

  return (
    <section className="stack">
      <form className="card stack compact">
        <h1>Counselling and Sales Discussion</h1>
        <div className="grid two">
          <input className="input" value={patientId} onChange={(e) => setPatientId(e.target.value)} placeholder="Patient ID" />
          <input className="input" value={modelDiscussed} onChange={(e) => setModelDiscussed(e.target.value)} placeholder="Model discussed" />
          <select className="input" value={status} onChange={(e) => setStatus(e.target.value as DecisionStatus)}>
            <option value="purchased">Purchased</option>
            <option value="re_trial">Re-trial</option>
            <option value="follow_up">Follow-up</option>
            <option value="lost">Lost</option>
          </select>
          <input className="input" type="number" placeholder="Purchase probability %" />
        </div>
        <textarea className="input textarea" placeholder="Counselling notes, objections, discount approvals..." />
        <button className="button primary" type="button">Save Counselling Outcome</button>
      </form>
    </section>
  );
}
