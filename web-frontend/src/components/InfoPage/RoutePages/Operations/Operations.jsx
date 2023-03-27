import React, { useContext } from "react";
import { AddRouteSubpageCrumb } from "../../../../constants/BreadcrumbItems.jsx";
import { RouteContext } from "../../../../contexts/useRoute.jsx";
import AddBtn from "../../../custom/Button/Button.jsx";
import RemoveBtn from "../../../custom/Button/Button.jsx";
import "./Operations.css";

export default function Operations() {
  const { routeItems, deleteOn, setDeleteOn, addRoute, goToSubpage } =
    useContext(RouteContext);

  function onDelete() {
    setDeleteOn(!deleteOn);
  }

  function onAdd() {
    const subpagecrumb = AddRouteSubpageCrumb(addRoute);
    console.log("route add", subpagecrumb)
    goToSubpage(subpagecrumb);
  }

  return (
    <div className="operations">
      <AddBtn name="Добавить" style={addBtnStyle} onClick={onAdd} />
      <RemoveBtn
        name="Удалить"
        style={
          routeItems.length
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
