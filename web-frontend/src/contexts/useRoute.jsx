import React, {useContext, useState} from "react";
import buses from "../staticData/busItemsData.json";
import {AllRoutesSubpageCrumb,} from "../constants/BreadcrumbItems";
import {BreadcrumbContext} from "./useBreadcrumb";

const RouteContext = React.createContext();

function RouteContextProvider({children}) {
    const [subpage, setSubpage] = useState(AllRoutesSubpageCrumb);
    const [deleteOn, setDeleteOn] = useState(false);

    const [routeItems, setRouteItems] = useState(buses);
    const {openSubpage} = useContext(BreadcrumbContext);

    function goToSubpage(subpageToOpen) {
        setSubpage(subpageToOpen);
        openSubpage(subpageToOpen);
        if (deleteOn)
            setDeleteOn(false)
    }

    function addRoute(values) {
        const id = routeItems.length > 0 ? routeItems[routeItems.length - 1].id + 1 : 0;
        const newRoute = {id, ...values, selected: false};
        setRouteItems((prevItems) => [...prevItems, newRoute]);
        goToSubpage(AllRoutesSubpageCrumb);
    }

    function editRoute(values, bus) {
        const updatedItems = routeItems.map((item) => {
            if (item.id === bus.id) {
                return {...item, ...values};
            }
            return item;
        });
        setRouteItems(updatedItems);
        // const editedRoute = updatedItems.find((prevItem) => prevItem.id === bus.id);
        goToSubpage(AllRoutesSubpageCrumb);
    }

    function removeRoutes(busIds) {
        setRouteItems((prevItems) => {
            const filteredItems = prevItems.filter(
                (item) => !busIds.includes(item.id)
            );
            return filteredItems;
        });
    }

    function getRoute(busId) {
        return routeItems.filter((prevItem) => prevItem.id === busId);
    }

    function selectAll() {
        const updatedRoutes = routeItems.map((bus) => {
            return {...bus, selected: !bus.selected};
        });
        setRouteItems(updatedRoutes);
    }

    return (
        <RouteContext.Provider
            value={{
                subpage,
                deleteOn,
                routeItems,
                goToSubpage,
                setDeleteOn,
                removeRoutes,
                addRoute,
                editRoute,
                selectAll,
                getRoute,
            }}
        >
            {children}
        </RouteContext.Provider>
    );
}

export {RouteContextProvider, RouteContext};
