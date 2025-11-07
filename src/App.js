import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard";
import Employees from "./components/employees/Employees"; // ✅ import Employees

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;

      case "employees":
        return <Employees />; // ✅ Show Employees component

      case "attendance":
        return <h2 className="page-title">Attendance & Leave</h2>;

      case "payroll":
        return <h2 className="page-title">Payroll System</h2>;

      case "projects":
        return <h2 className="page-title">Projects Overview</h2>;

      case "tasks":
        return <h2 className="page-title">Task Tracker</h2>;

      case "reports":
        return <h2 className="page-title">Reports & Analytics</h2>;

      case "settings":
        return <h2 className="page-title">Settings</h2>;

      case "logout":
        return <h2 className="page-title">Logging out...</h2>;

      default:
        return <h2 className="page-title">Select a section from the sidebar</h2>;
    }
  };

  return (
    <div className="App">
      <Navbar />
      <Sidebar onSelect={setActivePage} />
      <div style={{ marginLeft: "220px", marginTop: "60px", padding: "20px" }}>
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
