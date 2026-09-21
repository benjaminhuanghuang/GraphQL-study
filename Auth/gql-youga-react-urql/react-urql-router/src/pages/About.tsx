export const About = () => (
  <main className="mx-auto max-w-2xl px-4 py-16">
    <h1 className="text-2xl font-semibold text-slate-900">About</h1>
    <p className="mt-3 text-sm text-slate-600">
      Backend: GraphQL Yoga + TypeScript + <code>node:sqlite</code> (no ORM).
      Frontend: React 19 + React Router 8 + Tailwind CSS 4 + urql.
    </p>
    <p className="mt-3 text-sm text-slate-600">
      Auth: <code>signup</code>/<code>login</code> mutations return a JWT,
      stored client-side and attached to every request via urql's{" "}
      <code>authExchange</code>. The <code>/dashboard</code> route is the
      only one that requires a valid token.
    </p>
  </main>
);
