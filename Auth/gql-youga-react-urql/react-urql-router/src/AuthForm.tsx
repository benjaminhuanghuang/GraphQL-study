import { useState, type FormEvent } from "react";
import { useMutation } from "urql";
import { authStore } from "./authStore";

const SIGNUP_MUTATION = `#graphql
  mutation Signup($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
      token
    }
  }
`;

const LOGIN_MUTATION = `#graphql
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export const AuthForm = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, signup] = useMutation(SIGNUP_MUTATION);
  const [, login] = useMutation(LOGIN_MUTATION);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    const run = mode === "signup" ? signup : login;
    const result = await run({ username, password });

    if (result.error) {
      setError(result.error.graphQLErrors[0]?.message ?? result.error.message);
      return;
    }

    const token = (result.data?.signup ?? result.data?.login)?.token as
      | string
      | undefined;
    if (token) authStore.setToken(token);
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>{mode === "login" ? "Log in" : "Sign up"}</h1>
      <label>
        Username
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          minLength={3}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          required
        />
      </label>
      {error && <p role="alert">{error}</p>}
      <button type="submit">{mode === "login" ? "Log in" : "Sign up"}</button>
      <button
        type="button"
        onClick={() => setMode(mode === "login" ? "signup" : "login")}
      >
        {mode === "login" ? "Need an account? Sign up" : "Have an account? Log in"}
      </button>
    </form>
  );
};
