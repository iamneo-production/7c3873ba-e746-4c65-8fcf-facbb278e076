import React, { useEffect, useState } from "react";
import { PackageCard } from "./PackageCard";
import { Box, Grid, Slider, Typography } from "@mui/material";
import { getAllDataPlans } from "../Services/http.service";
import { toast } from "react-toastify";

export const DataPlans = () => {
  const [allDatapacks, setDataPacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const LoadData = () => {
    getAllDataPlans()
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
  const [filter, setFilter] = useState(0);

  const filterdData = allDatapacks.filter((item) => {
    return item.quota >= filter || filter === 0;
  });

  return (
    <Box>
      <Box sx={{ width: "100%", maxWidth: 300, margin: "auto" }}>
        <Typography variant="subtitle1" fontWeight="bold">
          Quota Range
        </Typography>
        <Slider
          value={filter}
          onChange={(event, value) => setFilter(value)}
          aria-label="Small steps"
          defaultValue={0}
          getAriaValueText={valuetext}
          step={10}
          marks
          min={0}
          max={100}
          valueLabelDisplay="auto"
        />
      </Box>
      <Box display="flex" justifyContent="center">
        <Grid container spacing={2}>
          {!loading ? (
            <>
              {filterdData.length >= 1 ? (
                <>
                  {filterdData.map((data, index) => {
                    return (
                      <Grid key={index} item xs={12} sm={6} md={4}>
                        <PackageCard type="data" data={data} />
                      </Grid>
                    );
                  })}
                </>
              ) : (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  width="100%"
                  height="200px"
                  fontSize="20px"
                  fontWeight="bold"
                >
                  No Packages available
                </Box>
              )}
            </>
          ) : (
            <div>Loading</div>
          )}
        </Grid>
      </Box>
    </Box>
  );
};
