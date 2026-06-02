import { useState } from "react";
import { DataTable } from "../../components/erp/DataTable";
import { PageHeader } from "../../components/erp/PageHeader";
import { SectionCard } from "../../components/erp/SectionCard";
import { ALL_ROLES, ROLE_LABELS, type Role } from "../../types/auth";

interface LocalUser {
  id: string;
  name: string;
  role: Role;
  branch: string;
  status: "active" | "inactive";
}

const initialUsers: LocalUser[] = [
  { id: "U001", name: "Amit Sharma", role: "super_admin", branch: "HQ", status: "active" },
  { id: "U014", name: "Riya Verma", role: "front_office_executive", branch: "Noida", status: "active" },
  { id: "U028", name: "Karan Das", role: "audiologist", branch: "Delhi Gate", status: "active" },
];

export function AdminUsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [name, setName] = useState("");
  const [role, setRole] = useState<Role>("front_office_executive");
  const [branch, setBranch] = useState("Delhi Gate");

  function handleCreateUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) return;

    const nextId = `U${String(users.length + 1).padStart(3, "0")}`;
    setUsers((prev) => [
      ...prev,
      { id: nextId, name: name.trim(), role, branch: branch.trim() || "Unassigned", status: "active" },
    ]);
    setName("");
  }

  return (
    <section className="stack">
      <PageHeader
        title="User Access Control"
        subtitle="Create users and assign role + branch scope for ERP access."
      />

      <div className="grid two">
        <form className="card glass stack compact" onSubmit={handleCreateUser}>
          <h2>Create User</h2>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
          <select className="input" value={role} onChange={(e) => setRole(e.target.value as Role)}>
            {ALL_ROLES.map((entry) => (
              <option key={entry} value={entry}>
                {ROLE_LABELS[entry]}
              </option>
            ))}
          </select>
          <input className="input" value={branch} onChange={(e) => setBranch(e.target.value)} placeholder="Branch" />
          <button className="button primary" type="submit">Create User</button>
        </form>

        <SectionCard title="Access Rules">
          <ul className="checklist">
            <li>Super Admin can see all branches.</li>
            <li>Front Office Executive is branch-specific and handles check-in operations.</li>
            <li>Role updates are auditable once backend APIs are connected.</li>
          </ul>
        </SectionCard>
      </div>

      <SectionCard title="Users">
        <DataTable
          headers={["ID", "Name", "Role", "Branch", "Status"]}
          hasRows={users.length > 0}
        >
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{ROLE_LABELS[user.role]}</td>
              <td>{user.branch}</td>
              <td><span className={`badge ${user.status === "active" ? "ok" : "warn"}`}>{user.status}</span></td>
            </tr>
          ))}
        </DataTable>
      </SectionCard>
    </section>
  );
}
