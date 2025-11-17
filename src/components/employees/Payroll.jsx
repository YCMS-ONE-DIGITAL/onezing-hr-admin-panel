import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaMoneyBillWave,
  FaClock,
  FaFileInvoiceDollar,
  FaEdit,
  FaTrash,
  FaEye,
} from "react-icons/fa";

import SalarySlip from "./PayrollSlip.jsx";

const Payroll = () => {
  const [employees, setEmployees] = useState([]);
  const [payrollData, setPayrollData] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("employees");
    if (saved) setEmployees(JSON.parse(saved));
  }, []);

  const generatePayrollForEmployees = () => {
    return employees.map((emp) => ({
      id: emp.id,
      name: `${emp.firstName} ${emp.lastName}`,
      designation: emp.designation || "Employee",
      salary: emp.salary || "₹30000",
      deductions: emp.deductions || "₹700",
      netPay: emp.netPay || "₹29300",
      status: "Paid",
    }));
  };

  useEffect(() => {
    setPayrollData(generatePayrollForEmployees());
  }, [employees]);

  const summaryData = [
    {
      id: 1,
      title: "Total Employees",
      value: payrollData.length,
      icon: <FaUser />,
      color: "#3B82F6",
    },
    {
      id: 2,
      title: "Total Payroll",
      value: "Auto Calculated",
      icon: <FaMoneyBillWave />,
      color: "#16A34A",
    },
    {
      id: 3,
      title: "Paid Employees",
      value: payrollData.length,
      icon: <FaClock />,
      color: "#FACC15",
    },
    {
      id: 4,
      title: "Total Deductions",
      value: "₹" + payrollData.length * 700,
      icon: <FaFileInvoiceDollar />,
      color: "#EF4444",
    },
  ];

  const [isSlipOpen, setIsSlipOpen] = useState(false);
  const [selectedSlip, setSelectedSlip] = useState(null);

  const handleViewSlip = (emp) => {
    setSelectedSlip(emp);
    setIsSlipOpen(true);
  };

  const handleDelete = (id) => {
    setPayrollData((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <div
      className="
        absolute top-[120px] left-[270px] right-0 bottom-0 bg-[#f9fafc]
        p-8 overflow-y-auto
        max-md:left-0 max-md:top-[60px] max-md:p-4
      "
    >
      <header className="mb-8 text-center">
        <h1 className="text-[26px] md:text-[32px] font-semibold text-gray-800">
          Payroll Management
        </h1>
        <p className="text-gray-500 text-[13px] md:text-[15px] mt-1">
          Auto-generated payroll based on employee records
        </p>
      </header>

      {/* ⭐ UPDATED SUMMARY CARDS WITH HIGHER HEIGHT */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10 max-w-[1300px] mx-auto">
        {summaryData.map((item) => (
          <div
            key={item.id}
            className="
              bg-white shadow-md rounded-xl 
              p-4 flex flex-col items-center text-center 
              hover:shadow-lg transition
              h-[150px]          /* ⬅️ HEIGHT INCREASED */
            "
          >
            <div className="text-[28px]" style={{ color: item.color }}>
              {item.icon}
            </div>
            <h3 className="text-[15px] text-gray-600 mt-2">{item.title}</h3>
            <p className="text-[18px] font-semibold mt-1">{item.value}</p>
          </div>
        ))}
      </div>

      {/* TABLE */}
      <div className="bg-white shadow-md rounded-xl p-6 w-[97%] md:w-[90%] max-w-[1300px] mx-auto">
        <h2 className="text-xl font-semibold mb-4">Employee Payroll Summary</h2>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="py-3 px-4">Employee</th>
                <th className="py-3 px-4">Designation</th>
                <th className="py-3 px-4">Salary</th>
                <th className="py-3 px-4">Deductions</th>
                <th className="py-3 px-4">Net Pay</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {payrollData.map((emp) => (
                <tr
                  key={emp.id}
                  className="border-b border-gray-200 hover:bg-blue-50 transition"
                >
                  <td className="py-3 px-4">{emp.name}</td>
                  <td className="py-3 px-4">{emp.designation}</td>
                  <td className="py-3 px-4">{emp.salary}</td>
                  <td className="py-3 px-4">{emp.deductions}</td>
                  <td className="py-3 px-4">{emp.netPay}</td>

                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full ${
                        emp.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>

                  <td className="py-3 px-4 flex justify-center gap-4 text-lg">
                    <button
                      onClick={() => handleViewSlip(emp)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <FaEye />
                    </button>

                    <button className="text-blue-500 hover:text-blue-700">
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => handleDelete(emp.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isSlipOpen && selectedSlip && (
        <SalarySlip slip={selectedSlip} onClose={() => setIsSlipOpen(false)} />
      )}
    </div>
  );
};

export default Payroll;
