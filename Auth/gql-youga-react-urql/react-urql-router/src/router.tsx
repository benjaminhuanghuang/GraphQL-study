import { createBrowserRouter, Navigate, Outlet } from "react-router";
import { AuthForm } from "./AuthForm";
import { Dashboard } from "./Dashboard";
import { useAuthToken } from "./useAuthToken";

const RequireAuth = () => {
  const token = useAuthToken();
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

const RedirectIfAuthed = () => {
  const token = useAuthToken();
  return token ? <Navigate to="/" replace /> : <Outlet />;
};

export const router = createBrowserRouter([
  {
    element: <RedirectIfAuthed />,
    children: [{ path: "/login", element: <AuthForm /> }],
  },
  {
    element: <RequireAuth />,
    children: [{ path: "/", element: <Dashboard /> }],
  },
]);
