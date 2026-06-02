import { DataTable } from "../../components/erp/DataTable";
import { PageHeader } from "../../components/erp/PageHeader";
import { SectionCard } from "../../components/erp/SectionCard";
import { StatGrid } from "../../components/erp/StatGrid";

const branchMetrics = [
  { label: "Branch Revenue", value: "INR 12.4L" },
  { label: "Conversion Ratio", value: "38%" },
  { label: "Trial Success", value: "64%" },
  { label: "Outstanding", value: "INR 1.1L" },
];

const performanceRows = [
  { role: "Telecaller", metric: "Appointments booked", value: 41 },
  { role: "Counsellor", metric: "Conversion", value: "35%" },
  { role: "Audiologist", metric: "Assessments/day", value: 12 },
  { role: "Billing", metric: "Avg billing time", value: "7 min" },
];

export function ReportsPage() {
  return (
    <section className="stack">
      <PageHeader
        title="Branch MIS Dashboard"
        subtitle="Management visibility across conversion, billing speed, and profitability."
      />

      <StatGrid stats={branchMetrics} />

      <SectionCard title="Team Performance Snapshot">
        <DataTable headers={["Role", "Metric", "Value"]} hasRows={performanceRows.length > 0}>
          {performanceRows.map((row) => (
            <tr key={`${row.role}-${row.metric}`}>
              <td>{row.role}</td><td>{row.metric}</td><td>{row.value}</td>
            </tr>
          ))}
        </DataTable>
      </SectionCard>
    </section>
  );
}
