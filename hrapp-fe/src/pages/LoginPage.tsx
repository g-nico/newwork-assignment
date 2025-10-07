import React, { useState, type FormEvent } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { setAuthenticated } from "../components/RequireAuth";

export default function LoginPage(): React.JSX.Element {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation() as { state?: { from?: Location } };
  const redirectTo = location.state?.from?.pathname ?? "/employees";

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        let msg = `Login failed (${res.status})`;
        try {
          const data = (await res.json()) as { message?: string; error?: string };
          msg = data?.message || data?.error || msg;
        } catch {
          /* ignore */
        }
        throw new Error(msg);
      }

      setAuthenticated();
      navigate(redirectTo, { replace: true });
    } catch (err: any) {
      setError(err.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl">Sign in</h2>
          <p className="opacity-70 text-sm">Use your credentials to access the Employee Manager.</p>

          {error && (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={onSubmit} className="grid gap-4 mt-2">
            <div className="form-control">
              <label className="label" htmlFor="username">
                <span className="label-text">Username</span>
              </label>
              <input
                id="username"
                className="input input-bordered w-full"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="jdoe"
                required
              />
            </div>

            <div className="form-control">
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <div className="join w-full">
                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  className="input input-bordered join-item w-full"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline join-item"
                  onClick={() => setShowPw((s) => !s)}
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary mt-2" disabled={loading}>
              {loading ? (
                <span className="loading loading-spinner mr-2" />
              ) : (
                <LogIn className="w-4 h-4 mr-2" />
              )}
              Sign in
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
