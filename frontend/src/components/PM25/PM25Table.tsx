import React, {useState, useEffect} from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import {PM25} from "adapters/sensors";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'timestamp', headerName: 'Time', width: 70 },
    { field: 'pm10_standard', headerName: 'PM10 Standard', width: 130 },
    { field: 'pm25_standard', headerName: 'PM25 Standard', width: 130 },
    { field: 'pm100_standard', headerName: 'PM100 Standard', width: 130 },
    { field: 'pm10_env', headerName: 'PM10 Env', width: 130 },
    { field: 'pm25_env', headerName: 'PM25 Env', width: 130 },
    { field: 'pm100_env', headerName: 'PM100 Env', width: 130 },
    { field: 'particles_03um', headerName: 'Particles >3um', width: 130 },
    { field: 'particles_05um', headerName: 'Particles >5um', width: 130 },
    { field: 'particles_10um', headerName: 'Particles >10um', width: 130 },
    { field: 'particles_25um', headerName: 'Particles >25um', width: 130 },
    { field: 'particles_50um', headerName: 'Particles >50um', width: 130 },
    { field: 'particles_100um', headerName: 'Particles >100um', width: 130 },
];


export const PM25Table = () => {
    const [pm25, setPM25] = useState([
        {
            'id': 0,
            'timestamp': 0,
            'pm10_standard': 0,
            'pm25_standard': 0,
            'pm100_standard': 0,
            'pm10_env': 0,
            'pm25_env': 0,
            'pm100_env': 0,
            'particles_03um': 0,
            'particles_05um': 0,
            'particles_10um': 0,
            'particles_25um': 0,
            'particles_50um': 0,
            'particles_100um': 0,
        }
    ]);

    useEffect(() => {
        PM25.getLatestSamples((data: any) => {
            console.log("Fetched data");
            setPM25(data);
        });
    }, []);

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={pm25}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    );
};