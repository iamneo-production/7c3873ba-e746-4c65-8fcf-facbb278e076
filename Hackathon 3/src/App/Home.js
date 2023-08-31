import React, { useEffect, useState } from "react";

import { Header } from "./../CommonComponents/Header";
import {
  Box,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Tab,
  Tabs,
} from "@mui/material";
// import { Date } from "./../CommonComponents/Date";
import { getAllDays } from "../Services/http.service";
import { toast } from "react-toastify";
import { Typography } from "@mui/material";
import { PackageCard } from "./../CommonComponents/PackageCard";
import { DataPlans } from "../CommonComponents/DataPlans";
import { CallPlans } from "../CommonComponents/CallPlans";
import PropTypes from "prop-types";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography style={{ margin: 10 }} variant="h6" fontWeight="bold">
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const Home = () => {
  const [Days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = sessionStorage.getItem("email");
  const [dropdown, setDropdown] = React.useState("");

  const handleChangeDropdown = (event) => {
    setDropdown(event.target.value);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const LoadData = () => {
  //   getAllDays(user)
  //     .then((data) => {
  //       setDays(data.data.dates);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       toast.warn(error.message, {
  //         theme: "colored",
  //       });
  //       setLoading(false);
  //     });
  // };
  // useEffect(() => {
  //   LoadData();
  // }, []);
  function valuetext(value) {
    return `${value} GB`;
  }

  return (
    <div>
      <Header />
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              sx={{ textTransform: "none", fontWeight: "bold" }}
              label="Data Plans"
              {...a11yProps(0)}
            />
            <Tab
              sx={{ textTransform: "none", fontWeight: "bold" }}
              label="Call Plans"
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Box sx={{ width: 300 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              GB Range
            </Typography>
            <Slider
              aria-label="Small steps"
              defaultValue={10}
              getAriaValueText={valuetext}
              step={10}
              marks
              min={10}
              max={100}
              valueLabelDisplay="auto"
            />
          </Box>
          <Grid container>
            <DataPlans />
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <FormControl sx={{ m: 1, minWidth: 300 }} size="small">
              <InputLabel id="demo-select-small-label">
                Please filter Call plan here
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={dropdown}
                label="Please select data package"
                onChange={handleChangeDropdown}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Unlimited Call</MenuItem>
                <MenuItem value={20}>30 days</MenuItem>
                <MenuItem value={30}>7 days</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Grid container>
            <CallPlans />
          </Grid>
        </CustomTabPanel>
      </Box>

      {/* <Divider />
      <Grid container> */}
      {/* {!loading ? (
          <>
            {Days.map((data, index) => {
              return (
                <Grid key={index} item xs={4} sm={4} md={2}>
                  <PackageCard day={data} />
                </Grid>
              );
            })}
          </>
        ) : (
          <div>Loading...</div>
        )} */}
      {/* </Grid>
      <Typography style={{ margin: 10 }} variant="h6" fontWeight="bold">
        Call Plans
      </Typography>
      <Divider />
      <Grid container>
        <CallPlans />
      </Grid> */}
    </div>
  );
};
