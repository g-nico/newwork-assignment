import React from "react";
import { AlertCircle } from "lucide-react";
import { EmployeeForm } from "../EmployeeForm";
import { CreateEmployeePayload } from "../../type/Employee";

type Props = {
  open: boolean;
  error: string | null;
  onClose: () => void;
  onSubmit: (payload: CreateEmployeePayload) => Promise<void> | void;
};

export default function CreateEmployeeModal({ open, error, onClose, onSubmit }: Props) {
  if (!open) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-md">
        <h3 className="font-bold text-lg mb-4">Create Employee</h3>

        {error && (
          <div className="alert alert-error mb-3">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        <EmployeeForm
          onSubmit={onSubmit}
          onCancel={onClose}
          submitLabel="Create"
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
