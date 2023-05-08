import React, {useEffect, useState, useContext} from "react";
import axiosUtil from "../utils/axiosUtil.jsx";
import {compareArrays} from "../utils/objectUtil.jsx";
import {getBusIds} from "../utils/busUtils.jsx";
import {AuthContext} from "./useAuth.jsx";

const BusContext = React.createContext();

function BusContextProvider({children}) {
    const {authTokens} = useContext(AuthContext);
    const [busItems, setBusItems] = useState([]);
    const [changedState, setChangedState] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const api = axiosUtil()

    async function changeBusTrackingState(buses, state) {
        const params = new URLSearchParams({ids: getBusIds(buses), is_tracking: state})
        try {
            const response = await api.put("/transports/change-is-tracking/?" + params.toString(),
                {
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}
                })
            if (response.status === 200) {
                setBusItems(prevItems => {
                    return prevItems.map((bus) => {
                        if (!buses.includes(bus))
                            return bus
                        bus.is_tracking = state;
                        return bus;
                    });
                })
                showMessage("Изменения успешно внесены")
            }
        } catch (err) {
            showMessage(err.response.data)
        }
    }

    function checkIsTrackingAtLeastOne(buses) {
        return buses.some(bus => bus.is_tracking)
    }

    async function createBusesReport(buses) {
        const params = new URLSearchParams({ids: getBusIds(buses)})
        try {
            const response = await api.put("/transports/add-report/?" + params.toString(),
                {
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}
                })
            if (response.status === 200) {
                showMessage(response.data)
                return true
            }
        } catch (err) {
            showMessage(err.response.data)
            return false
        }
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
                showMessage("Запись успешно добавлена")
                return true
            }
        } catch (err) {
            showMessage(err.response.data)
        }
    }

    async function editBus(values, bus) {
        let editedBus = {...values, route: values.route_number.value, id: bus.id, company: bus.company.id};
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
                showMessage("Записи успешно изменены")
                return true
            }
        } catch (err) {
            showMessage(err)
        }
    }

    async function removeBuses(buses) {
        const params = new URLSearchParams({ids: getBusIds(buses)})
        try {
            const response = await api.delete(
                "/transports/delete-transport/?" + params.toString(),
                {
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}
                })
            if (response.status === 200) {
                setBusItems((prevItems) => {
                    return prevItems.filter(
                        (item) => !buses.includes(item)
                    );
                });
                showMessage("Записи успешно удалены")
            }
        } catch (err) {
            showMessage(err.response.data)
        }
    }

    const showMessage = (message) => {
        setMessage(message);

        setTimeout(() => {
            setMessage(null);
        }, 1500);
    };

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
                showMessage(err)
            }
        }

        if (authTokens)
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
                message,
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
