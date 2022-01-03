import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import { IntensitySelecter } from "./IntensitySelecter";


export const TimeSelecter = () => {
    const [startValue, setStartValue] = useState(null);
    const [endValue, setEndValue] = useState(null);

    return (
        <div className="flex grid grid-flow-col gap-1">
            <div className="flex items-center justify-start p-4 rounded-md ">
                <LocalizationProvider className=""
                    dateAdapter={AdapterDateFns}>
                    <TimePicker
                        label="Start Time"
                        value={startValue}
                        onChange={(newValue) => {
                            setStartValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>
            <div className="flex items-center justify-start p-4 rounded-md ">
                <LocalizationProvider className=""
                    dateAdapter={AdapterDateFns}>
                    <TimePicker
                        label="End Time"
                        value={endValue}
                        onChange={(newValue) => {
                            setEndValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>
            <div className="flex items-center justify-start p-4 rounded-md ">
                <IntensitySelecter />
            </div>
        </div>
    )
}

