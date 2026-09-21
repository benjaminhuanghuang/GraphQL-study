import { createBrowserRouter, Navigate, Outlet } from "react-router";
import { Layout } from "./Layout";
import { About } from "./pages/About";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { TaskDetail } from "./pages/TaskDetail";
import { TaskList } from "./pages/TaskList";
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
        children: [{ path: "/login", element: <Login /> }],
      },
      {
        element: <RequireAuth />,
        children: [
          { path: "/task-list", element: <TaskList /> },
          { path: "/tasks/:id", element: <TaskDetail /> },
        ],
      },
    ],
  },
]);
