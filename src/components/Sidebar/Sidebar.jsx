import React, { useState } from "react";
import {
  FaHome,
  FaUsers,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaBriefcase,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const [openMenu, setOpenMenu] = useState(null);
  const [activeMainMenu, setActiveMainMenu] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  /** ⭐ TRUE TOGGLE SUBMENU + ACTIVE MENU **/
  const toggleMenu = (menu) => {
    const newState = openMenu === menu ? null : menu;
    setOpenMenu(newState);
    setActiveMainMenu(newState);
  };

  /** ⭐ HANDLE PAGE NAVIGATION + AUTO SELECT MAIN **/
  const handleNavigation = (path) => {
    navigate(path);

    if (
      path.includes("employees") ||
      path.includes("employee-cards") ||
      path.includes("attendance") ||
      path.includes("payroll")
    )
      setActiveMainMenu("hr");

    if (path.includes("project") || path.includes("tasks"))
      setActiveMainMenu("project");

    if (path.includes("dashboard")) setActiveMainMenu("dashboard");
    if (path.includes("reports")) setActiveMainMenu("reports");
    if (path.includes("settings")) setActiveMainMenu("settings");

    if (window.innerWidth < 768) toggleSidebar();
  };

  /** ⭐ MAIN MENU BUTTON STYLE **/
  const mainBtn =
    "flex items-center gap-3 px-5 py-3 text-gray-800 hover:bg-gray-200 rounded-md cursor-pointer transition-all text-[15px] max-md:flex-col max-md:text-[10px]";

  /** ⭐ SUBMENU WITHOUT BOX – MOVE RIGHT **/
  const subBtn =
    "ml-12 text-[14px] cursor-pointer text-gray-700 hover:text-black transition-all";

  /** ⭐ ACTIVE SUBMENU TEXT ONLY **/
  const activeSub = "font-semibold text-black ml-12";

  /** ⭐ ACTIVE MAIN MENU (BLUE LEFT BORDER) **/
  const active =
    "bg-[#f9fafb] border-l-4 border-blue-600 font-semibold text-blue-700";

  /** ⭐ CHECK CURRENT PAGE **/
  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`fixed top-[108px] left-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      } w-[300px] md:w-[300px] h-[calc(100vh-108px)] bg-gray-100 shadow-md transition-all duration-500 flex flex-col items-center z-[999] max-md:w-[80px]`}
    >
      {/* LOGO */}
      <div className="flex flex-col items-center py-4 w-full border-b border-gray-300">
        <img src="/logo192.png" className="w-10 h-10 rounded-full mb-1" />
        <span className="text-sm font-semibold text-gray-700 max-md:hidden">HROne</span>
      </div>

      {/* MENU LIST */}
      <ul className="flex flex-col w-full mt-3 space-y-2 px-3">

        {/* DASHBOARD */}
        <li
          onClick={() => handleNavigation("/dashboard")}
          className={`${mainBtn} ${
            activeMainMenu === "dashboard" ? active : ""
          }`}
        >
          <FaHome className="text-lg" />
          <span className="max-md:hidden">Dashboard</span>
        </li>

        {/* ================= HR MANAGEMENT ================= */}
        <li
          onClick={() => toggleMenu("hr")}
          className={`${mainBtn} ${
            activeMainMenu === "hr" ? active : ""
          }`}
        >
          <FaUsers className="text-lg" />
          <span className="max-md:hidden">HR Management</span>
        </li>

        {openMenu === "hr" && (
          <ul className="flex flex-col w-full mt-[2px]">

            <li
              className={`${subBtn} ${
                isActive("/employees") ? activeSub : ""
              }`}
              onClick={() => handleNavigation("/employees")}
            >
              Employees
            </li>

            <li
              className={`${subBtn} ${
                isActive("/employee-cards") ? activeSub : ""
              }`}
              onClick={() => handleNavigation("/employee-cards")}
            >
              Employee Profile
            </li>

            <li
              className={`${subBtn} ${
                isActive("/attendance") ? activeSub : ""
              }`}
              onClick={() => handleNavigation("/attendance")}
            >
              Attendance & Leave
            </li>

            <li
              className={`${subBtn} ${
                isActive("/payroll") ? activeSub : ""
              }`}
              onClick={() => handleNavigation("/payroll")}
            >
              Payroll
            </li>
          </ul>
        )}

        {/* ================= PROJECT MANAGEMENT ================= */}
        <li
          onClick={() => toggleMenu("project")}
          className={`${mainBtn} ${
            activeMainMenu === "project" ? active : ""
          }`}
        >
          <FaBriefcase className="text-lg" />
          <span className="max-md:hidden">Project Management</span>
        </li>

        {openMenu === "project" && (
          <ul className="flex flex-col w-full mt-[2px]">

            <li
              className={`${subBtn} ${
                isActive("/project") ? activeSub : ""
              }`}
              onClick={() => handleNavigation("/project")}
            >
              Projects
            </li>

            <li
              className={`${subBtn} ${
                isActive("/tasks") ? activeSub : ""
              }`}
              onClick={() => handleNavigation("/tasks")}
            >
              Tasks
            </li>
          </ul>
        )}

        {/* REPORTS */}
        <li
          onClick={() => handleNavigation("/reports")}
          className={`${mainBtn} ${
            activeMainMenu === "reports" ? active : ""
          }`}
        >
          <FaChartBar className="text-lg" />
          <span className="max-md:hidden">Reports</span>
        </li>

        {/* SETTINGS */}
        <li
          onClick={() => handleNavigation("/settings")}
          className={`${mainBtn} ${
            activeMainMenu === "settings" ? active : ""
          }`}
        >
          <FaCog className="text-lg" />
          <span className="max-md:hidden">Settings</span>
        </li>

        {/* LOGOUT */}
        <li
          onClick={() => handleNavigation("/logout")}
          className="flex items-center gap-3 px-5 py-3 text-red-600 hover:bg-red-100 rounded-md cursor-pointer transition-all text-[16px] max-md:flex-col max-md:text-[10px] mt-auto mb-3"
        >
          <FaSignOutAlt className="text-lg" />
          <span className="max-md:hidden">Logout</span>
        </li>
      </ul>
    </div>
  );
}
