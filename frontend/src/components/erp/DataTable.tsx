import type { ReactNode } from "react";

interface DataTableProps {
  headers: string[];
  children: ReactNode;
  empty?: string;
  colSpan?: number;
  hasRows: boolean;
}

export function DataTable({
  headers,
  children,
  empty,
  colSpan,
  hasRows,
}: DataTableProps) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {children}
          {!hasRows && empty ? (
            <tr>
              <td colSpan={colSpan ?? headers.length}>{empty}</td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
