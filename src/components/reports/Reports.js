import React, { useState } from "react";
import "./Reports.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function Reports() {
  const performanceData = [
    { month: "Jan", KPI: 70 },
    { month: "Feb", KPI: 80 },
    { month: "Mar", KPI: 75 },
    { month: "Apr", KPI: 90 },
    { month: "May", KPI: 85 },
    { month: "Jun", KPI: 95 },
  ];

  const recruitmentData = [
    { dept: "HR", Hires: 8, Resigned: 2 },
    { dept: "IT", Hires: 12, Resigned: 4 },
    { dept: "Sales", Hires: 6, Resigned: 1 },
    { dept: "Finance", Hires: 5, Resigned: 3 },
    { dept: "Support", Hires: 9, Resigned: 2 },
  ];

  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedDept, setSelectedDept] = useState("All");

  const filteredPerformance =
    selectedMonth === "All"
      ? performanceData
      : performanceData.filter((d) => d.month === selectedMonth);

  const filteredRecruitment =
    selectedDept === "All"
      ? recruitmentData
      : recruitmentData.filter((d) => d.dept === selectedDept);

  return (
    <div className="reports-wrapper">
      <h1>Reports & Analytics</h1>

      <div className="report-card">
        <div className="header-row">
          <h2>Employee Performance Reports</h2>

          <select
            className="filter-dropdown"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="All">All Months</option>
            {performanceData.map((d) => (
              <option key={d.month} value={d.month}>
                {d.month}
              </option>
            ))}
          </select>
        </div>

        <p>Track employee KPIs and performance trends across months.</p>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="KPI"
                stroke="#3b82f6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="report-card">
        <div className="header-row">
          <h2>Recruitment & Turnover Analytics</h2>

          <select
            className="filter-dropdown"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
          >
            <option value="All">All Departments</option>
            {recruitmentData.map((d) => (
              <option key={d.dept} value={d.dept}>
                {d.dept}
              </option>
            ))}
          </select>
        </div>

        <p>Insights about new hires, resignations, and turnover trends.</p>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredRecruitment}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dept" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Hires" fill="#22c55e" barSize={40} />
              <Bar dataKey="Resigned" fill="#ef4444" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
