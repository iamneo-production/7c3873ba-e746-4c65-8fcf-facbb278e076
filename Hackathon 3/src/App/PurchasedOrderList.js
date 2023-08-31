import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Header } from "../CommonComponents/Header";
import DataGridCustomToolbar from "../CommonComponents/DataGridCustomToolbar";
import { getCheckoutHistory } from "../Services/http.service";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  {
    field: "id",
    headerName: "Order ID",
    width: 150,
  },
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
  {
    field: "total",
    headerName: (
      <Typography variant="subtitle2" fontWeight="bold">
        Total Amount
      </Typography>
    ),
    width: 130,
  },
];

export const PurchasedOrderList = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const user = sessionStorage.getItem("email");
    getCheckoutHistory(user)
      .then((response) => {
        setOrderHistory(response.data);
      })
      .catch((error) => {
        console.error("Error fetching order history:", error);
      });
  }, []);

  const formattedOrderHistory = orderHistory.map((order) => ({
    id: order.id,
    customername: order.user,
    purchasedplan: order.items.map((item) => item.data.title).join(", "),
    date: order.timestamp, // Assuming there is a timestamp in the data
    total: order.total,
  }));

  return (
    <DataGrid
      sx={{ marginTop: 2 }}
      rows={formattedOrderHistory}
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
  );
};
