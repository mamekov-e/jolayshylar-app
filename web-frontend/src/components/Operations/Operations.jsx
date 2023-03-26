import React, { useContext } from "react";
import { AddBusSubpageCrumb } from "../../constants/BreadcrumbItems";
import { BreadcrumbContext } from "../../contexts/useBreadcrumb";
import { BusContext } from "../../contexts/useBus";
import AddBtn from "../custom/Button/Button";
import RemoveBtn from "../custom/Button/Button";
import "./Operations.css";

export default function Operations() {
  const { busItems, deleteOn, setDeleteOn, addBus, goToSubpage } =
    useContext(BusContext);
  const { openSubpage } = useContext(BreadcrumbContext);

  function onDelete() {
    setDeleteOn(!deleteOn);
  }

  function onAdd() {
    const subpagecrumb = AddBusSubpageCrumb(addBus);
    goToSubpage(subpagecrumb);
  }

  return (
    <div className="operations">
      <AddBtn name="Добавить" style={addBtnStyle} onClick={onAdd} />
      <RemoveBtn
        name="Удалить"
        style={
          busItems.length
            ? removeBtnStyle
            : {
                ...removeBtnStyle,
                ...{ backgroundColor: "rgba(201, 60, 60, 0.6)" },
              }
        }
        onClick={onDelete}
      />
    </div>
  );
}

const addBtnStyle = {
  backgroundColor: "#34A160",
  color: "white",
  padding: "12px 14px",
};
const removeBtnStyle = {
  backgroundColor: "#C93C3C",
  color: "white",
  padding: "12px 14px",
};
