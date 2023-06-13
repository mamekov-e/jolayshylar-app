import {DirectionsRenderer, GoogleMap, InfoWindow, Marker, useJsApiLoader,} from '@react-google-maps/api'
import {useContext, useEffect, useState} from 'react'
import {API_KEY, BASE_URL, DEFAULT_LOCATION_LAT_AND_LONG_OBJECT} from "../../constants/Data.jsx";
import {FaLocationArrow, MdClose, RxHamburgerMenu} from "react-icons/all.js";
import PanelWithTabs from "./SidePanel/PanelWithTabs.jsx";
import {getCurrentDateIn_YYYY_MM_DD_format, getCurrentTime} from "../../utils/dateUtil.jsx";
import {faBus, faCircleDot, faFlag, faLocationPin} from "@fortawesome/free-solid-svg-icons";
import './MapPageStyle.css'
import {RouteContext} from "../../contexts/useRoute.jsx";

function MapPage() {
    const {getRouteStopsById} = useContext(RouteContext)

    const [libraries] = useState(['places']);
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: API_KEY,
        libraries,
    })
    const [currentPosition, setCurrentPosition] = useState(DEFAULT_LOCATION_LAT_AND_LONG_OBJECT);
    const [busesOnRouteData, setBusesOnRouteData] = useState([])
    const [chosenBusInfoPosition, setChosenBusInfoPosition] = useState({});
    const [windowOpen, setWindowOpen] = useState(false)

    const [map, setMap] = useState(null)
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [routeMarkers, setRouteMarkers] = useState([])
    const [shouldContinue, setShouldContinue] = useState(true);
    const [timeoutId, setTimeoutId] = useState(null);

    const [originPoints, setOriginPoints] = useState(null);
    const [originFocused, setOriginFocused] = useState(false);
    const [destinationPoints, setDestinationPoints] = useState(null);
    const [destinationFocused, setDestinationFocused] = useState(false);

    const [isToggled, setIsToggled] = useState(true);

    const success = position => {
        const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        setCurrentPosition(currentPosition);
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);
    }, [])

    function saveDirection(direction) {
        if (busesOnRouteData.length) {
            setShouldContinue(false)
            clearTimeout(timeoutId);
            setBusesOnRouteData([])
            setWindowOpen(false)
        }
        if (timeoutId) {
            setShouldContinue(true)
            setTimeoutId(null)
        }
        if (direction === null) {
            setOriginPoints(null)
            setOriginFocused(false)
            setDestinationPoints(null)
            setDestinationFocused(false)
        }
        routeMarkers.map(routeMarker => {
            routeMarker.setMap(null)
        })
        setDirectionsResponse(direction)
    }

    const handleRouteItemClicked = async (route) => {
        const routeStops = await getRouteStopsById(route.id)
        const parsedStops = routeStops.map(item => ({
            ...item,
            longitude: parseFloat(item.latitude),
            latitude: parseFloat(item.longitude)
        }));
        if (routeStops.length) {
            await drawDirectionsOnClickedRoute(parsedStops, route)
            await imitateBusMovingOnClickedRoute(route, parsedStops)
        }
    }

    const drawDirectionsOnClickedRoute = async (points, route) => {
        if (points.length <= 1) {
            saveDirection(null)
            return;
        }
        const directionsService = new window.google.maps.DirectionsService();

        const origin = new window.google.maps.LatLng(points[0].latitude, points[0].longitude);
        const destination = new window.google.maps.LatLng(points[points.length - 1].latitude, points[points.length - 1].longitude);
        const waypoints = points.slice(1, points.length - 1).map(point => ({location: new window.google.maps.LatLng(point.latitude, point.longitude)}));

        await directionsService.route(
            {
                origin,
                destination,
                waypoints,
                travelMode: window.google.maps.TravelMode.DRIVING,
            }, function (response, status) {
                if (status === "OK") {
                    saveDirection(response);

                    if (map) {
                        const my_route = response.routes[0];
                        const markerStart = new google.maps.Marker({
                            position: my_route.legs[0].start_location,
                            label: {text: `Начальная(№${route.route_number})`, fontSize: "10px", className: "markerLabelStyle"},
                            icon: {
                                path: faLocationPin.icon[4],
                                fillColor: "rgb(168,36,41)",
                                fillOpacity: 1,
                                anchor: new google.maps.Point(
                                    faLocationPin.icon[0] / 2, // width
                                    faLocationPin.icon[1] // height
                                ),
                                strokeWeight: 1,
                                strokeColor: "#ffffff",
                                scale: 0.03,
                            },
                            map: map
                        })
                        setRouteMarkers(prevItems => [...prevItems, markerStart]);
                        for (var i = 1; i < my_route.legs.length; i++) {
                            const markerIn = new google.maps.Marker({
                                position: my_route.legs[i].start_location,
                                icon: {
                                    path: faCircleDot.icon[4],
                                    fillColor: "rgb(1,109,68)",
                                    fillOpacity: 1,
                                    anchor: new google.maps.Point(
                                        faCircleDot.icon[0] / 2, // width
                                        faCircleDot.icon[1] // height
                                    ),
                                    strokeWeight: 1,
                                    strokeColor: "#ffffff",
                                    scale: 0.03,
                                },
                                map: map
                            });
                            setRouteMarkers(prevItems => [...prevItems, markerIn]);
                        }
                        const markerEnd = new google.maps.Marker({
                            position: my_route.legs[i - 1].end_location,
                            label: {text: `Конечная(№${route.route_number})`, fontSize: "10px", className: "markerLabelStyle"},
                            icon: {
                                path: faLocationPin.icon[4],
                                fillColor: "rgba(161,52,56,0.9)",
                                fillOpacity: 1,
                                anchor: new google.maps.Point(
                                    faLocationPin.icon[0] / 2, // width
                                    faLocationPin.icon[1] // height
                                ),
                                strokeWeight: 1,
                                strokeColor: "#ffffff",
                                scale: 0.03,
                            },
                            map: map
                        })
                        setRouteMarkers(prevItems => [...prevItems, markerEnd]);
                    }
                }
            }
        );
    }

    async function imitateBusMovingOnClickedRoute(route, parsedStops) {
        try {
            const params = new URLSearchParams({route: route.id})
            const response = await fetch(`${BASE_URL}/transports/get-tracked-transports-of-route/?${params.toString()}`, {
                method: "GET",
                headers: {"Content-Type": "application/x-www-form-urlencoded"}
            })
            const transportsTracked = await response.json()
            for (const transport of transportsTracked) {
                let cycle = 1;
                let pass_count = 0

                // Define a function to handle the inner loop with a delay
                const handleStopWithDelay = async (stop) => {
                    if (!shouldContinue) {
                        return; // Stop the function execution if the flag is set to false
                    }
                    let p_in = Math.floor(Math.random() * 5);
                    let p_out = parseInt(p_in / 2);
                    pass_count += p_in - p_out
                    const recordData = {
                        transport: transport.id,
                        transportData: transport,
                        stop: stop.id,
                        stop_data: stop,
                        passenger_in: p_in,
                        passenger_out: p_out,
                        passengers_now: pass_count,
                        timestamp: getCurrentTime(),
                        cycle_amount: cycle,
                        date: getCurrentDateIn_YYYY_MM_DD_format(),
                    };
                    const responseOnSaveRecords = await fetch(`${BASE_URL}/transports/add-record/`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(recordData)
                    })

                    if (responseOnSaveRecords.status === 200) {
                        setBusesOnRouteData(prevItems => {
                            if (prevItems.some(item => recordData.transport === item.transport)) {
                                return prevItems.map(item => {
                                    if (item.transport === recordData.transport) {
                                        return recordData
                                    }
                                    return item
                                })
                            } else {
                                return [...prevItems, recordData]
                            }
                        })
                    }
                    // Proceed to the next stop after a delay of 3 seconds
                    const id = setTimeout(async () => {
                        await iterate();
                    }, 3000);
                    setTimeoutId(id);

                };

                // Create an array of stops to iterate over
                const stops = Object.values(parsedStops);
                let i = 0

                // Function to iterate over stops
                const iterate = async () => {
                    if (!shouldContinue) {
                        return; // Stop the function execution if the flag is set to false
                    }
                    if (stops.length > i) {
                        const stop = stops[i];
                        await handleStopWithDelay(stop);
                        i++
                    } else {
                        // All stops processed, continue to the next transport
                        // Add your code here if needed
                        setBusesOnRouteData([])
                        i = 0
                        cycle++
                        if (cycle < 3) {
                            await iterate()
                        }
                    }
                };

                // Start the iteration
                await iterate()
            }
        } catch (err) {
            console.error(err)
        }
    }

    const handleInfoWindow = (busInfo) => {
        setWindowOpen(!windowOpen);
        if (busInfo)
            setChosenBusInfoPosition(busInfo)
    };

    const onOriginMarkerDragEnd = (coord) => {
        if (coord && coord.latLng) {
            const {latLng} = coord;
            setOriginPoints({
                lat: latLng.lat(),
                lng: latLng.lng()
            })
        }
    }
    const onDestinationMarkerDragEnd = (coord) => {
        if (coord && coord.latLng) {
            const {latLng} = coord;
            setDestinationPoints({
                lat: latLng.lat(),
                lng: latLng.lng()
            })
        }
    }

    if (!isLoaded) {
        return "Загрузка карты..."
    }
    return (
        <div className={"mapPageWrapper"}>
            {isToggled && (<div className={"featuresPanel"}>
                <PanelWithTabs isPanelOpen={isToggled}
                               saveDirection={saveDirection}
                               handleRouteItemClicked={handleRouteItemClicked}
                               setOriginFocused={setOriginFocused}
                               setDestinationFocused={setDestinationFocused}
                               originPoints={originPoints}
                               destinationPoints={destinationPoints}
                />
            </div>)}
            <div className={"mapWrapper"}>
                <GoogleMap
                    center={currentPosition}
                    zoom={15}
                    mapContainerStyle={{width: '100%', height: '100%'}}
                    options={{
                        zoomControl: true,
                        zoomControlOptions: {
                            position: google.maps.ControlPosition.LEFT_CENTER
                        },
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                    }}
                    onClick={e => {
                        if (originFocused && !originPoints) {
                            setOriginPoints({lat: e.latLng.lat(), lng: e.latLng.lng()})
                        }
                        if (destinationFocused && !destinationPoints) {
                            setDestinationPoints({lat: e.latLng.lat(), lng: e.latLng.lng()})
                        }
                    }}
                    onLoad={map => setMap(map)}>
                    <Marker position={currentPosition}/>
                    {directionsResponse !== null && (
                        <DirectionsRenderer options={{
                            suppressMarkers: true
                        }} directions={directionsResponse}/>
                    )}
                    {busesOnRouteData.length && (busesOnRouteData.map(bus => {
                        const busPosition = {
                            lat: bus.stop_data.latitude,
                            lng: bus.stop_data.longitude,
                            transport: bus.transportData,
                            stop: bus.stop_data,
                            passengers_now: bus.passengers_now
                        }

                        return <Marker key={bus.timestamp + bus.transport} position={busPosition}
                                       onClick={() => handleInfoWindow(busPosition)}
                                       label={{
                                           text: `№${bus.transportData.route.route_number} м.-${bus.transportData.transport_number}`,
                                           className: "markerLabelStyle"
                                       }}
                                       icon={{
                                           path: faBus.icon[4],
                                           fillColor: "rgba(161,52,56,0.9)",
                                           fillOpacity: 1,
                                           anchor: new google.maps.Point(
                                               faBus.icon[0] / 2, // width
                                               faBus.icon[1] // height
                                           ),
                                           strokeWeight: 1,
                                           strokeColor: "#ffffff",
                                           scale: 0.05,
                                       }}
                        />
                    }))}
                    {windowOpen && (
                        <InfoWindow
                            position={chosenBusInfoPosition}
                            onCloseClick={() => handleInfoWindow()}>
                            <div>
                                <h3>{chosenBusInfoPosition.stop.stop_name}</h3>
                                <p>Номер автобуса: {chosenBusInfoPosition.transport.transport_number}</p>
                                <p>Пассажиров: {chosenBusInfoPosition.passengers_now}</p>
                            </div>
                        </InfoWindow>
                    )}
                    {originFocused && (<Marker position={originPoints}
                                               label={{text: "Точка отправления", className: "markerLabelStyle"}}
                                               icon={{
                                                   path: faFlag.icon[4],
                                                   fillColor: "rgb(1,109,68)",
                                                   fillOpacity: 1,
                                                   anchor: new google.maps.Point(
                                                       faFlag.icon[0] / 2, // width
                                                       faFlag.icon[1] // height
                                                   ),
                                                   strokeWeight: 1,
                                                   strokeColor: "#ffffff",
                                                   scale: 0.05,
                                               }}
                                               draggable={true}
                                               onDragEnd={e => onOriginMarkerDragEnd(e)}/>)}
                    {destinationFocused && (<Marker position={destinationPoints}
                                                    label={{text: "Точка назначения", className: "markerLabelStyle"}}
                                                    icon={{
                                                        path: faFlag.icon[4],
                                                        fillColor: "rgb(208,51,7)",
                                                        fillOpacity: 1,
                                                        anchor: new google.maps.Point(
                                                            faFlag.icon[0] / 2, // width
                                                            faFlag.icon[1] // height
                                                        ),
                                                        strokeWeight: 1,
                                                        strokeColor: "#ffffff",
                                                        scale: 0.05,
                                                    }}
                                                    draggable={true}
                                                    onDragEnd={e => onDestinationMarkerDragEnd(e)}/>)}
                    <div className={"featureBtns"}>
                        {isToggled ?
                            <MdClose onClick={() => setIsToggled(!isToggled)} size={20} className={"locationBtn"}/> :
                            <RxHamburgerMenu onClick={() => setIsToggled(!isToggled)} size={20}
                                             className={"locationBtn"}/>}
                        <FaLocationArrow
                            onClick={() => {
                                map.panTo(currentPosition)
                                map.setZoom(15)
                            }}
                            size={20}
                            className={"locationBtn"}
                        />
                    </div>
                </GoogleMap>
            </div>
        </div>
    )
}

export default MapPage
