import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard";
import Employees from "./components/employees/Employees";
import Attendance from "./components/employees/Attendance";
import Payroll from "./components/employees/Payroll";
import Logout from "./components/Logout/Logout";
import Settings from "./components/Settings/Settings"; // ✅ import Settings component



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
      case "projects":
        return <h2 className="page-title">Projects Overview</h2>;
      case "tasks":
        return <h2 className="page-title">Task Tracker</h2>;
      case "reports":
        return <h2 className="page-title">Reports & Analytics</h2>;
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
      {/* Navbar */}
      <Navbar />

      {/* Layout Wrapper */}
      <div className="layout">
        {/* Sidebar */}
        <Sidebar onSelect={setActivePage} />

        {/* Main Content */}
        <main className="main-content">
          <div className="content-wrapper">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}

export default App;
