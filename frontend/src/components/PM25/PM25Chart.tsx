import React, {useState, useEffect} from 'react';
import {EChart, EChartsProps} from "components/Charts";
import {PM25} from "adapters/sensors";

interface PM25Data {
    id: number,
    timestamp: number,
    pm10_standard: number,
    pm25_standard: number,
    pm100_standard: number,
    pm10_env: number,
    pm25_env: number,
    pm100_env: number,
    particles_03um: number,
    particles_05um: number,
    particles_10um: number,
    particles_25um: number,
    particles_50um: number,
    particles_100um: number
}

function legend(dataset: PM25Data[]): string[] {
    return dataset.map((d) => d.timestamp.toString());
}

export const PM25Chart = () => {

    const [option, setOption] = useState({});

    useEffect(() => {
        PM25.getLatestSamples((data: PM25Data[]) => {
            const option: EChartsProps["option"] = {
                animation: true,
                backgroundColor: '#121212',
                title: {
                    text: 'Particles'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['Particles >03um', 'Particles >05um', 'Particles >10um', 'Particles >25um', 'Particles >50um', 'Particles >100um']
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
                        name: 'Particles >03um',
                        type: 'line',
                        stack: 'Total',
                        data: data.map((d: PM25Data) => d.particles_03um)
                    },
                    {
                        name: 'Particles >05um',
                        type: 'line',
                        stack: 'Total',
                        data: data.map((d: PM25Data) => d.particles_05um)
                    },
                    {
                        name: 'Particles >10um',
                        type: 'line',
                        stack: 'Total',
                        data: data.map((d: PM25Data) => d.particles_10um)
                    },
                    {
                        name: 'Particles >25um',
                        type: 'line',
                        stack: 'Total',
                        data: data.map((d: PM25Data) => d.particles_25um)
                    },
                    {
                        name: 'Particles >50um',
                        type: 'line',
                        stack: 'Total',
                        data: data.map((d: PM25Data) => d.particles_50um)
                    },
                    {
                        name: 'Particles >100um',
                        type: 'line',
                        stack: 'Total',
                        data: data.map((d: PM25Data) => d.particles_100um)
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
