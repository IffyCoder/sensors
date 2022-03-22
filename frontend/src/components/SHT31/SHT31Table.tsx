import React from 'react';
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';

import {SHT31Data} from "adapters/sensors/SHT31";

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 70},
    {
        field: 'timestamp', headerName: 'Time', width: 180, valueGetter: (params: GridValueGetterParams) => {
            const d = new Date(params.row.timestamp * 1000);
            return `${d.toLocaleDateString('no')} ${d.toLocaleTimeString('no')}`;
        }
    },
    {
        field: 'temperature', headerName: 'Temperature', width: 130, valueGetter: (params: GridValueGetterParams) => {
            return params.row.temperature.toFixed(3) + " \u00b0C";
        }
    },
    {
        field: 'relative_humidity',
        headerName: 'Relative Humidity',
        width: 130,
        valueGetter: (params: GridValueGetterParams) => {
            return params.row.relative_humidity.toFixed(3) + "%";
        }
    },
];


export const SHT31Table = (data: SHT31Data) => {
    if (data.entries !== undefined) {
        return (
            <div style={{height: 400, width: '100%'}}>
                <DataGrid
                    rows={data.entries}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
        );
    } else {
        return <></>;
    }
};