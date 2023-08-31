import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectUser() {
  const user = sessionStorage.getItem("email");
  return <div>{user != null ? <Outlet /> : <Navigate to={"/"} />}</div>;
}
