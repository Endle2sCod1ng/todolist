import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app/styles/index.css";
import { App } from "./App.tsx";
import { MuiThemeProvider } from "./app/providers/MuiThemeProvider/MuiThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>

      <App />
  </StrictMode>
);
