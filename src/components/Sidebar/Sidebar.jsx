import React, { useState } from "react";
import "./Sidebar.css";
import {
  FaHome,
  FaUsers,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaBriefcase,
} from "react-icons/fa";

export default function Sidebar({ onSelect }) {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => onSelect("dashboard")}>
          <FaHome /> Dashboard
        </li>

        <li onClick={() => toggleMenu("hr")}>
          <FaUsers /> HR Management
        </li>
        {openMenu === "hr" && (
          <ul className="submenu">
            <li onClick={() => onSelect("employees")}>Employees</li>
            <li onClick={() => onSelect("attendance")}>Attendance & Leave</li>
            <li onClick={() => onSelect("payroll")}>Payroll</li>
          </ul>
        )}

        <li onClick={() => toggleMenu("project")}>
          <FaBriefcase /> Project Management
        </li>
        {openMenu === "project" && (
          <ul className="submenu">
            <li onClick={() => onSelect("projectmanagement")}>Projects</li>
            <li onClick={() => onSelect("tasks")}>Tasks</li>
          </ul>
        )}

        <li onClick={() => onSelect("reports")}>
          <FaChartBar /> Reports & Analytics
        </li>

        <li onClick={() => onSelect("settings")}>
          <FaCog /> Settings
        </li>
        
        <li onClick={() => onSelect("logout")}>
          <FaSignOutAlt /> Logout
        </li>
      </ul>
    </div>
  );
}
