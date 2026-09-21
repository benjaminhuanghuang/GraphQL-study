import { useQuery } from "urql";
import { authStore } from "../authStore";

const ME_QUERY = `#graphql
  query Me {
    me {
      id
      username
      createdAt
    }
  }
`;

interface MeResult {
  me: { id: string; username: string; createdAt: string } | null;
}

export const Dashboard = () => {
  const [result] = useQuery<MeResult>({ query: ME_QUERY });
  const { data, fetching, error } = result;

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-sm space-y-4 rounded-xl bg-white p-8 shadow-sm">
        {fetching && <p className="text-sm text-slate-500">Loading…</p>}
        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error.message}
          </p>
        )}
        {!fetching && !error && !data?.me && (
          <p className="text-sm text-slate-500">Not signed in.</p>
        )}
        {data?.me && (
          <>
            <h1 className="text-xl font-semibold text-slate-900">
              Welcome, {data.me.username}
            </h1>
            <p className="text-sm text-slate-500">User id: {data.me.id}</p>
            <p className="text-sm text-slate-500">
              Joined: {data.me.createdAt}
            </p>
            <button
              onClick={() => authStore.setToken(null)}
              className="w-full rounded-md bg-slate-900 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Log out
            </button>
          </>
        )}
      </div>
    </main>
  );
};
