import React, {useContext} from "react";
import EditBtn from "../../../CustomComponents/Button/Button.jsx";
import busInfoImg from "../../../../assets/partners/pages/busInfoImg.svg";
import "./RouteInfoSubpage.css";
import {BreadcrumbContext} from "../../../../contexts/useBreadcrumb.jsx";
import {EditRouteSubpageCrumb} from "../../../../constants/BreadcrumbItems.jsx";
import {RouteContext} from "../../../../contexts/useRoute.jsx";

export default function RouteInfoSubpage({route}) {
    const {goToSubpage} = useContext(BreadcrumbContext);
    const {editRoute, getRouteById} = useContext(RouteContext);

    async function onEdit() {
        const routeStops = await getRouteById(route.id)
        const subpagecrumb = EditRouteSubpageCrumb(route, routeStops, editRoute);
        goToSubpage(subpagecrumb);
    }

    return (
        <div className="busInfoPage">
            <img src={busInfoImg}/>
            <div className="busInfoDetails">
                <p>Номер маршрута:</p>
                <h3>{route.route_number}</h3>
                <p>Название маршрута:</p>
                <h3>{route.route_name}</h3>
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
