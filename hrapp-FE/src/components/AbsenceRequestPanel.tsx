import React from "react";
import { AlertCircle, Loader2 } from "lucide-react";

type Props = {
  open: boolean;
  startDate: string;
  endDate: string;
  datesValid: boolean;
  requesting: boolean;
  message: string | null;
  error: string | null;
  onStartChange: (v: string) => void;
  onEndChange: (v: string) => void;
  onSubmit: () => void;
  onClose: () => void;
};

export default function AbsenceRequestPanel({
  open,
  startDate,
  endDate,
  datesValid,
  requesting,
  message,
  error,
  onStartChange,
  onEndChange,
  onSubmit,
  onClose,
}: Props) {
  if (!open) return null;

  const showSuccess = !!message && message.includes("✅");
  const alertKind = showSuccess ? "alert-success" : "alert-error";
  const alertText = message || error;

  return (
    <div className="card bg-base-100 shadow-sm rounded-2xl">
      <div className="card-body">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold">Request Leave of Absence</h3>
          <button className="btn btn-ghost btn-sm" type="button" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Start date</span>
            </label>
            <input
              type="date"
              className="input input-bordered"
              value={startDate}
              onChange={(e) => onStartChange(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">End date</span>
            </label>
            <input
              type="date"
              className="input input-bordered"
              value={endDate}
              onChange={(e) => onEndChange(e.target.value)}
              min={startDate || undefined}
            />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <button
            className="btn btn-primary"
            type="button"
            disabled={!datesValid || requesting}
            onClick={onSubmit}
          >
            {requesting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Requesting…
              </>
            ) : (
              "Request"
            )}
          </button>
          <button className="btn btn-ghost" type="button" onClick={onClose}>
            Cancel
          </button>
        </div>

        {alertText && (
          <div className={`alert mt-3 ${alertKind}`}>
            <AlertCircle className="w-4 h-4" />
            <span>{alertText}</span>
          </div>
        )}
      </div>
    </div>
  );
}
