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
import {ChakraProvider, theme} from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
                                    {/*<ChakraProvider theme={theme}>*/}
        <BrowserRouter>
            <ReportContextProvider>
                <RouteContextProvider>
                    <BusContextProvider>
                        <FeaturesContextProvider>
                            <BreadcrumbContextProvider>
                                <AuthContextProvider>
                                        <App/>
                                </AuthContextProvider>
                            </BreadcrumbContextProvider>
                        </FeaturesContextProvider>
                    </BusContextProvider>
                </RouteContextProvider>
            </ReportContextProvider>
        </BrowserRouter>
                                    {/*</ChakraProvider>*/}
    </React.StrictMode>
);
