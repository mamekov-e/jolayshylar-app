import React, {useEffect, useState} from "react";
import {AddRouteSubpageCrumb} from "../constants/BreadcrumbItems.jsx";
import axiosUtil from "../utils/axiosUtil.jsx";

const RouteContext = React.createContext();

function RouteContextProvider({children}) {
    const [routeItems, setRouteItems] = useState([]);
    const api = axiosUtil()

    const AddComponent = AddRouteSubpageCrumb(addRoute)

    async function addRoute(values) {
        const route_name = values.stops[0].label + " → " + values.stops[values.stops.length - 1].label
        const stopsArr = values.stops.map(stop => ({
            id: stop.value,
            stop_name: stop.label
        }))

        const newRoute = {
            route_number: values.route_number,
            route_name,
            stops: stopsArr
        };
        try {
            const response = await api.post(
                "/transports/add-route/",
                newRoute,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
            if (response.status === 200) {
                setRouteItems((prevItems) => [...prevItems, response.data.route]);
                return true
            }
        } catch (err) {
            return err.response.data
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
                return {...item, route_number: values.route_number, route_name}
            }
            return item;
        });
        try {
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
        } catch (err) {
            return err.response.data
        }
    }

    async function removeRoutes(routes) {
        const busIds = []
        routes.forEach((bus) => {
            busIds.push(bus.id)
        })
        const params = new URLSearchParams({ids: busIds.join(',')})
        try {
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
        } catch (err) {
            return err.response.data

        }
    }

    async function getRouteById(id) {
        try {
            const params = new URLSearchParams({id: id})
            const response = await api.get("/transports/get-routes-stops/?" + params.toString(),
                {
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}
                })
            return response.data
        } catch (err) {
            return "Cannot load stops"
        }
    }

    useEffect(() => {
        async function fetchRouteItems () {
            try {
                const response = await api.get("/transports/get-routes-of-company/")
                setRouteItems(response.data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchRouteItems()
    }, [])

    return (
        <RouteContext.Provider
            value={{
                items: routeItems,
                remove: removeRoutes,
                getRouteById,
                AddComponent,
                edit: editRoute
            }}
        >
            {children}
        </RouteContext.Provider>
    );
}

export {RouteContextProvider, RouteContext};
