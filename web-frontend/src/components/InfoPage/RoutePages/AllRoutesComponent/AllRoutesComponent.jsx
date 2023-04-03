import React from "react";
import "./AllRoutesComponent.css"

export default function AllRoutesComponent({allItems}) {
    return (
        <div className="routesList">{allItems}</div>
    );
}
