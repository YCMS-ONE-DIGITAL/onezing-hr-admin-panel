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
      color: "#1E3A8A",
    },
    {
      id: 2,
      title: "Total Payroll",
      value: "Auto Calculated",
      icon: <FaMoneyBillWave />,
      color: "#166534",
    },
    {
      id: 3,
      title: "Paid Employees",
      value: payrollData.length,
      icon: <FaClock />,
      color: "#B45309",
    },
    {
      id: 4,
      title: "Total Deductions",
      value: "₹" + payrollData.length * 700,
      icon: <FaFileInvoiceDollar />,
      color: "#B91C1C",
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
        absolute top-[100px] left-[270px] right-0 bottom-0 
        bg-[#f9fafc] p-8 overflow-y-auto
        max-md:left-0 max-md:top-[100px] max-md:p-4
      "
    >
      {/* HEADER */}
      <header className="mb-8 text-center max-md:mt-4">
        <h1 className="text-[26px] md:text-[32px] font-semibold text-gray-800">
          Payroll Management
        </h1>
        <p className="text-gray-500 text-[13px] md:text-[15px] mt-1">
          Auto-generated payroll based on employee records
        </p>
      </header>

      {/* SUMMARY CARDS — EXACT ATTENDANCE STYLE */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8 w-[95%] md:w-[90%] mx-auto">
        {summaryData.map((card, i) => (
          <div
            key={i}
            className="
              bg-white shadow-md rounded-xl 
              p-4 md:p-6 flex flex-col items-center text-center 
              hover:shadow-lg hover:-translate-y-1 transition
              h-[125px] md:h-[130px]
            "
            style={{ border: "1px solid #e5e7eb" }}
          >
            <div className="mb-1 text-[26px]" style={{ color: card.color }}>
              {card.icon}
            </div>
            <h3 className="text-[12px] md:text-[14px] text-gray-600">
              {card.title}
            </h3>
            <p className="text-[14px] md:text-[17px] font-semibold text-gray-800">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* TABLE TITLE */}
      <h2 className="text-xl font-semibold mb-4 w-[95%] md:w-[90%] mx-auto max-md:text-[18px]">
        Employee Payroll Summary
      </h2>

      {/* TABLE — SAME AS ATTENDANCE TABLE BUT WIDTH INCREASED */}
      <div
        className="
          bg-white shadow-lg rounded-xl 
          w-[95%] md:w-[90%] mx-auto 
          border border-gray-300
          overflow-x-auto
          max-md:max-h-[450px]
        "
      >
        <table className="w-full min-w-[900px] text-[14px] max-md:text-[12px] border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-3 px-4 text-left">SR</th>
              <th className="py-3 px-4 text-left">Employee</th>
              <th className="py-3 px-4 text-left">Designation</th>
              <th className="py-3 px-4 text-left">Salary</th>
              <th className="py-3 px-4 text-left">Deductions</th>
              <th className="py-3 px-4 text-left">Net Pay</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {payrollData.map((emp, idx) => (
              <tr
                key={emp.id}
                className="border-b border-gray-300 hover:bg-blue-50 transition"
              >
                <td className="py-3 px-4 font-medium text-gray-800">
                  #{idx + 1}
                </td>

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

      {isSlipOpen && selectedSlip && (
        <SalarySlip slip={selectedSlip} onClose={() => setIsSlipOpen(false)} />
      )}
    </div>
  );
};

export default Payroll;
