import React, {useEffect, useState} from 'react';
import {Circle, GoogleMap, InfoWindow, LoadScript, MarkerF, Polyline,} from '@react-google-maps/api';
import {busesData, routesData} from '../../staticData/serverData/mapData.jsx';
import {API_KEY, DEFAULT_LAT, DEFAULT_LONG} from "../../constants/Data.jsx";

const containerStyle = {
    width: '100%',
    height: '100%',
};

const BusMap = ({route}) => {
    const [routeData, setRouteData] = useState(null);
    const [buses, setBuses] = useState([]);
    const [currentPosition, setCurrentPosition] = useState({
        lat: DEFAULT_LAT,
        lng: DEFAULT_LONG,
    });
    const [infoWindow, setInfoWindow] = useState({isOpen: false, type: null, id: null});

    const success = position => {
        const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        setCurrentPosition(currentPosition);
    };

    useEffect(() => {
        if (route) {
            setRouteData(routesData);
            setBuses(busesData);
        }
    }, [route]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);
    }, [])

    const handleBusClick = (busId) => {
        setInfoWindow({isOpen: true, type: 'bus', id: busId});
    };

    const handleStopClick = (stopId) => {
        setInfoWindow({isOpen: true, type: 'stop', id: stopId});
    };

    const handleInfoWindowClose = () => {
        setInfoWindow({isOpen: false, type: null, id: null});
    };

    const getNearbyStops = (location) => {
        if (!location || !routeData) return [];

        return routeData.stops.filter((stop) => {
            const stopLocation = new google.maps.LatLng(stop.coordinates[0], stop.coordinates[1]);
            const userLocation = new google.maps.LatLng(location.lat, location.lng);

            return google.maps.geometry.spherical.computeDistanceBetween(stopLocation, userLocation) <= 1000;
        });
    };

    const nearbyStops = getNearbyStops(currentPosition);

    console.log("route", route)
    console.log("routeData",routeData)
    console.log("buses",buses)

    return (
        <>
            <LoadScript googleMapsApiKey={API_KEY} libraries={['geometry']}>
                <GoogleMap mapContainerStyle={containerStyle}
                           center={currentPosition}
                           zoom={15}>
                    {routeData && (
                        <>
                            <Polyline
                                path={routeData.path.map(([lat, lng]) => ({lat, lng}))}
                                options={{strokeColor: 'blue'}}
                            />
                            {routeData.stops.map((stop) => (
                                <MarkerF
                                    position={{lat: stop.coordinates[0], lng: stop.coordinates[1]}}
                                    key={stop.id}
                                    onClick={() => handleStopClick(stop.id)}
                                />
                            ))}
                        </>
                    )}
                    {buses.map((bus) => (
                        <MarkerF
                            position={{lat: bus.coordinates[0], lng: bus.coordinates[1]}}
                            key={bus.id}
                            onClick={() => handleBusClick(bus.id)}
                        />
                    ))}
                    {currentPosition && (
                        <>
                            <MarkerF position={currentPosition}/>
                            <Circle center={currentPosition} radius={1000} options={{
                                fillColor: 'rgba(0, 0, 255, 0.1)',
                                strokeColor: 'blue',
                                strokeWeight: 1
                            }}/>
                        </>
                    )}
                    {infoWindow.isOpen && infoWindow.type === 'bus' && (
                        <InfoWindow
                            position={buses.find((bus) => bus.id === infoWindow.id).coordinates}
                            onCloseClick={handleInfoWindowClose}
                        >
                            <div>{`Автобус: ${infoWindow.id}, пассажиры: ${buses.find((bus) => bus.id === infoWindow.id).passengers}`}</div>
                        </InfoWindow>
                    )}
                    {infoWindow.isOpen && infoWindow.type === 'stop' && (
                        <InfoWindow
                            position={{
                                lat: routeData.stops.find((stop) => stop.id === infoWindow.id).coordinates[0],
                                lng: routeData.stops.find((stop) => stop.id === infoWindow.id).coordinates[1],
                            }}
                            onCloseClick={handleInfoWindowClose}
                        >
                            <div>
                                <h4>Остановка: {routeData.stops.find((stop) => stop.id === infoWindow.id).name}</h4>
                                <p>Автобусы: {routeData.stops.find((stop) => stop.id === infoWindow.id).buses.join(', ')}</p>
                            </div>
                        </InfoWindow>
                    )}
                    {nearbyStops.map((stop) => (
                        <MarkerF
                            position={{lat: stop.coordinates[0], lng: stop.coordinates[1]}}
                            key={`nearby-${stop.id}`}
                            icon={{
                                url: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png',
                                scaledSize: new google.maps.Size(20, 20)
                            }}
                        />
                    ))}
                </GoogleMap>
            </LoadScript>
        </>
    );
};

export default BusMap;
