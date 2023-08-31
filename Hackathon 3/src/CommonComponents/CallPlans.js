import { Box, Grid, Slider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { PackageCard } from "./PackageCard";
import { getAllCallPlans } from "../Services/http.service";
import { toast } from "react-toastify";

export const CallPlans = () => {
  const [allDatapacks, setDataPacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const LoadData = () => {
    getAllCallPlans()
      .then((data) => {
        setDataPacks(data.data);
        setLoading(false);
      })
      .catch((error) => {
        toast.warn(error.message, {
          theme: "colored",
        });
        setLoading(false);
      });
  };
  useEffect(() => {
    LoadData();
  }, []);
  function valuetext(value) {
    return `${value} GB`;
  }
  const [filter, setFilter] = useState("");

  const filterdData = allDatapacks.filter((item) => {
    return item.days == filter ? item.days : filter == 0 && allDatapacks;
  });

  return (
    <>
      <Box sx={{ width: 300 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          Date Range
        </Typography>
        <Slider
          onChange={(value) => setFilter(value.target.value)}
          aria-label="Small steps"
          defaultValue={0}
          getAriaValueText={valuetext}
          step={10}
          marks
          min={0}
          max={60}
          valueLabelDisplay="auto"
        />
      </Box>
      <Grid container>
        {!loading ? (
          <>
            {filterdData.length >= 1 ? (
              <>
                {filterdData.map((data) => {
                  return (
                    <Grid item xs={6} sm={4} md={2}>
                      <PackageCard type="call" data={data} />
                    </Grid>
                  );
                })}
              </>
            ) : (
              <>No Packages available</>
            )}
          </>
        ) : (
          <div>Loading</div>
        )}
      </Grid>
    </>
  );
};
