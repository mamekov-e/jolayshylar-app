import React, {useMemo, useState} from "react";
import transportRecordStop from "../../../staticData/serverData/transportRecordStop.json";
import EditBtn from "../../../components/CustomComponents/Button/Button.jsx";
import MaterialReactTable from "material-react-table";

export default function ReportsPage() {

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
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
    <main>
      <div className="content">Reports page here</div>
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
                sx: {
                    margin: '0',
                },
            }}
            onPaginationChange={setPagination}
            positionPagination={"top"}
            state={{pagination}}
            // renderTopToolbarCustomActions={() => (
            //     <div className="firstInfo">
            //         <div className="routeInfoDetails">
            //             <p>Номер маршрута:</p><h3>{route.routeNumber}</h3>
            //         </div>
            //         <div className="routeInfoDetails">
            //             <p>Номер автобуса:</p><h3>{route.busNumber}</h3>
            //         </div>
            //         <EditBtn name="Редактировать" style={editBtnStyle} onClick={onEdit}/>
            //     </div>
            // )}
        />
    </main>
  );
}
