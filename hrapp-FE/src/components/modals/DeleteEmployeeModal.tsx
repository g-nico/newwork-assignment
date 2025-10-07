import { Trash2 } from "lucide-react";
import { Employee } from "../../type/Employee";

type Props = {
  open: boolean;
  employee: Employee | null;
  onCancel: () => void;
  onConfirm: () => Promise<void> | void;
};

export default function DeleteEmployeeModal({ open, employee, onCancel, onConfirm }: Props) {
  if (!open || !employee) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-md">
        <h3 className="font-bold text-lg mb-2">Delete Employee</h3>
        <p>
          Are you sure you want to delete{" "}
          <span className="font-semibold">{employee.name}</span>?
        </p>
        <div className="modal-action">
          <button className="btn" onClick={onCancel} type="button">
            Cancel
          </button>
          <button className="btn btn-error" onClick={onConfirm} type="button">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onCancel} />
    </div>
  );
}
