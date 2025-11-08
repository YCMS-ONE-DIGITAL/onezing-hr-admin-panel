import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
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
  const [activePage, setActivePage] = useState("dashboard");

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "employees":
        return <Employees />;
      case "attendance":
        return <Attendance />;
      case "payroll":
        return <Payroll />;
      case "projectmanagement":
        return <ProjectManagement />;
      case "tasks":
        return <Tasks />;
      case "reports":
        return <Reports />;
      case "settings":
        return <Settings />;
      case "logout":
        return <Logout />;
      default:
        return <h2 className="page-title">Select a section from the sidebar</h2>;
    }
  };

  return (
    <div className="App">
      <Navbar />

      <div className="layout">
        <Sidebar onSelect={setActivePage} />

        <main className="main-content">
          <div className="content-wrapper">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}

export default App;
