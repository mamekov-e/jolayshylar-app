import React, { useContext } from "react";
import openIcon from "../../../../assets/partners/pages/open.svg";
import selectedIcon from "../../../../assets/partners/pages/selected.svg";
import notSelectedIcon from "../../../../assets/partners/pages/notselected.svg";
import { useState } from "react";
import { useEffect } from "react";
import "./BusItem.css";
import { BusContext } from "../../../../contexts/useBus";

export default function BusItem({ busItem, selected, onSelect }) {
  const { deleteOn } = useContext(BusContext);
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
        <h4>{busItem.number}</h4>
      </div>
      <div className="openOrSelectIcon">
        <img
          src={icon}
          onClick={() => onSelect(busItem)}
          className="iconStyle"
        />
      </div>
    </div>
  );
}
