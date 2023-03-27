import React, { useContext, useState } from "react";
import buses from "../staticData/busItemsData.json";
import {
  AllBusesSubpageCrumb
} from "../constants/BreadcrumbItems";
import { BreadcrumbContext } from "./useBreadcrumb";
const BusContext = React.createContext();

function BusContextProvider({ children }) {
  const [subpage, setSubpage] = useState(AllBusesSubpageCrumb);
  const [deleteOn, setDeleteOn] = useState(false);

  const [busItems, setBusItems] = useState(buses);
  const { openSubpage } = useContext(BreadcrumbContext);

  function goToSubpage(subpageToOpen) {
    setSubpage(subpageToOpen);
    openSubpage(subpageToOpen);
    if (deleteOn)
      setDeleteOn(false)
  }

  function addBus(values) {
    const id = busItems.length > 0 ? busItems[busItems.length - 1].id + 1 : 0;
    const newBus = { id, ...values, selected: false };
    setBusItems((prevItems) => [...prevItems, newBus]);
    goToSubpage(AllBusesSubpageCrumb);
  }

  function editBus(values, bus) {
    const updatedItems = busItems.map((item) => {
      if (item.id === bus.id) {
        return { ...item, ...values };
      }
      return item;
    });
    setBusItems(updatedItems);
    // const editedBus = updatedItems.find((prevItem) => prevItem.id === bus.id);
    goToSubpage(AllBusesSubpageCrumb);
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

  return (
    <BusContext.Provider
      value={{
        subpage,
        deleteOn,
        busItems,
        goToSubpage,
        setDeleteOn,
        removeBuses,
        addBus,
        editBus,
        selectAll,
        getBus,
      }}
    >
      {children}
    </BusContext.Provider>
  );
}

export { BusContextProvider, BusContext };
