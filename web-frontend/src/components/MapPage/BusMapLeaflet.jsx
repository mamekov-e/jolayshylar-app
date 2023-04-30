import React, { useEffect, useState } from 'react';
import {MapContainer, TileLayer, Polyline, Marker, Popup, useMap} from 'react-leaflet';
import axios from 'axios';
import {busesData, routesData} from '../../staticData/mapData.jsx'
import { Icon } from 'leaflet';
import {DEFAULT_LAT, DEFAULT_LONG} from "../../constants/Data.jsx";

const LocateUser = () => {
    const map = useMap();

    useEffect(() => {
        const locateUser = () => {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                map.flyTo([latitude, longitude], 16);
            });
        };

        locateUser();
    }, [map]);

    return null;
};

const busIcon = new Icon({
    iconUrl: '/path/to/bus-icon.png',
    iconSize: [25, 25]
});

const stopIcon = new Icon({
    iconUrl: '/path/to/stop-icon.png',
    iconSize: [20, 20]
});

const BusMapLeaflet = ({ route }) => {
    const [routeData, setRouteData] = useState(null);
    const [buses, setBuses] = useState([]);

    useEffect(() => {
        if (route) {
            // Используйте статические данные для маршрута и остановок
            setRouteData(routesData);

            // Используйте статические данные для автобусов
            setBuses(busesData);

            // axios.get(`/api/routes/${route}`).then((response) => {
            //     setRouteData(response.data);
            // });
            //
            // const fetchBuses = async () => {
            //     const response = await axios.get(`/api/buses/${route}`);
            //     setBuses(response.data);
            // };
            //
            // fetchBuses();
            // const intervalId = setInterval(fetchBuses, 10000); // обновление каждые 10 секунд
            //
            // return () => {
            //     clearInterval(intervalId); // очистка интервала при размонтировании компонента
            // };
        }
    }, [route]);

    const defaultCenter = [DEFAULT_LAT, DEFAULT_LONG]; // Astana
    const defaultZoom = 13;

    return (
        <MapContainer center={defaultCenter} zoom={defaultZoom} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocateUser />
            {routeData && (
                <>
                    <Polyline positions={routeData.path} icon={stopIcon}/>
                    {routeData.stops.map((stop) => (
                        <Marker position={stop.coordinates} key={stop.id} icon={stopIcon}>
                            <Popup>{stop.name}</Popup>
                        </Marker>
                    ))}
                </>
            )}
            {buses.map((bus) => (
                <Marker position={bus.coordinates} key={bus.id} icon={busIcon} eventHandlers={{ click: () => onBusSelect(bus) }}>
                    <Popup>{`Автобус: ${bus.id}, пассажиры: ${bus.passengers}`}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default BusMapLeaflet;