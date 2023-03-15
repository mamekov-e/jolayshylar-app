import React, { useContext, useEffect, useState } from "react";
import { BusContext } from "../../../../contexts/useBus";
import BusItem from "../BusItem/BusItem";
import DeleteActions from "../../DeleteActions/DeleteActions";

export default function AllBusesSubpage() {
  const { busItems, deleteOn, removeBuses } = useContext(BusContext);
  const [selectedBuses, setSelectedBuses] = useState([]);

  useEffect(() => {
    setSelectedBuses([]);
    console.log(busItems);
  }, [busItems, deleteOn]);

  function getAllBuses() {
    return busItems.map((busItem) => {
      return (
        <BusItem
          key={busItem.id}
          busItem={busItem}
          selected={selectedBuses.includes(busItem)}
          onSelect={handleSelect}
        />
      );
    });
  }

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
    console.log("selectedBusesIds: " + selectedBusesIds);
    console.log("selectedBuses: " + selectedBuses);
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
