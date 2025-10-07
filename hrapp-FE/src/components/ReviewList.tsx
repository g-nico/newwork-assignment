import { Review } from "../type/Review";

export function ReviewList({ reviews }: { reviews: Review[] }) {
  if (!reviews?.length) {
    return <div className="text-sm opacity-70">No reviews yet — be the first!</div>;
  }
  return (
    <ul className="grid gap-3">
      {reviews
        .slice()
        .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
        .map((r) => (
          <li key={r.uuid} className="p-3 rounded-xl border border-base-300">
            <div className="flex items-center gap-2 text-sm opacity-70 mb-1">
              <span>{new Date(r.createdAt).toLocaleString()}</span>
            </div>
            <p className="text-sm">{r.content}</p>
          </li>
        ))}
    </ul>
  );
}