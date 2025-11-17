import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Toolbar from "./components/Navbar/Toolbar";

import Dashboard from "./pages/Dashboard";
import Employees from "./components/employees/Employees";
import EmployeeDetail from "./components/employees/EmployeeDetail";
import EmployeeCards from "./components/employees/EmployeeCards";

import Attendance from "./components/employees/Attendance";
import Payroll from "./components/employees/Payroll";

import Logout from "./components/Logout/Logout";
import Settings from "./components/Settings/Settings";
import Reports from "./components/reports/Reports";

import Project from "./components/Project/Project";
import Tasks from "./components/Project/Tasks";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const location = useLocation();
  const hideLayout =
    location.pathname === "/login" || location.pathname === "/signup";

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 overflow-hidden">
      {!hideLayout && <Navbar />}
      {!hideLayout && <Toolbar toggleSidebar={toggleSidebar} />}

      <div className="relative flex flex-1 transition-all duration-500">

        {/* SIDEBAR */}
        {!hideLayout && (
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        )}

        {/* ✅ MAIN CONTENT FIXED */}
        <main
          className={`
            bg-[#f9fafc] min-h-screen transition-all duration-500
            ${hideLayout ? "pt-0" : "pt-[120px]"}
            ${
              isMobile
                ? "w-full ml-0 px-4"                          /* MOBILE VIEW */
                : isSidebarOpen
                ? "ml-[260px] w-[calc(100%-260px)] px-6"     /* SIDEBAR OPEN */
                : "ml-[95px] w-[calc(100%-95px)] px-6"       /* COLLAPSED */
            }
          `}
        >
          <div className="max-w-[1450px] mx-auto w-full">

            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/employees" element={<Employees />} />
              <Route path="/employee/:id" element={<EmployeeDetail />} />
              <Route path="/employee-cards" element={<EmployeeCards />} />

              <Route path="/attendance" element={<Attendance />} />
              <Route path="/payroll" element={<Payroll />} />

              <Route path="/project" element={<Project />} />
              <Route path="/tasks" element={<Tasks />} />

              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/logout" element={<Logout />} />

              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>

          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
