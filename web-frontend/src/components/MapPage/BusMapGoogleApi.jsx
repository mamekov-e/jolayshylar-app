import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Polyline, Marker, InfoWindow } from '@react-google-maps/api';
import { routesData, busesData } from '../../staticData/serverData/mapData.jsx';
import {API_KEY, DEFAULT_LOCATION_LAT_AND_LONG_OBJECT} from "../../constants/Data.jsx";

const containerStyle = {
    width: '100%',
    height: '100%',
};

const BusMap = ({ route }) => {
    const [routeData, setRouteData] = useState(null);
    const [buses, setBuses] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [infoWindow, setInfoWindow] = useState({ isOpen: false, busId: null });

    useEffect(() => {
        if (route) {
            setRouteData(routesData);
            setBuses(busesData);
        }
    }, [route]);

    const locateUser = useCallback(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ lat: latitude, lng: longitude });
        });
    }, []);

    useEffect(() => {
        locateUser();
    }, [locateUser]);

    const handleBusClick = (busId) => {
        setInfoWindow({ isOpen: true, busId });
    };

    const handleInfoWindowClose = () => {
        setInfoWindow({ isOpen: false, busId: null });
    };

    return (
        <>
            <button onClick={locateUser}>Перейти к текущему местоположению</button>
            <LoadScript googleMapsApiKey={API_KEY}>
                <GoogleMap mapContainerStyle={containerStyle} center={DEFAULT_LOCATION_LAT_AND_LONG_OBJECT} zoom={12}>
                    {routeData && (
                        <>
                            <Polyline
                                path={routeData.path.map(([lat, lng]) => ({ lat, lng }))}
                                options={{ strokeColor: 'blue' }}
                            />
                            {routeData.stops.map((stop) => (
                                <Marker position={{ lat: stop.coordinates[0], lng: stop.coordinates[1] }} key={stop.id} />
                            ))}
                        </>
                    )}
                    {buses.map((bus) => (
                        <Marker
                            position={{ lat: bus.coordinates[0], lng: bus.coordinates[1] }}
                            key={bus.id}
                            onClick={() => handleBusClick(bus.id)}
                        />
                    ))}
                    {userLocation && <Marker position={userLocation} />}
                    {infoWindow.isOpen && (
                        <InfoWindow
                            position={buses.find((bus) => bus.id === infoWindow.busId).coordinates}
                            onCloseClick={handleInfoWindowClose}
                        >
                            <div>{`Автобус: ${infoWindow.busId}, пассажиры: ${buses.find((bus) => bus.id === infoWindow.busId).passengers}`}</div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </LoadScript>
        </>
    );
};

export default BusMap;
