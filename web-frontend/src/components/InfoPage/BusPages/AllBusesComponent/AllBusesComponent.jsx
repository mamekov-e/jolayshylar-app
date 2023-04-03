import React from "react";
import "./AllBusesComponent.css"

export default function AllBusesComponent({allItems}) {
    return (
        <div className="busesList">{allItems}</div>
    );
}
