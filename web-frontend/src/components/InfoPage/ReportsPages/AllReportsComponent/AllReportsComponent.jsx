import React, {useContext, useMemo, useState} from "react";
import "./AllReportsComponent.css"
import MaterialReactTable from "material-react-table";
import {BreadcrumbContext} from "../../../../contexts/useBreadcrumb.jsx";
import {Box, Button, IconButton} from "@mui/material";
import importIcon from "../../../../assets/partners/pages/importIcon.svg"
import {exportToCSV} from "../../../../utils/fileUtil.jsx";
import {MRT_Localization_RU} from "material-react-table/locales/ru.js";
import {MdOpenInNew} from "react-icons/all.js";
import axiosUtil from "../../../../utils/axiosUtil.jsx";
import SearchReportForm from "../SearchReportForm/SearchReportForm.jsx";
import {ReportContext} from "../../../../contexts/useReport.jsx";
import {lightTheme, Provider} from "@adobe/react-spectrum";
import {ReportInfoSubpageCrumb} from "../../../../constants/BreadcrumbItems.jsx";
import {RouteContext} from "../../../../contexts/useRoute.jsx";

export default function AllReportsComponent() {
    const {goToSubpage} = useContext(BreadcrumbContext);
    const {message, reportItems, isLoading} = useContext(ReportContext);
    const {getRouteStopsById} = useContext(RouteContext);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const api = axiosUtil()

    const handleExportRows = (rows) => {
        const selected = rows.map((row) => row.original)
        exportToCSV(selected, "выгруженные данные.csv")
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'date',
                header: 'Дата',
                size: 80
            },
            {
                accessorKey: 'transport.transport_number',
                header: 'Номер автобуса',
                size: 140
            },
            {
                accessorKey: 'transport.route.route_number',
                header: 'Номер маршрута',
                size: 140,
                Cell: ({cell}) => {
                    return <div style={{textAlign: "center"}}>{cell.getValue()}</div>;
                },
            },
            {
                accessorKey: 'transport.route.route_name',
                header: 'Название маршрута',
                maxSize: 80,
            },
        ],
        [],
    );

    const exportIcon = <img src={importIcon}/>;

    async function onOpen(report) {
        const routeStops = await getRouteStopsById(report.transport.route.id)
        const subpagecrumb = ReportInfoSubpageCrumb(report, routeStops);
        goToSubpage(subpagecrumb);
    }

    return (
        <main>
            <div>
                <Provider theme={lightTheme} colorScheme={"light"}>
                    <SearchReportForm/>
                    <MaterialReactTable
                        data={reportItems}
                        columns={columns}
                        enableHiding={false}
                        enableDensityToggle={false}
                        enableMultiSort={true}
                        initialState={{
                            pagination,
                            density: 'compact',
                            sorting: [
                                {
                                    id: 'date',
                                    desc: true,
                                },
                            ],
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
                        rowCount={reportItems.length}
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
                                    <MdOpenInNew color={"black"}/>
                                </IconButton>
                            </div>
                        )}
                        renderTopToolbarCustomActions={({table}) => (
                            <Box
                                sx={{display: 'flex', gap: '1rem', p: '0.2rem', flexWrap: 'wrap'}}
                            >
                                {/*<Button*/}
                                {/*    size={"small"}*/}
                                {/*    disabled={table.getPrePaginationRowModel().rows.length === 0}*/}
                                {/*    onClick={() =>*/}
                                {/*        handleExportRows(table.getPrePaginationRowModel().rows)*/}
                                {/*    }*/}
                                {/*    startIcon={exportIcon}*/}
                                {/*    variant="contained"*/}
                                {/*>*/}
                                {/*    Экспорт всех данных*/}
                                {/*</Button>*/}
                                {/*<Button*/}
                                {/*    size={"small"}*/}
                                {/*    disabled={*/}
                                {/*        !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()*/}
                                {/*    }*/}
                                {/*    onClick={() => handleExportRows(table.getSelectedRowModel().rows)}*/}
                                {/*    startIcon={exportIcon}*/}
                                {/*    variant="contained"*/}
                                {/*>*/}
                                {/*    Экспорт выбранных строк*/}
                                {/*</Button>*/}
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
                </Provider>
            </div>
        </main>
    );
}
