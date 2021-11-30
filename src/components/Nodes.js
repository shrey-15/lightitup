import { React, useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Typography, Slider, Button } from '@mui/material'
import { list } from './ListOfNodes'
import NodeItem from './NodeItem'
import { Link } from 'react-router-dom'
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import AddCircle from '@mui/icons-material/AddCircle'


const Nodes = () => {

    useEffect(() => {
        fetchItems()
    }, [])

    const [items, setItems] = useState([])

    const fetchItems = async () => {

        const result = await axios(`http://192.168.1.104`);

        console.log(items.items)
        setItems(result.data)

    }
    const [flag, setFlag] = useState(true)
    const [value, setValue] = useState(25);
    const handleChange = (event, newValue) => {
        if (newValue !== value) {
            setValue(newValue)
            // console.log(newValue)
        }
    }

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

    const handleClick = () => {
        setFlag(!flag);
    }

    const [ticked, setTicked] = useState(true);

    const handleTick = (event) => {
        setTicked(!ticked);
    };


    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const timer = useRef();
    useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const handleButtonClick = () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            axios.get('localhost:8000/discover/')
            .then(()=>{
                setSuccess(true);
                setLoading(false);               
            })
        }
    };
    const buttonSx = {
        ...(success && {
            bgcolor: green[700],
            '&:hover': {
                bgcolor: green[900],
            },
        }),
    };


   
    useEffect(() => {
        axios.get('http://192.168.43.62:8000/apis/toggle/', { params: { isGlobal:true, status: (flag ? "on" : "off") } })
    }, [flag])

    useEffect(() => {
        axios.get('http://192.168.43.62:8000/apis/dimming/', { params: { isGlobal:true, value: value } })
    }, [value])


    return (
        <div className="lg:container md:mx-auto mt-8 z-0">

            <div className="flex grid grid-flow-col grid-cols-6 gap-4 items-center m-8 mx-10 p-6 bg-gray-200 rounded-md  ">
                <div className="flex col-span-4 items-center justify-start text-2xl text-primary font-bold ">Area Name</div>
                <div className="flex items-center col-span-1 justify-end">

                    <Checkbox
                        checked={ticked}
                        onChange={handleTick}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    <span>
                        <Typography className="text-gray-500">Global connection &nbsp; &nbsp;</Typography>
                    </span>

                </div>
                <div className="flex col-span-1 items-center justify-end">
                    <Button variant="contained"
                        sx={buttonSx}
                        disabled={loading}
                        onClick={handleButtonClick}
                    >
                        Discover
                        {loading && (
                            <CircularProgress color="success"
                                size={24}
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: '-12px',
                                    marginLeft: '-12px',
                                }}
                            />
                        )}
                    </Button>
                </div>

            </div>
            <div className="flex grid grid-flow-col grid-cols-2 gap-4 items-center m-8 mx-10 p-4 bg-blue-200 bg-opacity-25 rounded-md">

                <div className="flex items-center">
                    <span>
                        <Typography className="text-gray-500">Light Intensity &nbsp; &nbsp;</Typography>
                    </span>
                    <span>
                        {/* <AddCircle onClick={handleIncr} /> */}
                    </span>
                    <Slider className="ml-2" disabled={!ticked}
                        step={null}
                        defaultValue={25}
                        marks={marks}
                        min={25}
                        max={100}
                        value={value}
                        onChange={handleChange}
                        >
                    </Slider>

                </div>


                <div className="flex items-centers justify-end ">
                    <Button disabled={!ticked} onClick={handleClick} color={flag ? "error" : "success"} variant={flag ? "outlined" : "contained"}>All On/Off</Button>
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
            <ul className="flex items-center justify-center grid grid-flow-row grid-cols-3 grid-rows-3 gap-4 p-6">
                {list.map(item => (
                    <li key={item.id}><NodeItem item={item} ticked={ticked} /></li>
                ))}

            </ul>

        </div>
    )
}

export default Nodes
