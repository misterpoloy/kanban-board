import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token"); // Clear the token from localStorage
    navigate("/auth"); // Redirect to the login page
  }, [navigate]);

  return <p>Logging out...</p>; // Optional loading message
};

export default Logout;
