import { useSyncExternalStore } from "react";
import { authStore } from "./authStore";

export const useAuthToken = () =>
  useSyncExternalStore(authStore.subscribe, authStore.getToken);
