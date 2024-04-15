//Outlet is what we want to return if user is login

import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Admin = () => {
  const { userData } = useSelector((state) => state.auth);
  return userData && userData.isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default Admin;
