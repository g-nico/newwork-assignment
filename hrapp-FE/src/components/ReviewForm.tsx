import React from "react";

export function ReviewForm({
    onAdd,
    busy,
}: {
    onAdd: (content: string) => Promise<void> | void;
    busy?: boolean;
}) {
    const [content, setcontent] = React.useState("");
    const [err, setErr] = React.useState("");

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return setErr("Please add a short content.");
        setErr("");
        await onAdd(content.trim());
        setcontent("");
    };

    return (
        <form onSubmit={submit} className="grid gap-3">
            <textarea
                className="textarea textarea-bordered w-full"
                placeholder="What stood out about working with them?"
                value={content}
                onChange={(e) => setcontent(e.target.value)}
                disabled={busy}
                rows={3}
            />

            {/* Notice about HuggingFace */}
            <p className="text-xs text-gray-500">
                ✨ This review will be automatically polished using HuggingFace language models before publishing.
            </p>

            {err && <p className="text-sm text-red-500">{err}</p>}

            <div className="flex justify-end">
                <button className="btn btn-primary" disabled={busy}>
                    {busy ? "Submitting..." : "Submit review"}
                </button>
            </div>
        </form>
    );

}