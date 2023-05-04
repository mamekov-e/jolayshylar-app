import React, {useState} from "react";
import {AddRouteSubpageCrumb} from "../constants/BreadcrumbItems.jsx";
import axiosUtil from "../utils/axiosUtil.jsx";

const RouteContext = React.createContext();

function RouteContextProvider({children}) {
    const [routeItems, setRouteItems] = useState([]);
    const api = axiosUtil()

    const AddComponent = AddRouteSubpageCrumb(addRoute)

    async function addRoute(values) {
        const id = routeItems.length > 0 ? routeItems[routeItems.length - 1].id + 1 : 0;
        const route_name = values.stops[0].label + " → " + values.stops[values.stops.length - 1].label
        const stopsArr = values.stops.map(stop => ({
            id: stop.value,
            stop_name: stop.label
        }))

        const newRoute = {
            id,
            route_number: values.route_number,
            route_name,
            stops: stopsArr
        };
        const response = await api.post(
            "/transports/add-route/",
            newRoute,
            {
                headers: {
                    "Content-Type": "application/json",
                }
            })
        if (response.status === 200) {
            setRouteItems((prevItems) => [...prevItems, newRoute]);
            return true
        }
        if (response.status >= 400) {
            return response.data
        }
    }

    async function editRoute(values, route) {
        let updatedRoute = null
        const updatedRoutesItems = routeItems.map((item) => {
            if (item.id === route.id) {
                const route_name = values.stops[0].label + " → " + values.stops[values.stops.length - 1].label
                const stopsArr = values.stops.map(stop => ({
                    id: stop.value,
                    stop_name: stop.label
                }))
                updatedRoute = {...item, ...values, route_name, stops: stopsArr};
                return updatedRoute
            }
            return item;
        });
        const response = await api.post(
            "/transports/edit-route/",
            updatedRoute,
            {
                headers: {
                    "Content-Type": "application/json",
                }
            })
        if (response.status === 200) {
            setRouteItems(updatedRoutesItems);
            return true
        }
        if (response.status >= 400) {
            return response.data
        }
    }

    async function removeRoutes(routes) {
        const busIds = []
        routes.forEach((bus) => {
            busIds.push(bus.id)
        })
        const params = new URLSearchParams({ids: busIds.join(',')})
        const response = await api.delete(
            "/transports/delete-route/?" + params.toString(),
            {
                headers: {"Content-Type": "application/x-www-form-urlencoded"}
            })
        if (response.status === 200) {
            setRouteItems((prevItems) => {
                const filteredItems = prevItems.filter(
                    (item) => !routes.includes(item)
                );
                return filteredItems;
            });
            return true
        }
        if (response.status >= 400) {
            return response.data
        }
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
