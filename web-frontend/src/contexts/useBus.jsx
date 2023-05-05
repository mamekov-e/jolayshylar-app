import React, {useEffect, useState} from "react";
import axiosUtil from "../utils/axiosUtil.jsx";
import {compareArrays} from "../utils/objectUtil.jsx";

const BusContext = React.createContext();

function BusContextProvider({children}) {
    const [busItems, setBusItems] = useState([]);
    const [changedState, setChangedState] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const api = axiosUtil()

    function changeBusTrackingState(buses, state) {
        setBusItems(prevItems => {
            return prevItems.map((bus) => {
                if (!buses.includes(bus))
                    return bus
                bus.is_tracking = state;
                return bus;
            });
        })
    }

    function checkIsTrackingAtLeastOne(buses) {
        return buses.some(bus => bus.is_tracking)
    }

    function createBusesReport(buses) {

    }

    async function addBus(values) {
        let newBus = {...values, route: values.route_number.value};
        delete newBus['route_number']
        try {
            const response = await api.post(
                "/transports/add-transport/",
                newBus,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
            if (response.status === 200) {
                setBusItems((prevItems) => [...prevItems, response.data.transport]);
                return true
            }
        } catch (err) {
            return err.response.data
        }
    }

    async function editBus(values, bus) {
        let editedBus = {...values, route: values.route_number.value, id: bus.id};
        delete editedBus['route_number']

        try {
            const response = await api.put(
                "/transports/edit-transport/",
                editedBus,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
            if (response.status === 200) {
                setBusItems(prevItems => {
                    return prevItems.map((item) => {
                        if (item.id === bus.id) {
                            const editedItem = {
                                ...item, ...values,
                                route: {id: values.route_number.value, route_number: values.route_number.label}
                            }
                            delete editedItem['route_number']
                            return editedItem;
                        }
                        return item;
                    });
                });
                return true
            }
        } catch (err) {
            console.error(err)
            return err.response.data
        }
    }

    async function removeBuses(buses) {
        const busIds = []
        buses.forEach((bus) => {
            busIds.push(bus.id)
        })
        const params = new URLSearchParams({ids: busIds.join(',')})
        try {
            const response = await api.delete(
                "/transports/delete-transport/?" + params.toString(),
                {
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}
                })
            if (response.status === 200) {
                setBusItems((prevItems) => {
                    const filteredItems = prevItems.filter(
                        (item) => !buses.includes(item)
                    );
                    return filteredItems;
                });
                return true
            }
        } catch (err) {
            return err.response.data
        }
    }

    useEffect(() => {
        async function fetchBusItems() {
            try {
                const response = await api.get("/transports/get-transports-of-company/")

                if (!compareArrays(busItems, response.data))
                    setBusItems(response.data)
                setChangedState(false)
                setIsLoading(false)
            } catch (err) {
                console.error(err)
                setError(err)
            }
        }

        fetchBusItems()
    }, [changedState])

    return (
        <BusContext.Provider
            value={{
                changeBusTrackingState,
                checkIsTrackingAtLeastOne,
                setChangedState,
                busItems,
                isLoading,
                error,
                createBusesReport,
                addBus,
                removeBuses,
                editBus
            }}
        >
            {children}
        </BusContext.Provider>
    );
}

export {BusContextProvider, BusContext};
