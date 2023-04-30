import React from 'react';

function RouteList({ routes }) {
    return (
        <div>
            <h2>Route List</h2>
            <ul>
                {routes.map((route) => (
                    <li key={route.id}>{route.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default RouteList;
