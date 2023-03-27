import React, { useContext, useEffect, useState } from "react";
import { RouteContext } from "../../../../../contexts/useRoute.jsx";
import RouteItem from "../../RouteItem/RouteItem.jsx";
import DeleteActions from "../../DeleteActions/DeleteActions.jsx";
import {RouteInfoSubpageCrumb} from "../../../../../constants/BreadcrumbItems.jsx";
import "./AllRoutesSubpage.css"

export default function AllRoutesSubpage() {
  const { routeItems, deleteOn, removeRoutes, goToSubpage } =
    useContext(RouteContext);
  const [selectedBuses, setSelectedBuses] = useState([]);

  useEffect(() => {
    setSelectedBuses([]);
  }, [routeItems, deleteOn]);

  function getAllBuses() {
    return routeItems.map((routeItem) => {
      return (
        <RouteItem
          key={routeItem.id}
          routeItem={routeItem}
          selected={selectedBuses.includes(routeItem)}
          onSelect={handleSelect}
          onOpen={handleOpen}
        />
      );
    });
  }

  const handleOpen = (bus) => {
    const subpagecrumb = RouteInfoSubpageCrumb(bus);
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
      setSelectedBuses(routeItems);
    }
  };

  const handleDeleteSelected = () => {
    const selectedBusesIds = selectedBuses.map((bus) => bus.id);
    removeRoutes(selectedBusesIds);
  };

  const isAllSelected = selectedBuses.length === routeItems.length;

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
        {routeItems.length ? (
          <div className="busesList">{getAllBuses()}</div>
        ) : (
          <h3 className="emptyListText">Список маршрутов пуст</h3>
        )}
      </div>
    </>
  );
}
