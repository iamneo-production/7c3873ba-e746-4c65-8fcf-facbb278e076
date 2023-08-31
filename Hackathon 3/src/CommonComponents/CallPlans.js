import React, { useEffect, useState } from "react";
import { PackageCard } from "./PackageCard";
import { Box, Grid, Slider, Typography } from "@mui/material";
import { getAllCallPlans } from "../Services/http.service";
import { toast } from "react-toastify";

export const CallPlans = ({ addToOrder }) => {
  const [allCallPlans, setCallPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const LoadData = () => {
    getAllCallPlans()
      .then((data) => {
        setCallPlans(data.data);
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
    return `Rs. ${value}`;
  }

  const [filter, setFilter] = useState(0);

  const filteredData = allCallPlans.filter((item) => {
    return item.basePrice >= filter || filter === 0;
  });

  return (
    <Box>
      <Box sx={{ width: "100%", maxWidth: 300, margin: "auto" }}>
        <Typography variant="subtitle1" fontWeight="bold">
          Base Price Range
        </Typography>
        <Slider
          value={filter}
          onChange={(event, value) => setFilter(value)}
          aria-label="Small steps"
          defaultValue={0}
          getAriaValueText={valuetext}
          step={100}
          marks
          min={0}
          max={1000}
          valueLabelDisplay="auto"
        />
      </Box>
      <Box display="flex" justifyContent="center">
        <Grid container spacing={2}>
          {!loading ? (
            <>
              {filteredData.length >= 1 ? (
                <>
                  {filteredData.map((data, index) => (
                    <Grid key={index} item xs={12} sm={6} md={4}>
                      <PackageCard
                        type="call"
                        data={data}
                        onAddToOrder={addToOrder}
                      />
                    </Grid>
                  ))}
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
