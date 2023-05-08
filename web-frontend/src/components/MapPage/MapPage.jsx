import {DirectionsRenderer, GoogleMap, Marker, useJsApiLoader,} from '@react-google-maps/api'
import {useEffect, useState} from 'react'
import {API_KEY, DEFAULT_LOCATION_LAT_AND_LONG_OBJECT} from "../../constants/Data.jsx";
import {FaLocationArrow, MdClose, RxHamburgerMenu} from "react-icons/all.js";
import PanelWithTabs from "./SidePanel/PanelWithTabs.jsx";

function MapPage() {
    const [ libraries ] = useState(['places']);

    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: API_KEY,
        libraries,
    })
    const [currentPosition, setCurrentPosition] = useState(DEFAULT_LOCATION_LAT_AND_LONG_OBJECT);

    const [map, setMap] = useState(null)
    const [directionsResponse, setDirectionsResponse] = useState(null)

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
        setDirectionsResponse(direction)
    }

    if (!isLoaded) {
        return "Загрузка карты..."
    }

    return (
        <div className={"mapPageWrapper"}>
            {isToggled && (<div className={"featuresPanel"}>
                <PanelWithTabs isPanelOpen={isToggled} saveDirection={saveDirection}/>
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
                    onLoad={map => setMap(map)}>
                    <Marker position={currentPosition}/>
                    {directionsResponse && (
                        <DirectionsRenderer options={{suppressMarkers: true}} directions={directionsResponse}/>
                    )}
                    <div className={"featureBtns"}>
                        {isToggled ? <MdClose onClick={()=>setIsToggled(!isToggled)} size={20} className={"locationBtn"}/> :
                            <RxHamburgerMenu onClick={()=>setIsToggled(!isToggled)} size={20} className={"locationBtn"}/>}
                        <FaLocationArrow
                            onClick={() => {
                                map.panTo(currentPosition)
                                map.setZoom(15)
                            }}
                            size={20}
                            className={"locationBtn"}
                        />
                    </div>
                </GoogleMap>;
            </div>
        </div>
    )
}

export default MapPage
