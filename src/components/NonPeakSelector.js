import React from 'react'
import { TimeSelecter } from "./TimeSelecter";
import { IntensitySelecter } from "./IntensitySelecter";

export const NonPeakSelector = () => {
    return (
        <div className="flex grid grid-flow-col grid-cols-12 gap-4 items-center m-8 mx-10 rounded-md">
            <div className="flex col-start-4 col-span-2 items-center justify-center rounded-md">
                <TimeSelecter />
            </div>
            <div className="flex col-start-6 col-span-2 items-center justify-center rounded-md">
                <IntensitySelecter ></IntensitySelecter>
            </div>
        </div>
    )
}
