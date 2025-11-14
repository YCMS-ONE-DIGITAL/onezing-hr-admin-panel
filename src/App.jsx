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

  // Hide layout on Login & Signup pages
  const hideLayout =
    location.pathname === "/login" || location.pathname === "/signup";

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // Mobile window resize logic
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // MAIN LAYOUT
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 overflow-hidden">

      {/* NAVBAR */}
      {!hideLayout && <Navbar />}

      {/* TOOLBAR */}
      {!hideLayout && <Toolbar toggleSidebar={toggleSidebar} />}

      <div className="relative flex flex-1 transition-all duration-500 ease-in-out">

        {/* SIDEBAR */}
        {!hideLayout && (
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        )}

        {/* MAIN CONTENT */}
        <main
          className={`
            bg-[#f9fafc] min-h-screen 
            transition-all duration-500 ease-in-out
            ${hideLayout ? "pt-0" : "pt-[120px]"}
            ${
              isMobile
                ? "ml-0 px-4"
                : isSidebarOpen
                ? "ml-[250px] px-8"
                : "ml-[80px] px-8"
            }
          `}
        >
          <div className="max-w-[1400px] mx-auto w-full transition-all duration-500">
            <Routes>

              {/* AUTH ROUTES */}
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* MAIN ROUTES */}
              <Route path="/dashboard" element={<Dashboard />} />

              {/* EMPLOYEES */}
              <Route path="/employees" element={<Employees />} />
              <Route path="/employee/:id" element={<EmployeeDetail />} />
              <Route path="/employee-cards" element={<EmployeeCards />} />

              {/* OTHER MODULES */}
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/payroll" element={<Payroll />} />
              <Route path="/project" element={<Project />} />
              <Route path="/tasks" element={<Tasks />} />

              {/* SETTINGS */}
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/logout" element={<Logout />} />

              {/* FALLBACK */}
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

// Router Wrapper
export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
