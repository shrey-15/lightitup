import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { Typography, Slider, Button } from '@mui/material'
import { list } from './ListOfNodes'
import NodeItem from './NodeItem'
import { Link } from 'react-router-dom'

const Nodes = () => {

    // useEffect(()=> {
    //     fetchItems()
    // },[])

    // const [items, setItems]=useState([])    

    // const fetchItems = async () => {

    //     const result = await axios(`https://www.breakingbadapi.com/api/characters`);

    //     console.log(items.items) 
    //     setItems(result.data)

    // }
    const [flag, setFlag] = useState(true)
    const [value, setValue] = useState(10);
    const handleChange = (event, newValue) => {
        if (newValue !== value) {
            setValue(newValue)
            // console.log(newValue)
        }
    }

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

    const handleClick = () => {
        setFlag(!flag);
    }

    return (
        <div className="lg:container md:mx-auto mt-8">

            <div className="flex grid grid-flow-col grid-cols-3 gap-4 items-center m-8 mx-10 p-6 ">
                <div className="flex grid items-center justify-start text-2xl text-primary font-bold ml-4">Area Name</div>

                <div className="flex items-center justify-center">
                    <span>
                        <Typography className="text-gray-500">Light Intensity &nbsp; &nbsp;</Typography>
                    </span>
                    <Slider
                        step={null}
                        defaultValue={10}
                        marks={marks}
                        min={0}
                        max={100}
                        value={value}
                        onChange={handleChange}>
                    </Slider>

                </div>

                <div className="flex items-center justify-center">
                    <Button variant="contained">Discover</Button>
                </div>
                <div className="flex items-center justify-end mr-4">
                    <Button onClick={handleClick} color={flag ? "primary" : "success"} variant={flag?"outlined":"contained"}>All On/Off</Button>
                </div>

                {/* <div className="flex items-center justify-end">
                    <Typography className="text-lg sm:text-sm text-primary font-bold">All On/Off&nbsp; &nbsp; </Typography>
                    <Switch checked={isToggled}
                        onChange={() =>
                            setIsToggled(!isToggled)
                        }
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </div> */}
            </div>
            <ul className="flex items-center justify-center grid grid-flow-row grid-cols-3 grid-rows-3 gap-4 m-8 p-6 ">
                {list.map(item => (
                    <li key={item.id}><NodeItem item={item} /></li>
                ))}

            </ul>

        </div>
    )
}

export default Nodes
