import React, { useState, useEffect } from 'react'
import { Typography, Slider, Switch } from '@mui/material'
import { makeStyles } from '@mui/styles'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat'
import Chart from 'react-google-charts'
import axios from 'axios'


const useStyles = makeStyles({
    root: {
        width: 600
    }
})

const StreetNode = () => {
    const [isToggled, setIsToggled] = useState(false);
    const [value, setValue] = useState(25);
    const handleChange = (event, newValue) => {
        if (newValue !== value) {
            setValue(newValue)
            // console.log(newValue)
        }
    }
    const classes = useStyles();

    const marks = [
        {
            value: 25,
            label: '25%',
        },
        {
            value: 50,
            label: '50%',
        },
        {
            value: 75,
            label: '75%',
        },
        {
            value: 100,
            label: '100%',
        },
    ];
    useEffect(() => {
        axios.get('http://192.168.43.62:8000/apis/toggle/', { params: { id: " Street_Light-05", status: (isToggled ? "on" : "off") } })
    }, [isToggled])

    useEffect(() => {
        axios.get('http://192.168.43.62:8000/apis/dimming/', { params: { id: " Street_Light-05", value: value } })
    }, [value])

    return (

        <div className="lg:container md:mx-auto mt-8 z-0">

            <div className="flex grid grid-flow-col grid-cols-6 gap-4 items-center m-8 mx-10 p-4 bg-gray-200 rounded-md  ">
                <div className="flex col-span-5 items-center justify-start text-2xl text-primary font-bold ">Street light 1</div>
                <div className="flex col-span-1 items-center justify-end">
                    <Typography className="text-lg sm:text-sm text-primary font-bold">On/Off&nbsp; &nbsp; </Typography>
                    <Switch checked={isToggled} color="success"
                        onChange={() =>

                            setIsToggled(!isToggled)
                        }
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </div>
            </div>
            <div className="flex z-99 grid grid-flow-col grid-cols-12 gap-4 items-center m-8 mx-10 ">
                <div className="flex col-span-6 items-center bg-blue-200 bg-opacity-25 rounded-md p-6">
                    <span>
                        <div className="text-gray-500 font-bold">Light Intensity &nbsp; &nbsp;</div>
                    </span>
                    <Slider size="large" className="mx-16"
                        step={null}
                        defaultValue={25}
                        aria-label="Default"
                        valueLabelDisplay="auto"
                        marks={marks}
                        min={25}
                        max={100}
                        value={value}
                        onChange={handleChange}>
                    </Slider>

                </div>

                <div className="flex items-center justify-center col-span-3 bg-blue-200 bg-opacity-25 rounded-md py-9 ">
                    <span>
                        <div className="text-gray-500 font-bold">Current flowing &nbsp;</div>
                    </span>
                    <FlashOnIcon className="text-yellow-500" /><Typography className="text-gray-600"> &nbsp;150 mA</Typography>
                </div>
                <div className="flex items-center justify-center col-span-3 bg-blue-200 bg-opacity-25 rounded-md py-9">
                    <span>
                        <div className="text-gray-500 font-bold">Temperature &nbsp;</div>
                    </span>
                    <DeviceThermostatIcon className="text-red-500" /><Typography className="text-gray-600"> &nbsp;55 &deg; C</Typography>
                </div>

            </div>

            <div className="flex grid grid-flow-col grid-cols-6 gap-4 items-center justify-center mx-20 ">
                <div className="flex grid items-center justify-center col-span-2 mx-20 ">
                    
                    <Chart
                        width={'550px'}
                        height={'300px'}
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['x', 'light intensity'],
                            [0, 0],
                            [1, 10],
                            [2, 23],
                            [3, 17],
                            [4, 18],
                            [5, 9],
                            [6, 11],
                            [7, 27],
                            [8, 33],
                            [9, 40],
                            [10, 32],
                            [11, 35],
                        ]}
                        options={{
                            hAxis: {
                                title: 'Time',
                            },
                            vAxis: {
                                title: 'Light Intensity',
                            },
                            legend: {position: 'none'}
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />
                    <div className="flex text-gray-500 font-bold items-center justify-center">Light Intensity</div>

                </div>
                <div className="flex grid items-center justify-center col-span-2 mx-20 ">
                    
                    <Chart 
                        width={'550px'}
                        height={'300px'}
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['x', 'current'],
                            [0, 0],
                            [1, 10],
                            [2, 23],
                            [3, 17],
                            [4, 18],
                            [5, 9],
                            [6, 11],
                            [7, 27],
                            [8, 33],
                            [9, 40],
                            [10, 32],
                            [11, 35],
                        ]}
                        options={{
                            hAxis: {
                                title: 'Time',
                            },
                            vAxis: {
                                title: 'Current',
                            },
                            colors: ['#F59E0B'],
                            legend: {position: 'none'}
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />
                    <div className="flex text-gray-500 font-bold items-center justify-center ">Current Flowing</div>
                </div>
                <div className="flex grid items-center justify-center col-span-2 mx-20 ">
                   
                    <Chart
                        width={'550px'}
                        height={'300px'}
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['x', 'temperature'],
                            [0, 0],
                            [1, 10],
                            [2, 23],
                            [3, 17],
                            [4, 18],
                            [5, 9],
                            [6, 11],
                            [7, 27],
                            [8, 33],
                            [9, 40],
                            [10, 32],
                            [11, 35],
                        ]}
                        options={{
                            hAxis: {
                                title: 'Time',
                            },
                            vAxis: {
                                title: 'Temperature',
                            },
                            colors: ['#EF4444'],

                            legend: {position: 'none'}
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />
                     <div className="flex text-gray-500 font-bold items-center justify-center ">Temperature</div>

                </div>

            </div>


        </div>


    )
}

export default StreetNode
