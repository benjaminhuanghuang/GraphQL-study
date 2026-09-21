import { NavLink } from "react-router";
import { authStore } from "../authStore";
import { useAuthToken } from "../useAuthToken";

const linkClassName = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? "font-semibold text-blue-600"
    : "text-slate-600 hover:text-slate-900";

export const Navbar = () => {
  const token = useAuthToken();

  return (
    <nav className="flex items-center gap-4 border-b border-slate-200 bg-white px-4 py-3 text-sm">
      <NavLink to="/" end className={linkClassName}>
        GraphQL Auth Study
      </NavLink>
      <NavLink to="/about" className={linkClassName}>
        About
      </NavLink>
      {token ? (
        <>
          <NavLink to="/task-list" className={linkClassName}>
            Task List
          </NavLink>
          <button
            onClick={() => authStore.setToken(null)}
            className="ml-auto text-slate-600 hover:text-slate-900"
          >
            Log out
          </button>
        </>
      ) : (
        <NavLink
          to="/login"
          className={({ isActive }) => `ml-auto ${linkClassName({ isActive })}`}
        >
          Log in
        </NavLink>
      )}
    </nav>
  );
};
