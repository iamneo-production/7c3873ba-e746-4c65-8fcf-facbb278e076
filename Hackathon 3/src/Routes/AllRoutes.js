import React from "react";
import { Login } from "../App/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicComponentRoute from "./ProtectRoute/PublicComponentRoute";
import ProtectUser from "./ProtectRoute/ProtectUser";
import { PurchasedOrderList } from "../App/PurchasedOrderList";
import { Home } from "./../App/Home";

export const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicComponentRoute />}>
          <Route index element={<Login />} />
        </Route>
        <Route path="/home" element={<ProtectUser />}>
          <Route index element={<Home />} />
          <Route path="purchasedorderlist" element={<PurchasedOrderList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
