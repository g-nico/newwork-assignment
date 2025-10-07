import { useState } from "react";
import type { Employee, CreateEmployeePayload, UpdateEmployeePayload } from "../type/Employee";

const BASE_URL = "http://localhost:8080/api/employees";

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function readCookie(name: string) {
    return document.cookie
      .split("; ")
      .find(c => c.startsWith(name + "="))
      ?.split("=")[1];
  }

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(BASE_URL, {
        method: "GET",
        credentials: "include"
      });
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
      const data: Employee[] = await res.json();
      setEmployees(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const create = async (payload: CreateEmployeePayload) => {
    const token = readCookie("XSRF-TOKEN");
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "X-XSRF-TOKEN": token } : {})
      },
      body: JSON.stringify(payload),
      credentials: "include",
    });
    if (!res.ok) throw new Error(`Create failed: ${res.status}`);
    const created: Employee = await res.json();
    setEmployees((prev) => [created, ...prev]);
    return created;
  };

  const update = async (id: string, payload: UpdateEmployeePayload) => {
    const token = readCookie("XSRF-TOKEN");
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
         ...(token ? { "X-XSRF-TOKEN": token } : {})
      },
      body: JSON.stringify(payload),
      credentials: "include"
    });
    if (!res.ok) throw new Error(`Update failed: ${res.status}`);
    const updated: Employee = await res.json();
    setEmployees((prev) => prev.map((e) => (e.uuid === id ? updated : e)));
    return updated;
  };

  const remove = async (id: string) => {
    const token = readCookie("XSRF-TOKEN");
    const res = await fetch(`${BASE_URL}/${id}`, {
      credentials: "include",
      method: "DELETE",
      headers: token ? { "X-XSRF-TOKEN": token } : undefined
    });
    if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
    setEmployees((prev) => prev.filter((e) => e.uuid !== id));
  };

  return { employees, loading, error, fetchAll, create, update, remove };
}
