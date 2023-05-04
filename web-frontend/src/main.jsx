import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import {BrowserRouter} from "react-router-dom";
import "./index.css";
import {BusContextProvider} from "./contexts/useBus";
import {BreadcrumbContextProvider} from "./contexts/useBreadcrumb";
import {FeaturesContextProvider} from "./contexts/useFeatures.jsx";
import {ReportContextProvider} from "./contexts/useReport.jsx";
import {RouteContextProvider} from "./contexts/useRoute.jsx";
import {AuthContextProvider} from "./contexts/useAuth.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthContextProvider>
                <ReportContextProvider>
                    <RouteContextProvider>
                        <BusContextProvider>
                            <FeaturesContextProvider>
                                <BreadcrumbContextProvider>
                                    <App/>
                                </BreadcrumbContextProvider>
                            </FeaturesContextProvider>
                        </BusContextProvider>
                    </RouteContextProvider>
                </ReportContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);
