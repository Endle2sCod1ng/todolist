import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@/app/providers/StoreProvider/store/store";
// import { App } from "./app/App";
import "./app/styles/index.css";
import { AppHttpRequests } from "./app/AppHttpRequests";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AppHttpRequests />
    </Provider>
  </StrictMode>,
);
