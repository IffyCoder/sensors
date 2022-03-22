import React, {useState, useEffect} from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {SHT31, SHT31Data} from "adapters/sensors/SHT31";
import {SHT31Table} from "./SHT31Table";
import {SHT31Chart} from "./SHT31Chart";
import {DatePicker} from "@mui/lab";
import {TextField, Button, Stack, Tooltip} from "@mui/material";
import {Refresh, ResetTv} from "@mui/icons-material";

export const SHT31Component = () => {
    const [sht31, setSht31] = useState<SHT31Data>({
        entries: [
            {
                id: 0,
                timestamp: 0,
                temperature: 0,
                relative_humidity: 0
            }
        ]
    });

    useEffect(() => {
        SHT31.getLatestSamples((data: any) => {
            setSht31({entries: data});
        });
    }, []);

    const fetch = () => {
        if (startDate == null || endDate == null) {
            return;
        }

        if (endDate.getTime() < startDate.getTime()) {
            return;
        }

        SHT31.getInterval(startDate, endDate, (data: any) => {
            console.log(data);
            setSht31({entries: data});
        });
    };

    const reset = () => {
        SHT31.getLatestSamples((data: any) => {
            setSht31({entries: data});
        });

        setStartDate(null);
        setEndDate(null);
    };

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    return <div>
        <Stack spacing={1} direction="column">
            <Stack spacing={2} direction="row">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Start date"
                        value={startDate}
                        onChange={(newValue) => {
                            setStartDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <DatePicker
                        label="End date"
                        value={endDate}
                        onChange={(newValue) => {
                            setEndDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <Tooltip title="Update">
                    <Button variant="outlined" onClick={fetch}><Refresh/></Button>
                </Tooltip>
                <Tooltip title="Reset">
                    <Button variant="outlined" onClick={reset}><ResetTv/></Button>
                </Tooltip>
            </Stack>
            <SHT31Table {...sht31}/>
            <SHT31Chart {...sht31}/>
        </Stack>
    </div>;
}