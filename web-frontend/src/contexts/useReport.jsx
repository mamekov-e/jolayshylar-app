import React, {useState} from "react";
import routes from "../staticData/routeItemsData.json";
import busItemsData from "../staticData/busItemsData.json";
import allStopsList from "../staticData/allStopsList.json";
import {AddRouteSubpageCrumb} from "../constants/BreadcrumbItems.jsx";

const ReportContext = React.createContext();

function ReportContextProvider({children}) {
    const columns = React.useMemo(() => [
        {
            Header: "Номер маршрута",
            accessor: 'id',
        },
        {
            Header: "Название",
            accessor: 'routeName',
        },
        {
            Header: "Номер автобуса",
            accessor: 'number',
        },
    ], [])
    const [routeItems, setRouteItems] = useState(routes);
    const [busesList, setBusesList] = useState(busItemsData);
    const [stopsList, setStopsList] = useState(allStopsList);
    const [deleteOn, setDeleteOn] = useState(false);

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
        <ReportContext.Provider
            value={{
                deleteOn,
                items: routeItems,
                allBusesList: initBusesOptions(),
                allStopsList: initStopsOptions(),
                columns,
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
        </ReportContext.Provider>
    );
}

export {ReportContextProvider, ReportContext};
