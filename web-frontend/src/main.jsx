import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import {BrowserRouter} from "react-router-dom";
import "./index.css";
import {BusContextProvider} from "./contexts/useBus";
import {BreadcrumbContextProvider} from "./contexts/useBreadcrumb";
import {RouteContextProvider} from "./contexts/useRoute.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <BreadcrumbContextProvider>
                <RouteContextProvider>
                    <BusContextProvider>
                        <App/>
                    </BusContextProvider>
                </RouteContextProvider>
            </BreadcrumbContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);
