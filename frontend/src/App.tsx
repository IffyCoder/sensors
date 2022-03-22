import React, {useState, SyntheticEvent} from 'react';
import 'App.css';
import 'components/Charts'
import {PM25Table} from 'components/PM25/PM25Table';
import {PM25Chart} from "./components/PM25/PM25Chart";

import {SHT31Component} from "./components/SHT31";

import {SGP30Table} from 'components/SGP30/SGP30Table';
import {SGP30Chart} from "./components/SGP30/SGP30Chart";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {createTheme, CssBaseline, PaletteMode, ThemeProvider, useMediaQuery} from "@mui/material";
import {amber, grey, deepOrange} from "@mui/material/colors";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // palette values for light mode
                primary: amber,
                divider: amber[200],
                text: {
                    primary: grey[900],
                    secondary: grey[800],
                },
            }
            : {
                // palette values for dark mode
                primary: deepOrange,
                divider: deepOrange[700],
                background: {
                    default: deepOrange[900],
                    paper: deepOrange[900],
                },
                text: {
                    primary: '#fff',
                    secondary: grey[500],
                },
            }),
    },
});


function App() {

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );

    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="App">
                <Box sx={{width: '100%'}}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Particles" {...a11yProps(0)} />
                            <Tab label="CO2 and Volatile Organic Compounds" {...a11yProps(1)} />
                            <Tab label="Temperature and Humidity" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <PM25Table/>
                        <PM25Chart/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <SGP30Table/>
                        <SGP30Chart/>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <SHT31Component/>
                    </TabPanel>
                </Box>
            </div>
        </ThemeProvider>
    );
}

export default App;
