import React, { useEffect, useState } from "react";
import { PackageCard } from "./PackageCard";
import { Grid } from "@mui/material";
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
  return (
    <>
      {!loading ? (
        <>
          {allDatapacks.length >= 1 ? (
            <>
              {allDatapacks.map((data) => {
                return (
                  <Grid item xs={6} sm={4} md={2}>
                    <PackageCard type="data" data={data} />
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
