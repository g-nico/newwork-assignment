import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import EmployeesPage from "./pages/EmployeesPage";
import RequireAuth from "./components/RequireAuth";

export default function App(): React.JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/employees"
        element={
          <RequireAuth>
            <EmployeesPage />
          </RequireAuth>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
