import React, { useState } from "react";
import {
  FaHome,
  FaUsers,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaBriefcase,
  FaUserTie,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

import Logo from "../../assets/Logo.png";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const [openMenu, setOpenMenu] = useState(null);
  const [activeMainMenu, setActiveMainMenu] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
    setActiveMainMenu(menu);
  };

  const handleNavigation = (path, isSubmenu = false) => {
    navigate(path);

    if (path.includes("dashboard")) setActiveMainMenu("dashboard");
    else if (
      path.includes("employees") ||
      path.includes("employee-cards") ||
      path.includes("attendance") ||
      path.includes("payroll")
    )
      setActiveMainMenu("hr");
    else if (path.includes("project") || path.includes("tasks"))
      setActiveMainMenu("project");
    else if (path.includes("reports")) setActiveMainMenu("reports");
    else if (path.includes("recruitment")) setActiveMainMenu("recruitment");
    else if (path.includes("settings")) setActiveMainMenu("settings");

    if (!isSubmenu) setOpenMenu(null);
    if (window.innerWidth < 768) toggleSidebar();
  };

  const mainBtn =
    "flex items-center gap-3 px-5 py-3 text-gray-800 hover:bg-gray-200 rounded-md cursor-pointer transition-all text-[15px] max-md:flex-col max-md:text-[10px]";

  const subBtn =
    "ml-12 text-[14px] cursor-pointer text-gray-700 hover:text-black transition-all max-md:ml-0";

  const active = "bg-[#f9fafb] border-l-4 border-blue-600 font-semibold text-blue-700";
  const activeSub = "font-semibold text-black ml-12 max-md:ml-0";
  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`
        fixed top-[95px] left-0
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        w-[260px] bg-gray-100 shadow-md z-[999] min-h-screen
      `}
    >
      <div className="flex flex-col items-center py-4 border-b border-gray-300">
        <img src={Logo} alt="Logo" className="w-12 h-12 mb-1" />
        <span className="text-sm font-semibold text-gray-700 max-md:hidden">
          One Zing
        </span>
      </div>

      <ul className="flex flex-col mt-3 space-y-2 px-3">

        <li
          onClick={() => handleNavigation("/dashboard")}
          className={`${mainBtn} ${
            activeMainMenu === "dashboard" ? active : ""
          }`}
        >
          <FaHome className="text-lg" />
          <span className="max-md:hidden">Dashboard</span>
        </li>

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
          <ul className="flex flex-col mt-1">
            <li
              className={`${subBtn} ${
                isActive("/employees") ? activeSub : ""
              }`}
              onClick={() => handleNavigation("/employees", true)}
            >
              Employees
            </li>

            <li
              className={`${subBtn} ${
                isActive("/employee-cards") ? activeSub : ""
              }`}
              onClick={() => handleNavigation("/employee-cards", true)}
            >
              Employee Profile
            </li>

            <li
              className={`${subBtn} ${
                isActive("/attendance") ? activeSub : ""
              }`}
              onClick={() => handleNavigation("/attendance", true)}
            >
              Attendance & Leave
            </li>

            <li
              className={`${subBtn} ${
                isActive("/payroll") ? activeSub : ""
              }`}
              onClick={() => handleNavigation("/payroll", true)}
            >
              Payroll
            </li>
          </ul>
        )}

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
          <ul className="flex flex-col mt-1">
            <li
              className={`${subBtn} ${
                isActive("/project") ? activeSub : ""
              }`}
              onClick={() => handleNavigation("/project", true)}
            >
              Projects
            </li>

            <li
              className={`${subBtn} ${
                isActive("/tasks") ? activeSub : ""
              }`}
              onClick={() => handleNavigation("/tasks", true)}
            >
              Tasks
            </li>
          </ul>
        )}

        <li
          onClick={() => handleNavigation("/reports")}
          className={`${mainBtn} ${
            activeMainMenu === "reports" ? active : ""
          }`}
        >
          <FaChartBar className="text-lg" />
          <span className="max-md:hidden">Reports</span>
        </li>

        <li
          onClick={() => toggleMenu("recruitment")}
          className={`${mainBtn} ${
            activeMainMenu === "recruitment" ? active : ""
          }`}
        >
          <FaUserTie className="text-lg" />
          <span className="max-md:hidden">Recruitment</span>
        </li>

        {openMenu === "recruitment" && (
          <ul className="flex flex-col mt-1">
            <li
              className={`${subBtn} ${
                isActive("/recruitment/jobs") ? activeSub : ""
              }`}
              onClick={() => handleNavigation("/recruitment/jobs", true)}
            >
              Jobs
            </li>

            <li
              className={`${subBtn} ${
                isActive("/recruitment/candidates") ? activeSub : ""
              }`}
              onClick={() => handleNavigation("/recruitment/candidates", true)}
            >
              Candidates
            </li>

            <li
              className={`${subBtn} ${
                isActive("/recruitment/referrals") ? activeSub : ""
              }`}
              onClick={() => handleNavigation("/recruitment/referrals", true)}
            >
              Referrals
            </li>
          </ul>
        )}

        <li
          onClick={() => handleNavigation("/settings")}
          className={`${mainBtn} ${
            activeMainMenu === "settings" ? active : ""
          }`}
        >
          <FaCog className="text-lg" />
          <span className="max-md:hidden">Settings</span>
        </li>

        <li
          onClick={() => handleNavigation("/logout")}
          className="flex items-center gap-3 px-5 py-3 text-red-600 hover:bg-red-100 rounded-md cursor-pointer mt-auto mb-3"
        >
          <FaSignOutAlt className="text-lg" />
          <span className="max-md:hidden">Logout</span>
        </li>

      </ul>
    </div>
  );
}
