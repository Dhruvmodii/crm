import { useState } from "react";
import { DataTable } from "../../components/erp/DataTable";
import { PageHeader } from "../../components/erp/PageHeader";
import { SectionCard } from "../../components/erp/SectionCard";

type RepairStatus =
  | "reported_at_branch"
  | "sent_to_main_office"
  | "warranty_check"
  | "estimate_waiting_approval"
  | "dispatched_to_company"
  | "repair_in_progress"
  | "received_at_main_office"
  | "quality_check"
  | "handover_to_patient"
  | "closed";

interface RepairTicket {
  id: string;
  patient: string;
  serial: string;
  status: RepairStatus;
  location: string;
  warrantyType: "UW" | "NW";
  physicalDamage: boolean;
}

const initialTickets: RepairTicket[] = [
  { id: "R-201", patient: "Nisha Kapoor", serial: "SN-7781", status: "reported_at_branch", location: "Noida Branch", warrantyType: "UW", physicalDamage: false },
  { id: "R-202", patient: "Piyush Jain", serial: "SN-6632", status: "estimate_waiting_approval", location: "Delhi Gate", warrantyType: "NW", physicalDamage: true },
  { id: "R-203", patient: "Harsh Rao", serial: "SN-4429", status: "repair_in_progress", location: "Vendor Lab", warrantyType: "UW", physicalDamage: false },
];

const stageFlow: RepairStatus[] = [
  "reported_at_branch",
  "sent_to_main_office",
  "warranty_check",
  "estimate_waiting_approval",
  "dispatched_to_company",
  "repair_in_progress",
  "received_at_main_office",
  "quality_check",
  "handover_to_patient",
  "closed",
];

export function RepairTicketsPage() {
  const [tickets, setTickets] = useState(initialTickets);

  function moveTicket(ticketId: string) {
    setTickets((prev) =>
      prev.map((ticket) => {
        if (ticket.id !== ticketId) return ticket;
        const index = stageFlow.indexOf(ticket.status);
        if (index === -1 || index === stageFlow.length - 1) return ticket;
        return { ...ticket, status: stageFlow[index + 1] };
      }),
    );
  }

  return (
    <section className="stack">
      <PageHeader
        title="Repair Ticket Tracker (Flowchart Mode)"
        subtitle="Branch check -> Main office (Delhi Gate) -> company -> quality check -> patient handover."
        actions={
          <>
            <button className="button primary" type="button">Create Ticket</button>
            <button className="button ghost" type="button">Dispatch Register</button>
          </>
        }
      />

      <SectionCard title="Repair Queue">
        <DataTable
          headers={["Ticket", "Patient", "Serial", "Warranty", "Damage", "Status", "Location", "Action"]}
          hasRows={tickets.length > 0}
        >
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td><td>{ticket.patient}</td><td>{ticket.serial}</td>
              <td><span className={`badge ${ticket.warrantyType === "UW" ? "ok" : "warn"}`}>{ticket.warrantyType}</span></td>
              <td>{ticket.physicalDamage ? "Yes" : "No"}</td>
              <td><span className="badge warn">{ticket.status.replaceAll("_", " ")}</span></td>
              <td>{ticket.location}</td>
              <td>
                <button className="button ghost" type="button" onClick={() => moveTicket(ticket.id)}>
                  Move Stage
                </button>
              </td>
            </tr>
          ))}
        </DataTable>
      </SectionCard>
    </section>
  );
}
