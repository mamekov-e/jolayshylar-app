import React, {useContext, useEffect, useMemo, useState} from "react";
import "./AllReportsComponent.css"
import MaterialReactTable from "material-react-table";
import reports from "../../../../staticData/serverData/reports.json";
import {BreadcrumbContext} from "../../../../contexts/useBreadcrumb.jsx";
import {Box, Button, IconButton} from "@mui/material";
import openRow from "../../../../assets/partners/pages/openRow.svg"
import importIcon from "../../../../assets/partners/pages/importIcon.svg"
import {exportToCSV} from "../../../../utils/fileUtil.jsx";
import {MRT_Localization_RU} from "material-react-table/locales/ru.js";

export default function AllReportsComponent({InfoSubpage}) {
    const {goToSubpage} = useContext(BreadcrumbContext);

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    useEffect(() => {
        const fetchData = async () => {
            if (!data.length) {
                setIsLoading(true);
            }

            if (typeof window !== 'undefined') {
                setData(reports);
                setIsLoading(false);
            }
            // const url = new URL(
            //     '/api/data',
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
            //     setData(json.data);
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

    const handleExportRows = (rows) => {
        const selected = rows.map((row) => row.original)
        exportToCSV(selected, "выгруженные данные.csv")
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'routeNumber',
                header: 'Номер маршрута',
            },
            {
                accessorKey: 'routeName',
                header: 'Название маршрута',
            },
            {
                accessorKey: 'busNumber',
                header: 'Номер автобуса',
            },
            {
                accessorKey: 'date',
                header: 'Дата',
            }
        ],
        [],
    );

    const exportIcon = <img src={importIcon}/>;

    function onOpen(item) {
        const subpagecrumb = InfoSubpage(item);
        goToSubpage(subpagecrumb);
    }

    return (
        <main>
            {data && (
                <MaterialReactTable
                    data={data}
                    columns={columns}
                    enableHiding={false}
                    enableDensityToggle={false}
                    initialState={{
                        pagination,
                        sorting: [
                            {
                                id: 'date',
                                desc: true,
                            },
                        ],
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
                    rowCount={data.length}
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
                                disabled={table.getPrePaginationRowModel().rows.length === 0}
                                //export all rows, including from the next page, (still respects filtering and sorting)
                                onClick={() =>
                                    handleExportRows(table.getPrePaginationRowModel().rows)
                                }
                                startIcon={exportIcon}
                                variant="contained"
                            >
                                Экспорт всех данных
                            </Button>
                            <Button
                                disabled={
                                    !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                                }
                                onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
                                startIcon={exportIcon}
                                variant="contained"
                            >
                                Экспорт выбранных строк
                            </Button>
                        </Box>
                    )}
                    localization={MRT_Localization_RU}
                />
            )}
        </main>
    );
}
