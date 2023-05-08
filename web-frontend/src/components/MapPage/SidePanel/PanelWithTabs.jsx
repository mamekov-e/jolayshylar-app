import React, {useEffect, useRef, useState} from 'react';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {Autocomplete} from "@react-google-maps/api";
import {FaTimes} from "react-icons/all.js";
import axiosUtil from "../../../utils/axiosUtil.jsx";
import {compareArrays} from "../../../utils/objectUtil.jsx";
import "./SidePanel.css"

function RouteListPanel() {
    const [routesData, setRoutesData] = useState([])
    const api = axiosUtil()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchRouteData() {
            try {
                const response = await api.get("/transports/get-routes-of-company/")

                if (!compareArrays(setRoutesData, response.data))
                    setRoutesData(response.data)
                setIsLoading(false)
            } catch (err) {
                console.error(err)
            }
        }

        fetchRouteData()
    }, [])

    return (
        <div>
            <h2>Список маршрутов</h2>
            {isLoading ? "...Загружаем" : (
                routesData.length === 0 ? "Нет маршрутов" : (
                    <ul className={"routesListSB"}>
                        {routesData.map((route) => (
                            <li key={route.route_number}>{route.route_name}</li>
                        ))}
                    </ul>
                )
            )}
        </div>
    );
}

function SearchPanel({saveDirection}) {
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const originRef = useRef()
    const destinationRef = useRef()

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
            //         location: new google.maps.LatLng(51.11457,  71.4113)
            //     },
            // ]
        })
        saveDirection(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
    }

    function clearRoute() {
        saveDirection(null)
        setDistance('')
        setDuration('')
        originRef.current.value = ''
        destinationRef.current.value = ''
    }

    return (
        <>
            <div className={"requestPanel"}>
                <div className={"mapInputs"}>
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
                <p>Дистанция: {distance} </p>
                <p>Продолжительность: {duration} </p>
            </div>
        </>
    );
}

function PanelWithTabs({isPanelOpen, saveDirection}) {

    return (
        <div>
            {isPanelOpen && (
                <Tabs>
                    <TabList>
                        <Tab>Доступные маршруты</Tab>
                        <Tab>Найти маршрут</Tab>
                    </TabList>

                    <TabPanel>
                        <RouteListPanel/>
                    </TabPanel>
                    <TabPanel>
                        <SearchPanel saveDirection={saveDirection}/>
                    </TabPanel>
                </Tabs>
            )}
        </div>
    );
}

export default PanelWithTabs;
