import React, { useState, useEffect } from 'react'
import { Grid, Typography, Slider, Switch } from '@mui/material'
import { makeStyles } from '@mui/styles'
import CircularBar from './CircularBar'
import Brightness6Icon from '@mui/icons-material/Brightness6'
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
    const [value, setValue] = useState(10);
    const handleChange = (event, newValue) => {
        if (newValue !== value) {
            setValue(newValue)
            // console.log(newValue)
        }
    }
    const classes = useStyles();

    const marks = [
        {
            value: 0,
            label: '0%',
        },
        {
            value: 10,
        },
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
    useEffect(()=> {
        axios.get('toggle/',{id:"streetlight1",status:(!isToggled)})
    },[isToggled])

    useEffect(()=> {
        axios.get('dimming/',{id:"streetlight1",value:value})
    },[value])

    return (
        <div className="md:container md:mx-auto mt-8">
            <Grid item container xs={12} direction="row" justifyContent="center" alignItems="center">

                <Grid item lg={6} xs={12} spacing={3} container direction="column" justifyContent="center" alignItems="center">

                    <Grid item xs={12} spacing={3} container direction="row" justifyContent="center" alignItems="center">

                        <Grid item xs className="node-name flex items-center justify-start text-2xl text-primary font-bold">
                            Street Light 1
                        </Grid>

                        <Grid item xs className="on-off-btn flex items-center justify-end pr-8">
                            <Typography className="text-lg sm:text-sm text-primary font-bold">On/Off&nbsp; &nbsp; </Typography>
                            <Switch checked={isToggled}
                                onChange={() => 
                                    setIsToggled(!isToggled)
                                }
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </Grid>

                    </Grid>

                    <Grid item xs={12} className="flex items-center justify-center p-4">
                        <div className={classes.root}>
                            <Grid container spacing={3} direction="row" justifyContent="center">

                                <Grid item xs={12} className="p-8" >

                                    <Grid item xs={12} className="flex items-center justify-center">
                                        <CircularBar className="stroke transition duration-300 ease-in"
                                            value={value}
                                            stroke={'#3B82F6'}
                                            max={100}
                                            text="Light Intensity"
                                        />
                                    </Grid>
                                    <Grid item xs={12} className="flex items-center justify-center pt-4">
                                        <Slider
                                            step={null}
                                            defaultValue={10}
                                            marks={marks}
                                            min={0}
                                            max={100}
                                            value={value}
                                            onChange={handleChange}>
                                        </Slider>
                                    </Grid>

                                </Grid>

                            </Grid>

                        </div>
                    </Grid>
                    <Grid container xs={12} spacing={3} className="flex items-center justify-center">
                        <Grid item xs={4} className="flex items-center justify-center">
                            <Brightness6Icon className="text-blue-500" /><Typography className="text-gray-600">{value} %</Typography>
                        </Grid>
                        <Grid item xs={4} className="flex items-center justify-center">
                            <FlashOnIcon className="text-yellow-500" /><Typography className="text-gray-600">150 mA</Typography>
                        </Grid>
                        <Grid item xs={4} className="flex items-center justify-center">
                            <DeviceThermostatIcon className="text-red-500" /><Typography className="text-gray-600">55 &deg; C</Typography>
                        </Grid>
                    </Grid>

                </Grid>
                <Grid className="flex items-center justify-start ml-4 p-4" item lg={6} xs={12} spacing={3} container direction="column" justifyContent="center" alignItems="center">

                    <Grid item xs={12} className="flex items-center justify-start">
                        <Chart width={'600px'} height={'400px'} chartType="Line" loader={<div>Loading Chart</div>}
                            data={[
                                [
                                    'Value',
                                    'Light Intensity',
                                    'Temperature',
                                    'Current Drawn',
                                ],
                                [1, 37.8, 80.8, 41.8],
                                [2, 30.9, 69.5, 32.4],
                                [3, 25.4, 57, 25.7],
                                [4, 11.7, 18.8, 10.5],
                                [5, 11.9, 17.6, 10.4],
                                [6, 8.8, 13.6, 7.7],
                                [7, 7.6, 12.3, 9.6],
                                [8, 12.3, 29.2, 10.6],
                                [9, 16.9, 42.9, 14.8],
                                [10, 12.8, 30.9, 11.6],
                                [11, 5.3, 7.9, 4.7],
                                [12, 6.6, 8.4, 5.2],
                                [13, 4.8, 6.3, 3.6],
                                [14, 4.2, 6.2, 3.4],
                            ]}
                            options={{
                                chart: {
                                    title: 'Linear Graph',
                                    subtitle: 'Street light intensity, temperature & current drawn VS time',
                                },
                            }}
                            rootProps={{ 'data-testid': '3' }}
                        />

                    </Grid>

                </Grid>

            </Grid>



        </div>
    )
}

export default StreetNode
