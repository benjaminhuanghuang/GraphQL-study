import { Link } from "react-router";
import { authStore } from "../authStore";
import { useAuthToken } from "../useAuthToken";

export const Navbar = () => {
  const token = useAuthToken();

  return (
    <nav className="flex items-center gap-4 border-b border-slate-200 bg-white px-4 py-3 text-sm">
      <Link to="/" className="font-semibold text-slate-900">
        GraphQL Auth Study
      </Link>
      <Link to="/about" className="text-slate-600 hover:text-slate-900">
        About
      </Link>
      {token ? (
        <>
          <Link to="/dashboard" className="text-slate-600 hover:text-slate-900">
            Dashboard
          </Link>
          <button
            onClick={() => authStore.setToken(null)}
            className="ml-auto text-slate-600 hover:text-slate-900"
          >
            Log out
          </button>
        </>
      ) : (
        <Link
          to="/login"
          className="ml-auto text-slate-600 hover:text-slate-900"
        >
          Log in
        </Link>
      )}
    </nav>
  );
};
