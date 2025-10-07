import { Employee } from "../type/Employee";
import { Review } from "../type/Review";
import { Loader2, AlertCircle } from "lucide-react";
import { ReviewForm } from "../components/ReviewForm";
import { ReviewList } from "../components/ReviewList";

type Props = {
  selected: Employee | null;
  reviews: Review[];
  loading: boolean;
  error: string | null;
  onAddReview: (content: string) => void | Promise<void>;
  onClose: () => void;
};

export default function ReviewPanel({
  selected,
  reviews,
  loading,
  error,
  onAddReview,
  onClose,
}: Props) {
  if (!selected) return null;

  return (
    <div className="mt-6 border-t pt-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">
            Reviews for <span className="underline">{selected.name}</span>
          </h3>
          <p className="text-sm opacity-70">Role: {selected.role}</p>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={onClose} type="button">
          Close
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-4">
        <div className="card bg-base-100 border border-base-300">
          <div className="card-body">
            <h4 className="font-medium mb-2">Leave a review</h4>
            <ReviewForm onAdd={onAddReview} />
          </div>
        </div>

        <div className="card bg-base-100 border border-base-300">
          <div className="card-body">
            <h4 className="font-medium mb-2">Recent reviews</h4>

            {loading && (
              <div className="flex items-center gap-2 text-sm opacity-70">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading reviews…
              </div>
            )}

            {error && (
              <div className="alert alert-error">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            {!loading && !error && <ReviewList reviews={reviews} />}
          </div>
        </div>
      </div>
    </div>
  );
}
