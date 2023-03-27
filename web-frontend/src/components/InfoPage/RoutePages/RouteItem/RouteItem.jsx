import React, { useContext } from "react";
import openIcon from "../../../../assets/partners/pages/open.svg";
import selectedIcon from "../../../../assets/partners/pages/selected.svg";
import notSelectedIcon from "../../../../assets/partners/pages/notselected.svg";
import { useState } from "react";
import { useEffect } from "react";
import "./RouteItem.css";
import { RouteContext } from "../../../../contexts/useRoute.jsx";

export default function RouteItem({ routeItem, selected, onSelect, onOpen }) {
  const { deleteOn } = useContext(RouteContext);
  const [icon, setIcon] = useState(openIcon);

  useEffect(() => {
    if (!deleteOn) setIcon(openIcon);
    else if (selected) setIcon(selectedIcon);
    else setIcon(notSelectedIcon);
  }, [deleteOn, selected]);

  return (
    <div className="panel">
      <div className="busDescription">
        <h3>Автобус</h3>
        <h4>{routeItem.number}</h4>
      </div>
      <div
        className="openOrSelectIcon"
        onClick={() => (deleteOn ? onSelect(routeItem) : onOpen(routeItem))}
      >
        <img src={icon} className="iconStyle" />
      </div>
    </div>
  );
}
