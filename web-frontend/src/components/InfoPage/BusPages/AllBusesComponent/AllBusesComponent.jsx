import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import "./AllBusesComponent.css"
import MaterialReactTable from "material-react-table";
import {BreadcrumbContext} from "../../../../contexts/useBreadcrumb.jsx";
import {Box, Button, IconButton} from "@mui/material";
import openRow from "../../../../assets/partners/pages/openRow.svg"
import {MRT_Localization_RU} from "material-react-table/locales/ru.js";
import {MdModeEditOutline, MdOpenInNew, VscDebugPause, VscDebugStart} from "react-icons/all";
import {BusInfoSubpageCrumb, EditBusSubpageCrumb} from "../../../../constants/BreadcrumbItems.jsx";

export default function AllBusesComponent() {
    const {goToSubpage, context} = useContext(BreadcrumbContext);
    const {items, changeBusTrackingState, remove, edit, AddComponent} = context;
    const [error, setError] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
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
                header: 'Гос. номер',
                accessorKey: 'transport_number',
            },
            {
                header: 'Вместимость',
                accessorKey: 'total_seats',
            },
            {
                header: 'Сидячих мест',
                accessorKey: 'normal_seats',
            },
            {
                header: 'Спец. мест',
                accessorKey: 'disabled_seats',
            },
        ],
        [],
    );

    useEffect(() => {
        const fetchData = async () => {
            if (!items.length) {
                setIsLoading(true);
            }
            if (typeof window !== 'undefined') {
                // setData(busItemsData);
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
    }, [items]);

    function onOpen(bus) {
        const subpagecrumb = BusInfoSubpageCrumb(bus);
        goToSubpage(subpagecrumb);
    }

    const handleEditRow = useCallback(
        (bus) => {
            const subpagecrumb = EditBusSubpageCrumb(bus, edit);
            goToSubpage(subpagecrumb);
        },
        [items],
    );

    const handleDeleteRow = useCallback(
        (table, rows) => {
            if (!confirm(`Вы уверены что хотите удалить?`)) {
                return;
            }
            const selected = rows.map((row) => row.original)
            remove(selected)
            table.resetRowSelection(true)
        },
        [items],
    );

    const handleAddTrackingBuses = useCallback(
        (table, rows) => {
            if (!confirm(`Вы уверены что хотите запустить отслеживание автобусов?`)) {
                return;
            }
            const selected = rows.map((row) => row.original)
            changeBusTrackingState(selected, true)
            table.resetRowSelection(true)
        },
        [items],
    );

    const handleRemoveTrackingBuses = useCallback(
        (table, rows) => {
            if (!confirm(`Вы уверены что хотите удалить из отслеживаемых автобусы?`)) {
                return;
            }
            const selected = rows.map((row) => row.original)
            changeBusTrackingState(selected, false)
            table.resetRowSelection(true)
        },
        [items],
    );

    function handleAdd() {
        goToSubpage(AddComponent);
    }

    return (
        <main>
            {items && (
                <MaterialReactTable
                    data={items}
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
                    rowCount={items.length}
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
                                    onClick={() => {
                                        const clickedRowToArr = []
                                        clickedRowToArr.push(row.original)
                                        changeBusTrackingState(clickedRowToArr, true)
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
                                    onOpen(row.original)
                                }}>
                                <MdOpenInNew color={"black"}/>
                            </IconButton>
                        </div>
                    )}
                    renderTopToolbarCustomActions={({table}) => (
                        <Box
                            sx={{display: 'flex', gap: '1rem', p: '0.2rem', flexWrap: 'wrap'}}
                        >
                            <Button
                                onClick={handleAdd}
                                variant="contained">
                                Добавить
                            </Button>
                            <Button
                                disabled={
                                    !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                                }
                                onClick={() => handleDeleteRow(table, table.getSelectedRowModel().rows)}
                                variant="contained"
                                color={'error'}>
                                Удалить
                            </Button>
                            <Button
                                disabled={
                                    !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                                }
                                onClick={() => handleAddTrackingBuses(table, table.getSelectedRowModel().rows)}
                                variant="contained"
                                color={'success'}>
                                Запустить отслеживание
                            </Button>
                            <Button
                                disabled={
                                    !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                                }
                                onClick={() => handleRemoveTrackingBuses(table, table.getSelectedRowModel().rows)}
                                variant="contained"
                                color={'warning'}>
                                Остановить отслеживание
                            </Button>
                            {error && (<p>Ошибка при отправке запроса</p>)}
                        </Box>
                    )}
                />
            )}
        </main>
    );
}
