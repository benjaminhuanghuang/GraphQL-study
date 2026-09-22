import { Link, useNavigate, useParams } from "react-router";
import { useMutation, useQuery } from "urql";

const TASK_QUERY = `#graphql
  query Task($id: ID!) {
    task(id: $id) {
      id
      title
      description
      createdAt
    }
  }
`;

const DELETE_TASK_MUTATION = `#graphql
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;

interface TaskResult {
  task: {
    id: string;
    title: string;
    description: string | null;
    createdAt: string;
  } | null;
}

export const TaskDetail = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const [{ data, fetching, error }] = useQuery<TaskResult>({
    query: TASK_QUERY,
    variables: { id },
  });
  const [, deleteTask] = useMutation(DELETE_TASK_MUTATION);

  const onDelete = async () => {
    await deleteTask({ id });
    navigate("/task-list");
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <Link
        to="/task-list"
        className="text-sm text-slate-500 hover:text-slate-700"
      >
        ← Back to tasks
      </Link>

      <div className="mt-4 rounded-xl bg-white p-6 shadow-sm">
        {fetching && <p className="text-sm text-slate-500">Loading…</p>}
        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error.message}
          </p>
        )}
        {!fetching && !error && !data?.task && (
          <p className="text-sm text-slate-500">Task not found.</p>
        )}
        {data?.task && (
          <>
            <h1 className="text-xl font-semibold text-slate-900">
              {data.task.title}
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              {data.task.description || "No description."}
            </p>
            <p className="mt-4 text-xs text-slate-400">
              Created: {data.task.createdAt}
            </p>
            <button
              onClick={onDelete}
              className="mt-4 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Delete task
            </button>
          </>
        )}
      </div>
    </main>
  );
};
