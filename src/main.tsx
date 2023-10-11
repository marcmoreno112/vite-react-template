import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./users/operations/loginUser/shared/adapters/adapters.tsx";
import App from "./App.tsx";
import { defineCustomElements } from "@telekom/scale-components/loader";
import "@telekom/scale-components/dist/scale-components/scale-components.css";
import "./styles/styles.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

defineCustomElements();
