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
import Attendance from "./components/employees/Attendance";
import Payroll from "./components/employees/Payroll";
import Logout from "./components/Logout/Logout";
import Settings from "./components/Settings/Settings";
import Reports from "./components/reports/Reports";
import Project from "./components/Project/Project";
import Tasks from "./components/Project/Tasks";
import Login from "./pages/Login";
import Signup from "./pages/Signup"; // ✅ Added Signup Page

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();

  // ✅ Hide Navbar/Sidebar on login & signup pages
  const hideLayout =
    location.pathname === "/login" || location.pathname === "/signup";

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 overflow-hidden">
      {!hideLayout && <Navbar />}
      {!hideLayout && <Toolbar toggleSidebar={toggleSidebar} />}

      <div className="relative flex flex-1 transition-all duration-500 ease-in-out">
        {!hideLayout && (
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        )}

        <main
          className={`bg-[#f9fafc] min-h-screen transition-all duration-500 ease-in-out 
            ${hideLayout ? "pt-0" : "pt-[120px]"} 
            ${
              isMobile
                ? "w-full ml-0 px-4"
                : isSidebarOpen
                ? "ml-[250px] px-8"
                : "ml-[80px] px-8"
            }`}
        >
          <div className="max-w-[1200px] mx-auto w-full transition-all duration-500 ease-in-out">
            <Routes>
              {/* 🔒 Auth Routes */}
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} /> {/* ✅ Added Signup Route */}

              {/* 🌐 Main Application Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/payroll" element={<Payroll />} />
              <Route path="/project" element={<Project />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/logout" element={<Logout />} />

              {/* 🚫 404 fallback */}
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

// ✅ Router wrapper
export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
