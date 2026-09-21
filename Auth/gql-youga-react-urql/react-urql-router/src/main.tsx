import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { Provider } from "urql";
import "./index.css";
import { router } from "./router";
import { client } from "./urql-client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider value={client}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
