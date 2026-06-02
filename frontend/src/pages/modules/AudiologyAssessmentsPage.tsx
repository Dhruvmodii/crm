import { useState } from "react";
import { PageHeader } from "../../components/erp/PageHeader";

export function AudiologyAssessmentsPage() {
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [patientId, setPatientId] = useState("");
  const [complaint, setComplaint] = useState("");
  const [ptaRight, setPtaRight] = useState("");
  const [ptaLeft, setPtaLeft] = useState("");
  const [oae, setOae] = useState("");
  const [bera, setBera] = useState("");
  const [resultsValid, setResultsValid] = useState(true);
  const [hearingAidRequired, setHearingAidRequired] = useState(true);
  const [patientComfortable, setPatientComfortable] = useState(true);
  const [readyToPurchase, setReadyToPurchase] = useState(false);
  const [finalOutcome, setFinalOutcome] = useState<"positive" | "negative">(
    "positive",
  );
  const [entReferral, setEntReferral] = useState(false);

  return (
    <section className="stack">
      <PageHeader
        title="Audiology Department Workflow"
        subtitle="First visit vs returning, red flags, PTA/OAE/BERA, recommendation, trial comfort loop, and final outcome."
      />
      <form className="card glass stack compact">
        <label className="inline">
          <input
            type="checkbox"
            checked={isFirstVisit}
            onChange={(e) => setIsFirstVisit(e.target.checked)}
          />
          First-time visitor
        </label>
        <p className="muted">
          {isFirstVisit ? "Complete full history required." : "Review past records path enabled."}
        </p>
        <div className="grid two">
          <input className="input" value={patientId} onChange={(e) => setPatientId(e.target.value)} placeholder="Patient ID" />
          <input className="input" value={complaint} onChange={(e) => setComplaint(e.target.value)} placeholder="Primary hearing complaint" />
          <input className="input" value={ptaRight} onChange={(e) => setPtaRight(e.target.value)} placeholder="PTA Right Ear (dB)" />
          <input className="input" value={ptaLeft} onChange={(e) => setPtaLeft(e.target.value)} placeholder="PTA Left Ear (dB)" />
          <input className="input" value={oae} onChange={(e) => setOae(e.target.value)} placeholder="OAE result" />
          <input className="input" value={bera} onChange={(e) => setBera(e.target.value)} placeholder="BERA result" />
        </div>
        <label className="inline">
          <input type="checkbox" checked={entReferral} onChange={(e) => setEntReferral(e.target.checked)} />
          Red flag present {"->"} refer to ENT
        </label>
        <label className="inline">
          <input
            type="checkbox"
            checked={resultsValid}
            onChange={(e) => setResultsValid(e.target.checked)}
          />
          Test results valid and complete
        </label>
        <label className="inline">
          <input
            type="checkbox"
            checked={hearingAidRequired}
            onChange={(e) => setHearingAidRequired(e.target.checked)}
          />
          Hearing aid required
        </label>
        <label className="inline">
          <input
            type="checkbox"
            checked={patientComfortable}
            onChange={(e) => setPatientComfortable(e.target.checked)}
          />
          Patient comfortable after trial/programming
        </label>
        <label className="inline">
          <input
            type="checkbox"
            checked={readyToPurchase}
            onChange={(e) => setReadyToPurchase(e.target.checked)}
          />
          Ready to purchase (inform reception for billing)
        </label>
        <select
          className="input"
          value={finalOutcome}
          onChange={(e) => setFinalOutcome(e.target.value as "positive" | "negative")}
        >
          <option value="positive">Final Outcome - Positive</option>
          <option value="negative">Final Outcome - Negative</option>
        </select>
        <textarea className="input textarea" placeholder="Case history, OAE/BERA details, interpretation..." />
        <div className="inline">
          <button className="button primary" type="button">Save Assessment</button>
          <button className="button ghost" type="button">Upload Audiogram</button>
        </div>
      </form>
    </section>
  );
}
