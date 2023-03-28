import React, {useContext} from "react";
import EditBtn from "../../../../CustomComponents/Button/Button.jsx";
import busInfoImg from "../../../../../assets/partners/pages/busInfoImg.svg";
import "./RouteInfoSubpage.css";
import {EditRouteSubpageCrumb} from "../../../../../constants/BreadcrumbItems.jsx";
import {BreadcrumbContext} from "../../../../../contexts/useBreadcrumb.jsx";

export default function RouteInfoSubpage({route}) {
    const {context, goToSubpage} = useContext(BreadcrumbContext);
    const {edit} = context

    function onEdit() {
        const subpagecrumb = EditRouteSubpageCrumb(route, edit);
        goToSubpage(subpagecrumb);
    }

    return (
        <div className="busInfoPage">
            <img src={busInfoImg}/>
            <div className="busInfoDetails">
                <p>Номер автобуса:</p>
                <h3>{route.number}</h3>
                <p>Вместимость автобуса:</p>
                <h3>{route.capacity}</h3>
                <p>Количество сидячих мест:</p>
                <h3>{route.seatNumber}</h3>
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
