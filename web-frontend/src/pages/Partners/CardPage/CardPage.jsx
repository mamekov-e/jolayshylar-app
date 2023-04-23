import React, {useContext, useEffect} from "react";
import Divider from "../../../components/CustomComponents/Divider/Divider";
import Subheader from "../../../components/InfoPage/MainComponents/PageSubheader/Subheader";
import SearchComponent from "../../../components/InfoPage/MainComponents/Search/SearchComponent";
import "./CardPage.css";
import {BreadcrumbContext} from "../../../contexts/useBreadcrumb.jsx";
import {
    AllBusesSubpageCrumb,
    AllReportsSubpageCrumb,
    AllRoutesSubpageCrumb
} from "../../../constants/BreadcrumbItems.jsx";

export default function CardPage({pageName, context}) {
    const {subpage, setSubpageData, goToSubpage} = useContext(BreadcrumbContext);

    useEffect(() => {
        if (location.pathname.includes("/buses")) {
            setSubpageData(context, AllBusesSubpageCrumb)
            goToSubpage(AllBusesSubpageCrumb);
        } else if (location.pathname.includes("/routes")) {
            setSubpageData(context, AllRoutesSubpageCrumb)
            goToSubpage(AllRoutesSubpageCrumb);
        } else if (location.pathname.includes("/reports")) {
            setSubpageData(context, AllReportsSubpageCrumb)
            goToSubpage(AllReportsSubpageCrumb);
        }
    }, [context])

    return (
        <main>
            <div className="pageHeader">
                <h2 className="subpageTitle">{pageName} компании</h2>
                {/*<SearchComponent/>*/}
            </div>
            <div className="section">
                <Subheader/>
                <Divider/>
                <div className="subpagesStyle">{subpage.component}</div>
            </div>
        </main>
    );
}
