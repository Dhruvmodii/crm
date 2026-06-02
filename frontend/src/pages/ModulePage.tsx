interface ModulePageProps {
  title: string;
  subtitle: string;
  checklist: string[];
}

export function ModulePage({ title, subtitle, checklist }: ModulePageProps) {
  return (
    <section className="card stack">
      <header className="stack compact">
        <h1>{title}</h1>
        <p className="muted">{subtitle}</p>
      </header>

      <div className="stack compact">
        <h2>Starter Checklist</h2>
        <ul className="checklist">
          {checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
