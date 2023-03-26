import React, { useContext, useState } from "react";
import AllBusesSubpage from "../components/InfoPage/BusPages/AllBusesPage/AllBusesSubpage";
import BusActionsSubpage from "../components/InfoPage/BusPages/BusActionsPage/BusActionsSubpage";
import buses from "../staticData/busItemsData.json";
import BusForm from "../components/InfoPage/BusPages/BusForm/BusForm";
import BusInfo from "../components/InfoPage/BusPages/BusInfo/BusInfo";
import {
  AllBusesSubpageCrumb,
  BusInfoSubpageCrumb,
} from "../constants/BreadcrumbItems";
import { BreadcrumbContext } from "./useBreadcrumb";
const BusContext = React.createContext();

function BusContextProvider({ children }) {
  const [subpage, setSubpage] = useState(AllBusesSubpageCrumb);
  const [deleteOn, setDeleteOn] = useState(false);

  const [busItems, setBusItems] = useState(buses);
  const { openSubpage } = useContext(BreadcrumbContext);

  function goToSubpages({ subPageName, bus }) {
    if (subPageName === "all") {
      setSubpage({ name: "Все автобусы", component: <AllBusesSubpage /> });
    } else if (subPageName === "busInfo") {
      setSubpage({
        name: bus.number,
        component: <BusActionsSubpage page={<BusInfo bus={bus} />} />,
      });
    } else if (subPageName === "edit") {
      setSubpage({
        name: "Редактировать автобус",
        component: (
          <BusActionsSubpage
            page={<BusForm submitForm={updateBus} bus={bus} />}
          />
        ),
      });
    } else if (subPageName === "add") {
      setSubpage({
        name: "Добавить автобус",
        component: <BusActionsSubpage page={<BusForm submitForm={addBus} />} />,
      });
    }
  }

  function goToSubpage(subpageToOpen) {
    setSubpage(subpageToOpen);
    openSubpage(subpageToOpen);
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
