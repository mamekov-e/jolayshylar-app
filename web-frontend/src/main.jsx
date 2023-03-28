import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import {BrowserRouter} from "react-router-dom";
import "./index.css";
import {BusContextProvider} from "./contexts/useBus";
import {BreadcrumbContextProvider} from "./contexts/useBreadcrumb";
import {RouteContextProvider} from "./contexts/useRoute.jsx";
import {BusRouteContextProvider} from "./contexts/useBusRoute";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <RouteContextProvider>
                <BusContextProvider>
                    <BusRouteContextProvider>
                        <BreadcrumbContextProvider>
                            <App/>
                        </BreadcrumbContextProvider>
                    </BusRouteContextProvider>
                </BusContextProvider>
            </RouteContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);
