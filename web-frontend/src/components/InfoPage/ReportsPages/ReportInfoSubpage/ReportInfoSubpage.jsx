import React, {useContext, useMemo, useState} from "react";
import EditBtn from "../../../CustomComponents/Button/Button.jsx";
import "./ReportInfoSubpage.css";
import {EditRouteSubpageCrumb} from "../../../../constants/BreadcrumbItems.jsx";
import {BreadcrumbContext} from "../../../../contexts/useBreadcrumb.jsx";
import transportRecordStop from "../../../../staticData/transportRecordStop.json"
import MaterialReactTable from 'material-react-table';

export default function ReportInfoSubpage({route}) {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: route.stops.length,
    });

    const columns = useMemo(
        () => [
            {
                accessorKey: 'stop_name',
                header: 'Остановки',
            },
            {
                accessorKey: 'timestamp',
                header: 'Время',
            },
            {
                accessorKey: 'passenger_in',
                header: 'Пассажиров вошло',
            },
            {
                accessorKey: 'passenger_out',
                header: 'Пассажиров вышло',
            },
            {
                accessorKey: 'cycle_amount',
                header: 'Рейс',
            }
        ],
        [],
    );

    return (
        <>
            <div className="routeInfoPage">
                <MaterialReactTable
                    data={transportRecordStop}
                    columns={columns}
                    enableHiding={false}
                    initialState={{
                        pagination,
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
                    state={{pagination}}
                    renderTopToolbarCustomActions={() => (
                        <div className="firstInfo">
                            <div className="routeInfoDetails">
                                <p>Номер маршрута:</p><h3>{route.routeNumber}</h3>
                            </div>
                            <div className="routeInfoDetails">
                                <p>Номер автобуса:</p><h3>{route.busNumber}</h3>
                            </div>
                        </div>
                    )}/>
            </div>
        </>
    );
}
