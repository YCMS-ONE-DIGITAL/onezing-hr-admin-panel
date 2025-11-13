import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EmployeeCards() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  // Load employees from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("employees");
    if (saved) {
      setEmployees(JSON.parse(saved));
    }
  }, []);

  return (
    <div
      className="
        absolute top-[115px] left-[250px] right-0 
        p-6 bg-[#f8f9fb] min-h-screen
        max-md:left-0 max-md:top-[60px]
      "
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Employee Profiles
        </h1>

        <button
          onClick={() => navigate("/employees")}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
        >
          Back to List
        </button>
      </div>

      {/* Filters UI unchanged */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <input
          type="text"
          placeholder="Employee Name"
          className="border p-3 rounded-lg shadow-sm"
        />
        <input
          type="text"
          placeholder="Employee ID"
          className="border p-3 rounded-lg shadow-sm"
        />
        <select className="border p-3 rounded-lg shadow-sm">
          <option>Employee Designation</option>
          <option>Developer</option>
          <option>Manager</option>
          <option>HR</option>
        </select>
        <button className="bg-green-500 text-white rounded-lg px-4 py-2 shadow hover:bg-green-600">
          Filters
        </button>
      </div>

      {/* Cards UI unchanged — just dynamic */}
      <div
        className="
          grid grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          gap-6
        "
      >
        {employees.map((emp) => (
          <div
            key={emp.id}
            className="
              bg-white shadow-lg rounded-2xl p-6
              flex flex-col items-center 
              hover:shadow-xl hover:-translate-y-1
              transition-all duration-300
            "
          >
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${emp.firstName}`}
              className="w-28 h-28 rounded-full object-cover shadow-md"
              alt=""
            />

            <h2 className="mt-4 text-lg font-semibold">
              {emp.firstName} {emp.lastName}
            </h2>

            <p className="text-gray-500 text-sm">
              {emp.designation}
            </p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() =>
                  navigate(`/employee/${emp.id}`, {
                    state: { employee: emp },
                  })
                }
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg"
              >
                View
              </button>

              <button
                onClick={() => alert("Calling...")}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded-lg"
              >
                Call
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
