import { useMemo, useState } from "react";
import { PageHeader } from "../../components/erp/PageHeader";
import { SectionCard } from "../../components/erp/SectionCard";

export function BillingInvoicesPage() {
  const [deviceAmount, setDeviceAmount] = useState(35000);
  const [discount, setDiscount] = useState(0);
  const [cash, setCash] = useState(0);
  const [upi, setUpi] = useState(0);
  const [card, setCard] = useState(0);
  const [gstEnabled, setGstEnabled] = useState(true);

  const { taxable, gstAmount, grandTotal, paid, balance } = useMemo(() => {
    const taxableValue = Math.max(0, deviceAmount - discount);
    const gst = gstEnabled ? Math.round(taxableValue * 0.18) : 0;
    const total = taxableValue + gst;
    const paidAmount = cash + upi + card;
    return { taxable: taxableValue, gstAmount: gst, grandTotal: total, paid: paidAmount, balance: total - paidAmount };
  }, [deviceAmount, discount, cash, upi, card, gstEnabled]);

  return (
    <section className="stack">
      <PageHeader
        title="Invoice Builder"
        subtitle="Generate GST invoices, split payments, and instant receipt summary."
      />

      <SectionCard title="Invoice Inputs">
        <div className="grid two">
          <input className="input" type="number" value={deviceAmount} onChange={(e) => setDeviceAmount(Number(e.target.value))} placeholder="Device amount" />
          <input className="input" type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} placeholder="Discount" />
          <input className="input" type="number" value={cash} onChange={(e) => setCash(Number(e.target.value))} placeholder="Cash" />
          <input className="input" type="number" value={upi} onChange={(e) => setUpi(Number(e.target.value))} placeholder="UPI" />
          <input className="input" type="number" value={card} onChange={(e) => setCard(Number(e.target.value))} placeholder="Card" />
          <label className="inline"><input type="checkbox" checked={gstEnabled} onChange={(e) => setGstEnabled(e.target.checked)} /> GST 18%</label>
        </div>
      </SectionCard>

      <SectionCard title="Invoice Summary">
        <div className="summary-grid">
          <div><span>Taxable Value</span><strong>INR {taxable.toLocaleString()}</strong></div>
          <div><span>GST</span><strong>INR {gstAmount.toLocaleString()}</strong></div>
          <div><span>Grand Total</span><strong>INR {grandTotal.toLocaleString()}</strong></div>
          <div><span>Paid</span><strong>INR {paid.toLocaleString()}</strong></div>
          <div><span>Balance</span><strong>INR {balance.toLocaleString()}</strong></div>
        </div>
        <div className="inline">
          <button className="button primary" type="button">Generate Invoice</button>
          <button className="button ghost" type="button">Send Receipt</button>
        </div>
      </SectionCard>
    </section>
  );
}
