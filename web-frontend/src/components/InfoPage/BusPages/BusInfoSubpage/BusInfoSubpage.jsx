import React, {useContext} from "react";
import EditBtn from "../../../CustomComponents/Button/Button.jsx";
import busInfoImg from "../../../../assets/partners/pages/busInfoImg.svg";
import "./BusInfoSubpage.css";
import {BreadcrumbContext} from "../../../../contexts/useBreadcrumb.jsx";
import {EditBusSubpageCrumb} from "../../../../constants/BreadcrumbItems.jsx";

export default function BusInfoSubpage({bus}) {
    const {goToSubpage, context} = useContext(BreadcrumbContext);
    const {edit} = context;

    function onEdit() {
        const subpagecrumb = EditBusSubpageCrumb(bus, edit);
        goToSubpage(subpagecrumb);
    }

    return (
        <div className="busInfoPage">
            <img src={busInfoImg}/>
            <div className="busInfoDetails">
                <p>Номер автобуса:</p>
                <h3>{bus.transport_number}</h3>
                <p>Вместимость автобуса:</p>
                <h3>{bus.total_seats}</h3>
                <p>Количество сидячих мест:</p>
                <h3>{bus.normal_seats}</h3>
                <p>Количество спец. мест:</p>
                <h3>{bus.disabled_seats}</h3>
                <p>Номер маршрута:</p>
                <h3>{bus.route_number}</h3>
            </div>
            <EditBtn name="Редактировать" style={editBtnStyle} onClick={onEdit}/>
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
