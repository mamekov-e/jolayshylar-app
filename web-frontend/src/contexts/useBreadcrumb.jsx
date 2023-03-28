import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {MainPageCrumb,} from "../constants/BreadcrumbItems";

const BreadcrumbContext = React.createContext();

function BreadcrumbContextProvider({children}) {
    const [allItemsPage, setAllItemsPage] = useState({})
    const [context, setContext] = useState({
        items: [],
        resetDelete: function () {
            return true
        },
        setDeleteOn: function () {
        }
    })

    const [breadcrumb, setBreadcrumb] = useState([MainPageCrumb]);
    const [subpage, setSubpage] = useState({});

    const navigate = useNavigate();

    function setSubpageData(newContext, subpageCrumb) {
        setAllItemsPage(subpageCrumb)
        setContext(newContext)
    }

    function goToSubpage(subpageToOpen) {
        pushOrMoveSubpageInSubheader(subpageToOpen);
        setSubpage(subpageToOpen);
        context.resetDelete()
    }

    function pushOrMoveSubpageInSubheader(subpageToOpen) {
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
                subpage,
                goToSubpage,
                setSubpageData,
                setAllItemsPage,
                context,
                allItemsPage
            }}
        >
            {children}
        </BreadcrumbContext.Provider>
    );
}

export {BreadcrumbContextProvider, BreadcrumbContext};
