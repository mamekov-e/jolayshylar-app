import {Autocomplete, DirectionsRenderer, GoogleMap, Marker, useJsApiLoader,} from '@react-google-maps/api'
import {useEffect, useRef, useState} from 'react'
import {API_KEY, DEFAULT_LAT, DEFAULT_LONG} from "../../constants/Data.jsx";
import {FaLocationArrow, FaTimes} from "react-icons/all.js";

function MapPage() {
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: API_KEY,
        libraries: ['places'],
    })
    const [currentPosition, setCurrentPosition] = useState({
        lat: DEFAULT_LAT,
        lng: DEFAULT_LONG,
    });

    const [map, setMap] = useState(null)
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')

    const originRef = useRef()
    const destinationRef = useRef()

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

    if (!isLoaded) {
        return "Загрузка карты..."
    }

    async function calculateRoute() {
        if (originRef.current.value === '' || destinationRef.current.value === '') {
            return
        }
        const directionsService = new google.maps.DirectionsService()
        // const directionDisplay = new google.maps.DirectionsRenderer()
        // directionDisplay.setMap(map)
        // directionsDisplay.setOptions({suppressMarkers: true});
        const results = await directionsService.route({
            origin: originRef.current.value,
            destination: destinationRef.current.value,
            travelMode: google.maps.TravelMode.DRIVING,
            // optimizeWaypoints: true,
            // unitSystem: window.google.maps.UnitSystem.METRIC,
            // waypoints: [
            //     {
            //         location: new google.maps.LatLng(51.00012,  71.37633)
            //     },
            //     {
            //         location: new google.maps.LatLng(51.00071,71.37854)
            //     },
            //     {
            //         location: new google.maps.LatLng(51.00389,71.38206)
            //     },
            //     {
            //         location: new google.maps.LatLng(50.96494,  71.38079)
            //     }
            // ]
        })
        // directionDisplay.setDirections(results)
        setDirectionsResponse(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
    }

    function clearRoute() {
        setDirectionsResponse(null)
        setDistance('')
        setDuration('')
        originRef.current.value = ''
        destinationRef.current.value = ''
    }

    console.log("map",map)
    return (
        <div className={"mapPageWrapper"}>
            <div className={"mapWrapper"}>
                <GoogleMap
                    center={currentPosition}
                    zoom={15}
                    mapContainerStyle={{width: '100%', height: '100%'}}
                    options={{
                        zoomControl: true,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                    }}
                    onLoad={map => setMap(map)}>
                    <Marker position={currentPosition}/>
                    {directionsResponse && (
                        <DirectionsRenderer options={{suppressMarkers: true}} directions={directionsResponse}/>
                    )}
                </GoogleMap>
            </div>
            <div className={"searchPanel"}>
                <div className={"requestPanel"}>
                    <div className={"inputBox"}>
                        <Autocomplete>
                            <input className={"requestButton"} type='text' placeholder='Пункт отправления'
                                   ref={originRef}/>
                        </Autocomplete>
                    </div>
                    <div className={"inputBox"}>
                        <Autocomplete>
                            <input
                                className={"requestButton"}
                                type='text'
                                placeholder='Пункт назначения'
                                ref={destinationRef}
                            />
                        </Autocomplete>
                    </div>
                    <div className={"buttonGroup"}>
                        <button className={"calculateButton"} color='pink' type='submit' onClick={calculateRoute}>
                            Расчитать маршрут
                        </button>
                        <button
                            className={"clearBtn"}
                            onClick={clearRoute}
                        >
                            <FaTimes color={"#007cad"}/>
                        </button>
                    </div>
                </div>
                <div className={"responsePanel"}>
                    <p>Distance: {distance} </p>
                    <p>Duration: {duration} </p>
                    <button
                        className={"locationBtn"}
                        onClick={() => {
                            map.panTo(currentPosition)
                            map.setZoom(15)
                        }}>
                        <FaLocationArrow color={"#007cad"}
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MapPage
