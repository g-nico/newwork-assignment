import { AlertCircle } from "lucide-react";
import { Employee, UpdateEmployeePayload } from "../../type/Employee";
import { EmployeeForm } from "../EmployeeForm";

type Props = {
  open: boolean;
  employee: Employee | null;
  error: string | null;
  onClose: () => void;
  onSubmit: (payload: UpdateEmployeePayload) => Promise<void> | void;
};

export default function EditEmployeeModal({ open, employee, error, onClose, onSubmit }: Props) {
  if (!open || !employee) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-md">
        <h3 className="font-bold text-lg mb-4">Edit Employee</h3>

        {error && (
          <div className="alert alert-error mb-3">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        <EmployeeForm
          initial={employee}
          onSubmit={onSubmit}
          onCancel={onClose}
          submitLabel="Update"
        />

        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose} type="button">
            Close
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose} />
    </div>
  );
}
