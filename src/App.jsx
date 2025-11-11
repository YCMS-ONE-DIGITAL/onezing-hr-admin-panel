import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
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
import ProjectManagement from "./components/Project/ProjectManagement";
import Tasks from "./components/Project/Tasks";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50 overflow-hidden">
        <Navbar />
        <Toolbar toggleSidebar={toggleSidebar} />

        <div className="relative flex flex-1 transition-all duration-500 ease-in-out">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

          <main
            className={`
              bg-[#f9fafc] min-h-screen transition-all duration-500 ease-in-out 
              pt-[120px] max-md:pt-[70px]
              ${isMobile ? "w-full ml-0 px-4" : isSidebarOpen ? "ml-[250px] px-8" : "ml-[80px] px-8"}
            `}
          >
            <div className="max-w-[1200px] mx-auto w-full transition-all duration-500 ease-in-out">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/payroll" element={<Payroll />} />
                <Route path="/projectmanagement" element={<ProjectManagement />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/logout" element={<Logout />} />
              </Routes>
            </div>
          </main>

          {isSidebarOpen && isMobile && (
            <div
              onClick={toggleSidebar}
              className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[400] md:hidden transition-opacity duration-300"
            ></div>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
