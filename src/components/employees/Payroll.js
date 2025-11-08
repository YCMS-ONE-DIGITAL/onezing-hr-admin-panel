import React from "react";
import "./Payroll.css";
import { FaUser, FaMoneyBillWave, FaClock, FaFileInvoiceDollar } from "react-icons/fa";

const Payroll = () => {
  const summaryData = [
    { id: 1, title: "Total Employees", value: 120, icon: <FaUser /> },
    { id: 2, title: "Total Payroll Month", value: "₹12,00,000", icon: <FaMoneyBillWave /> },
    { id: 3, title: "Pending Payments", value: 5, icon: <FaClock /> },
    { id: 4, title: "Total Deductions", value: "₹1,50,000", icon: <FaFileInvoiceDollar /> },
  ];

  return (
    <div className="payroll-wrapper">
      <header className="payroll-header">
        <h1 className="payroll-heading">Payroll Management</h1>
        <p className="payroll-subtitle">Manage employee salaries, deductions, and payslips</p>
      </header>

      <div className="payroll-summary-section">
        {summaryData.map((item) => (
          <div key={item.id} className="payroll-summary-card">
            <div className="payroll-icon">{item.icon}</div>
            <div>
              <h3>{item.title}</h3>
              <p>{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payroll;
