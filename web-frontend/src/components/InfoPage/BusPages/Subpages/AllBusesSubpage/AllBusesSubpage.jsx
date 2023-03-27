import React, { useContext, useEffect, useState } from "react";
import { BusContext } from "../../../../../contexts/useBus.jsx";
import BusItem from "../../BusItem/BusItem.jsx";
import DeleteActions from "../../DeleteActions/DeleteActions.jsx";
import { BusInfoSubpageCrumb } from "../../../../../constants/BreadcrumbItems.jsx";
import "./AllBusesSubpage.css"

export default function AllBusesSubpage() {
  const { busItems, deleteOn, removeBuses, goToSubpage } =
    useContext(BusContext);
  const [selectedBuses, setSelectedBuses] = useState([]);

  useEffect(() => {
    setSelectedBuses([]);
  }, [busItems, deleteOn]);

  function getAllBuses() {
    return busItems.map((busItem) => {
      return (
        <BusItem
          key={busItem.id}
          busItem={busItem}
          selected={selectedBuses.includes(busItem)}
          onSelect={handleSelect}
          onOpen={handleOpen}
        />
      );
    });
  }

  const handleOpen = (bus) => {
    const subpagecrumb = BusInfoSubpageCrumb(bus);
    goToSubpage(subpagecrumb);
  };

  const handleSelect = (bus) => {
    setSelectedBuses(
      selectedBuses.includes(bus)
        ? selectedBuses.filter((b) => b !== bus)
        : [...selectedBuses, bus]
    );
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedBuses([]);
    } else {
      setSelectedBuses(busItems);
    }
  };

  const handleDeleteSelected = () => {
    const selectedBusesIds = selectedBuses.map((bus) => bus.id);
    removeBuses(selectedBusesIds);
  };

  const isAllSelected = selectedBuses.length === busItems.length;

  return (
    <>
      {deleteOn && (
        <DeleteActions
          onSelectAll={handleSelectAll}
          onDeleteSelected={handleDeleteSelected}
          isAllSelected={isAllSelected}
          selectedBuses={selectedBuses}
        />
      )}
      <div className="allBusesSubpage">
        {busItems.length ? (
          <div className="busesList">{getAllBuses()}</div>
        ) : (
          <h3 className="emptyListText">Список автобусов пуст</h3>
        )}
      </div>
    </>
  );
}
