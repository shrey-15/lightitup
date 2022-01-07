import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import { IntensitySelecter } from "./IntensitySelecter";


export const TimeSelecter = () => {
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    // console.log("jghhtrg "+ startTime+ " jhfueru")
    return (
        <div className="flex grid grid-flow-col gap-1">
            <div className="flex items-center justify-start p-4 rounded-md ">
                <LocalizationProvider className=""
                    dateAdapter={AdapterDateFns}>
                    <TimePicker
                        disableMaskedInput="true"
                        readOnly="true"
                        label="Start Time"
                        value={startTime}
                        onChange={(newValue) => {
                            setStartTime(newValue);
                            // console.log("timepeacker "+ startTime+ " same are")
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
                        disableMaskedInput="true"
                        value={endTime}
                        onChange={(newValue) => {
                            setEndTime(newValue);
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

