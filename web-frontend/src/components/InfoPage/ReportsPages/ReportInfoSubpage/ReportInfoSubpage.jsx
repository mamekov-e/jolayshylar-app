import React, {useContext, useEffect, useMemo, useState} from "react";
import "./ReportInfoSubpage.css";
import MaterialReactTable from 'material-react-table';
import axiosUtil from "../../../../utils/axiosUtil.jsx";
import {MRT_Localization_RU} from "material-react-table/locales/ru.js";

export default function ReportInfoSubpage({report, routeStops}) {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: routeStops.length,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [reportInfo, setBusRouteInfo] = useState([])
    const api = axiosUtil()

    useEffect(() => {
        const fetchData = async () => {
            const params = new URLSearchParams({
                transport_id: report.transport.id,
                date: report.date,
            })
            const response = await api.get("/reports/get-report-of-transport-by-date/?" + params.toString(),
                {
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}
                })
            if (response.status === 200) {
                let pass_count = 0
                const busRouteInfoCalculated = response.data.map((info) => {
                    pass_count += info.passenger_in - info.passenger_out
                    return {...info, passengers_now: pass_count}
                })
                setBusRouteInfo(busRouteInfoCalculated)
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

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
            <div className="reportInfoPage">
                <MaterialReactTable
                    data={reportInfo}
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
                            <div className="reportInfoDetails">
                                <p>Номер маршрута:</p><h3>{report.transport.route.route_number}</h3>
                            </div>
                            <div className="reportInfoDetails">
                                <p>Гос. номер:</p><h3>{report.transport.transport_number}</h3>
                            </div>
                            <div className="reportInfoDetails">
                                <p>Дата:</p><h3>{report.date}</h3>
                            </div>
                        </div>
                    )}/>
            </div>
        </>
    );
}