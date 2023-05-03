import React, {useState} from "react";
import RouteInput from "../../components/MapPage/RouteInput.jsx";
import BusMapLeaflet from "../../components/MapPage/BusMapLeaflet.jsx";
import BusDetails from "../../components/MapPage/BusDetails.jsx";
import './PassengersPage.css'
import BusMapGoogleApi from "../../components/MapPage/BusMapGoogleApi";
import GoogleMapWithFunc from "../../components/MapPage/GoogleMapWithFunc";
import MapPage from "../../components/MapPage/MapPage.jsx";

export default function PassengersPage() {
    const [route, setRoute] = useState(null);
    const [selectedBus, setSelectedBus] = useState(null);

    const handleRouteChange = (route) => {
        setRoute(route);
    };

    const handleBusSelect = (bus) => {
        setSelectedBus(bus);
    };

  return (
    // <main>
        <div className={"map"}>
            {/*<RouteInput onRouteChange={handleRouteChange} />*/}
            {/*<BusMapGoogleApi route={route} />*/}
            {/*<GoogleMapWithFunc route={route}/>*/}
            <MapPage />
            {/*<BusMapLeaflet route={route} onBusSelect={handleBusSelect} />*/}
            {/*<BusDetails bus={selectedBus} />*/}
        </div>
    // </main>
  );
}
