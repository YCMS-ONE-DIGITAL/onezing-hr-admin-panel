
import React from "react";
import "./AttendanceCards.css";
import { UserCheck, UserX, Coffee, Users } from "lucide-react";

const AttendanceCards = () => {
  const data = [
    { title: "Total Employees", value: 120, icon: <Users />, color: "#007bff" },
    { title: "Present Today", value: 98, icon: <UserCheck />, color: "#28a745" },
    { title: "Absent Today", value: 15, icon: <UserX />, color: "#dc3545" },
    { title: "On Leave", value: 7, icon: <Coffee />, color: "#ffc107" },
  ];

  return (
    <div className="attendance-cards">
      {data.map((item, i) => (
        <div key={i} className="attendance-card">
          <div className="card-icon" style={{ backgroundColor: item.color + "22", color: item.color }}>
            {item.icon}
          </div>
          <div className="card-info">
            <h4>{item.title}</h4>
            <h2>{item.value}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttendanceCards;
