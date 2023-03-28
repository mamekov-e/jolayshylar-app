import React, { useContext } from 'react';
import {BusContext} from "./useBus.jsx";
import {RouteContext} from "./useRoute.jsx";

const BusRouteContext = React.createContext();

function BusRouteContextProvider({children}) {
  const busContext = useContext(BusContext);
  const routeContext = useContext(RouteContext);

  return (
    <BusRouteContext.Provider value={{busContext, routeContext} }>
      {children}
    </BusRouteContext.Provider>
  );
}

export { BusRouteContextProvider, BusRouteContext };