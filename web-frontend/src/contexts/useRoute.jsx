import React, {useState, useMemo} from "react";
import routes from "../staticData/routeItemsData.json";
import busItemsData from "../staticData/busItemsData.json";
import allStopsList from "../staticData/allStopsList.json";
import {AddRouteSubpageCrumb} from "../constants/BreadcrumbItems.jsx";

const RouteContext = React.createContext();

function RouteContextProvider({children}) {
    const columns = useMemo(
        () => [
            {
                header: '#',
                accessorKey: 'id',
            },
            {
                header: "Номер маршрута",
                accessorKey: 'routeNumber',
            },
            {
                header: "Название",
                accessorKey: 'routeName',
            },
            {
                header: "Номер автобуса",
                accessorKey: 'busNumber',
            },
        ],
        [],
    );
    const [routeItems, setRouteItems] = useState(routes);
    const [busesList, setBusesList] = useState(busItemsData);
    const [stopsList, setStopsList] = useState(allStopsList);

    const AddComponent = AddRouteSubpageCrumb(addRoute)

    const initStopsOptions = () => {
        return stopsList.map(item => ({
            value: item.id,
            label: item.stopName
        }));
    }

    const initBusesOptions = () => {
        return busesList.map(item => ({
            value: item.number,
            label: item.number
        }));
    }

    function addRoute(values) {
        const id = routeItems.length > 0 ? routeItems[routeItems.length - 1].id + 1 : 0;
        const routeName = values.stops[0].label + " → " + values.stops[values.stops.length - 1].label
        const newRoute = {
            id,
            routeNumber: values.routeNumber,
            routeName,
            stops: values.stops,
            busNumber: values.busNumber,
            selected: false
        };
        setRouteItems((prevItems) => [...prevItems, newRoute]);
        return true
    }

    function editRoute(values, bus) {
        const updatedItems = routeItems.map((item) => {
            if (item.id === bus.id) {
                const routeName = values.stops[0].label + " → " + values.stops[values.stops.length - 1].label

                return {...item, ...values, routeName};
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
                allBusesList: initBusesOptions(),
                allStopsList: initStopsOptions(),
                columns,
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
