import { React, useState, useEffect } from "react";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import { Link } from "react-router-dom";
import axios from "axios";
import url from "./BaseURL";

const NodeItem = ({ item, ticked }) => {
  const [isToggled, setIsToggled] = useState(false);
  const [isTicked, setIsTicked] = useState(true);

  useEffect(() => {
    axios
      .get(url + "toggle/", {
        params: { id: item.id, status: isToggled ? "on" : "off" },
      })
      .then((res) => {
        console.log("toggled", item.id);
      });
  }, [isToggled]);

  return (
    <div className="flex flex-wrap items-center justify-center shadow-inner hover:shadow-md hover:scale-100 rounded-md bg-blue-100 m-4 p-4 py-8">
      <Link to={`/node/${item.id}`}>
        <div className="flex font-bold text-gray-500 text-lg justify-start mr-12 mb-8">
          {item.id}
        </div>
      </Link>
      <div className="flex justify-end mb-8">
        <Switch
          checked={isToggled}
          disabled={ticked}
          onChange={() => setIsToggled(!isToggled)}
          inputProps={{ "aria-label": "controlled" }}
        />
      </div>
      <Grid
        container
        xs={12}
        spacing={3}
        className="flex items-center justify-center"
      >
        <Grid item xs={4} className="flex items-center justify-center">
          <Brightness6Icon className="text-blue-500" />
          <Typography className="text-gray-600">
            &nbsp; {item.lint} %
          </Typography>
        </Grid>
        <Grid item xs={4} className="flex items-center justify-center">
          <FlashOnIcon className="text-yellow-500" />
          <Typography className="text-gray-600">
            &nbsp; {item.current} mA
          </Typography>
        </Grid>
        <Grid item xs={4} className="flex items-center justify-center">
          <DeviceThermostatIcon className="text-red-500" />
          <Typography className="text-gray-600">
            &nbsp; {item.temp} &deg; C
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default NodeItem;
