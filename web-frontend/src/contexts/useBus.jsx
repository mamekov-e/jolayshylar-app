import React, { useState } from "react";
import buses from "../staticData/busItemsData.json";
import {AddBusSubpageCrumb} from "../constants/BreadcrumbItems.jsx";
const BusContext = React.createContext();

function BusContextProvider({ children }) {
  const columns = React.useMemo(() => [
    {
      Header: "Номер автобуса",
      accessor: 'number',
    },
    {
      Header: "Сидячих мест",
      accessor: 'seatNumber',
    },
    {
      Header: "Вместимость",
      accessor: 'capacity',
    },
  ], [])
  const [busItems, setBusItems] = useState(buses);
  const [deleteOn, setDeleteOn] = useState(false);
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
    setBusItems((prevItems) => {
      const filteredItems = prevItems.filter(
        (item) => !busIds.includes(item.id)
      );
      return filteredItems;
    });
  }

  function getBus(busId) {
    return busItems.filter((prevItem) => prevItem.id === busId);
  }

  function selectAll() {
    const updatedBuses = busItems.map((bus) => {
      return { ...bus, selected: !bus.selected };
    });
    setBusItems(updatedBuses);
  }

  function resetDelete() {
    if (deleteOn)
      setDeleteOn(false)
  }

  return (
    <BusContext.Provider
      value={{
        deleteOn,
        items:busItems,
        columns,
        setDeleteOn,
        remove:removeBuses,
        AddComponent,
        edit:editBus,
        selectAll,
        get:getBus,
        resetDelete
      }}
    >
      {children}
    </BusContext.Provider>
  );
}

export { BusContextProvider, BusContext };
