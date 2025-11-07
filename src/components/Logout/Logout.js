import React, { useEffect } from "react";
import "./Logout.css";
import { useNavigate } from "react-router-dom"; // optional if using react-router

const Logout = () => {
  const navigate = useNavigate(); // if using react-router

  useEffect(() => {
    // 🔹 Clear user session / token if any
    localStorage.removeItem("token"); // example
    sessionStorage.clear();

    // 🔹 Redirect after 2 seconds (optional)
    const timer = setTimeout(() => {
      navigate("/login"); // redirect to login page
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
