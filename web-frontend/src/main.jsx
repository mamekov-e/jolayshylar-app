import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { BusContextProvider } from "./contexts/useBus";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BusContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </BusContextProvider>
  </React.StrictMode>
);
