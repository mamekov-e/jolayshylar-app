import React, { useState, useMemo } from "react";
import buses from "../staticData/serverData/busItemsData.json";
import {AddBusSubpageCrumb} from "../constants/BreadcrumbItems.jsx";
const BusContext = React.createContext();

function BusContextProvider({ children }) {
  const columns = useMemo(
      () => [
        {
          header: '#',
          accessorKey: 'id',
        },
        {
          header: 'Кол-во сидячих мест',
          accessorKey: 'seatNumber',
        },
        {
          header: 'Вместимость',
          accessorKey: 'capacity',
        },
        {
          header: 'Номер автобуса',
          accessorKey: 'number',
        }
      ],
      [],
  );
  const [busItems, setBusItems] = useState(buses);
  const AddComponent = AddBusSubpageCrumb(addBus)

  function addBus(values) {
    const id = busItems.length > 0 ? busItems[busItems.length - 1].id + 1 : 0;
    const newBus = { id, ...values, selected: false };
    setBusItems((prevItems) => [...prevItems, newBus]);
    return true
  }

  function editBus(values, bus) {
    const updatedItems = busItems.map((item) => {
      if (item.id === bus.id) {
        return { ...item, ...values };
      }
      return item;
    });
    setBusItems(updatedItems);
    return true
  }

  function removeBuses(busIds) {
    console.log("busIds", busIds)
    setBusItems((prevItems) => {
      const filteredItems = prevItems.filter(
        (item) => !busIds.includes(item)
      );
      return filteredItems;
    });
  }

  return (
    <BusContext.Provider
      value={{
        items:busItems,
        columns,
        remove:removeBuses,
        AddComponent,
        edit:editBus
      }}
    >
      {children}
    </BusContext.Provider>
  );
}

export { BusContextProvider, BusContext };
