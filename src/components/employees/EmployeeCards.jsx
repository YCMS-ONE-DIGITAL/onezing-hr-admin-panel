import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EmployeeCards() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  // Load employees from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("employees");
    if (saved) setEmployees(JSON.parse(saved));
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#f8f9fb] flex justify-center">

      {/* 🔹 MAIN WRAPPER — MORE RIGHT SHIFT & WIDER */}
      <div
        className="
        max-w-[1350px]          /* ⬅ width increased */
        w-full
        px-6 py-6
        translate-x-6 md:translate-x-20   /* ⬅ moved more Right */
      "
      >
        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-[23px] md:text-[26px] font-semibold text-gray-800">
            Employee Profiles
          </h1>

          <button
            onClick={() => navigate("/employees")}
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 text-sm"
          >
            Back to List
          </button>
        </div>

        {/* ================= FILTERS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <input
            className="border p-3 rounded-lg text-sm shadow-sm"
            placeholder="Employee Name"
          />
          <input
            className="border p-3 rounded-lg text-sm shadow-sm"
            placeholder="Employee ID"
          />
          <select className="border p-3 rounded-lg text-sm shadow-sm">
            <option>Employee Designation</option>
            <option>Developer</option>
            <option>Manager</option>
            <option>HR</option>
          </select>

          <button className="bg-green-500 text-white rounded-lg px-4 py-2 shadow text-sm hover:bg-green-600">
            Filters
          </button>
        </div>

        {/* ================= EMPLOYEE CARDS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
          {employees.map((emp) => (
            <div
              key={emp.id}
              className="bg-white shadow-lg rounded-xl px-5 py-6 flex flex-col items-center hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              {/* 🔹 Avatar slightly bigger */}
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${emp.firstName}`}
                className="w-24 h-24 md:w-28 md:h-28 rounded-full shadow"
                alt="avatar"
              />

              <h2 className="mt-4 text-[15px] md:text-[17px] font-semibold text-gray-800 text-center">
                {emp.firstName} {emp.lastName}
              </h2>

              <p className="text-gray-500 text-[12px] md:text-[13px]">
                {emp.designation}
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() =>
                    navigate(`/employee/${emp.id}`, {
                      state: { employee: emp },
                    })
                  }
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-[12px]"
                >
                  View
                </button>

                <button
                  onClick={() => alert(`Calling ${emp.firstName}...`)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-[12px]"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* NO EMPLOYEE FOUND MESSAGE */}
        {employees.length === 0 && (
          <p className="text-gray-500 text-center mt-10 italic text-sm">
            No employees found.
          </p>
        )}
      </div>
    </div>
  );
}
