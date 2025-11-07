import React from "react";
import "./Navbar.css";
import { FaSearch } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="project-name">HROne</span>

        {/* Search box with icon inside */}
        <div className="search-wrapper">
          <FaSearch className="search-icon" />
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
