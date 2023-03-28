import React, {useContext, useEffect, useState} from "react";
import openIcon from "../../../../assets/partners/pages/open.svg";
import selectedIcon from "../../../../assets/partners/pages/selected.svg";
import notSelectedIcon from "../../../../assets/partners/pages/notselected.svg";
import "./BusItem.css";
import {BreadcrumbContext} from "../../../../contexts/useBreadcrumb.jsx";

export default function BusItem({item, selected, onSelect, onOpen}) {
    const {context} = useContext(BreadcrumbContext);
    const {deleteOn} = context;
    const [icon, setIcon] = useState(openIcon);

    useEffect(() => {
        if (!deleteOn) setIcon(openIcon);
        else if (selected) setIcon(selectedIcon);
        else setIcon(notSelectedIcon);
    }, [deleteOn, selected]);

    return (
        <div className="panel" onClick={() => (deleteOn ? onSelect(item) : onOpen(item))}>
            <div className="busDescription">
                <h3>Автобус</h3>
                <h4>{item.number}</h4>
            </div>
            <div className="openOrSelectIcon">
                <img src={icon} className="iconStyle"/>
            </div>
        </div>
    );
}
