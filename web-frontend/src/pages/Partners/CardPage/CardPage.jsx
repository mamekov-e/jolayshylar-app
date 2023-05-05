import React, {useContext, useEffect} from "react";
import Divider from "../../../components/CustomComponents/Divider/Divider";
import "./CardPage.css";
import {BreadcrumbContext} from "../../../contexts/useBreadcrumb.jsx";
import {
    AllBusesSubpageCrumb,
    AllReportsSubpageCrumb,
    AllRoutesSubpageCrumb
} from "../../../constants/BreadcrumbItems.jsx";
import OpenedPage from "../../../components/InfoPage/MainComponents/OpenedPage/OpenedPage.jsx";

export default function CardPage({pageName}) {
    const {subpage, setSubpageData, goToSubpage} = useContext(BreadcrumbContext);

    useEffect(() => {
        if (location.pathname.includes("/buses")) {
            setSubpageData(AllBusesSubpageCrumb)
            goToSubpage(AllBusesSubpageCrumb);
        } else if (location.pathname.includes("/routes")) {
            setSubpageData(AllRoutesSubpageCrumb)
            goToSubpage(AllRoutesSubpageCrumb);
        } else if (location.pathname.includes("/reports")) {
            setSubpageData(AllReportsSubpageCrumb)
            goToSubpage(AllReportsSubpageCrumb);
        }
    }, [])

    return (
        <main>
            <div className="pageHeader">
                <h2 className="subpageTitle">{pageName} компании</h2>
            </div>
            <div className="section">
                <div className="subheader">
                    <OpenedPage />
                </div>
                <Divider/>
                <div className="subpagesStyle">{subpage.component}</div>
            </div>
        </main>
    );
}
