import { React, useState, useEffect, useRef } from "react";
import axios from "axios";
import { Typography, Slider, Button } from "@mui/material";
import NodeItem from "./NodeItem";
import { Link } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import url from "./BaseURL";
import { useNodeContext } from "../NodeContext";

const Nodes = () => {
  const {
    nodes,
    global,
    setNodes,
    setGlobalToggle,
    setGlobalDim,
    setInstValues,
    setGlobalTick,
  } = useNodeContext();
  const [loading, setLoading] = useState(false);

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
    ...(loading && {
      bgcolor: green[700],
      "&:hover": {
        bgcolor: green[900],
      },
    }),
  };

  const handleChange = (event, newValue) => {
    if (newValue !== global.globalValue) {
      axios
        .get(url + "dimming/", {
          params: { isGlobal: true, value: newValue },
        })
        .then((res) => {
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

    // const insterval = setInterval(() => {
    //   axios.get(url + "instValues/").then((res) => {
    //     setInstValues(res.data.values);
    //   });
    // }, 5000);
    // return () => clearInterval(insterval);
  }, []);

  useEffect(() => {
    if (global.isGlobal === true) {
      axios
        .get(url + "toggle/", {
          params: {
            isGlobal: true,
            status: global.globalStatus ? "on" : "off",
          },
        })
        .then((res) => {
          setGlobalToggle(global.globalStatus);
          console.log(nodes);
        });
      axios
        .get(url + "dimming/", {
          params: { isGlobal: true, value: global.globalValue },
        })
        .then((res) => {
          setGlobalDim(global.globalValue);
          console.log(nodes);
        });
    }
  }, [global.isGlobal]);

  const handleButtonClick = () => {
    if (!loading) {
      setLoading(true);
      axios.get(url + "discover/").then((res) => {
        setLoading(false);
        setNodes(res.data.nodes);
      });
    }
  };

  return (
    <div className="lg:container md:mx-auto mt-8 z-0">
      <div className="flex grid grid-flow-col grid-cols-6 gap-4 items-center m-8 mx-10 p-6 bg-gray-200 rounded-md  ">
        <div className="flex col-span-4 items-center justify-start text-2xl text-primary font-bold ">
          Area Name
        </div>
        <div className="flex items-center col-span-1 justify-end">
          <Checkbox
            checked={global.isGlobal}
            onChange={() => {
              setGlobalTick(!global.isGlobal);
            }}
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
      </div>
      <div className="flex grid grid-flow-col grid-cols-2 gap-4 items-center m-8 mx-10 p-4 bg-blue-200 bg-opacity-25 rounded-md">
        <div className="flex items-center">
          <span>
            <Typography className="text-gray-500">
              Light Intensity &nbsp; &nbsp;
            </Typography>
          </span>
          <span>{/* <AddCircle onClick={handleIncr} /> */}</span>
          <Slider
            className="ml-2"
            disabled={!global.isGlobal}
            step={null}
            defaultValue={global.globalValue}
            marks={marks}
            min={25}
            max={100}
            value={global.globalValue}
            onChange={handleChange}
          ></Slider>
        </div>

        <div className="flex items-centers justify-end ">
          <Button
            disabled={!global.isGlobal}
            onClick={() => {
              axios
                .get(url + "toggle/", {
                  params: {
                    isGlobal: true,
                    status: global.globalStatus ? "off" : "on",
                  },
                })
                .then((res) => {
                  setGlobalToggle(!global.globalStatus);
                  console.log(nodes);
                });
            }}
            color={global.globalStatus ? "success" : "error"}
            variant={global.globalStatus ? "contained" : "outlined"}
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
      <ul className="flex items-center justify-center grid grid-flow-row grid-cols-3 grid-rows-3 gap-4 p-6">
        {nodes.map((item) => (
          <li key={item.id}>
            <NodeItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Nodes;
