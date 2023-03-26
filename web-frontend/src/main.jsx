import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { BusContextProvider } from "./contexts/useBus";
import { BreadcrumbContextProvider } from "./contexts/useBreadcrumb";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <BreadcrumbContextProvider>
        <BusContextProvider>
          <App />
        </BusContextProvider>
      </BreadcrumbContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
