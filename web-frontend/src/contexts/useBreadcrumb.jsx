import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AllBusesSubpageCrumb,
  MainPageCrumb,
} from "../constants/BreadcrumbItems";
const BreadcrumbContext = React.createContext();

function BreadcrumbContextProvider({ children }) {
  const [breadcrumb, setBreadcrumb] = useState([MainPageCrumb]);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname.includes("/buses")) {
      openSubpage(AllBusesSubpageCrumb);
    } else if (pathname.includes("/reports")) {
      openSubpage(AllBusesSubpageCrumb);
    }
  }, [location]);

  function openSubpage(subpageToOpen) {
    const spExist = breadcrumb.find(
      (sp) => sp.subPageName === subpageToOpen.subPageName
    );
    if (spExist) {
      sliceBreadcrumb(spExist);
    } else {
      breadcrumb.push(subpageToOpen);
    }
    if (subpageToOpen.link !== "#") {
      navigate(subpageToOpen.link);
    }
  }

  function sliceBreadcrumb(subpage) {
    const indexOfSP = breadcrumb.indexOf(subpage);
    const sliced = breadcrumb.slice(0, indexOfSP + 1);
    setBreadcrumb(sliced);
  }

  return (
    <BreadcrumbContext.Provider
      value={{
        breadcrumb,
        openSubpage,
      }}
    >
      {children}
    </BreadcrumbContext.Provider>
  );
}

export { BreadcrumbContextProvider, BreadcrumbContext };
