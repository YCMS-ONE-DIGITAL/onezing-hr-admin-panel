import React, { useState } from "react";
import {
  FaHome,
  FaUsers,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaBriefcase,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth < 768) toggleSidebar();
  };

  // ⭐ Laptop view button styling
  const mainButton =
    "flex items-center gap-3 px-5 py-3 text-gray-800 hover:bg-gray-200 rounded-md cursor-pointer transition-all text-[16px] max-md:flex-col max-md:text-[10px] max-md:py-1 max-md:px-2";

  const subButton =
    "bg-white hover:bg-gray-200 rounded-md px-3 py-2 cursor-pointer text-[12px] md:text-[14px] text-gray-700 text-center w-[95%] shadow-sm transition-all";

  return (
    <div
      className={`
        fixed top-[108px] left-0
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        w-[300px] md:w-[300px]   /* ⭐ Laptop width increased */
        h-[calc(100vh-108px)]
        bg-gray-100 shadow-md transition-all duration-500 ease-in-out
        flex flex-col items-center z-[999]
        max-md:w-[80px]
      `}
    >
      {/* LOGO */}
      <div className="flex flex-col items-center py-4 w-full border-b border-gray-300">
        <img src="/logo192.png" alt="logo" className="w-10 h-10 rounded-full mb-1" />
        <span className="text-sm font-semibold text-gray-700 max-md:hidden">HROne</span>
      </div>

      {/* MENU */}
      <ul className="flex flex-col w-full mt-3 space-y-2 px-3">

        {/* Dashboard */}
        <li onClick={() => handleNavigation("/dashboard")} className={mainButton}>
          <FaHome className="text-[20px]" />
          <span className="max-md:hidden">Dashboard</span>
        </li>

        {/* HR Management */}
        <li onClick={() => toggleMenu("hr")} className={mainButton}>
          <FaUsers className="text-[20px]" />
          <span className="max-md:hidden">HR Management</span>
        </li>

        {openMenu === "hr" && (
          <ul className="flex flex-col items-center w-full mt-1 space-y-2">
            <li onClick={() => handleNavigation("/employees")} className={subButton}>
              Employees
            </li>
            <li onClick={() => handleNavigation("/employee-cards")} className={subButton}>
              Employee Profile
            </li>
            <li onClick={() => handleNavigation("/attendance")} className={subButton}>
              Attendance & Leave
            </li>
            <li onClick={() => handleNavigation("/payroll")} className={subButton}>
              Payroll
            </li>
          </ul>
        )}

        {/* Project Management */}
        <li onClick={() => toggleMenu("project")} className={mainButton}>
          <FaBriefcase className="text-[20px]" />
          <span className="max-md:hidden">Project Management</span>
        </li>

        {openMenu === "project" && (
          <ul className="flex flex-col items-center w-full mt-1 space-y-2">
            <li onClick={() => handleNavigation("/project")} className={subButton}>
              Projects
            </li>
            <li onClick={() => handleNavigation("/tasks")} className={subButton}>
              Tasks
            </li>
          </ul>
        )}

        {/* Reports */}
        <li onClick={() => handleNavigation("/reports")} className={mainButton}>
          <FaChartBar className="text-[20px]" />
          <span className="max-md:hidden">Reports</span>
        </li>

        {/* Settings */}
        <li onClick={() => handleNavigation("/settings")} className={mainButton}>
          <FaCog className="text-[20px]" />
          <span className="max-md:hidden">Settings</span>
        </li>

        {/* Logout */}
        <li
          onClick={() => handleNavigation("/logout")}
          className="flex items-center gap-3 px-5 py-3 text-red-600 hover:bg-red-100 rounded-md cursor-pointer transition-all text-[16px] max-md:flex-col max-md:text-[10px] max-md:py-1 max-md:px-2 mt-auto mb-3"
        >
          <FaSignOutAlt className="text-[20px]" />
          <span className="max-md:hidden">Logout</span>
        </li>
      </ul>
    </div>
  );
}
