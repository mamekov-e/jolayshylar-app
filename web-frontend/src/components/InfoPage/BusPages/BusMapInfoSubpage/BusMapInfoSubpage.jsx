import React, {useEffect, useMemo, useState, useContext} from "react";
import "./BusMapInfoSubpage.css";
import MaterialReactTable from 'material-react-table';
import {getCurrentDate} from "../../../../utils/dateUtil.jsx";
import axiosUtil from "../../../../utils/axiosUtil.jsx";
import {MRT_Localization_RU} from "material-react-table/locales/ru.js";
import {BusContext} from "../../../../contexts/useBus.jsx";

export default function BusMapInfoSubpage({bus, routeStops}) {
    const {busItems} = useContext(BusContext);
    const [currentDate, setCurrentDate] = useState(null);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: routeStops.length,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [busRouteInfo, setBusRouteInfo] = useState([])
    const api = axiosUtil()

    useEffect(() => {
        const fetchData = async () => {
            const params = new URLSearchParams({id: bus.id})
            const response = await api.get("/transports/get-record-for-transport/?" + params.toString(),
                {
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}
                })
            if (response.status === 200) {
                let pass_count = 0
                const data = response.data
                if (data !== "Нет записей для этого транспорта") {
                    const busRouteInfoCalculated = data.map((info) => {
                        pass_count += info.passenger_in - info.passenger_out
                        return {...info, passengers_now: pass_count}
                    })
                    setBusRouteInfo(busRouteInfoCalculated)
                }
            }
            setIsLoading(false);
        };
        fetchData();
    }, [busItems]);

    useEffect(() => {
        setCurrentDate(getCurrentDate())
    }, [])

    const columns = useMemo(
        () => [
            {
                accessorKey: 'stop.stop_name',
                header: 'Остановки',
                size: 120
            },
            {
                accessorKey: 'timestamp',
                header: 'Время',
                size: 70
            },
            {
                accessorKey: 'passenger_in',
                header: 'Пассажиров вошло',
                size: 90
            },
            {
                accessorKey: 'passenger_out',
                header: 'Пассажиров вышло',
                size: 90
            },
            {
                accessorKey: 'passengers_now',
                header: 'Пассажиров в автобусе',
                size: 120
            },
            {
                accessorKey: 'cycle_amount',
                header: 'Рейс',
                size: 70
            }
        ],
        [],
    );

    return (
        <>
            <div className="busRouteInfoPage">
                <MaterialReactTable
                    data={busRouteInfo}
                    columns={columns}
                    enableHiding={false}
                    enableDensityToggle={false}
                    initialState={{
                        pagination,
                        density: 'compact',
                        sorting: [
                            {
                                id: 'cycle_amount',
                                desc: true,
                            },
                        ],
                    }}
                    muiTablePaginationProps={{
                        rowsPerPageOptions: [pagination.pageSize],
                        sx: {
                            margin: '0',
                        },
                    }}
                    onPaginationChange={setPagination}
                    positionPagination={"top"}
                    state={{pagination, isLoading}}
                    localization={MRT_Localization_RU}
                    renderTopToolbarCustomActions={() => (
                        <div className="firstInfo">
                            <div className="busRouteInfoDetails">
                                <p>Номер маршрута:</p><h3>{bus.route.route_number}</h3>
                            </div>
                            <div className="busRouteInfoDetails">
                                <p>Гос. номер:</p><h3>{bus.transport_number}</h3>
                            </div>
                            <div className="busRouteInfoDetails">
                                <p>Дата:</p><h3>{currentDate}</h3>
                            </div>
                        </div>
                    )}/>
            </div>
        </>
    );
}

const editBtnStyle = {
    backgroundColor: "#014E6D",
    color: "white",
    padding: "7px 12px",
    width: "auto",
    height: "30px",
};
const opacityStyle = {opacity: "0.6"}