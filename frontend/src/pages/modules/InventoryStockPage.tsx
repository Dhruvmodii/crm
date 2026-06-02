import { useState } from "react";

interface StockItem {
  serial: string;
  model: string;
  branch: string;
  status: "available" | "trial" | "sold" | "repair";
}

const stockData: StockItem[] = [
  { serial: "SN-1001", model: "SFT Pro 2", branch: "Delhi Gate", status: "available" },
  { serial: "SN-1002", model: "SFT Lite", branch: "Noida", status: "trial" },
  { serial: "SN-1003", model: "SFT Prime", branch: "Laxmi Nagar", status: "repair" },
];

export function InventoryStockPage() {
  const [fromBranch, setFromBranch] = useState("Delhi Gate");
  const [toBranch, setToBranch] = useState("Noida");
  const [serial, setSerial] = useState("SN-1001");

  return (
    <section className="stack">
      <article className="card stack compact">
        <h1>Inventory and Serial Tracking</h1>
        <p className="muted">Manage device inward, branch transfers, and serial-level status.</p>
      </article>

      <form className="card stack compact">
        <h2>Stock Transfer</h2>
        <div className="grid two">
          <input className="input" value={serial} onChange={(e) => setSerial(e.target.value)} placeholder="Serial number" />
          <input className="input" value={fromBranch} onChange={(e) => setFromBranch(e.target.value)} placeholder="From branch" />
          <input className="input" value={toBranch} onChange={(e) => setToBranch(e.target.value)} placeholder="To branch" />
          <button className="button primary" type="button">Initiate Transfer</button>
        </div>
      </form>

      <article className="card stack compact">
        <h2>Stock Register</h2>
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Serial</th><th>Model</th><th>Branch</th><th>Status</th></tr></thead>
            <tbody>
              {stockData.map((item) => (
                <tr key={item.serial}>
                  <td>{item.serial}</td><td>{item.model}</td><td>{item.branch}</td>
                  <td><span className="badge info">{item.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  );
}
