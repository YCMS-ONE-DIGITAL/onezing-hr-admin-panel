import React, { useEffect } from "react";
import "./Logout.css";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    sessionStorage.clear();

    const timer = setTimeout(() => {
      navigate("/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="logout-wrapper">
      <h1>Logging out...</h1>
      <p>You are being logged out. Redirecting to login page.</p>
    </div>
  );
};

export default Logout;
