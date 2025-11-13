import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Employees() {
  const navigate = useNavigate();

  // ========================= LOAD FROM LOCAL STORAGE =========================
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem("employees");
    return saved ? JSON.parse(saved) : [
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

  // ========================= SAVE TO LOCAL STORAGE =========================
  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  // ==========================================================================

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

  // ========================= ADD / UPDATE =========================
  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate Proper Serial ID
    let newId;
    if (editingEmployee) {
      newId = editingEmployee; // keep same id during edit
    } else {
      const last = employees[employees.length - 1];
      newId = last ? last.id + 1 : 1;
    }

    const fullObject = {
      id: newId,
      ...formData,
      name: `${formData.firstName} ${formData.lastName}`,
      department: "General",
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

  // ========================= EDIT EMPLOYEE =========================
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

  // ========================= DELETE EMPLOYEE =========================
  const handleDelete = (id) => {
    if (window.confirm("Do you really want to delete this employee?")) {
      setEmployees((prev) => prev.filter((e) => e.id !== id));
    }
  };

  // ==========================================================================

  return (
    <div
      className="
        absolute top-[115px] left-[250px] right-0 bottom-0 bg-[#f8f9fb]
        flex flex-col items-center p-8 font-[Poppins]
        max-md:left-0 max-md:top-[60px] max-md:p-4
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
      <div className="bg-white shadow-md rounded-xl overflow-hidden w-[97%] md:w-[90%] max-w-[1300px] h-[460px] overflow-y-auto">
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
              <tr key={e.id} className="border-b border-gray-200 hover:bg-blue-50">
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

      {/* ===================== POPUP ===================== */}
      {isModalOpen && (
        <div
          className="
            fixed inset-0 bg-black/40 backdrop-blur-sm 
            flex justify-center items-start
            pt-[120px]
            max-md:pt-[70px]
            pb-6
            z-[999]
          "
        >
          <div
            className="
              bg-white p-6 md:p-8 rounded-2xl shadow-2xl
              w-[95%] max-w-[800px]
              max-h-[85vh] overflow-y-auto scrollbar-hide
              max-md:w-[90%] max-md:max-w-[380px]
            "
          >
            <style>{`
              .scrollbar-hide::-webkit-scrollbar { display: none; }
            `}</style>

            <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">
              {editingEmployee ? "Edit Employee" : "Add New Employee"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* PERSONAL INFORMATION */}
              <h3 className="text-lg font-semibold text-blue-600 border-b pb-1">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <label className="text-sm text-gray-700">First Name *</label>
                  <input
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    className="border p-2 rounded-md w-full mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-700">Last Name</label>
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    className="border p-2 rounded-md w-full mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-700">Contact *</label>
                  <input
                    name="contact"
                    required
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="Enter contact"
                    className="border p-2 rounded-md w-full mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-700">Email *</label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    className="border p-2 rounded-md w-full mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-700">Username *</label>
                  <input
                    name="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter username"
                    className="border p-2 rounded-md w-full mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-700">Employee ID *</label>
                  <input
                    name="employeeId"
                    required
                    value={formData.employeeId}
                    onChange={handleChange}
                    placeholder="Enter employee ID"
                    className="border p-2 rounded-md w-full mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-700">Address *</label>
                <textarea
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter address"
                  className="border p-2 rounded-md h-20 w-full mt-1"
                />
              </div>

              {/* JOB INFO */}
              <h3 className="text-lg font-semibold text-blue-600 border-b pb-1">
                Job Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-700">Designation *</label>
                  <input
                    name="designation"
                    required
                    value={formData.designation}
                    onChange={handleChange}
                    placeholder="Enter designation"
                    className="border p-2 rounded-md w-full mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-700">Joining Date *</label>
                  <input
                    name="joiningDate"
                    type="date"
                    required
                    value={formData.joiningDate}
                    onChange={handleChange}
                    className="border p-2 rounded-md w-full mt-1"
                  />
                </div>
              </div>

              {/* BANK INFO */}
              <h3 className="text-lg font-semibold text-blue-600 border-b pb-1">
                Bank Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <label className="text-sm text-gray-700">Account Holder *</label>
                  <input
                    name="accountName"
                    required
                    value={formData.accountName}
                    onChange={handleChange}
                    placeholder="Enter holder name"
                    className="border p-2 rounded-md w-full mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-700">Account Number *</label>
                  <input
                    name="accountNumber"
                    required
                    value={formData.accountNumber}
                    onChange={handleChange}
                    placeholder="Enter account number"
                    className="border p-2 rounded-md w-full mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-700">Bank Name *</label>
                  <input
                    name="bankName"
                    required
                    value={formData.bankName}
                    onChange={handleChange}
                    placeholder="Enter bank name"
                    className="border p-2 rounded-md w-full mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-700">Branch Name *</label>
                  <input
                    name="branchName"
                    required
                    value={formData.branchName}
                    onChange={handleChange}
                    placeholder="Enter branch"
                    className="border p-2 rounded-md w-full mt-1"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-4 gap-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold"
                >
                  {editingEmployee ? "Update" : "Submit"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
