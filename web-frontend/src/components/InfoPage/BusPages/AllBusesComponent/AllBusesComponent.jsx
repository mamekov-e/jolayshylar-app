import React, {useCallback, useContext, useMemo, useState} from "react";
import "./AllBusesComponent.css"
import MaterialReactTable from "material-react-table";
import {BreadcrumbContext} from "../../../../contexts/useBreadcrumb.jsx";
import {Box, Button, IconButton} from "@mui/material";
import {MRT_Localization_RU} from "material-react-table/locales/ru.js";
import {MdModeEditOutline, MdOpenInNew, VscDebugPause, VscDebugStart} from "react-icons/all";
import {AddBusSubpageCrumb, BusInfoSubpageCrumb, EditBusSubpageCrumb} from "../../../../constants/BreadcrumbItems.jsx";
import {BusContext} from "../../../../contexts/useBus.jsx";
import {RouteContext} from "../../../../contexts/useRoute.jsx";

export default function AllBusesComponent() {
    const {goToSubpage} = useContext(BreadcrumbContext);
    const {
        busItems,
        message,
        isLoading,
        changeBusTrackingState,
        checkIsTrackingAtLeastOne,
        addBus,
        removeBuses,
        editBus,
        createBusesReport
    } = useContext(BusContext);
    const {getRouteStopsById} = useContext(RouteContext);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const columns = useMemo(
        () => [
            {
                header: '#',
                accessorKey: 'id',
                size: 5
            },
            {
                header: 'Гос. номер',
                accessorKey: 'transport_number',
                size: 75
            },
            {
                header: 'Вместимость',
                accessorKey: 'total_seats',
                size: 70
            },
            {
                header: 'Сидячих мест',
                accessorKey: 'normal_seats',
                size: 75
            },
            {
                header: 'Спец. мест',
                accessorKey: 'disabled_seats',
                size: 70
            },
            {
                header: 'Маршрут',
                accessorKey: 'route.route_number',
                size: 50
            },
        ],
        [],
    );

    const handleOpenBusPage = useCallback(
        async (bus) => {
            const routeStops = await getRouteStopsById(bus.route.id)
            const subpagecrumb = BusInfoSubpageCrumb(bus, routeStops);
            goToSubpage(subpagecrumb);
        }, [])

    const handleAddBus = useCallback(
        () => {
            const subpagecrumb = AddBusSubpageCrumb(addBus)
            goToSubpage(subpagecrumb);
        }, [])

    const handleEditRow = useCallback(
        (bus) => {
            const subpagecrumb = EditBusSubpageCrumb(bus, editBus);
            goToSubpage(subpagecrumb);
        },
        [busItems],
    );

    const handleDeleteRow = useCallback(
        (table, rows) => {
            if (!confirm(`Вы уверены что хотите удалить?`)) {
                return;
            }
            const selected = rows.map((row) => row.original)
            if (checkIsTrackingAtLeastOne(selected)) {
                alert("В списке есть отслеживаемые автобусы. Остановите отслеживание, чтобы удалить.")
                return;
            }
            removeBuses(selected)
            table.resetRowSelection(true)
        },
        [busItems],
    );

    const handleAddTrackingBuses = useCallback(
        (table, rows) => {
            if (!confirm(`Вы уверены что хотите запустить отслеживание автобусов?`)) {
                return;
            }
            const selected = rows.map((row) => row.original)
            if (checkIsTrackingAtLeastOne(selected) && selected.length > 1) {
                if (!confirm("В списке есть также неотслеживаемые автобусы. " +
                    "Вы уверены что хотите запустить отслеживание этих автобусов?"))
                    return;
            }
            changeBusTrackingState(selected, true)
            table.resetRowSelection(true)
        },
        [busItems],
    );

    const handleRemoveTrackingBuses = useCallback(
        (table, rows) => {
            if (!confirm(`Вы уверены что хотите удалить из отслеживаемых автобусы?`)) {
                return;
            }
            const selected = rows.map((row) => row.original)
            if (checkIsTrackingAtLeastOne(selected) && selected.length > 1) {
                if (!confirm("В списке есть также отслеживаемые автобусы. " +
                    "Вы уверены что хотите остановить отслеживание этих автобусов?"))
                    return;
            }
            changeBusTrackingState(selected, false)
            table.resetRowSelection(true)
        },
        [busItems],
    );

    const handleCreateBusesReport = useCallback(
        (table, rows) => {
            const selected = rows.map((row) => row.original)
            if (checkIsTrackingAtLeastOne(selected)) {
                alert("В списке есть отслеживаемые автобусы. Остановите отслеживание, чтобы создать отчет.")
                return;
            }
            createBusesReport(selected)
            table.resetRowSelection(true)
        },
        [busItems],
    );

    return (
        <main>
            {busItems && (
                <MaterialReactTable
                    data={busItems}
                    columns={columns}
                    enableHiding={false}
                    enableDensityToggle={false}
                    enableMultiSort={true}
                    initialState={{
                        pagination,
                        density: 'compact',
                        sorting: [
                            {id: 'id', desc: true}
                        ],
                        columnVisibility: {id: false}
                    }}
                    muiTablePaginationProps={{
                        sx: {
                            margin: '0',
                        },
                    }}
                    onPaginationChange={setPagination}
                    positionPagination={"top"}
                    state={{pagination, isLoading}}
                    localization={MRT_Localization_RU}
                    enableRowActions
                    enableRowSelection
                    rowCount={busItems.length}
                    selectAllMode="all"
                    memoMode="cells"
                    positionActionsColumn={"last"}
                    renderRowActions={({row, table}) => (
                        <div sx={{display: 'flex', flexWrap: 'nowrap', gap: '8px'}}>
                            {row.original.is_tracking ?
                                <IconButton
                                    color="primary"
                                    onClick={() => {
                                        const clickedRowToArr = []
                                        clickedRowToArr.push(row.original)
                                        changeBusTrackingState(clickedRowToArr, false)
                                    }}>
                                    <VscDebugPause color={"#A3362E"}/>
                                </IconButton> :
                                <IconButton
                                    color="primary"
                                    onClick={async () => {
                                        const clickedRowToArr = []
                                        clickedRowToArr.push(row.original)
                                        await changeBusTrackingState(clickedRowToArr, true)
                                    }}>
                                    <VscDebugStart color={"#368852"}/>
                                </IconButton>}
                            <IconButton
                                color="primary"
                                onClick={() => {
                                    handleEditRow(row.original)
                                }}>
                                <MdModeEditOutline color={"black"}/>
                            </IconButton>
                            <IconButton
                                color="primary"
                                onClick={() => {
                                    handleOpenBusPage(row.original)
                                }}>
                                <MdOpenInNew color={"black"}/>
                            </IconButton>
                        </div>
                    )}
                    renderTopToolbarCustomActions={({table}) => (
                        <Box sx={{display: 'flex', gap: '0.5rem', p: '0.2rem', flexWrap: 'wrap'}}>
                            <Button
                                size={"small"}
                                onClick={handleAddBus}
                                variant="contained">
                                Добавить
                            </Button>
                            <Button
                                size={"small"}
                                disabled={
                                    !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                                }
                                onClick={() => handleDeleteRow(table, table.getSelectedRowModel().rows)}
                                variant="contained"
                                color={'error'}>
                                Удалить
                            </Button>
                            <Button
                                size={"small"}
                                disabled={
                                    !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                                }
                                onClick={() => handleAddTrackingBuses(table, table.getSelectedRowModel().rows)}
                                variant="contained"
                                color={'success'}>
                                Запустить отслеживание
                            </Button>
                            <Button
                                size={"small"}
                                disabled={
                                    !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                                }
                                onClick={() => handleRemoveTrackingBuses(table, table.getSelectedRowModel().rows)}
                                variant="contained"
                                color={'warning'}>
                                Остановить отслеживание
                            </Button>
                            <Button
                                size={"small"}
                                disabled={
                                    !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                                }
                                onClick={() => handleCreateBusesReport(table, table.getSelectedRowModel().rows)}
                                variant="contained"
                                color={'secondary'}>
                                Создать отчет
                            </Button>
                            {message && (
                                <p style={{
                                    color: "mediumseagreen",
                                    margin: '3px',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>{message}</p>
                            )}
                        </Box>
                    )}
                />
            )}
        </main>
    );
}
