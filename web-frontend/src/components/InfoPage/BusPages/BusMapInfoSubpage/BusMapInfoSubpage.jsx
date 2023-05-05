import React, {useContext, useEffect, useMemo, useState} from "react";
import "./BusMapInfoSubpage.css";
import {EditBusSubpageCrumb} from "../../../../constants/BreadcrumbItems.jsx";
import {BreadcrumbContext} from "../../../../contexts/useBreadcrumb.jsx";
import transportRecordStop from "../../../../staticData/serverData/transportRecordStop.json"
import MaterialReactTable from 'material-react-table';
import {getCurrentDate} from "../../../../utils/dateUtil.jsx";
import {BusContext} from "../../../../contexts/useBus.jsx";

export default function BusMapInfoSubpage({bus}) {
    const {goToSubpage} = useContext(BreadcrumbContext);
    const {editBus} = useContext(BusContext)
    const [currentDate, setCurrentDate] = useState(null);

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 6//bus.stops.length,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [busRouteInfo, setBusRouteInfo] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            if (!busRouteInfo.length) {
                setIsLoading(true);
            }

            if (typeof window !== 'undefined') {
                setBusRouteInfo(transportRecordStop)
                setIsLoading(false);
            }
            // const url = new URL(
            //     '/api/items',
            //     process.env.NODE_ENV === 'production'
            //         ? 'https://www.material-react-table.com'
            //         : 'http://localhost:3000',
            // );
            // url.searchParams.set(
            //     'start',
            //     `${pagination.pageIndex * pagination.pageSize}`,
            // );
            // url.searchParams.set('size', `${pagination.pageSize}`);
            // url.searchParams.set('filters', JSON.stringify(columnFilters ?? []));
            // url.searchParams.set('globalFilter', globalFilter ?? '');
            // url.searchParams.set('sorting', JSON.stringify(sorting ?? []));
            // try {
            //     const response = await fetch(url.href);
            //     const json = await response.json();
            //     setData(json.items);
            //     setRowCount(json.meta.totalRowCount);
            // } catch (error) {
            //     setIsError(true);
            //     console.error(error);
            //     return;
            // }
            // setIsError(false);
            // setIsLoading(false);
            // setIsRefetching(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        setCurrentDate(getCurrentDate())
    }, [])

    function onEdit() {
        const subpagecrumb = EditBusSubpageCrumb(bus, editBus);
        goToSubpage(subpagecrumb);
    }

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
            <div className="busRouteInfoPage">
                <MaterialReactTable
                    data={busRouteInfo}
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
                    state={{pagination, isLoading}}
                    renderTopToolbarCustomActions={() => (
                        <div className="firstInfo">
                            <div className="busRouteInfoDetails">
                                <p>Номер маршрута:</p><h3>{bus.route_number}</h3>
                            </div>
                            <div className="busRouteInfoDetails">
                                <p>Гос. номер:</p><h3>{bus.transport_number}</h3>
                            </div>
                            <div className="busRouteInfoDetails">
                                <p>Дата:</p><h3>{currentDate}</h3>
                            </div>
                            {/*<EditBtn*/}
                            {/*    name="Редактировать"*/}
                            {/*    // disabled={busRouteInfo.length}*/}
                            {/*    // style={!busRouteInfo.length ? editBtnStyle : {*/}
                            {/*    //     ...editBtnStyle,*/}
                            {/*    //     ...opacityStyle,*/}
                            {/*    // }}*/}
                            {/*    style={editBtnStyle}*/}
                            {/*    onClick={onEdit}/>*/}
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