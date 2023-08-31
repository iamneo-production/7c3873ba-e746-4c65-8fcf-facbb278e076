import React from "react";
import { Login } from "../App/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicComponentRoute from "./ProtectRoute/PublicComponentRoute";
import ProtectUser from "./ProtectRoute/ProtectUser";
import { PurchasedOrderList } from "../App/PurchasedOrderList";
import { Home } from "./../App/Home";
import Register from "../App/Register";

export const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicComponentRoute />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/home" element={<ProtectUser />}>
          <Route index element={<Home />} />
          <Route path="purchasedorderlist" element={<PurchasedOrderList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
