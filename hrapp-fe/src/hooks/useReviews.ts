import { useState, useCallback } from "react";
import type { Review } from "../type/Review";

const API_BASE_URL = "http://localhost:8080/api/reviews";

export function useReviews(targetId?: string) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    function readCookie(name: string) {
        return document.cookie
            .split("; ")
            .find(c => c.startsWith(name + "="))
            ?.split("=")[1];
    }

    const fetchReviews = useCallback(async (targetId: string) => {
        if (!targetId) return;
        setLoading(true);
        setError(null);
        try {
            const token = readCookie("XSRF-TOKEN");
            const response = await fetch(`${API_BASE_URL}/${targetId}`, {
                credentials: "include",
                headers: {
                    ...(token ? { "X-XSRF-TOKEN": token } : {})
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch reviews: ${response.status}`);
            }
            const data: Review[] = await response.json();
            setReviews(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
        } finally {
            setLoading(false);
        }
    }, []);

    const createReview = useCallback(
        async (review: Omit<Review, "uuid">) => {
            try {
                const token = readCookie("XSRF-TOKEN");
                const response = await fetch(API_BASE_URL, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        ...(token ? { "X-XSRF-TOKEN": token } : {})
                    },
                    body: JSON.stringify(review),

                });
                if (!response.ok) {
                    throw new Error(`Failed to create review: ${response.status}`);
                }
                const created: Review = await response.json();
                setReviews((prev) => [created, ...prev]);
                return created;
            } catch (err) {
                setError(err instanceof Error ? err.message : String(err));
                throw err;
            }
        },
        []
    );

    return {
        reviews,
        loading,
        error,
        fetchReviews,
        createReview,
    };
}

