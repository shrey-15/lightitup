import { Line, Chart } from "react-chartjs-2";
import React, {useState, useEffect} from "react";
import zoomPlugin from "chartjs-plugin-zoom";
import Hammer from "react-hammerjs"

Chart.register(zoomPlugin); // REGISTER PLUGIN

const LiveChart = () => {
    const [chartData, setChartData] = useState({});
    const chart = () => {

        setChartData({
            labels: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
            datasets: [
                {
                    label: "Light Intensity",
                    data: [12, 34, 45, 10, 20, 24, 56, 30, 19, 45, 32, 23, 45, 12],
                    backgroundColor: 'blue',
                    borderColor: 'blue'
                },
            ],
        });
    };
    useEffect(() => {
        chart();
    }, []);

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        elements: {
            point: {
                radius: 0
            },
            line: {
                borderWidth: 1.5
            }
        },
        scales: {
            x: {
                min: 0,
                max: 60,
                type: "logarithmic",
                ticks: {
                    color: "rgba(0, 0, 0, 1)"
                },
                
                ticks: {
                    color: "rgba( 0, 0, 1)"
                },
               
            },
            y: {
                
                ticks: {
                    color: "rgba( 0, 0, 1)"
                },
            }
        },
        plugins: {
            zoom: {
                zoom:{
                    enabled: false
                },
                pan: {
                    enabled: true,
                    mode:'x',
                    threshold: 10,
                    overScaleMode: 'x',
                },
            },
            limits: {
                x: {min: 0, max: 100},
                x2: {min: -5, max: 5}
            },
        }
    };

    return (
        <div>
            <Line
                type="line"
                data={chartData}
                options={options}
                width={900}
                height={450}
            />
        </div>
    );
};

export default LiveChart;