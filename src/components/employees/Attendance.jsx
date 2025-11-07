import React from "react";
import "./Attendance.css";
import { FaUserCheck, FaUserTimes, FaCalendarAlt, FaClock } from "react-icons/fa";

const Attendance = () => {
  const employees = [
    { id: 1, name: "John Doe", role: "Software Engineer", department: "IT", status: "Present" },
    { id: 2, name: "Jane Smith", role: "UI/UX Designer", department: "Design", status: "On Leave" },
    { id: 3, name: "Michael Lee", role: "Project Manager", department: "Operations", status: "Absent" },
    { id: 4, name: "Sarah Khan", role: "HR Executive", department: "HR", status: "Present" },
    { id: 5, name: "Rohit Sharma", role: "Backend Developer", department: "IT", status: "Late" },
  ];

  return (
    <div className="attendance-wrapper">
      {/* ======= Page Header ======= */}
      <header className="attendance-header">
        <div>
          <h1 className="attendance-heading">Employee Attendance</h1>
          <p className="attendance-subtitle">
            Track daily presence, absences, and leave summary in one glance.
          </p>
        </div>
      </header>

      {/* ======= Summary Cards ======= */}
      <div className="summary-section">
        <div className="summary-card present">
          <FaUserCheck className="summary-icon" />
          <div>
            <h3>Present</h3>
            <p>48 Employees</p>
          </div>
        </div>

        <div className="summary-card absent">
          <FaUserTimes className="summary-icon" />
          <div>
            <h3>Absent</h3>
            <p>12 Employees</p>
          </div>
        </div>

        <div className="summary-card leave">
          <FaCalendarAlt className="summary-icon" />
          <div>
            <h3>On Leave</h3>
            <p>6 Employees</p>
          </div>
        </div>

        <div className="summary-card late">
          <FaClock className="summary-icon" />
          <div>
            <h3>New Employees</h3>
            <p>3 Employees</p>
          </div>
        </div>
      </div>

      {/* ======= Employee Attendance Table ======= */}
      <div className="attendance-table-section">
        <h2 className="table-heading">Attendance Details</h2>
        <table className="attendance-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Role</th>
              <th>Department</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.role}</td>
                <td>{emp.department}</td>
                <td className={`status ${emp.status.toLowerCase()}`}>{emp.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
