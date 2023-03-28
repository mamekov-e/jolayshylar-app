import React, {useState} from "react";
import routes from "../staticData/routeItemsData.json";
import {AddRouteSubpageCrumb} from "../constants/BreadcrumbItems.jsx";

const RouteContext = React.createContext();

function RouteContextProvider({children}) {
    const [routeItems, setRouteItems] = useState(routes);
    const [deleteOn, setDeleteOn] = useState(false);

    const AddComponent = AddRouteSubpageCrumb(addRoute)

    function addRoute(values) {
        const id = routeItems.length > 0 ? routeItems[routeItems.length - 1].id + 1 : 0;
        const newRoute = {id, ...values, selected: false};
        setRouteItems((prevItems) => [...prevItems, newRoute]);
        return true
    }

    function editRoute(values, bus) {
        const updatedItems = routeItems.map((item) => {
            if (item.id === bus.id) {
                return {...item, ...values};
            }
            return item;
        });
        setRouteItems(updatedItems);
        return true
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

    function resetDelete() {
        if (deleteOn)
            setDeleteOn(false)
    }

    return (
        <RouteContext.Provider
            value={{
                deleteOn,
                items: routeItems,
                setDeleteOn,
                remove: removeRoutes,
                AddComponent,
                edit: editRoute,
                selectAll,
                get: getRoute,
                resetDelete
            }}
        >
            {children}
        </RouteContext.Provider>
    );
}

export {RouteContextProvider, RouteContext};
