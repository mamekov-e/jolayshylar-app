import React, { useContext, useEffect } from "react";
import EditBtn from "../../../../custom/Button/Button.jsx";
import busInfoImg from "../../../../../assets/partners/pages/busInfoImg.svg";
import "./BusInfoSubpage.css";
import { EditBusSubpageCrumb } from "../../../../../constants/BreadcrumbItems.jsx";
import { BusContext } from "../../../../../contexts/useBus.jsx";

export default function BusInfoSubpage({ bus }) {
  const { editBus, goToSubpage } = useContext(BusContext);

  function onEdit() {
    const subpagecrumb = EditBusSubpageCrumb(bus, editBus);
    goToSubpage(subpagecrumb);
  }

  return (
    <div className="busInfoPage">
      <img src={busInfoImg} />
      <div className="busInfoDetails">
        <p>Номер автобуса:</p>
        <h3>{bus.number}</h3>
        <p>Вместимость автобуса:</p>
        <h3>{bus.capacity}</h3>
        <p>Количество сидячих мест:</p>
        <h3>{bus.seatNumber}</h3>
      </div>
      <EditBtn name="Редактировать" style={editBtnStyle} onClick={onEdit} />
    </div>
  );
}

const editBtnStyle = {
  backgroundColor: "#3466A1",
  color: "white",
  padding: "12px 14px",
  width: "auto",
  height: "40px",
};
