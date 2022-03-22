import React, {useState, useEffect} from 'react';
import {EChart, EChartsProps} from "components/Charts";
import {SHT31Data, SHT31Entry} from "adapters/sensors/SHT31";

function legend(data: SHT31Data): string[] {
    if (data.entries !== undefined) {
        return data.entries.map((d) => new Date(d.timestamp * 1000).toISOString());
    }
    return  [];
}

export const SHT31Chart = (data: SHT31Data) => {

    const [option, setOption] = useState({});

    useEffect(() => {
        const option: EChartsProps["option"] = {
            animation: true,
            backgroundColor: '#121212',
            title: [
                {
                    left: 'center',
                    text: 'Temperature'
                },
                {
                    top: '55%',
                    left: 'center',
                    text: 'Relative humidity'
                }
            ],
            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: [
                {
                    data: legend(data)
                },
                {
                    data: legend(data),
                    gridIndex: 1
                }
            ],
            yAxis: [
                {},
                {
                    gridIndex: 1
                }
            ],
            grid: [
                {
                    bottom: '60%'
                },
                {
                    top: '60%'
                }
            ],
            series: [
                {
                    name: 'Temperature',
                    type: 'line',
                    data: data.entries?.map((d: SHT31Entry) => d.temperature)
                },
                {
                    name: 'Relative Humidity',
                    type: 'line',
                    data: data.entries?.map((d: SHT31Entry) => d.relative_humidity),
                    xAxisIndex: 1,
                    yAxisIndex: 1
                },
            ]
        }
        setOption(option);
    }, [data]);

    const divStyle = {
        height: '500px'
    };

    return (<EChart option={option} theme={"dark"} style={divStyle}/>);
}
