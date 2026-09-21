import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "urql";
import { App } from "./App";
import { client } from "./urql-client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider value={client}>
      <App />
    </Provider>
  </StrictMode>,
);
