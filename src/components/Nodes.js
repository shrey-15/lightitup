import { React, useState, useEffect, useRef } from "react";
import axios from "axios";
import { Typography, Slider, Button, Tabs, Tab, Box } from "@mui/material";
import NodeItem from "./NodeItem";
import { Link } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import url from "./BaseURL";
import { useNodeContext } from "../NodeContext";
import PropTypes from 'prop-types';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { TimeSelecter } from "./TimeSelecter";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';


const Nodes = () => {
  const { nodes, setNodes, setGlobalToggle, setGlobalDim } = useNodeContext();
  const [flag, setFlag] = useState(false);
  const [value, setValue] = useState(25);
  const [ticked, setTicked] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [tab, setTab] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  const marks = [
    {
      value: 25,
      label: "25%",
    },
    {
      value: 50,
      label: "50%",
    },
    {
      value: 75,
      label: "75%",
    },
    {
      value: 100,
      label: "100%",
    },
  ];

  const buttonSx = {
    ...(success && {
      bgcolor: green[700],
      "&:hover": {
        bgcolor: green[900],
      },
    }),
  };

  const handleChange = (event, newValue) => {
    if (newValue !== value) {
      axios
        .get(url + "dimming/", {
          params: { isGlobal: true, value: newValue },
        })
        .then((res) => {
          setValue(newValue);
          setGlobalDim(newValue);
          console.log(nodes);
        });
    }
  };
  useEffect(() => {
    axios.get(url + "getNodes/").then((res) => {
      setNodes(res.data.nodes);
      console.log(res.data.nodes);
      console.log(nodes);
    });
  }, []);

  const handleClick = () => {
    setFlag(!flag);
  };

  const handleTick = (event) => {
    setTicked(!ticked);
  };

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      axios.get(url + "discover/").then((res) => {
        setSuccess(true);
        setLoading(false);
        setNodes(res.data.nodes);
      });
    }
  };

  useEffect(() => {
    axios
      .get(url + "toggle/", {
        params: { isGlobal: true, status: flag ? "on" : "off" },
      })
      .then((res) => {
        setGlobalToggle(flag);
        console.log(nodes);
      });
  }, [flag]);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

  return (
    <div className="lg:container md:mx-auto mt-8 z-0">
      <div className="flex grid grid-flow-col grid-cols-6 gap-4 items-center m-8 mx-10 p-6 bg-gray-200 rounded-md  ">
        <div className="flex col-span-4 items-center justify-start text-2xl text-primary font-bold ">
          Area Name
        </div>
      </div>
      <Box className="m-2 mx-2 p-6"
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
      >
        <Tabs
          orientation="vertical"
          value={tab}
          onChange={handleChangeTab}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab className="font-bold" label="AUTO" {...a11yProps(0)} />
          <Tab label="MANUAL" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={tab} index={0}>
          <div className="flex grid grid-flow-row-dense grid-cols-9 grid-rows-2 gap-4 items-center p-4 bg-blue-200 bg-opacity-25 rounded-md">
            <div className="flex col-span-3 items-center justify-center p-4 rounded-md ">
              <LightModeIcon className="text-yellow-500" /> <span className="font-bold text-gray-700"> &nbsp; Sunrise Time: &nbsp; </span>
              <span className="p-4 bg-gray-50 rounded-md shadow-md text-white bg-blue-500 font-bold"> 06:00 AM </span>
            </div>
            <div className="flex col-span-3 items-center justify-center p-4 rounded-md ">
              <div className="flex col-span-3 items-center justify-start p-4 bg-blue-100 rounded-md">
                <HourglassBottomIcon className="text-gray-700" /><span className="font-bold text-gray-700"> &nbsp; For Non-Peak Hours: &nbsp; </span>
              </div>
            </div>
            <div className="flex col-span-3 items-center justify-center rounded-md ">
              <DarkModeIcon className="text-blue-500" /><span className="font-bold text-gray-700"> &nbsp; Sunset Time: &nbsp; </span>
              <span className="p-4 bg-gray-50 rounded-md shadow-md text-white bg-blue-500 font-bold"> 06:00 PM </span>
            </div>
            <div className="flex col-start-2 col-span-1 items-center justify-center rounded-md">
              <div className="flex items-center justify-center rounded-md mr-16">
                <AddCircleIcon className="text-green-500" />
              </div>
            </div>
            <div className="flex col-start-3 col-span-5 items-center justify-center rounded-md">
              <div className="flex items-center justify-center rounded-md mr-16">
                <TimeSelecter />
              </div>
            </div>
            <div className="flex col-start-8 col-span-1 items-center justify-center p-4 rounded-md">
              <div className="flex items-center justify-center rounded-md mr-16">
                <RemoveCircleIcon className="text-red-500" />
              </div>
            </div>
            <div className="flex col-start-2 col-span-1 items-center justify-center rounded-md">
              <div className="flex items-center justify-center rounded-md mr-16">
                <AddCircleIcon className="text-green-500" />
              </div>
            </div>
            <div className="flex col-start-3 col-span-5 items-center justify-center rounded-md">
              <div className="flex items-center justify-center rounded-md mr-16">
                <TimeSelecter />
              </div>
            </div>
            <div className="flex col-start-8 col-span-1 items-center justify-center p-4 rounded-md">
              <div className="flex items-center justify-center rounded-md mr-16">
                <RemoveCircleIcon className="text-red-500" />
              </div>
            </div>
            <div className="flex col-start-2 col-span-1 items-center justify-center rounded-md">
              <div className="flex items-center justify-center rounded-md mr-16">
                <AddCircleIcon className="text-green-500" />
              </div>
            </div>
            <div className="flex col-start-3 col-span-5 items-center justify-center rounded-md">
              <div className="flex items-center justify-center rounded-md mr-16">
                <TimeSelecter />
              </div>
            </div>
            <div className="flex col-start-8 col-span-1 items-center justify-center p-4 rounded-md">
              <div className="flex items-center justify-center rounded-md mr-16">
                <RemoveCircleIcon className="text-red-500" />
              </div>
            </div>
            <div className="flex col-start-2 col-span-1 items-center justify-center rounded-md">
              <div className="flex items-center justify-center rounded-md mr-16">
                <AddCircleIcon className="text-green-500" />
              </div>
            </div>
            <div className="flex col-start-3 col-span-5 items-center justify-center rounded-md">
              <div className="flex items-center justify-center rounded-md mr-16">
                <TimeSelecter />
              </div>
            </div>
            <div className="flex col-start-8 col-span-1 items-center justify-center p-4 rounded-md">
              <div className="flex items-center justify-center rounded-md mr-16">
                <RemoveCircleIcon className="text-red-500" />
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <div className="flex grid grid-flow-col grid-cols-12 gap-4 items-center mx-10 p-4 bg-blue-200 bg-opacity-25 rounded-md">
            <div className="flex items-center col-span-2 justify-start">
              <Checkbox
                checked={ticked}
                onChange={handleTick}
                inputProps={{ "aria-label": "controlled" }}
              />
              <span>
                <Typography className="text-gray-500">
                  Global connection &nbsp; &nbsp;
                </Typography>
              </span>
            </div>

            <div className="flex col-span-1 items-center justify-end">
              <Button
                variant="contained"
                sx={buttonSx}
                disabled={loading}
                onClick={handleButtonClick}
              >
                Discover
                {loading && (
                  <CircularProgress
                    color="success"
                    size={24}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: "-12px",
                      marginLeft: "-12px",
                    }}
                  />
                )}
              </Button>
            </div>
            <div className="flex col-start-6 col-span-4 items-center">
              <span>
                <Typography className="text-gray-500">
                  Light Intensity &nbsp; &nbsp;
                </Typography>
              </span>
              <span>{/* <AddCircle onClick={handleIncr} /> */}</span>
              <Slider
                className="ml-2"
                disabled={!ticked}
                step={null}
                defaultValue={25}
                marks={marks}
                min={25}
                max={100}
                value={value}
                onChange={handleChange}
                sx={{
                  '& .MuiSlider-mark': {
                    height: '8px',
                  },
                }}
              ></Slider>
            </div>

            <div className="flex col-start-10 col-span-2 items-centers justify-end ">
              <Button
                disabled={!ticked}
                onClick={handleClick}
                color={flag ? "success" : "error"}
                variant={flag ? "contained" : "outlined"}
              >
                All On/Off
              </Button>
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
        </TabPanel>
      </Box>


    </div >
  );
};

export default Nodes;
