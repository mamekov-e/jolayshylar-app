import React, {useContext, useEffect, useState} from "react";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import InputText from "../../../CustomComponents/InputText/InputText.jsx";
import SaveBtn from "../../../CustomComponents/Button/Button.jsx";
import "./RouteForm.css";
import {BreadcrumbContext} from "../../../../contexts/useBreadcrumb.jsx";
import Dropdown from "../../../CustomComponents/Dropdown/Dropdown.jsx";
import axiosUtil from "../../../../utils/axiosUtil.jsx";
import {BusContext} from "../../../../contexts/useBus.jsx";
import {DirectionsRenderer, GoogleMap, InfoWindow, Marker, useJsApiLoader} from "@react-google-maps/api";
import {API_KEY, DEFAULT_LOCATION_LAT_AND_LONG_OBJECT} from "../../../../constants/Data.jsx";
import {faLocationCrosshairs, faLocationPin, faStreetView} from "@fortawesome/free-solid-svg-icons";

export default function RouteForm({submitForm, route, routeStops}) {
    const {subpage, goToSubpage, allItemsPage} = useContext(BreadcrumbContext);
    const {setChangedState} = useContext(BusContext);
    const [responseError, setResponseError] = useState(null)
    const [stopOptions, setStopOptions] = useState([{value: "Загружаем...", label: "Загружаем..."}])

    const [libraries] = useState(['places']);
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: API_KEY,
        libraries: libraries
    })
    const [map, setMap] = useState(null)
    const [stopDirections, setStopDirections] = useState(null)
    const [windowOpen, setWindowOpen] = useState(false)
    const [currentPosition, setCurrentPosition] = useState(DEFAULT_LOCATION_LAT_AND_LONG_OBJECT);

    const api = axiosUtil()

    const routeStopsToOptions = () => {
        return routeStops.map(item => ({
            value: item.id,
            label: item.id + " : " + item.stop_name,
            stop_name: item.stop_name,
            longitude: parseFloat(item.latitude),
            latitude: parseFloat(item.longitude)
        }));
    }

    const drawDirections = async (points, map) => {
        if (points.length <= 1) {
            setStopDirections(null)
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
            },
            function (response, status) {
                if (status === "OK") {
                    setStopDirections(response);
                    setResponseError(null)

                    if (map) {
                        const my_route = response.routes[0];
                        for (var i = 0; i < my_route.legs.length; i++) {
                            new google.maps.Marker({
                                position: my_route.legs[i].start_location,
                                label: "" + (i + 1),
                                clickable: true,
                                map: map
                            });
                        }
                        new google.maps.Marker({
                            position: my_route.legs[i - 1].end_location,
                            label: "" + (i + 1),
                            map: map
                        });
                    }
                } else {
                    setResponseError("Не удается проложить маршрут")
                }
            }
        );
    }

    const handleInfoWindow = () => {
        setWindowOpen(!windowOpen);
    };

    const handleOnItemChosenClicked = (clickedItem) => {
        const position = {
            lat: clickedItem.latitude,
            lng: clickedItem.longitude,
            stop_name: clickedItem.stop_name,
        }
        setCurrentPosition(position)
    }

    useEffect(() => {
        async function loadStopsData() {
            const allStops = await api.get("/transports/get-all-stops/")
            const dataToOptions = allStops.data.map(item => ({
                value: item.id,
                label: item.id + " : " + item.stop_name,
                stop_name: item.stop_name,
                longitude: parseFloat(item.latitude),
                latitude: parseFloat(item.longitude)
            }));
            setStopOptions(dataToOptions)
        }

        loadStopsData()
    }, [])

    const success = position => {
        const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            stop_name: "Ваша геопозиция"
        }
        setCurrentPosition(currentPosition);
    };

    useEffect(() => {
        if (routeStops) {
            handleOnItemChosenClicked(routeStopsToOptions()[0])
        } else
            navigator.geolocation.getCurrentPosition(success);
    }, [])

    const routeSchema = Yup.object().shape({
        route_number: Yup.number()
            .required("Обязательное поле")
            .positive("Введите положительное число"),
        stops: Yup.array()
            .of(Yup.object().shape({
                value: Yup.string(),
                label: Yup.string(),
            }))
            .required("Обязательное поле")
            .min(2, "Выберите как минимум 2 остановки"),
    });

    return (
        <Formik
            initialValues={{
                route_number: route ? route.route_number : "",
                stops: route ? routeStopsToOptions() : "",
            }}
            validationSchema={routeSchema}
            onSubmit={async (values) => {
                const resp = await submitForm(values, route)
                if (resp !== true)
                    setResponseError(resp)
                else {
                    setChangedState(true)
                    goToSubpage(allItemsPage)
                    setResponseError(null)
                }
            }}>
            {({
                  errors, touched, handleChange, values,
                  setFieldValue, setFieldTouched
              }) => {
                return <div className={"routeFormWrapper"}>
                    <Form className="form">
                        <div className="formGroup">
                            <span className="dangerText">
                              {responseError ? responseError : touched.route_number && errors.route_number ? errors.route_number : "Номер маршрута *"}
                            </span>
                            <InputText
                                placeholder="Введите номер маршрута"
                                onChange={(e) => {
                                    const {value} = e.target
                                    setFieldValue("route_number", value)
                                }}
                                onBlur={() => setFieldTouched("route_number", true)}
                                value={values.route_number}
                                name="number"
                                type="number"
                                style={inputStyle}
                            />
                        </div>
                        <div className="formGroup">
                            <span className="dangerText">
                              {responseError ? responseError : touched.stops && errors.stops ? errors.stops : "Остановка *"}
                            </span>
                            <Dropdown
                                isSearchable
                                isMulti
                                placeHolder="Выберите остановку"
                                options={stopOptions}
                                onChange={(value) => {
                                    setFieldValue("stops", value)
                                    drawDirections(value, map)
                                    if (value.length) {
                                        handleOnItemChosenClicked(value[value.length - 1])
                                    }
                                }}
                                onChosenItemClick={handleOnItemChosenClicked}
                                onBlur={() => setFieldTouched("stops", true)}
                                onFocus={() => {
                                    setFieldTouched("stops", false)
                                }}
                                value={values.stops}
                                name="stops"
                                style={{...inputStyle, ...dropdownStyle}}
                            />
                        </div>
                        <SaveBtn
                            type="submit"
                            name={subpage.name}
                            style={btnStyle}
                        />
                    </Form>
                    {!isLoaded ? "...Загрузка карты" : (
                        <GoogleMap
                            center={currentPosition}
                            zoom={17}
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
                            onLoad={map => {
                                setMap(map)
                                if (routeStops) {
                                    drawDirections(routeStopsToOptions(), map)
                                }
                            }}>
                            {stopDirections !== null &&
                                <DirectionsRenderer
                                    options={{suppressMarkers: true}}
                                    directions={stopDirections}/>}
                            <Marker
                                position={currentPosition}
                                onClick={() => handleInfoWindow()}
                                icon={{
                                    path: faStreetView.icon[4],
                                    fillColor: "rgba(161,52,56,0.9)",
                                    fillOpacity: 1,
                                    anchor: new google.maps.Point(
                                        faStreetView.icon[0] / 2, // width
                                        faStreetView.icon[1] // height
                                    ),
                                    strokeWeight: 1,
                                    strokeColor: "#ffffff",
                                    scale: 0.05,
                                }}/>
                            {windowOpen && (
                                <InfoWindow
                                    position={currentPosition}
                                    onCloseClick={() => handleInfoWindow()}>
                                    <div>
                                        <h3>{currentPosition.stop_name}</h3>
                                        <p>Широта: {currentPosition.lat}</p>
                                        <p>Долгота: {currentPosition.lng}</p>
                                    </div>
                                </InfoWindow>
                            )}
                        </GoogleMap>
                    )}
                </div>
            }
            }
        </Formik>
    );
}

const inputStyle = {
    border: "0.5px solid #014E6D",
    borderRadius: "5px",
};
const dropdownStyle = {
    paddingInlineStart: "10px",
    minHeight: "30px",
    width: "250px"
};
const btnStyle = {
    backgroundColor: "#014E6D",
    color: "#FFF",
    marginTop: "10px",
    height: "40px",
    marginInline: 0,
};
