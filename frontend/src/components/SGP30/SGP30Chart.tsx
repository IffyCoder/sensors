import React, {useState, useEffect} from 'react';
import {EChart, EChartsProps} from "components/Charts";
import {SGP30} from "adapters/sensors";

interface SGP30Data {
    id: number,
    timestamp: number,
    co2_mean: number
    co2_std: number
    co2_min: number
    co2_max: number
    co2_25p: number
    co2_50p: number
    co2_75p: number
    tvoc_mean: number
    tvoc_min: number
    tvoc_max: number
    tvoc_25p: number
    tvoc_50p: number
    tvoc_75p: number
}

function legend(dataset: SGP30Data[]): string[] {
    return dataset.map((d) => new Date(d.timestamp * 1000).toISOString());
}

export const SGP30Chart = () => {

    const [option, setOption] = useState({});

    useEffect(() => {
        SGP30.getLatestSamples((data: SGP30Data[]) => {
            const option: EChartsProps["option"] = {
                animation: true,
                backgroundColor: '#121212',
                title: {
                    text: 'CO2/TVOC'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['CO2 Mean', 'TVOC Mean']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: legend(data)
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: 'CO2 Mean',
                        type: 'line',
                        stack: 'Total',
                        data: data.map((d: SGP30Data) => d.co2_mean)
                    },
                    {
                        name: 'TVOC Mean',
                        type: 'line',
                        stack: 'Total',
                        data: data.map((d: SGP30Data) => d.tvoc_mean)
                    },
                ]
            }
            setOption(option);
        });
    }, []);

    const divStyle = {
        height: '500px'
    };

    return (<EChart option={option} theme={"dark"} style={divStyle}/>);
}
