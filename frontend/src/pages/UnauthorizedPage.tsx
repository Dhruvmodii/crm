import { Link } from "react-router-dom";

export function UnauthorizedPage() {
  return (
    <div className="center-screen">
      <section className="card stack auth-card">
        <h1>Access Restricted</h1>
        <p className="muted">
          Your role does not have access to this module. Contact admin to update
          permissions.
        </p>
        <Link className="button primary align-center" to="/">
          Go to Dashboard
        </Link>
      </section>
    </div>
  );
}
