import { AuthForm } from "./AuthForm";
import { Dashboard } from "./Dashboard";
import { useAuthToken } from "./useAuthToken";

export const App = () => {
  const token = useAuthToken();
  return token ? <Dashboard /> : <AuthForm />;
};
