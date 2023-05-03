import React from 'react';

const BusDetails = ({ bus }) => {
    if (!bus) {
        return null;
    }

    return (
        <div>
            <h3>Информация о автобусе</h3>
            <p>Номер автобуса: {bus.id}</p>
            <p>Пассажиров на борту: {bus.passengers}</p>
        </div>
    );
};

export default BusDetails;