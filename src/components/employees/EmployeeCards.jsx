import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EmployeeCards() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("employees");
    if (saved) setEmployees(JSON.parse(saved));
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#f8f9fb] overflow-y-auto">

      {/* ⭐ MAIN WRAPPER — Laptop perfect + mobile scroll fix */}
      <div
        className="
          max-w-[1100px]
          w-full
          mx-auto
          px-3
          py-4
          ml-0 md:ml-[230px]
          mt-[15px]
          transition-all

          /* ⭐ Mobile Scroll + Bottom Space Fix */
          max-md:pb-10
        "
      >

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-[18px] font-semibold text-gray-800">
            Employee Profiles
          </h1>

          <button
            onClick={() => navigate("/employees")}
            className="px-3 py-[5px] bg-blue-500 text-white rounded-md text-[11px] shadow hover:bg-blue-600"
          >
            Back to List
          </button>
        </div>

        {/* FILTERS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mb-5">

          <input
            className="border p-2 rounded-lg text-[11px] shadow-sm h-[30px]"
            placeholder="Employee Name"
          />

          <input
            className="border p-2 rounded-lg text-[11px] shadow-sm h-[30px]"
            placeholder="Employee ID"
          />

          <select className="border p-2 rounded-lg text-[11px] shadow-sm h-[30px]">
            <option>Designation</option>
            <option>Developer</option>
            <option>Manager</option>
            <option>HR</option>
          </select>

          <button
            className="bg-green-500 text-white rounded-lg px-3 py-[6px] text-[11px] shadow hover:bg-green-600 h-[30px]"
          >
            Filters
          </button>
        </div>

        {/* EMPLOYEE CARDS */}
        <div
          className="
            grid grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            gap-4

            /* ⭐ Mobile bottom spacing fix */
            max-md:pb-6
          "
        >
          {employees.map((emp) => (
            <div
              key={emp.id}
              className="
                bg-white shadow-md rounded-xl 
                px-3 py-4 
                flex flex-col items-center
                hover:shadow-lg hover:-translate-y-1
                transition-all
                h-[170px]
              "
            >
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${emp.firstName}`}
                className="w-14 h-14 rounded-full shadow"
                alt="avatar"
              />

              <h2 className="mt-2 text-[13px] font-semibold text-gray-800 text-center leading-tight">
                {emp.firstName} {emp.lastName}
              </h2>

              <p className="text-gray-500 text-[10px]">{emp.designation}</p>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() =>
                    navigate(`/employee/${emp.id}`, {
                      state: { employee: emp },
                    })
                  }
                  className="px-2 py-[4px] bg-blue-500 hover:bg-blue-600 text-white rounded text-[10px]"
                >
                  View
                </button>

                <button
                  onClick={() => alert(`Editing ${emp.firstName}...`)}
                  className="px-2 py-[4px] bg-gray-200 hover:bg-gray-300 rounded text-[10px]"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>

        {employees.length === 0 && (
          <p className="text-gray-500 text-center mt-10 italic text-sm">
            No employees found.
          </p>
        )}
      </div>
    </div>
  );
}
