import React, {useState} from "react";
import {AddRouteSubpageCrumb} from "../constants/BreadcrumbItems.jsx";

const RouteContext = React.createContext();

function RouteContextProvider({children}) {
    const [routeItems, setRouteItems] = useState([]);

    const AddComponent = AddRouteSubpageCrumb(addRoute)

    function addRoute(values) {
        const id = routeItems.length > 0 ? routeItems[routeItems.length - 1].id + 1 : 0;
        const route_name = values.stops[0].label + " → " + values.stops[values.stops.length - 1].label
        const stopsArr = values.stops.map(stop=>({
            id: stop.value,
            stop_name: stop.label
        }))

        const newRoute = {
            id,
            route_number: values.route_number,
            route_name,
            stops: stopsArr
        };
        setRouteItems((prevItems) => [...prevItems, newRoute]);
        return true
    }

    function editRoute(values, route) {
        const updatedItems = routeItems.map((item) => {
            if (item.id === route.id) {
                const route_name = values.stops[0].label + " → " + values.stops[values.stops.length - 1].label

                return {...item, ...values, route_name};
            }
            return item;
        });
        setRouteItems(updatedItems);
        return true
    }

    function removeRoutes(busIds) {
        setRouteItems((prevItems) => {
            const filteredItems = prevItems.filter(
                (item) => !busIds.includes(item)
            );
            return filteredItems;
        });
    }

    return (
        <RouteContext.Provider
            value={{
                items: routeItems,
                remove: removeRoutes,
                AddComponent,
                edit: editRoute
            }}
        >
            {children}
        </RouteContext.Provider>
    );
}

export {RouteContextProvider, RouteContext};
