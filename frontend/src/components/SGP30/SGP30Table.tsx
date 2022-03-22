import React, {useState, useEffect} from 'react';
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';

import {SGP30} from "adapters/sensors";

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 70},
    {
        field: 'timestamp', headerName: 'Time', width: 180, valueGetter: (params: GridValueGetterParams) => {
            const d = new Date(params.row.timestamp * 1000);
            return `${d.toLocaleDateString('no')} ${d.toLocaleTimeString('no')}`;
        }
    },
    {
        field: 'co2_mean', headerName: 'CO2e Mean', width: 115, valueGetter: (params: GridValueGetterParams) => {
            return params.row.co2_mean.toFixed(3);
        }
    },
    {
        field: 'co2_std', headerName: 'CO2e Std', width: 115, valueGetter: (params: GridValueGetterParams) => {
            return params.row.co2_std.toFixed(3);
        }
    },
    {
        field: 'co2_min', headerName: 'CO2e Min', width: 115, valueGetter: (params: GridValueGetterParams) => {
            return params.row.co2_min.toFixed(3);
        }
    },
    {
        field: 'co2_max', headerName: 'CO2e Max', width: 115, valueGetter: (params: GridValueGetterParams) => {
            return params.row.co2_max.toFixed(3);
        }
    },
    {
        field: 'co2_25p', headerName: 'CO2e 25p', width: 115, valueGetter: (params: GridValueGetterParams) => {
            return params.row.co2_25p.toFixed(3);
        }
    },
    {
        field: 'co2_50p', headerName: 'CO2e 50p', width: 115, valueGetter: (params: GridValueGetterParams) => {
            return params.row.co2_50p.toFixed(3);
        }
    },
    {
        field: 'co2_75p', headerName: 'CO2e 75p', width: 115, valueGetter: (params: GridValueGetterParams) => {
            return params.row.co2_75p.toFixed(3);
        }
    },
    {
        field: 'tvoc_mean', headerName: 'TVOC Mean', width: 115, valueGetter: (params: GridValueGetterParams) => {
            return params.row.tvoc_mean.toFixed(3);
        }
    },
    {
        field: 'tvoc_min', headerName: 'TVOC Min', width: 115, valueGetter: (params: GridValueGetterParams) => {
            return params.row.tvoc_min.toFixed(3);
        }
    },
    {
        field: 'tvoc_max', headerName: 'TVOC Max', width: 115, valueGetter: (params: GridValueGetterParams) => {
            return params.row.tvoc_max.toFixed(3);
        }
    },
    {
        field: 'tvoc_25p', headerName: 'TVOC 25p', width: 115, valueGetter: (params: GridValueGetterParams) => {
            return params.row.tvoc_25p.toFixed(3);
        }
    },
    {
        field: 'tvoc_50p', headerName: 'TVOC 50p', width: 115, valueGetter: (params: GridValueGetterParams) => {
            return params.row.tvoc_50p.toFixed(3);
        }
    },
    {
        field: 'tvoc_75p', headerName: 'TVOC 75p', width: 115, valueGetter: (params: GridValueGetterParams) => {
            return params.row.tvoc_75p.toFixed(3);
        }
    },
];

export const SGP30Table = () => {
    const [sgp30, setSGP30] = useState([
        {
            'id': 0,
            'timestamp': 0,
            'co2_mean': 0,
            'co2_std': 0,
            'co2_min': 0,
            'co2_max': 0,
            'co2_25p': 0,
            'co2_50p': 0,
            'co2_75p': 0,
            'tvoc_mean': 0,
            'tvoc_min': 0,
            'tvoc_max': 0,
            'tvoc_25p': 0,
            'tvoc_50p': 0,
            'tvoc_75p': 0,
        }
    ]);

    useEffect(() => {
        SGP30.getLatestSamples((data: any) => {
            console.log("Fetched data");
            setSGP30(data.reverse());
        });
    }, []);

    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid
                rows={sgp30}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    );
};