import React, { useState, useRef } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {Autocomplete} from "@react-google-maps/api";
import {FaTimes} from "react-icons/all.js";

function RouteListPanel({ routes }) {
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

function SearchPanel({ saveDirection }) {
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
                <p>Дистанция: {distance} </p>
                <p>Продолжительность: {duration} </p>
            </div>
        </>
    );
}

function PanelWithTabs({ isPanelOpen, routes,saveDirection }) {

    return (
        <div>
            {isPanelOpen && (
                <Tabs>
                    <TabList>
                        <Tab>Доступные маршруты</Tab>
                        <Tab>Найти маршрут</Tab>
                    </TabList>

                    <TabPanel>
                        <RouteListPanel routes={routes} />
                    </TabPanel>
                    <TabPanel>
                        <SearchPanel saveDirection={saveDirection} />
                    </TabPanel>
                </Tabs>
            )}
        </div>
    );
}

export default PanelWithTabs;
