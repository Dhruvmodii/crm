import { useState } from "react";
import { PageHeader } from "../../components/erp/PageHeader";
import { SectionCard } from "../../components/erp/SectionCard";

const followUps = ["Day 1", "Day 3", "Day 7"];

export function AudiologyTrialsPage() {
  const [serial, setSerial] = useState("");
  const [patientId, setPatientId] = useState("");
  const [outcome, setOutcome] = useState("in_progress");
  const [model, setModel] = useState("");
  const [warrantyDetails, setWarrantyDetails] = useState("");
  const [headMemberSession, setHeadMemberSession] = useState(false);

  return (
    <section className="stack">
      <PageHeader
        title="Audiology Trial, Fitting and Handover"
        subtitle="Select demo device, trial and programming, comfort validation, final fitting, and CRM update."
      />
      <form className="card glass stack compact">
        <div className="grid two">
          <input className="input" value={patientId} onChange={(e) => setPatientId(e.target.value)} placeholder="Patient ID" />
          <input className="input" value={serial} onChange={(e) => setSerial(e.target.value)} placeholder="Device Serial Number" />
          <input className="input" value={model} onChange={(e) => setModel(e.target.value)} placeholder="Device model" />
          <input className="input" value={warrantyDetails} onChange={(e) => setWarrantyDetails(e.target.value)} placeholder="Warranty details" />
          <input
            className="input cursor-pointer"
            type="date"
            onClick={(e) => {
              try {
                e.currentTarget.showPicker();
              } catch {}
            }}
          />
          <select className="input" value={outcome} onChange={(e) => setOutcome(e.target.value)}>
            <option value="in_progress">In Progress</option>
            <option value="ready_for_billing">Ready for Billing</option>
            <option value="follow_up_needed">Follow-up Needed</option>
          </select>
          <label className="inline">
            <input
              type="checkbox"
              checked={headMemberSession}
              onChange={(e) => setHeadMemberSession(e.target.checked)}
            />
            Another counselling session required with head member
          </label>
        </div>
        <textarea className="input textarea" placeholder="Comfort level, sound clarity, counselling notes..." />
        <div className="inline">
          <button className="button primary" type="button">Assign Trial</button>
          <button className="button ghost" type="button">Mark Outcome</button>
        </div>
      </form>

      <SectionCard title="Automated Follow-up Template">
        <div className="chips">
          {followUps.map((step) => (
            <span key={step} className="badge info">{step}</span>
          ))}
        </div>
      </SectionCard>
    </section>
  );
}
