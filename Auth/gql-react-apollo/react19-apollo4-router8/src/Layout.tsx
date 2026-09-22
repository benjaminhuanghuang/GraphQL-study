import { Outlet } from "react-router";
import { Navbar } from "./components/Navbar";

export const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <Outlet />
    </div>
  );
};
