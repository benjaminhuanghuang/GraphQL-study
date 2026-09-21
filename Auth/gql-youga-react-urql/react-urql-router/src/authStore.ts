const TOKEN_KEY = "auth_token";

type Listener = () => void;
const listeners = new Set<Listener>();

let token: string | null = localStorage.getItem(TOKEN_KEY);

export const authStore = {
  getToken: () => token,
  setToken(next: string | null) {
    token = next;
    if (next) {
      localStorage.setItem(TOKEN_KEY, next);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
    listeners.forEach((listener) => listener());
  },
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};
