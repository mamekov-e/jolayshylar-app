import React, {useEffect, useState, useContext} from "react";
import axiosUtil from "../utils/axiosUtil.jsx";
import {AuthContext} from "./useAuth.jsx";
import {BASE_URL} from "../constants/Data.jsx";

const RouteContext = React.createContext();

function RouteContextProvider({children}) {
    const {authTokens} = useContext(AuthContext);
    const [routeItems, setRouteItems] = useState([]);
    const [message, setMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const api = axiosUtil()

    async function addRoute(values) {
        const route_name = values.stops[0].stop_name + " → " + values.stops[values.stops.length - 1].stop_name
        const stopsArr = values.stops.map(stop => ({
            id: stop.value,
            stop_name: stop.stop_name
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
                showMessage("Запись успешно добавлена")
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
                const route_name = values.stops[0].stop_name + " → " + values.stops[values.stops.length - 1].stop_name
                const stopsArr = values.stops.map(stop => ({
                    id: stop.value,
                    stop_name: stop.stop_name
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
                showMessage("Записи успешно изменены")
                return true
            }
        } catch (err) {
            return err.response.data
        }
    }

    async function removeRoutes(routes) {
        const routeIds = []
        routes.forEach((route) => {
            routeIds.push(route.id)
        })
        const params = new URLSearchParams({ids: routeIds.join(',')})
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
                showMessage("Записи успешно удалены")
                return true
            }
        } catch (err) {
            return err.response.data
        }
    }

    async function getRouteStopsById(id) {
        try {
            const params = new URLSearchParams({id: id})
            const response = await fetch(`${BASE_URL}/transports/get-routes-stops/?${params.toString()}`, {
                method: "GET",
                headers: {"Content-Type": "application/x-www-form-urlencoded"}
            })
            return await response.json()
        } catch (err) {
            return "Cannot load stops"
        }
    }

    const showMessage = (message) => {
        setMessage(message);

        setTimeout(() => {
            setMessage(null);
        }, 1500);
    };

    useEffect(() => {
        async function fetchRouteItems () {
            try {
                const response = await api.get("/transports/get-routes-of-company/")
                setRouteItems(response.data)
                setIsLoading(false)
            } catch (err) {
                setMessage(err)
                console.error(err)
            }
        }
        if (authTokens)
            fetchRouteItems()
    }, [authTokens])

    return (
        <RouteContext.Provider
            value={{
                routeItems,
                message,
                isLoading,
                getRouteStopsById,
                addRoute,
                removeRoutes,
                editRoute
            }}
        >
            {children}
        </RouteContext.Provider>
    );
}

export {RouteContextProvider, RouteContext};
