import React, { useState } from "react";
import {
  FaUser,
  FaMoneyBillWave,
  FaClock,
  FaFileInvoiceDollar,
  FaDownload,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const Payroll = () => {
  const summaryData = [
    { id: 1, title: "Total Employees", value: 120, icon: <FaUser />, color: "#3B82F6" },
    { id: 2, title: "Total Payroll (Month)", value: "₹12,00,000", icon: <FaMoneyBillWave />, color: "#16A34A" },
    { id: 3, title: "Pending Payments", value: 5, icon: <FaClock />, color: "#FACC15" },
    { id: 4, title: "Total Deductions", value: "₹1,50,000", icon: <FaFileInvoiceDollar />, color: "#EF4444" },
  ];

  const [payrollData, setPayrollData] = useState([
    {
      id: 1,
      name: "Ravi Patil",
      designation: "Software Engineer",
      salary: "₹80,000",
      deductions: "₹5,000",
      netPay: "₹75,000",
      status: "Paid",
    },
    {
      id: 2,
      name: "Sneha Jadhav",
      designation: "HR Manager",
      salary: "₹90,000",
      deductions: "₹8,000",
      netPay: "₹82,000",
      status: "Pending",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    salary: "",
    deductions: "",
    status: "Paid",
  });

  const [editingId, setEditingId] = useState(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ name: "", designation: "", salary: "", deductions: "", status: "Paid" });
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const calculateNetPay = () => {
    const salary = parseInt(formData.salary || 0);
    const deductions = parseInt(formData.deductions || 0);
    return `₹${salary - deductions}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.salary.trim()) {
      alert("Please fill required fields");
      return;
    }

    const newEntry = {
      id: editingId || Date.now(),
      name: formData.name,
      designation: formData.designation,
      salary: `₹${formData.salary}`,
      deductions: `₹${formData.deductions}`,
      netPay: calculateNetPay(),
      status: formData.status,
    };

    if (editingId) {
      setPayrollData(payrollData.map((item) => (item.id === editingId ? newEntry : item)));
      setEditingId(null);
    } else {
      setPayrollData([...payrollData, newEntry]);
    }

    handleCloseModal();
  };

  const handleEdit = (id) => {
    const entry = payrollData.find((p) => p.id === id);
    setFormData({
      name: entry.name,
      designation: entry.designation,
      salary: entry.salary.replace(/[^\d]/g, ""),
      deductions: entry.deductions.replace(/[^\d]/g, ""),
      status: entry.status,
    });
    setEditingId(id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) =>
    setPayrollData(payrollData.filter((p) => p.id !== id));

  return (
    <div
      className="
        absolute top-[120px] left-[270px] right-0 bottom-0 bg-[#f9fafc]
        p-8 overflow-y-auto
        max-md:relative max-md:left-0 max-md:top-[60px] max-md:p-4
        max-md:h-[calc(100vh-60px)] max-md:overflow-y-scroll
      "
    >
      <header className="mb-8 text-center">
        <h1 className="text-[26px] md:text-[32px] font-semibold text-gray-800">
          Payroll Management
        </h1>
        <p className="text-gray-500 text-[13px] md:text-[15px] mt-1">
          Manage employee salaries, deductions, and payslips efficiently.
        </p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-10">
        {summaryData.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-xl p-4 md:p-6 flex flex-col items-center justify-center text-center transition-all hover:shadow-lg hover:-translate-y-1"
          >
            <div
              className="text-[26px] md:text-[32px] mb-2"
              style={{ color: item.color }}
            >
              {item.icon}
            </div>
            <h3 className="text-[13px] md:text-[16px] text-gray-600 font-medium">
              {item.title}
            </h3>
            <p className="font-semibold text-[15px] md:text-[18px] text-gray-800">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white shadow-md rounded-xl p-4 md:p-6 max-w-[1100px] mx-auto max-md:overflow-x-auto">
        <div className="flex justify-between items-center mb-4 max-md:flex-col max-md:gap-2">
          <h2 className="text-[18px] md:text-[22px] font-semibold text-gray-800 text-center w-full md:w-auto">
            Employee Payroll Summary
          </h2>
          <button
            onClick={handleOpenModal}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-[13px] md:text-[15px] px-4 py-2 rounded-md shadow-sm transition"
          >
            <FaDownload className="text-[14px]" /> Generate Payslip
          </button>
        </div>

        <table className="w-full min-w-[700px] border-collapse text-[13px] md:text-[15px]">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">Employee</th>
              <th className="py-3 px-4 text-left font-semibold">Designation</th>
              <th className="py-3 px-4 text-left font-semibold">Salary</th>
              <th className="py-3 px-4 text-left font-semibold">Deductions</th>
              <th className="py-3 px-4 text-left font-semibold">Net Pay</th>
              <th className="py-3 px-4 text-left font-semibold">Status</th>
              <th className="py-3 px-4 text-center font-semibold">Actions</th>
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
                <td className="py-3 px-4 font-semibold">{emp.netPay}</td>
                <td className="py-3 px-4 text-center">
                  <span
                    className={`px-3 py-1.5 rounded-full text-[13px] font-medium ${
                      emp.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => handleEdit(emp.id)}
                      className="text-blue-500 hover:text-blue-700 transition"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(emp.id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-[999]">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-[500px] relative">
            <h2 className="text-xl font-semibold mb-4 text-center">
              {editingId ? "Edit Payslip" : "Generate Payslip"}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 text-[14px]"
            >
              <input
                type="text"
                name="name"
                placeholder="Employee Name"
                value={formData.name}
                onChange={handleChange}
                className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
              <input
                type="text"
                name="designation"
                placeholder="Designation"
                value={formData.designation}
                onChange={handleChange}
                className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <input
                type="number"
                name="salary"
                placeholder="Salary (₹)"
                value={formData.salary}
                onChange={handleChange}
                className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <input
                type="number"
                name="deductions"
                placeholder="Deductions (₹)"
                value={formData.deductions}
                onChange={handleChange}
                className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option>Paid</option>
                <option>Pending</option>
              </select>

              <p className="text-gray-600 text-sm mt-1">
                <strong>Net Pay:</strong> {calculateNetPay()}
              </p>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Done
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payroll;
           