interface StatItem {
  label: string;
  value: string | number;
  hint?: string;
}

export function StatGrid({ stats }: { stats: StatItem[] }) {
  return (
    <section className="grid cards">
      {stats.map((item) => (
        <article key={item.label} className="card glass kpi">
          <h2>{item.value}</h2>
          <p className="muted">{item.label}</p>
          {item.hint ? <small className="muted">{item.hint}</small> : null}
        </article>
      ))}
    </section>
  );
}
