import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import MobileTimePicker from '@mui/lab/MobileTimePicker';
import DesktopTimePicker from '@mui/lab/DesktopTimePicker';


export const TimeSelecter = () => {
    const [value, setValue] = useState(null);
    return (
        <LocalizationProvider className=""
            dateAdapter={AdapterDateFns}>
            <TimePicker
                label="Select Time"
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    )
}

