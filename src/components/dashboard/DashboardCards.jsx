import React from "react";
import "./DashboardCards.css";
import {
  Users,
  Folder,
  ClipboardList,
  DollarSign,
  CheckCircle,
  Clock,
  CalendarDays,
  Bug,
  Smile,
  Activity,
} from "lucide-react";
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
  const cards = [
    { title: "Total Employees", value: "120", icon: <Users />, color: "#6C63FF" },
    { title: "Active Projects", value: "8", icon: <Folder />, color: "#00C49F" },
    { title: "Pending Tasks", value: "24", icon: <ClipboardList />, color: "#FFBB28" },
    { title: "Monthly Payroll", value: "₹2.3L", icon: <DollarSign />, color: "#FF8042" },
    { title: "Completed Projects", value: "15", icon: <CheckCircle />, color: "#4CAF50" },
    { title: "Upcoming Projects", value: "6", icon: <Clock />, color: "#007bff" },
    { title: "Upcoming Deadlines", value: "3", icon: <CalendarDays />, color: "#FF5722" },
    { title: "Reported Issues", value: "9", icon: <Bug />, color: "#E91E63" },
    { title: "Client Satisfaction", value: "94%", icon: <Smile />, color: "#00BFA5" },
    { title: "Resource Utilization", value: "87%", icon: <Activity />, color: "#9C27B0" },

  ];

  const chartData = [
    { month: "Mon", performance: 4 },
    { month: "Tue", performance: 8 },
    { month: "Wed", performance: 5 },
    { month: "Thu", performance: 9 },
    { month: "Fri", performance: 6 },
    { month: "Sat", performance: 11 },
    { month: "Sun", performance: 8 },
  ];

  return (
    <div className="dashboard-main">
      <div className="dashboard-cards-left">
        {cards.map((card, index) => (
          <div className="dashboard-card" key={index}>
            <div className="icon-box" style={{ color: card.color }}>
              {card.icon}
            </div>
            <div className="text-box">
              <h4>{card.title}</h4>
              <p>{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-graph-right">
        <div className="graph-header">
          <h3>Project Performance Analytics</h3>
          <div className="filter-buttons">
            <button className="active">Daily</button>
            <button>Monthly</button>
            <button>Yearly</button>
          </div>
        </div>

        <div className="graph-wrapper">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="performance"
                stroke="#007bff"
                strokeWidth={3}
                dot={{ fill: "#007bff", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
