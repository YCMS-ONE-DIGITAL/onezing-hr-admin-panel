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

  const chartDataSets = {
    Daily: [
      { month: "Mon", performance: 4 },
      { month: "Tue", performance: 8 },
      { month: "Wed", performance: 5 },
      { month: "Thu", performance: 9 },
      { month: "Fri", performance: 6 },
      { month: "Sat", performance: 11 },
      { month: "Sun", performance: 8 },
    ],
    Monthly: [
      { month: "Jan", performance: 55 },
      { month: "Feb", performance: 72 },
      { month: "Mar", performance: 61 },
      { month: "Apr", performance: 85 },
      { month: "May", performance: 77 },
      { month: "Jun", performance: 90 },
    ],
    Yearly: [
      { month: "2020", performance: 68 },
      { month: "2021", performance: 75 },
      { month: "2022", performance: 82 },
      { month: "2023", performance: 91 },
      { month: "2024", performance: 87 },
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

  return (
    <div
      className="
        flex flex-wrap justify-between items-start gap-8 p-8 bg-[#f9fafc]
        min-h-screen overflow-y-auto
        max-md:flex-col max-md:items-center max-md:gap-6 max-md:p-3 max-md:overflow-y-scroll
      "
    >
      <div
        className="
          grid grid-cols-2 gap-6 flex-1 max-w-[700px]
          max-lg:max-w-[600px]
          max-md:grid-cols-2 max-md:gap-3 max-md:w-full
        "
      >
        {cards.map((card, i) => (
          <div
            key={i}
            className="
              bg-white rounded-xl p-5 flex items-center gap-4 shadow-md
              hover:-translate-y-1 hover:shadow-lg transition-transform duration-200 cursor-pointer
              max-md:flex-col max-md:items-center max-md:justify-center max-md:p-3
              max-md:h-[110px]
            "
          >
            <div
              className="
                rounded-full p-3 flex items-center justify-center text-[24px]
                max-md:text-[18px] max-md:p-2
              "
              style={{ color: card.color, backgroundColor: "#f1f3f9" }}
            >
              {card.icon}
            </div>
            <div className="flex flex-col items-start max-md:items-center">
              <h4 className="text-[15px] text-[#555] max-md:text-[12px] text-center">
                {card.title}
              </h4>
              <p className="text-[18px] font-semibold text-[#222] max-md:text-[14px] text-center">
                {card.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div
        className="
          flex-[1.5] bg-white rounded-xl p-6 shadow-md
          flex flex-col justify-between
          max-md:w-full max-md:p-4 max-md:order-last
        "
      >
        <div className="flex justify-between items-center mb-3 max-md:flex-col max-md:items-center max-md:text-center max-md:gap-2">
          <h3 className="text-[#2f2f2f] font-semibold text-[18px] max-md:text-[15px] text-center">
            Project Performance Analytics
          </h3>
          <div className="flex gap-2 justify-center">
            {["Daily", "Monthly", "Yearly"].map((label) => (
              <button
                key={label}
                onClick={() => setChartType(label)}
                className={`
                  border border-gray-300 rounded-md px-3 py-1 text-[13px] transition
                  ${
                    chartType === label
                      ? "bg-[#007bff] text-white border-[#007bff]"
                      : "bg-white text-gray-600 hover:bg-[#007bff] hover:text-white hover:border-[#007bff]"
                  }
                  max-md:text-[11px] max-md:px-2 max-md:py-1
                `}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div
          className="
            w-full mt-4 flex justify-center items-center
            overflow-y-scroll scrollbar-hide
            max-md:h-[320px] max-md:overflow-y-scroll max-md:pb-4
          "
          style={{
            height: "380px",
          }}
        >
          <ResponsiveContainer width="100%" height={320}>
            <LineChart
              data={chartDataSets[chartType]}
              margin={{ top: 10, right: 15, left: -10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis dataKey="month" stroke="#555" />
              <YAxis stroke="#555" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="performance"
                stroke="#007bff"
                strokeWidth={3}
                dot={{ fill: "#007bff", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
