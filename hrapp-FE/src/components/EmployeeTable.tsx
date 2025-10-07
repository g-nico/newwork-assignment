import { Employee } from "../type/Employee"
import { RowActions } from "./RowActions";

const fmtCurrency = (n: number | null | undefined): string => {
  if (n == null) return ""; 
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(n);
};

type Props = {
  employees: Employee[];
  selectedId?: string | null; 
  onEdit: (e: Employee) => void;
  onDelete: (e: Employee) => void;
  onReview: (e: Employee) => void;
};

export function EmployeeTable({ employees, selectedId, onEdit, onDelete, onReview }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-base-300">
      <table className="table">
        <thead>
          <tr>
            <th className="w-[40%]">Name</th>
            <th className="w-[15%]">Role</th>
            <th className="w-[15%]">Salary</th>
            <th className="w-[30%] text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e) => (
            <tr key={e.uuid} className={selectedId === e.uuid ? "bg-base-200/60" : ""}>
              <td>
                <div className="font-medium">{e.name}</div>
                <div className="text-xs opacity-60">{e.uuid}</div>
              </td>
              <td>
                <div className={"badge " + (e.role === "MANAGER" ? "badge-primary" : "badge-ghost")}>
                  {e.role}
                </div>
              </td>
              <td>{fmtCurrency(e.salary)}</td>
              <td className="text-right">
                <RowActions
                  employee={e}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onReview={onReview} // NEW
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {employees.length === 0 && (
        <div className="p-6 text-center text-sm opacity-70">No employees found</div>
      )}
    </div>
  );
}
