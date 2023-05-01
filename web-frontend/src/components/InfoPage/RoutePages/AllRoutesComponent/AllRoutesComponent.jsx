import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import "./AllRoutesComponent.css"
import MaterialReactTable from "material-react-table";
import {BreadcrumbContext} from "../../../../contexts/useBreadcrumb.jsx";
import {Box, Button, IconButton} from "@mui/material";
import openRow from "../../../../assets/partners/pages/openRow.svg"
import {MRT_Localization_RU} from "material-react-table/locales/ru.js";

export default function AllRoutesComponent({InfoSubpage}) {
    const {goToSubpage, context} = useContext(BreadcrumbContext);
    const {items, remove, AddComponent} = context;
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
                accessorKey: 'routeNumber',
                header: "Номер маршрута",
            },
            {
                accessorKey: 'routeName',
                header: "Название",
            },
            {
                accessorKey: 'busNumber',
                header: "Номер автобуса",
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
    }, []);

    function onOpen(item) {
        const subpagecrumb = InfoSubpage(item);
        goToSubpage(subpagecrumb);
    }

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
                    enableRowActions
                    enableRowSelection
                    rowCount={items.length}
                    selectAllMode="all"
                    memoMode="cells"
                    positionActionsColumn={"last"}
                    renderRowActions={({row, table}) => (
                        <div sx={{display: 'flex', flexWrap: 'nowrap', gap: '8px'}}>
                            <IconButton
                                color="primary"
                                onClick={() => {
                                    onOpen(row.original)
                                }}
                            >
                                <img src={openRow}/>
                            </IconButton>
                        </div>
                    )}
                    renderTopToolbarCustomActions={({table}) => (
                        <Box
                            sx={{display: 'flex', gap: '1rem', p: '0.2rem', flexWrap: 'wrap'}}
                        >
                            <Button
                                onClick={handleAdd}
                                variant="contained"
                            >
                                Добавить
                            </Button>
                            <Button
                                disabled={
                                    !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                                }
                                onClick={() => handleDeleteRow(table, table.getSelectedRowModel().rows)}
                                variant="contained"
                                color={'error'}
                            >
                                Удалить
                            </Button>
                            {error && (<p>Ошибка при отправке запроса</p>)}
                        </Box>
                    )}
                    localization={MRT_Localization_RU}
                />
            )}
        </main>
    );
}
