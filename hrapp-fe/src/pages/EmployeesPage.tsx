import React, { useEffect, useMemo, useState } from "react";
import { AlertCircle, Loader2, Plus, RefreshCw, CalendarDays } from "lucide-react";
import { Employee, CreateEmployeePayload, UpdateEmployeePayload } from "../type/Employee";
import { useEmployees } from "../hooks/useEmployees";
import { useReviews } from "../hooks/useReviews"
import { useAbsences } from "../hooks/useAbsences";
import { Review } from "../type/Review"
import { EmployeeTable } from "../components/EmployeeTable";
import CreateEmployeeModal from "../components/modals/CreateEmployeeModal";
import EditEmployeeModal from "../components/modals/EditEmployeeModal";
import DeleteEmployeeModal from "../components/modals/DeleteEmployeeModal";
import AbsenceRequestPanel from "../components/AbsenceRequestPanel";
import ReviewPanel from "../components/ReviewPanel";

const isUUID = (v: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v);

export default function EmployeeManagerApp() {
  const { employees, fetchAll, create, update, remove, loading, error } = useEmployees();

  const { reviews, fetchReviews, createReview } = useReviews();
  const [currentReviews, setCurrentReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsError, setReviewsError] = useState<string | null>(null);

  const [query, setQuery] = useState<string>("");
  const [creating, setCreating] = useState<boolean>(false);
  const [editing, setEditing] = useState<Employee | null>(null);
  const [deleting, setDeleting] = useState<Employee | null>(null);
  const [selected, setSelected] = useState<Employee | null>(null);
  const [createError, setCreateError] = useState<string | null>(null);
  const [editError, setEditError] = useState<string | null>(null);

  const { createAbsence, error: absenceError } = useAbsences();
  const [showAbsencePanel, setShowAbsencePanel] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [requesting, setRequesting] = useState(false);
  const [absenceMessage, setAbsenceMessage] = useState<string | null>(null);

  const datesValid = useMemo(() => {
    if (!startDate || !endDate) return false;
    return new Date(startDate) <= new Date(endDate);
  }, [startDate, endDate]);

  const submitAbsence = async () => {
    setAbsenceMessage(null);
    if (!datesValid) {
      setAbsenceMessage("Start date must be on or before end date.");
      return;
    }

    try {
      setRequesting(true);

      const payload = {
        startDate,
        endDate,
      } as any;

      await createAbsence(payload);
      setAbsenceMessage("✅ Leave request submitted successfully");
      setStartDate("");
      setEndDate("");
    } catch (e: any) {
      setAbsenceMessage(e?.message || "Failed to submit leave request.");
    } finally {
      setRequesting(false);
    }
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!selected) {
      setCurrentReviews([]);
      setReviewsError(null);
      return;
    }

    let cancelled = false;
    setReviewsLoading(true);
    setReviewsError(null);

    (async () => {
      try {
        const res = await fetchReviews(selected.uuid); // assumes fetchReviews(employeeId)

        // If fetchReviews returns the array, use it; otherwise fall back to the hook's `reviews`.
        const list = Array.isArray(res)
          ? res
          : (reviews ?? []).filter((r) => r.target === selected.uuid);

        if (!cancelled) setCurrentReviews(list);
      } catch (err: any) {
        if (!cancelled) setReviewsError(err?.message || "Failed to load reviews");
      } finally {
        if (!cancelled) setReviewsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [selected?.uuid, fetchReviews]);

  const filtered: Employee[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return employees;
    return employees.filter((e: Employee) =>
      e.name?.toLowerCase().includes(q) ||
      e.role?.toLowerCase().includes(q) ||
      String(e.salary ?? "").includes(q) ||
      (isUUID(q) && e.uuid?.toLowerCase() === q)
    );
  }, [employees, query]);

  const handleCreate = async (payload: CreateEmployeePayload) => {
    setCreateError(null);
    try {
      await create(payload);
      setCreating(false);
    } catch (e: any) {
      setCreateError(e?.message || "Failed to create employee.");
    }
  };

  const handleUpdate = async (payload: UpdateEmployeePayload) => {
    if (!editing) return;
    setEditError(null);
    try {
      await update(editing.uuid, payload);
      setEditing(null);
    } catch (e: any) {
      setEditError(e?.message || "Failed to update employee.");
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    await remove(deleting.uuid);
    setDeleting(null);
  };

  useEffect(() => {
    if (!selected) {
      setCurrentReviews([]);
      return;
    }
    setCurrentReviews((reviews ?? []).filter((r) => r.target === selected.uuid));
  }, [reviews, selected?.uuid]);

  const addReview = async (content: string) => {
    if (!selected) return;

    const newReview: Omit<Review, "uuid"> = {
      target: selected.uuid,
      author: selected.uuid,
      content,
      createdAt: new Date().toISOString(),
    };

    try {
      await createReview(newReview);

      const res = await fetchReviews(selected.uuid);
      const list = Array.isArray(res)
        ? res
        : (reviews ?? []).filter((r) => r.target === selected.uuid);

      setCurrentReviews(list);
    } catch (err) {
      setReviewsError((err as any)?.message || "Failed to submit review");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="mx-auto max-w-6xl grid gap-6">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-semibold">Employee Manager</h1>
            <p className="text-sm opacity-70">CRUD UI for /api/employees on :8080</p>
          </div>
          <div className="flex gap-2">
            <button
              className="btn btn-outline"
              onClick={fetchAll}
              disabled={loading}
              type="button"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4 mr-2" />
              )}
              Reload
            </button>
            <button
              className="btn btn-outline"
              type="button"
              onClick={() => setShowAbsencePanel((s) => !s)}
            >
              <CalendarDays className="w-4 h-4 mr-2" />
              Request leave
            </button>
            <button
              className="btn btn-primary"
              onClick={() => { setCreateError(null); setCreating(true); }}
              type="button"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Employee
            </button>
          </div>
        </header>

        <div className="card bg-base-100 shadow-sm rounded-2xl">
          <div className="card-body">
            <div className="form-control max-w-md">
              <label className="label">
                <span className="label-text">Search</span>
              </label>
              <input
                className="input input-bordered"
                placeholder="By name, role, salary, or exact UUID"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <EmployeeTable
              employees={filtered}
              selectedId={selected?.uuid ?? null}
              onEdit={(e) => { setEditError(null); setEditing(e); }}
              onDelete={setDeleting}
              onReview={(e) => setSelected(e)}
            />

            {error && (
              <div className="alert alert-error mt-4">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>

        {/* Leave of Absence panel */}
        <AbsenceRequestPanel
          open={showAbsencePanel}
          startDate={startDate}
          endDate={endDate}
          datesValid={datesValid}
          requesting={requesting}
          message={absenceMessage}
          error={absenceError}
          onStartChange={setStartDate}
          onEndChange={setEndDate}
          onSubmit={submitAbsence}
          onClose={() => setShowAbsencePanel(false)}
        />


        {/* Review panel */}
        <ReviewPanel
          selected={selected}
          reviews={currentReviews}
          loading={reviewsLoading}
          error={reviewsError}
          onAddReview={addReview}
          onClose={() => setSelected(null)}
        />

        {/* Create Modal */}
        <CreateEmployeeModal
          open={creating}
          error={createError}
          onClose={() => { setCreating(false); setCreateError(null); }}
          onSubmit={handleCreate}
        />

        {/* Edit Modal */}
        <EditEmployeeModal
          open={!!editing}
          employee={editing}
          error={editError}
          onClose={() => { setEditing(null); setEditError(null); }}
          onSubmit={handleUpdate}
        />

        {/* Delete Modal */}
        <DeleteEmployeeModal
          open={!!deleting}
          employee={deleting}
          onCancel={() => setDeleting(null)}
          onConfirm={handleDelete}
        />
      </div>
    </div>
  );
}
