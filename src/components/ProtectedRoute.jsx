import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../GlobalContext/UserContext";

const ProtectedRoute = ({ children }) => {
const {user}=useUser();

    
    return user?.token ? children : <Navigate to="/login" />;
  };
  
  export default ProtectedRoute;