import React, { useState } from "react";
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
    <div
      className="
        absolute top-[110px] left-[250px] right-0 bottom-0 bg-[#f9fafc]
        p-10 overflow-y-auto pb-[100px]
        max-md:relative max-md:top-[30px] max-md:left-0 max-md:p-4 max-md:pb-[120px]
      "
    >
      <h1 className="text-center text-[30px] font-semibold text-[#222] mb-8 max-md:text-[20px]">
        Reports & Analytics
      </h1>


      <div
        className="
          bg-white rounded-xl shadow-md p-6 mb-8 w-[90%] mx-auto
          max-md:w-full max-md:p-4
        "
      >
        <div className="flex justify-between items-center mb-3 max-md:flex-col max-md:gap-2">
          <h2 className="text-[20px] font-semibold text-gray-800 max-md:text-[16px] text-center">
            Employee Performance Reports
          </h2>

          <select
            className="
              border border-gray-300 rounded-md px-3 py-2 bg-gray-50 
              text-[14px] cursor-pointer outline-none
              max-md:text-[12px] max-md:px-2 max-md:py-1
            "
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

        <p className="text-gray-600 mb-4 text-[14px] max-md:text-[12px] text-center md:text-left">
          Track employee KPIs and performance trends across months.
        </p>

        <div
          className="
            bg-[#eef1f7] rounded-lg p-3 w-full h-[300px]
            max-md:h-[180px]
          "
        >
          <ResponsiveContainer width="100%" height="100%">
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


      <div
        className="
          bg-white rounded-xl shadow-md p-6 mb-8 w-[90%] mx-auto
          max-md:w-full max-md:p-4
        "
      >
        <div className="flex justify-between items-center mb-3 max-md:flex-col max-md:gap-2">
          <h2 className="text-[20px] font-semibold text-gray-800 max-md:text-[16px] text-center">
            Recruitment & Turnover Analytics
          </h2>

          <select
            className="
              border border-gray-300 rounded-md px-3 py-2 bg-gray-50 
              text-[14px] cursor-pointer outline-none
              max-md:text-[12px] max-md:px-2 max-md:py-1
            "
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

        <p className="text-gray-600 mb-4 text-[14px] max-md:text-[12px] text-center md:text-left">
          Insights about new hires, resignations, and turnover trends.
        </p>

        <div
          className="
            bg-[#eef1f7] rounded-lg p-3 w-full h-[300px]
            max-md:h-[180px]
          "
        >
          <ResponsiveContainer width="100%" height="100%">
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
