import React, { useState } from "react";
import "./ProjectManagement.css";

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
    <div className="project-wrapper">
      <h1>Project Management</h1>

      <table className="project-table">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Manager</th>
            <th>Team Members</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Progress</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((p, index) => (
            <tr key={index}>
              <td>{p.name}</td>
              <td>{p.manager}</td>
              <td>{p.team.join(", ")}</td>
              <td>{p.startDate}</td>
              <td>{p.endDate}</td>
              <td>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${p.progress}%` }}
                  ></div>
                </div>
                <span className="progress-text">{p.progress}%</span>
              </td>
              <td>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
