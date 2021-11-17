import { CircularProgress } from "@mui/material";
import React from "react";
import { useLocation, Navigate } from "react-router";
import useAuth from "../../../hooks/useAuth";

const AdminRoute = ({ children, ...rest }) => {
  const { user, admin } = useAuth();
  let location = useLocation();
  if (!admin) {
    return <CircularProgress />;
  }
  if (user.email && admin) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} />;
};

export default AdminRoute;
