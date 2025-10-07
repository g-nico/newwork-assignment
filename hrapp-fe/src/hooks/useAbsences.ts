import { useState, useCallback } from "react";
import type { Absence } from "../type/Absence";

const API_BASE_URL = "http://localhost:8080/api/absences";

export function useAbsences() {
    const [absences, setAbsences] = useState<Absence[]>([]);
    const [error, setError] = useState<string | null>(null);

    function readCookie(name: string) {
        return document.cookie
            .split("; ")
            .find(c => c.startsWith(name + "="))
            ?.split("=")[1];
    }

    const createAbsence = useCallback(
        async (review: Omit<Absence, "uuid">) => {
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
                const created: Absence = await response.json();
                setAbsences((prev) => [created, ...prev]);
                return created;
            } catch (err) {
                setError(err instanceof Error ? err.message : String(err));
                throw err;
            }
        },
        []
    );

    return {
        absences,
        error,
        createAbsence,
    };
}

