import { createBrowserRouter, Navigate, Outlet } from "react-router";
import { Layout } from "./Layout";
import { About } from "./pages/About";
import { AuthForm } from "./pages/AuthForm";
import { Dashboard } from "./pages/Dashboard";
import { Home } from "./pages/Home";
import { useAuthToken } from "./useAuthToken";

const RequireAuth = () => {
  const token = useAuthToken();
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

const RedirectIfAuthed = () => {
  const token = useAuthToken();
  return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      {
        element: <RedirectIfAuthed />,
        children: [{ path: "/login", element: <AuthForm /> }],
      },
      {
        element: <RequireAuth />,
        children: [{ path: "/dashboard", element: <Dashboard /> }],
      },
    ],
  },
]);
