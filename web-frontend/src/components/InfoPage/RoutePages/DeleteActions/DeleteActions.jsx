import React, { useContext } from "react";
import { RouteContext } from "../../../../contexts/useRoute.jsx";
import "./DeleteActions.css";

export default function DeleteActions({
  onSelectAll,
  onDeleteSelected,
  isAllSelected,
  selectedBuses,
}) {
  const { setDeleteOn, routeItems } = useContext(RouteContext);

  function onCancel() {
    setDeleteOn(false);
  }

  const atLeastOneSelected = selectedBuses.length > 0;

  return (
    <>
      {routeItems.length ? (
        <div className="deleteActions">
          {atLeastOneSelected && (
            <h3 className="deleteAll" onClick={() => onDeleteSelected()}>
              Удалить отмеченные
            </h3>
          )}
          <h3 className="selectAll" onClick={() => onSelectAll()}>
            {atLeastOneSelected && isAllSelected
              ? "Отменить выделение"
              : "Выделить все"}
          </h3>
          <h3 className="cancel" onClick={onCancel}>
            Отмена
          </h3>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
