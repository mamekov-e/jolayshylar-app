import React, { useContext } from 'react';
import {BusContext} from "./useBus.jsx";
import {RouteContext} from "./useRoute.jsx";
import {ReportContext} from "./useReport.jsx";

const FeaturesContext = React.createContext();

function FeaturesContextProvider({children}) {
  const busContext = useContext(BusContext);
  const routeContext = useContext(RouteContext);
  const reportContext = useContext(ReportContext);

  return (
    <FeaturesContext.Provider value={{busContext, routeContext, reportContext} }>
      {children}
    </FeaturesContext.Provider>
  );
}

export { FeaturesContextProvider, FeaturesContext };