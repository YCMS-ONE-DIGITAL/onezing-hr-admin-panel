import React, { useState, useEffect } from "react";
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

export default function Dashboard() {
  const [chartType, setChartType] = useState("Daily");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        absolute top-[110px] left-[270px] right-0 bottom-0 bg-[#f9fafc]
        flex gap-8 p-8 box-border overflow-y-auto
        max-md:relative max-md:left-0 max-md:top-[55px]
        max-md:flex-col max-md:p-4 max-md:gap-6 max-md:w-full
        max-md:min-h-[100vh] max-md:overflow-y-scroll max-md:pb-[160px]
      "
    >

      <div
        className="
          grid grid-cols-2 gap-4 flex-1 max-w-[500px]
          xl:grid-cols-2 lg:grid-cols-2
          max-md:grid-cols-2 max-md:gap-3 max-md:w-full max-md:max-w-full
        "
      >
        {cards.map((card, index) => (
          <div
            key={index}
            className="
              bg-white rounded-xl p-2 flex items-center gap-2 shadow-md
              hover:-translate-y-1 hover:shadow-lg transition-transform duration-200 cursor-pointer
              max-md:flex-col max-md:items-center max-md:justify-center max-md:p-3
              max-md:h-[110px]
            "
          >
            <div
              className="rounded-full p-2 flex items-center justify-center text-[20px] max-md:text-[16px] max-md:p-2"
              style={{ color: card.color, backgroundColor: "#f1f3f9" }}
            >
              {card.icon}
            </div>
            <div className="flex flex-col items-start max-md:items-center">
              <h4 className="text-[14px] font-semibold text-gray-800 max-md:text-[12px] text-center">
                {card.title}
              </h4>
              <p className="text-[18px] font-bold text-[#222] max-md:text-[14px] text-center">
                {card.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div
        className="
          flex-[1.5] bg-white rounded-xl shadow-md flex flex-col items-center justify-center 
          max-md:w-full max-md:p-3 max-md:shadow-sm
        "
        style={{
          height: isMobile ? "260px" : "710px", 
        }}
      >
        <div className="flex justify-between items-center mb-2 w-full px-4 max-md:flex-col max-md:items-center max-md:text-center max-md:gap-2">
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
          className="flex justify-center items-center w-full"
          style={{
            height: isMobile ? "180px" : "600px", 
          }}
        >
          <div className="w-[95%] h-full flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartDataSets[chartType]}>
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
    </div>
  );
}
