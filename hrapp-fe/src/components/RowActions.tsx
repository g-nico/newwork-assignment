import { Employee } from "../type/Employee";
import { MessageSquare, Pencil, Trash2 } from "lucide-react";

type RowActionsProps = {
    employee: Employee;
    onEdit: (employee: Employee) => void;
    onDelete: (employee: Employee) => void;
    onReview?: (employee: Employee) => void;
};

export function RowActions({ employee, onEdit, onDelete, onReview }: RowActionsProps) {
    return (
        <div className="flex gap-2 justify-end">
            <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => onEdit(employee)}
                aria-label={`Edit ${employee.name}`}
            >
                <Pencil className="w-4 h-4 mr-1" />
                Edit
            </button>

            <button
                type="button"
                className="btn btn-error btn-sm"
                onClick={() => onDelete(employee)}
                aria-label={`Delete ${employee.name}`}
            >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
            </button>
            <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => onReview?.(employee)}
                aria-label={`Review ${employee.name}`}
            >
                <MessageSquare className="w-4 h-4 mr-1" />
                Review
            </button>
        </div>
    );
}