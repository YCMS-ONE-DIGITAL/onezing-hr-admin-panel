import React from "react";
import "./DashboardCards.css";
import { Users, Folder, ClipboardList, DollarSign } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DashboardCards = () => {
  // === 4 Cards Data ===
  const cards = [
    { title: "Total Employees", value: "120", icon: <Users />, color: "#6C63FF" },
    { title: "Active Projects", value: "8", icon: <Folder />, color: "#00C49F" },
    { title: "Pending Tasks", value: "24", icon: <ClipboardList />, color: "#FFBB28" },
    { title: "Monthly Payroll", value: "₹2.3L", icon: <DollarSign />, color: "#FF8042" },
  ];

  // === Chart Data ===
  const chartData = [
    { month: "Jan", performance: 65 },
    { month: "Feb", performance: 78 },
    { month: "Mar", performance: 72 },
    { month: "Apr", performance: 88 },
    { month: "May", performance: 94 },
    { month: "Jun", performance: 80 },
  ];

  return (
    <div className="dashboard-wrapper">
      {/* === Cards Section === */}
      <div className="dashboard-grid">
        {cards.map((card, index) => (
          <div key={index} className="dashboard-card">
            <div className="card-left">
              <h4 className="card-title">{card.title}</h4>
              <div className="card-value">{card.value}</div>
            </div>
            <div
              className="card-icon"
              style={{ backgroundColor: card.color + "20", color: card.color }}
            >
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* === Performance / Analytics Chart Section === */}
      <div className="chart-card">
        <h3 className="chart-title">Performance Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="month" stroke="#555" />
            <YAxis stroke="#555" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="performance"
              stroke="#007bff"
              strokeWidth={3}
              dot={{ fill: "#007bff", strokeWidth: 2, r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardCards;
