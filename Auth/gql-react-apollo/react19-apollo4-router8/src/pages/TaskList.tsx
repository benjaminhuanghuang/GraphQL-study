import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { useState, type SubmitEvent } from "react";
import { Link } from "react-router";
import { getErrorMessage } from "../getErrorMessage";

const TASKS_QUERY = gql`
  query Tasks {
    tasks {
      id
      title
      description
      createdAt
    }
  }
`;

const CREATE_TASK_MUTATION = gql`
  mutation CreateTask($title: String!, $description: String) {
    createTask(title: $title, description: $description) {
      id
    }
  }
`;

const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;

interface Task {
  id: string;
  title: string;
  description: string | null;
  createdAt: string;
}

interface TasksResult {
  tasks: Task[];
}

export const TaskList = () => {
  const { data, loading, error, refetch } =
    useQuery<TasksResult>(TASKS_QUERY);
  const [createTask] = useMutation(CREATE_TASK_MUTATION);
  const [deleteTask] = useMutation(DELETE_TASK_MUTATION);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const onCreate = async (event: SubmitEvent) => {
    event.preventDefault();
    setFormError(null);

    try {
      await createTask({
        variables: { title, description: description || null },
      });
    } catch (err) {
      setFormError(getErrorMessage(err));
      return;
    }

    setTitle("");
    setDescription("");
    refetch();
  };

  const onDelete = async (id: string) => {
    await deleteTask({ variables: { id } });
    refetch();
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-2xl font-semibold text-slate-900">Tasks</h1>

      <form
        onSubmit={onCreate}
        className="mt-6 space-y-3 rounded-xl bg-white p-6 shadow-sm"
      >
        <label className="block text-sm font-medium text-slate-700">
          Title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
          />
        </label>
        {formError && (
          <p role="alert" className="text-sm text-red-600">
            {formError}
          </p>
        )}
        <button
          type="submit"
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Add task
        </button>
      </form>

      <div className="mt-6 space-y-3">
        {loading && <p className="text-sm text-slate-500">Loading…</p>}
        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error.message}
          </p>
        )}
        {!loading && !error && data?.tasks.length === 0 && (
          <p className="text-sm text-slate-500">No tasks yet.</p>
        )}
        {data?.tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm"
          >
            <Link
              to={`/tasks/${task.id}`}
              className="text-sm font-medium text-slate-900 hover:underline"
            >
              {task.title}
            </Link>
            <button
              onClick={() => onDelete(task.id)}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};
