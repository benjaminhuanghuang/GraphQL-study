import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useState, type SubmitEvent } from "react";
import { authStore } from "../authStore";
import { getErrorMessage } from "../getErrorMessage";

const SIGNUP_MUTATION = gql`
  mutation Signup($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

interface SignupResult {
  signup: { token: string };
}

interface LoginResult {
  login: { token: string };
}

export const Login = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signup] = useMutation<SignupResult>(SIGNUP_MUTATION);
  const [login] = useMutation<LoginResult>(LOGIN_MUTATION);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    setError(null);

    try {
      const token =
        mode === "signup"
          ? (await signup({ variables: { username, password } })).data
              ?.signup.token
          : (await login({ variables: { username, password } })).data?.login
              .token;
      if (token) authStore.setToken(token);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm space-y-4 rounded-xl bg-white p-8 shadow-sm"
      >
        <h1 className="text-xl font-semibold text-slate-900">
          {mode === "login" ? "Log in" : "Sign up"}
        </h1>

        <label className="block text-sm font-medium text-slate-700">
          Username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            minLength={3}
            required
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
          />
        </label>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-md bg-slate-900 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          {mode === "login" ? "Log in" : "Sign up"}
        </button>

        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="w-full text-center text-sm text-slate-500 hover:text-slate-700"
        >
          {mode === "login"
            ? "Need an account? Sign up"
            : "Have an account? Log in"}
        </button>
      </form>
    </main>
  );
};
