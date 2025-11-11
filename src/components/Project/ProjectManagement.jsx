import React, { useState } from "react";

export default function ProjectManagement() {
  const [projects] = useState([
    {
      name: "HR Management System",
      manager: "Ravi Patil",
      team: ["Harshal", "Sneha", "Amit"],
      startDate: "2025-10-01",
      endDate: "2026-03-01",
      progress: 65,
      status: "Ongoing",
    },
    {
      name: "Recruitment Portal",
      manager: "Priya Deshmukh",
      team: ["Rohit", "Meena"],
      startDate: "2025-07-15",
      endDate: "2025-12-30",
      progress: 90,
      status: "Almost Done",
    },
    {
      name: "Payroll Automation",
      manager: "Sneha Jadhav",
      team: ["Vikas", "Komal"],
      startDate: "2025-09-10",
      endDate: "2026-02-01",
      progress: 40,
      status: "In Progress",
    },
    {
      name: "Employee Attendance Tracker",
      manager: "Amit Kulkarni",
      team: ["Sonal", "Rahul"],
      startDate: "2025-08-20",
      endDate: "2025-12-10",
      progress: 80,
      status: "Near Completion",
    },
    {
      name: "Onboarding System",
      manager: "Neha Joshi",
      team: ["Pratik", "Kiran", "Maya"],
      startDate: "2025-11-01",
      endDate: "2026-04-15",
      progress: 25,
      status: "Just Started",
    },
    {
      name: "Performance Review Module",
      manager: "Rajesh Singh",
      team: ["Harshal", "Deepa"],
      startDate: "2025-06-05",
      endDate: "2025-11-30",
      progress: 95,
      status: "Completed",
    },
    {
      name: "Training Management Portal",
      manager: "Meena Patil",
      team: ["Omkar", "Tejas", "Nikita"],
      startDate: "2025-09-01",
      endDate: "2026-01-31",
      progress: 55,
      status: "Ongoing",
    },
  ]);

  return (
    <div
      className="
        absolute top-[120px] left-[260px] right-0 bottom-0
        bg-[#f7f8fc] p-10 overflow-y-auto box-border font-[Poppins]
        max-md:relative max-md:left-0 max-md:top-[60px] max-md:p-4
      "
    >
      <h1
        className="
          text-center text-[28px] font-semibold text-[#222] mb-8
          max-md:text-[20px] max-md:mb-4
        "
      >
        Project Management
      </h1>

      <div
        className="
          w-full bg-white shadow-md rounded-xl overflow-hidden
          max-w-[1200px] mx-auto
          max-md:overflow-x-auto max-md:overflow-y-hidden
        "
      >
        <table
          className="
            w-full min-w-[800px] border-collapse
            text-[14px] md:text-[15px]
          "
        >
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">
                Project Name
              </th>
              <th className="py-3 px-4 text-left font-semibold">Manager</th>
              <th className="py-3 px-4 text-left font-semibold">
                Team Members
              </th>
              <th className="py-3 px-4 text-left font-semibold">Start Date</th>
              <th className="py-3 px-4 text-left font-semibold">End Date</th>
              <th className="py-3 px-4 text-left font-semibold">Progress</th>
              <th className="py-3 px-4 text-left font-semibold">Status</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((p, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-blue-50 transition"
              >
                <td className="py-3 px-4 text-gray-700">{p.name}</td>
                <td className="py-3 px-4 text-gray-700">{p.manager}</td>
                <td className="py-3 px-4 text-gray-700">{p.team.join(", ")}</td>
                <td className="py-3 px-4 text-gray-700">{p.startDate}</td>
                <td className="py-3 px-4 text-gray-700">{p.endDate}</td>
                <td className="py-3 px-4 text-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-gray-200 rounded-full h-[8px] overflow-hidden">
                      <div
                        className="bg-blue-500 h-[8px] rounded-full"
                        style={{ width: `${p.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-[13px] text-gray-600 font-medium">
                      {p.progress}%
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1.5 rounded-full text-[13px] font-medium ${
                      p.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : p.status === "Ongoing"
                        ? "bg-blue-100 text-blue-700"
                        : p.status === "In Progress"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
