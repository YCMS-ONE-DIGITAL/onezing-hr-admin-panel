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

  return (
    <div
      className={`
        fixed top-[108px] left-0
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} 
        w-[250px] md:w-[250px] h-[calc(100vh-108px)]
        bg-gray-100 shadow-md transition-all duration-500 ease-in-out
        flex flex-col items-center z-[999]
        max-md:w-[80px]
      `}
    >
      <div className="flex flex-col items-center py-4 w-full border-b border-gray-300">
        <img src="/logo192.png" alt="logo" className="w-10 h-10 rounded-full mb-1" />
        <span className="text-sm font-semibold text-gray-700 max-md:hidden">HROne</span>
      </div>

      <ul className="flex flex-col w-full mt-3 space-y-2 px-3">
        <li
          onClick={() => handleNavigation("/dashboard")}
          className="flex items-center gap-3 px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md cursor-pointer text-[15px] transition-all max-md:flex-col max-md:text-[10px] max-md:py-1"
        >
          <FaHome className="text-[18px]" />
          <span className="max-md:hidden">Dashboard</span>
        </li>

        <li
          onClick={() => toggleMenu("hr")}
          className="flex items-center gap-3 px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md cursor-pointer text-[15px] transition-all max-md:flex-col max-md:text-[10px] max-md:py-1"
        >
          <FaUsers className="text-[18px]" />
          <span className="max-md:hidden">HR Management</span>
        </li>

        {openMenu === "hr" && (
          <ul className="flex flex-col items-center w-full mt-1 space-y-1">
            <li
              onClick={() => handleNavigation("/employees")}
              className="bg-white hover:bg-gray-200 rounded-md px-3 py-1 cursor-pointer text-[10px] md:text-[13px] text-gray-700 text-center w-[95%] shadow-sm transition-all"
            >
              <span className="md:hidden">Emp</span>
              <span className="hidden md:inline">Employees</span>
            </li>

            <li
              onClick={() => handleNavigation("/attendance")}
              className="bg-white hover:bg-gray-200 rounded-md px-3 py-1 cursor-pointer text-[10px] md:text-[13px] text-gray-700 text-center w-[95%] shadow-sm transition-all"
            >
              <span className="md:hidden">Leave</span>
              <span className="hidden md:inline">Attendance & Leave</span>
            </li>

            <li
              onClick={() => handleNavigation("/payroll")}
              className="bg-white hover:bg-gray-200 rounded-md px-3 py-1 cursor-pointer text-[10px] md:text-[13px] text-gray-700 text-center w-[95%] shadow-sm transition-all"
            >
              Payroll
            </li>
          </ul>
        )}

        <li
          onClick={() => toggleMenu("project")}
          className="flex items-center gap-3 px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md cursor-pointer text-[15px] transition-all max-md:flex-col max-md:text-[10px] max-md:py-1"
        >
          <FaBriefcase className="text-[18px]" />
          <span className="max-md:hidden">Project Management</span>
        </li>

        {openMenu === "project" && (
          <ul className="flex flex-col items-center w-full mt-1 space-y-1">
            <li
              onClick={() => handleNavigation("/projectmanagement")}
              className="bg-white hover:bg-gray-200 rounded-md px-3 py-1 cursor-pointer text-[10px] md:text-[13px] text-gray-700 text-center w-[95%] shadow-sm transition-all"
            >
              Projects
            </li>
            <li
              onClick={() => handleNavigation("/tasks")}
              className="bg-white hover:bg-gray-200 rounded-md px-3 py-1 cursor-pointer text-[10px] md:text-[13px] text-gray-700 text-center w-[95%] shadow-sm transition-all"
            >
              Tasks
            </li>
          </ul>
        )}

        <li
          onClick={() => handleNavigation("/reports")}
          className="flex items-center gap-3 px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md cursor-pointer text-[15px] transition-all max-md:flex-col max-md:text-[10px] max-md:py-1"
        >
          <FaChartBar className="text-[18px]" />
          <span className="max-md:hidden">Reports</span>
        </li>

        <li
          onClick={() => handleNavigation("/settings")}
          className="flex items-center gap-3 px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md cursor-pointer text-[15px] transition-all max-md:flex-col max-md:text-[10px] max-md:py-1"
        >
          <FaCog className="text-[18px]" />
          <span className="max-md:hidden">Settings</span>
        </li>

        <li
          onClick={() => handleNavigation("/logout")}
          className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-100 rounded-md cursor-pointer text-[15px] transition-all max-md:flex-col max-md:text-[10px] max-md:py-1 mt-auto mb-3"
        >
          <FaSignOutAlt className="text-[18px]" />
          <span className="max-md:hidden">Logout</span>
        </li>
      </ul>
    </div>
  );
}
