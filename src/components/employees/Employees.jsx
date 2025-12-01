import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Employees() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem("employees");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            firstName: "Adrianna",
            lastName: "Stevens",
            designation: "Software Engineer",
            department: "Development",
            status: "Active",
            email: "adrianna@example.com",
            contact: "+91 9876543210",
            address: "Pune, Maharashtra",
            joiningDate: "2023-02-12",
            accountName: "Adrianna S",
            accountNumber: "1122334455",
            bankName: "HDFC Bank",
            branchName: "Wakad",
          },
          {
            id: 2,
            firstName: "Ravi",
            lastName: "Patil",
            designation: "HR Manager",
            department: "Human Resources",
            status: "Active",
            email: "ravi@example.com",
            contact: "+91 9988776655",
            address: "Mumbai, Maharashtra",
            joiningDate: "2021-08-10",
            accountName: "Ravi P",
            accountNumber: "7788990011",
            bankName: "SBI",
            branchName: "Thane",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    email: "",
    username: "",
    employeeId: "",
    address: "",
    designation: "",
    joiningDate: "",
    accountName: "",
    accountNumber: "",
    bankName: "",
    branchName: "",
    status: "Active",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
    setFormData({
      firstName: "",
      lastName: "",
      contact: "",
      email: "",
      username: "",
      employeeId: "",
      address: "",
      designation: "",
      joiningDate: "",
      accountName: "",
      accountNumber: "",
      bankName: "",
      branchName: "",
      status: "Active",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newId;
    if (editingEmployee) {
      newId = editingEmployee;
    } else {
      const last = employees[employees.length - 1];
      newId = last ? last.id + 1 : 1;
    }

    const fullObject = {
      id: newId,
      ...formData,
      name: `${formData.firstName} ${formData.lastName}`,
      department: formData.department || "General",
    };

    if (editingEmployee) {
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === editingEmployee ? fullObject : emp))
      );
    } else {
      setEmployees((prev) => [...prev, fullObject]);
    }

    closeModal();
  };

  const handleEdit = (id) => {
    const emp = employees.find((e) => e.id === id);

    setFormData({
      ...emp,
      firstName: emp.firstName,
      lastName: emp.lastName,
    });

    setEditingEmployee(id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Do you really want to delete this employee?")) {
      setEmployees((prev) => prev.filter((e) => e.id !== id));
    }
  };

  return (
    <div
      className="
        absolute top-[115px] left-[250px] right-0 bottom-0 bg-[#f8f9fb]
        flex flex-col items-center p-8 font-[Poppins]
        max-md:left-0 max-md:top-[140px] max-md:p-4
      "
    >
      <h1 className="text-center text-[28px] md:text-[32px] font-semibold text-gray-800 mb-2">
        Employee Management
      </h1>

      {/* SEARCH + ADD BUTTON */}
      <div className="flex flex-col md:flex-row justify-between items-center w-[95%] md:w-[90%] max-w-[1300px] mb-6 gap-3">
        <input
          type="text"
          placeholder="Search employee..."
          className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full md:w-64"
        />

        <button
          onClick={openModal}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md shadow-md text-sm font-medium transition"
        >
          <FaPlus className="text-[13px]" /> Add Employee
        </button>
      </div>

      {/* TABLE */}
      <div
        className="
        bg-white shadow-md rounded-xl 
        w-[97%] md:w-[90%] max-w-[1300px] 
        overflow-x-auto
      "
      >
        <table className="w-full min-w-[900px] border-collapse text-[14px] text-center">
          <thead className="bg-blue-500 text-white sticky top-0">
            <tr>
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Employee Name</th>
              <th className="py-3 px-4">Designation</th>
              <th className="py-3 px-4">Department</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((e) => (
              <tr
                key={e.id}
                className="border-b border-gray-200 hover:bg-blue-50"
              >
                <td className="py-3 px-4 text-gray-600">#{e.id}</td>

                <td
                  onClick={() =>
                    navigate(`/employee/${e.id}`, { state: { employee: e } })
                  }
                  className="py-3 px-4 font-medium text-gray-800 cursor-pointer hover:text-blue-600"
                >
                  {e.firstName} {e.lastName}
                </td>

                <td className="py-3 px-4">{e.designation}</td>
                <td className="py-3 px-4">{e.department}</td>

                <td
                  className={`py-3 px-4 font-semibold ${
                    e.status === "Active" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {e.status}
                </td>

                <td className="py-3 px-4">
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => handleEdit(e.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => handleDelete(e.id)}
                      className="text-red-500 hover:text-red-700"
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

      {/* UPDATED MODERN POPUP */}
      {isModalOpen && (
        <div
          className="
            fixed inset-0 bg-black/50 backdrop-blur-sm 
            flex justify-center items-start
            z-[999]
            px-4
            pt-[70px]
            "
        >
          <div
          className="
            bg-white p-6 md:p-8 rounded-2xl shadow-2xl border border-gray-200
            w-full max-w-[700px]
            max-h-[88vh] overflow-y-auto scrollbar-hide
          "
        >
          <style>
            {`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
              .scrollbar-hide {
                -ms-overflow-style: none; /* IE and Edge */
                scrollbar-width: none; /* Firefox */
              }
            `}
          </style>
          
            <style>{`
              @keyframes fadeIn {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
              }
              .scrollbar-hide::-webkit-scrollbar { display: none; }
            `}</style>

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                {editingEmployee ? "Edit Employee" : "Add Employee"}
              </h2>

              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              <div className="flex flex-col gap-1">
                <label className="font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium text-gray-700">Contact</label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium text-gray-700">Designation</label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium text-gray-700">Joining Date</label>
                <input
                  type="date"
                  name="joiningDate"
                  value={formData.joiningDate}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium text-gray-700">Account Name</label>
                <input
                  type="text"
                  name="accountName"
                  value={formData.accountName}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium text-gray-700">Account Number</label>
                <input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium text-gray-700">Bank Name</label>
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium text-gray-700">Branch Name</label>
                <input
                  type="text"
                  name="branchName"
                  value={formData.branchName}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end md:col-span-2 gap-4 mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                >
                  {editingEmployee ? "Update" : "Add Employee"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
