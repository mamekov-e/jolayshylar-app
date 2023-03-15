import React, { useState, useEffect } from "react";
import AllBusesSubpage from "../components/InfoPage/BusPages/AllBusesPage/AllBusesSubpage";
import BusActionsSubpage from "../components/InfoPage/BusPages/BusActionsPage/BusActionsSubpage";
import { startsWithValue } from "../utils/objectsUtil";
import buses from "../staticData/busItemsData.json";
const BusContext = React.createContext();

function BusContextProvider({ children }) {
  const [subpage, setSubpage] = useState({
    name: "Все автобусы",
    component: <AllBusesSubpage />,
  });
  const [deleteOn, setDeleteOn] = useState(false);

  const [busItems, setBusItems] = useState(buses);

  function goToSubpage(subPageName) {
    if (subPageName === "all") {
      setSubpage({ name: "Все автобусы", component: <AllBusesSubpage /> });
    } else if (subPageName === "edit") {
      setSubpage({
        name: "Редактировать автобус",
        component: <BusActionsSubpage />,
      });
    } else if (subPageName === "add") {
      setSubpage({
        name: "Добавить автобус",
        component: <BusActionsSubpage />,
      });
    }
  }

  function isSubpageOpen(name = "Все") {
    return startsWithValue(subpage, "name", name);
  }

  function addBus(newBus) {
    setBusItems((prevItems) => [...prevItems, newBus]);
  }

  function updateBus(busId, updatedBus) {
    const updatedItems = busItems.map((item) => {
      if (item.id === busId) {
        return { ...item, ...updatedBus };
      }
      return item;
    });
    setBusItems(updatedItems);
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
        isSubpageOpen,
        setDeleteOn,
        removeBuses,
        addBus,
        updateBus,
        selectAll,
        getBus,
      }}
    >
      {children}
    </BusContext.Provider>
  );
}

export { BusContextProvider, BusContext };
