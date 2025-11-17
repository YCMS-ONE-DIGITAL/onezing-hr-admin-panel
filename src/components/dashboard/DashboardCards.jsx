import React, { useState } from "react";
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
  Bell,
  Megaphone,
  Award,
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

export default function DashboardCards() {
  const [chartType, setChartType] = useState("Daily");

  const chartData = {
    Daily: [
      { month: "Mon", performance: 4 },
      { month: "Tue", performance: 8 },
      { month: "Wed", performance: 5 },
      { month: "Thu", performance: 9 },
      { month: "Fri", performance: 6 },
      { month: "Sat", performance: 11 },
      { month: "Sun", performance: 8 },
    ],
  };

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

  const performers = [
    { name: "Harshal Mali", score: 98 },
    { name: "Sneha Kulkarni", score: 94 },
    { name: "Rohan Deshmukh", score: 90 },
  ];

  const announcements = [
    "Office holiday on Monday.",
    "Awards Night this Friday.",
    "Submit appraisals before 25th.",
  ];

  const activities = [
    "Ravi updated project tasks.",
    "Sneha added new UI designs.",
    "Amit submitted leave request.",
  ];

  return (
    <div
      className="
        w-full flex flex-col gap-10
        max-md:pt-12     /* ⭐ INCREASED TOP GAP FOR MOBILE */
      "
    >

      {/* =========================
          TOP SECTION (CARDS + RIGHT PANEL)
      ========================== */}
      <div className="flex gap-8 w-full max-md:flex-col">

        <div className="flex-1 grid grid-cols-3 gap-4 max-xl:grid-cols-2 max-md:grid-cols-2">

          {cards.map((card, i) => (
            <div
              key={i}
              className="
                bg-white rounded-xl shadow 
                p-3 flex items-center gap-3 
                border border-gray-200 
                hover:shadow-lg transition
              "
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-[18px]"
                style={{ color: card.color, backgroundColor: "#EEF1F8" }}
              >
                {card.icon}
              </div>

              <div>
                <p className="text-gray-800 font-bold text-[14px] tracking-wide">
                  {card.title}
                </p>
                <h3 className="text-[18px] font-bold text-gray-900 mt-1">
                  {card.value}
                </h3>
              </div>
            </div>
          ))}

        </div>

        <div className="w-[420px] flex flex-col gap-6 max-md:w-full">

          <div className="bg-white border rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-3">
              <Award size={20} /> Top Performers
            </h2>

            {performers.map((p, i) => (
              <div key={i} className="flex justify-between py-2 border-b text-sm">
                <span>{p.name}</span>
                <span className="font-semibold">{p.score} pts</span>
              </div>
            ))}
          </div>

          <div className="bg-white border rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-3">
              <Megaphone size={20} /> Announcements
            </h2>

            {announcements.map((a, i) => (
              <p key={i} className="border-b py-2 text-sm">
                {a}
              </p>
            ))}
          </div>

          <div className="bg-white border rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-3">
              <Bell size={20} /> Recent Activities
            </h2>

            {activities.map((a, i) => (
              <p key={i} className="border-b py-2 text-sm">
                {a}
              </p>
            ))}
          </div>

        </div>
      </div>

      {/* =======================
         PROJECT PERFORMANCE CHART
      ======================= */}
      <div className="bg-white border rounded-xl shadow p-6 w-full">
        <h2 className="text-xl font-semibold mb-4">
          Project Performance Analytics
        </h2>

        <div className="flex gap-3 mb-4">
          {["Daily", "Monthly", "Yearly"].map((lbl) => (
            <button
              key={lbl}
              onClick={() => setChartType(lbl)}
              className={`
                px-3 py-1 rounded-md text-sm border transition
                ${
                  chartType === lbl
                    ? "bg-[#007bff] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-200"
                }
              `}
            >
              {lbl}
            </button>
          ))}
        </div>

        <div style={{ height: "270px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData[chartType]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="performance"
                stroke="#007bff"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ⭐ MORE BOTTOM SPACE FOR MOBILE */}
      <div className="h-10 max-md:h-16"></div>
    </div>
  );
}
