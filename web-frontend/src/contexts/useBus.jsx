import React, {useState} from "react";
import {AddBusSubpageCrumb} from "../constants/BreadcrumbItems.jsx";

const BusContext = React.createContext();

function BusContextProvider({children}) {
    const [busItems, setBusItems] = useState([]);
    const AddComponent = AddBusSubpageCrumb(addBus)

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

    function addBus(values) {
        const id = busItems.length > 0 ? busItems[busItems.length - 1].id + 1 : 0;
        const newBus = {id, ...values, is_tracking: false};
        setBusItems((prevItems) => [...prevItems, newBus]);
        return true
    }

    function editBus(values, bus) {
        setBusItems(prevItems => {
            return prevItems.map((item) => {
                if (item.id === bus.id) {
                    return {...item, ...values};
                }
                return item;
            });
        });
        return true
    }

    function removeBuses(buses) {
        setBusItems((prevItems) => {
            return prevItems.filter(
                (item) => !buses.includes(item)
            );
        });
    }

    return (
        <BusContext.Provider
            value={{
                changeBusTrackingState,
                items: busItems,
                remove: removeBuses,
                AddComponent,
                edit: editBus
            }}
        >
            {children}
        </BusContext.Provider>
    );
}

export {BusContextProvider, BusContext};
