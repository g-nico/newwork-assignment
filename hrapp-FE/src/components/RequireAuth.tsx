import { Navigate, useLocation } from "react-router-dom";

type Props = { children: React.JSX.Element };

const AUTH_KEY = "auth_ok";

export function isAuthenticated(): boolean {
  return localStorage.getItem(AUTH_KEY) === "true";
}

export function setAuthenticated() {
  localStorage.setItem(AUTH_KEY, "true");
}

export function clearAuthenticated() {
  localStorage.removeItem(AUTH_KEY);
}


export default function RequireAuth({ children }: Props) {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}
