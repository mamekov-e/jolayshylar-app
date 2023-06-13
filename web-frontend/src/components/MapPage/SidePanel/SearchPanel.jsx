import React, {useState} from "react";
import {BASE_URL} from "../../../constants/Data.jsx";
import {Autocomplete} from "@react-google-maps/api";
import {FaTimes} from "react-icons/all.js";
import "./SidePanel.css"

function SearchPanel({
                         saveDirection,
                         originPoints,
                         destinationPoints,
                         setOriginFocused,
                         setDestinationFocused,
                         handleRouteItemClicked
                     }) {
    const [closestRoutesList, setClosestRoutesList] = useState([])
    const [isSearched, setIsSearched] = useState(false)

    async function calculateRoute() {
        if (destinationPoints === null || originPoints === null) {
            return
        }
        const coordinatesData = {
            "latitude-1": originPoints.lat,
            "longitude-1": originPoints.lng,
            "latitude-2": destinationPoints.lat,
            "longitude-2": destinationPoints.lng,
        }
        const responseToGetClosestRoutesList = await fetch(`${BASE_URL}/transports/get-closest-routes/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(coordinatesData)
        })

        if (responseToGetClosestRoutesList.status === 200) {
            const data = await responseToGetClosestRoutesList.json()
            setClosestRoutesList(data)
            setIsSearched(true)
        }
    }

    function clearRoute() {
        saveDirection(null)
        setClosestRoutesList([])
        setIsSearched(false)
    }

    return (
        <>
            <div className={"requestPanel"}>
                <div className={"mapInputs"}>
                    <div className={"inputBox"}>
                        {originPoints !== null ? ("Пункт отправления") : "*"}
                        <Autocomplete>
                            <input className={"requestButton"} type='text'
                                   placeholder='Пункт отправления'
                                   readOnly={true}
                                   autoComplete={"off"}
                                   value={originPoints ? originPoints.lat + " " + originPoints.lng : ""}
                                   onChange={value => {
                                   }}
                                   onFocus={() => {
                                       setOriginFocused(true)
                                   }}
                            />
                        </Autocomplete>
                    </div>
                    <div className={"inputBox"}>
                        {destinationPoints !== null ? ("Пункт назначения") : "*"}
                        <Autocomplete>
                            <input
                                className={"requestButton"}
                                autoComplete={"off"}
                                value={destinationPoints ? destinationPoints.lat + " " + destinationPoints.lng : ""}
                                onChange={value => {
                                }}
                                onFocus={() => {
                                    setDestinationFocused(true)
                                }}
                                type='text'
                                placeholder='Пункт назначения'
                            />
                        </Autocomplete>
                    </div>
                </div>
                <div className={"buttonGroup"}>
                    <button className={"calculateButton"} type='submit' onClick={calculateRoute}>
                        Поиск маршрута
                    </button>
                    <button
                        className={"clearBtn"}
                        onClick={clearRoute}
                    >
                        <FaTimes size={17} color={"#007cad"}/>
                    </button>
                </div>
            </div>
            <div className={"responsePanel"}>
                {isSearched && (
                    closestRoutesList.length === 0 ? "Не удалось проложить маршрут" : (
                        <ul className={"routesListSB"}>
                            <p style={{marginBottom: 10, marginTop: 0, textAlign: 'center'}}>
                                Варианты маршрутов
                            </p>
                            {closestRoutesList.map((route) => (
                                <li className={"routeItem"} key={route.route_number}
                                    onClick={() => handleRouteItemClicked(route)}>
                                    <h3>{"№" + route.route_number + "  " + route.route_name}</h3></li>
                            ))}
                        </ul>
                    )
                )}
            </div>
        </>
    );
}

export default SearchPanel