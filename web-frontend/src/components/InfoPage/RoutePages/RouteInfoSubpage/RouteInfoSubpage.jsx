import React, {useContext} from "react";
import EditBtn from "../../../CustomComponents/Button/Button.jsx";
import busInfoImg from "../../../../assets/partners/pages/busInfoImg.svg";
import "./RouteInfoSubpage.css";
import {EditRouteSubpageCrumb} from "../../../../constants/BreadcrumbItems.jsx";
import {BreadcrumbContext} from "../../../../contexts/useBreadcrumb.jsx";

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
                <p>Номер маршрута:</p>
                <h3>{route.routeNumber}</h3>
                <p>Название маршрута:</p>
                <h3>{route.routeName}</h3>
                <p>Номер автобуса:</p>
                <h3>{route.busNumber}</h3>
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
