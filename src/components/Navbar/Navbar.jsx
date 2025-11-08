import React from "react";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="project-name">HROne</span>
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="navbar-right">
        <button className="nav-btn">Login</button>
      </div>
    </nav>
  );
}
