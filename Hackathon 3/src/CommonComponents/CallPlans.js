import { Grid } from "@mui/material";
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
  return (
    <>
      {!loading ? (
        <>
          {allDatapacks.length >= 1 ? (
            <>
              {allDatapacks.map((data) => {
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
    </>
  );
};
