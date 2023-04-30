import React from 'react';
import './MapPageStyle.css'

const RouteInput = ({ onRouteChange }) => {
    const handleChange = (event) => {
        onRouteChange(event.target.value);
    };

    return (
        <div className={"routeInputPanel"}>
            <input
                type="text"
                placeholder="Введите номер маршрута"
                onChange={handleChange}
            />
        </div>
    );
};

export default RouteInput;