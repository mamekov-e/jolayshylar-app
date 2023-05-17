import React, {useContext, useEffect, useState}  from 'react';
import {RouteContext} from "../../../contexts/useRoute.jsx";
import {BASE_URL} from "../../../constants/Data.jsx";
import {compareArrays} from "../../../utils/objectUtil.jsx";
import "./SidePanel.css"

function RouteListPanel({saveDirection, handleRouteItemClicked}) {
    const {routeItems} = useContext(RouteContext);
    const [routesData, setRoutesData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchRouteData() {
            try {
                const response = await fetch(`${BASE_URL}/transports/get-all-routes/`, {
                    method: "GET",
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}
                })
                const data = await response.json()
                if (!compareArrays(routesData, data))
                    setRoutesData(data)
                setIsLoading(false)
            } catch (err) {
                console.error(err)
            }
        }

        fetchRouteData()
    }, [routeItems])

    function clearRoute() {
        saveDirection(null)
    }

    return (
        <div>
            <div className={"routeListActions"}>
                <button className={"resetBtn"} onClick={clearRoute}>Сбросить</button>
            </div>
            {isLoading ? "Загружаем..." : (
                routesData.length === 0 ? "Нет маршрутов" : (
                    <ul className={"routesListSB"}>
                        {routesData.map((route) => (
                            <li className={"routeItem"} key={route.route_number}
                                onClick={() => handleRouteItemClicked(route)}>
                                <h3>{"№" + route.route_number + "  " + route.route_name}</h3></li>
                        ))}
                    </ul>
                )
            )}
        </div>
    );
}

export default RouteListPanel;
