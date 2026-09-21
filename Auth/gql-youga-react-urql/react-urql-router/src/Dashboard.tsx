import { useQuery } from "urql";
import { authStore } from "./authStore";

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

  if (fetching) return <p>Loading…</p>;
  if (error) return <p role="alert">{error.message}</p>;
  if (!data?.me) return <p>Not signed in.</p>;

  return (
    <div>
      <h1>Welcome, {data.me.username}</h1>
      <p>User id: {data.me.id}</p>
      <p>Joined: {data.me.createdAt}</p>
      <button onClick={() => authStore.setToken(null)}>Log out</button>
    </div>
  );
};
