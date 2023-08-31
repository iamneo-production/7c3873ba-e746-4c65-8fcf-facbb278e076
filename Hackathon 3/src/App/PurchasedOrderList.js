import { Box, Typography } from "@mui/material";
import React from "react";
import { Header } from "../CommonComponents/Header";

import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "../CommonComponents/DataGridCustomToolbar";

const columns = [
  {
    field: "customername",
    headerName: (
      <Typography variant="subtitle2" fontWeight="bold">
        Customer Name
      </Typography>
    ),
    width: 300,
  },
  {
    field: "purchasedplan",
    headerName: (
      <Typography variant="subtitle2" fontWeight="bold">
        Purchased Plan
      </Typography>
    ),
    width: 130,
  },
  {
    field: "date",
    headerName: (
      <Typography variant="subtitle2" fontWeight="bold">
        Date
      </Typography>
    ),
    width: 130,
  },
];

const rows = [
  {
    id: 1,
    customername: "chamupathi saranga",
    purchasedplan: "Data Plan",
    date: "2023.08.31",
  },
  {
    id: 2,
    customername: "Minidu",
    purchasedplan: "Call Plan",
    date: "2023.08.30",
  },
];

export const PurchasedOrderList = () => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <Header />
      <DataGrid
        sx={{ marginTop: 2 }}
        rows={rows}
        components={{
          Toolbar: DataGridCustomToolbar,
        }}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
};
