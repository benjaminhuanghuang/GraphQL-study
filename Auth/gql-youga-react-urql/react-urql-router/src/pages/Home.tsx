import { Link } from "react-router";

export const Home = () => (
  <main className="mx-auto max-w-2xl px-4 py-16">
    <h1 className="text-2xl font-semibold text-slate-900">
      GraphQL Auth Study
    </h1>
    <p className="mt-3 text-sm text-slate-600">
      A minimal username/password auth flow, built to study how JWT auth
      works end-to-end in GraphQL — server-side context/resolvers and
      client-side token handling with urql.
    </p>
    <div className="mt-6 flex gap-3">
      <Link
        to="/login"
        className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
      >
        Log in / Sign up
      </Link>
      <Link
        to="/about"
        className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        About
      </Link>
    </div>
  </main>
);
