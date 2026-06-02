import { useMemo, useState } from "react";
import { DataTable } from "../../components/erp/DataTable";
import { PageHeader } from "../../components/erp/PageHeader";
import { SectionCard } from "../../components/erp/SectionCard";
import { StatGrid } from "../../components/erp/StatGrid";

type HrStage =
  | "manpower_planning"
  | "recruitment"
  | "interview"
  | "offer"
  | "onboarding"
  | "training"
  | "attendance_leave"
  | "performance"
  | "engagement"
  | "grievance"
  | "payroll"
  | "compliance"
  | "exit"
  | "mis_reporting";

interface EmployeeFlow {
  employeeId: string;
  name: string;
  role: string;
  stage: HrStage;
  branch: string;
}

const seed: EmployeeFlow[] = [
  {
    employeeId: "EMP-021",
    name: "Simran Kaur",
    role: "Front Office Executive",
    stage: "onboarding",
    branch: "Noida",
  },
  {
    employeeId: "EMP-014",
    name: "Rohit Mehta",
    role: "Audiologist",
    stage: "performance",
    branch: "Delhi Gate",
  },
];

const stageLabels: Record<HrStage, string> = {
  manpower_planning: "Manpower Planning",
  recruitment: "Recruitment",
  interview: "Interview",
  offer: "Offer and Pre-joining",
  onboarding: "Onboarding",
  training: "Training and Skill Development",
  attendance_leave: "Attendance and Leave",
  performance: "Performance Management",
  engagement: "Employee Engagement",
  grievance: "Grievance Handling",
  payroll: "Payroll Coordination",
  compliance: "Statutory Compliance",
  exit: "Exit and Offboarding",
  mis_reporting: "HR MIS Reporting",
};

export function HrOperationsPage() {
  const [rows, setRows] = useState<EmployeeFlow[]>(seed);
  const [name, setName] = useState("");
  const [employeeRole, setEmployeeRole] = useState("Receptionist");
  const [branch, setBranch] = useState("Delhi Gate");
  const [stage, setStage] = useState<HrStage>("recruitment");

  const metrics = useMemo(
    () => ({
      active: rows.length,
      onboarding: rows.filter((r) => r.stage === "onboarding").length,
      training: rows.filter((r) => r.stage === "training").length,
      exits: rows.filter((r) => r.stage === "exit").length,
    }),
    [rows],
  );

  function addRow(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) return;
    setRows((prev) => [
      ...prev,
      {
        employeeId: `EMP-${String(prev.length + 1).padStart(3, "0")}`,
        name: name.trim(),
        role: employeeRole,
        branch,
        stage,
      },
    ]);
    setName("");
  }

  return (
    <section className="stack">
      <PageHeader
        title="HR Flow Control Desk"
        subtitle="Recruitment to exit operations with MIS checkpoints."
      />
      <StatGrid
        stats={[
          { label: "Tracked Employees", value: metrics.active },
          { label: "Onboarding", value: metrics.onboarding },
          { label: "Training", value: metrics.training },
          { label: "Exit Stage", value: metrics.exits },
        ]}
      />

      <form className="card glass stack compact" onSubmit={addRow}>
        <h2>Create / Update HR Stage</h2>
        <p className="muted">
          Built from HR flowchart: manpower planning {"->"} recruitment {"->"} onboarding {"->"} payroll {"->"} compliance {"->"} exit.
        </p>
        <div className="grid two">
          <input className="input" placeholder="Employee name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="input" placeholder="Role" value={employeeRole} onChange={(e) => setEmployeeRole(e.target.value)} />
          <input className="input" placeholder="Branch" value={branch} onChange={(e) => setBranch(e.target.value)} />
          <select className="input" value={stage} onChange={(e) => setStage(e.target.value as HrStage)}>
            {Object.entries(stageLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <button className="button primary" type="submit">Add / Update HR Stage</button>
      </form>

      <SectionCard title="HR Operations Register">
        <DataTable
          headers={["Employee ID", "Name", "Role", "Branch", "Current Stage"]}
          hasRows={rows.length > 0}
        >
          {rows.map((row) => (
            <tr key={row.employeeId}>
              <td>{row.employeeId}</td>
              <td>{row.name}</td>
              <td>{row.role}</td>
              <td>{row.branch}</td>
              <td><span className="badge info">{stageLabels[row.stage]}</span></td>
            </tr>
          ))}
        </DataTable>
      </SectionCard>
    </section>
  );
}
