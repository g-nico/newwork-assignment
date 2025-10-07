import { CreateEmployeePayload, Employee } from "../type/Employee";
import { FormEvent, useState } from "react";

type EmployeeFormProps = { initial?: Employee; onSubmit: (payload: CreateEmployeePayload) => Promise<void> | void; onCancel?: () => void; submitLabel?: string; };

export function EmployeeForm({
  initial,
  onSubmit,
  onCancel,
  submitLabel = "Save",
}: EmployeeFormProps) {
  const [name, setName] = useState(initial?.name ?? "");
  const [role, setRole] = useState<"EMPLOYEE" | "MANAGER">(initial?.role ?? "EMPLOYEE");
  const [salary, setSalary] = useState(String(initial?.salary ?? ""));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!role) errs.role = "Role is required";
    const s = Number(salary);
    if (!Number.isFinite(s) || s < 0) errs.salary = "Salary must be a non-negative number";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setBusy(true);
    try {
      await onSubmit({
        name: name.trim(),
        role,
        salary: Number(salary),
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div>
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ada Lovelace"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div>
        <label className="label">
          <span className="label-text">Role</span>
        </label>
        <select
          className="select select-bordered w-full"
          value={role}
          onChange={(e) => setRole(e.target.value as "EMPLOYEE" | "MANAGER")}
        >
          <option value="EMPLOYEE">EMPLOYEE</option>
          <option value="MANAGER">MANAGER</option>
        </select>
        {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
      </div>

      <div>
        <label className="label">
          <span className="label-text">Salary</span>
        </label>
        <input
          type="number"
          className="input input-bordered w-full"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="50000"
        />
        {errors.salary && <p className="text-red-500 text-sm">{errors.salary}</p>}
      </div>

      <div className="flex justify-end gap-2 mt-4">
        {onCancel && (
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onCancel}
            disabled={busy}
          >
            Cancel
          </button>
        )}
        <button type="submit" className="btn btn-primary" disabled={busy}>
          {busy ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}