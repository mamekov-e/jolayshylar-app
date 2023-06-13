import React, {useCallback, useContext, useMemo, useState} from "react";
import "./AllRoutesComponent.css"
import MaterialReactTable from "material-react-table";
import {BreadcrumbContext} from "../../../../contexts/useBreadcrumb.jsx";
import {Box, Button, IconButton} from "@mui/material";
import {MRT_Localization_RU} from "material-react-table/locales/ru.js";
import {MdModeEditOutline, MdOpenInNew} from "react-icons/all.js";
import {
    AddRouteSubpageCrumb,
    EditBusSubpageCrumb, EditRouteSubpageCrumb,
    RouteInfoSubpageCrumb
} from "../../../../constants/BreadcrumbItems.jsx";
import {BusContext} from "../../../../contexts/useBus.jsx";
import {RouteContext} from "../../../../contexts/useRoute.jsx";

export default function AllRoutesComponent() {
    const {goToSubpage} = useContext(BreadcrumbContext);
    const {setChangedState} = useContext(BusContext);
    const {routeItems, message, addRoute, editRoute, removeRoutes, getRouteStopsById, isLoading} = useContext(RouteContext);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const columns = useMemo(
        () => [
            {
                header: '#',
                accessorKey: 'id',
            },
            {
                accessorKey: 'route_number',
                header: "Номер маршрута",
            },
            {
                accessorKey: 'route_name',
                header: "Название маршрута",
            }
        ],
        [],
    );

    const handleOpenRoutePage = useCallback(
        (route) => {
            const subpagecrumb = RouteInfoSubpageCrumb(route);
            goToSubpage(subpagecrumb);
        }, [])

    const handleAddRoute = useCallback(
        () => {
            const subpagecrumb = AddRouteSubpageCrumb(addRoute);
            goToSubpage(subpagecrumb);
        }, [])

    const handleEditRow = useCallback(
        async (route) => {
            const routeStops = await getRouteStopsById(route.id)
            const subpagecrumb = EditRouteSubpageCrumb(route, routeStops, editRoute);
            goToSubpage(subpagecrumb);
        },
        [routeItems],
    );

    const handleDeleteRow = useCallback(
        (table, rows) => {
            if (!confirm(`Вы уверены что хотите удалить? Все связанные с маршрутом транспорты будут также удалены!`)) {
                return;
            }
            const selected = rows.map((row) => row.original)
            removeRoutes(selected)
            setChangedState(true)
            table.resetRowSelection(true)
        }, [routeItems]);

    return (
        <main>
            {routeItems && (
                <MaterialReactTable
                    data={routeItems}
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
                    localization={MRT_Localization_RU}
                    muiTablePaginationProps={{
                        sx: {
                            margin: '0',
                        },
                    }}
                    onPaginationChange={setPagination}
                    positionPagination={"top"}
                    state={{pagination, isLoading}}
                    enableRowActions
                    enableRowSelection
                    rowCount={routeItems.length}
                    selectAllMode="all"
                    memoMode="cells"
                    positionActionsColumn={"last"}
                    renderRowActions={({row, table}) => (
                        <div sx={{display: 'flex', flexWrap: 'nowrap', gap: '8px'}}>
                            <IconButton
                                color="primary"
                                onClick={() => {
                                    handleEditRow(row.original)
                                }}>
                                <MdModeEditOutline color={"black"}/>
                            </IconButton>
                            {/*<IconButton*/}
                            {/*    color="primary"*/}
                            {/*    onClick={() => {*/}
                            {/*        handleOpenRoutePage(row.original)*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    <MdOpenInNew color={"black"}/>*/}
                            {/*</IconButton>*/}
                        </div>
                    )}
                    renderTopToolbarCustomActions={({table}) => (
                        <Box
                            sx={{display: 'flex', gap: '1rem', p: '0.2rem', flexWrap: 'wrap'}}
                        >
                            <Button
                                size={"small"}
                                onClick={handleAddRoute}
                                variant="contained"
                            >
                                Добавить
                            </Button>
                            <Button
                                size={"small"}
                                disabled={
                                    !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                                }
                                onClick={() => handleDeleteRow(table, table.getSelectedRowModel().rows)}
                                variant="contained"
                                color={'error'}
                            >
                                Удалить
                            </Button>
                            {message && (<p style={{margin: 0}}>{message}</p>)}
                        </Box>
                    )}
                />
            )}
        </main>
    );
}
