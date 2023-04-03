import React, {useContext, useEffect, useState} from "react";
import openIcon from "../../../../assets/partners/pages/open.svg";
import selectedIcon from "../../../../assets/partners/pages/selected.svg";
import notSelectedIcon from "../../../../assets/partners/pages/notselected.svg";
import "./RouteItem.css";
import {RouteContext} from "../../../../contexts/useRoute.jsx";

export default function RouteItem({item, selected, onSelect, onOpen}) {
    const {deleteOn} = useContext(RouteContext);
    const [icon, setIcon] = useState(openIcon);

    useEffect(() => {
        if (!deleteOn) setIcon(openIcon);
        else if (selected) setIcon(selectedIcon);
        else setIcon(notSelectedIcon);
    }, [deleteOn, selected]);

    return (
        <div className="routePanel" onClick={() => (deleteOn ? onSelect(item) : onOpen(item))}>
            <div className="routeDescription">
                    <h3 className={"routeNumber"}>{item.routeNumber}</h3>
                    <h3 className={"routeName"}>{item.routeName}</h3>
                    <h3 className={"routeBusInfo"}>Автобус <span style={{color: "#707374"}}>{item.busNumber}</span></h3>
            </div>
            <div className="openOrSelectIcon">
                <img src={icon} className="iconStyle"/>
            </div>
        </div>
    );
}
