import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function Employees() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Adrianna Stevens",
      position: "Software Engineer",
      department: "Development",
      status: "Active",
    },
    {
      id: 2,
      name: "Ravi Patil",
      position: "HR Manager",
      department: "Human Resources",
      status: "Active",
    },
    {
      id: 3,
      name: "Sneha Jadhav",
      position: "UI/UX Designer",
      department: "Design",
      status: "Inactive",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    department: "",
    status: "Active",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
    setFormData({ name: "", position: "", department: "", status: "Active" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Please enter employee name");
      return;
    }

    if (editingEmployee) {
      setEmployees(
        employees.map((emp) =>
          emp.id === editingEmployee ? { ...formData, id: emp.id } : emp
        )
      );
    } else {
      setEmployees([...employees, { ...formData, id: Date.now() }]);
    }

    closeModal();
  };

  const handleEdit = (id) => {
    const emp = employees.find((e) => e.id === id);
    setFormData(emp);
    setEditingEmployee(id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter((e) => e.id !== id));
    }
  };

  return (
    <div
      className="
        absolute top-[115px] left-[250px] right-0 bottom-0 bg-[#f8f9fb]
        flex flex-col items-center p-8 font-[Poppins]
        max-md:relative max-md:left-0 max-md:top-[60px] max-md:p-4
      "
    >
      <h1 className="text-center text-[28px] md:text-[32px] font-semibold text-gray-800 mb-2">
        Employee Management
      </h1>
      <p className="text-center text-gray-600 mb-8 text-[14px] md:text-[16px]">
        Manage employee records, departments, and status easily.
      </p>

      <div className="flex flex-col md:flex-row justify-between items-center w-[95%] md:w-[80%] max-w-[1000px] mb-6 gap-3">
        <input
          type="text"
          placeholder="Search employee..."
          className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full md:w-64 focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <button
          onClick={openModal}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md shadow-md text-sm font-medium transition"
        >
          <FaPlus className="text-[13px]" /> Add Employee
        </button>
      </div>

      <div
        className="
          bg-white shadow-md rounded-xl overflow-hidden w-[95%] md:w-[80%] max-w-[1000px]
          h-[420px] overflow-y-auto max-md:h-[350px] max-md:overflow-x-auto
        "
      >
        <div className="min-w-[750px] w-full">
          <table className="w-full border-collapse text-[13px] md:text-[15px] text-center">
            <thead className="bg-blue-500 text-white sticky top-0 z-10">
              <tr>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Position</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.length > 0 ? (
                employees.map((e) => (
                  <tr
                    key={e.id}
                    className="border-b border-gray-200 hover:bg-blue-50 transition"
                  >
                    <td className="py-3 px-4 text-gray-600">#{e.id}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {e.name}
                    </td>
                    <td className="py-3 px-4 text-gray-700">{e.position}</td>
                    <td className="py-3 px-4 text-gray-700">{e.department}</td>
                    <td
                      className={`py-3 px-4 font-semibold ${
                        e.status === "Active"
                          ? "text-green-600"
                          : "text-red-500"
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
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center text-gray-500 italic py-5"
                  >
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999]">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-[500px]">
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
              {editingEmployee ? "Edit Employee" : "Add Employee"}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 text-[14px]"
            >
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <input
                type="text"
                name="position"
                placeholder="Position (e.g. Software Engineer)"
                value={formData.position}
                onChange={handleChange}
                required
                className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <input
                type="text"
                name="department"
                placeholder="Department (e.g. HR, Design)"
                value={formData.department}
                onChange={handleChange}
                required
                className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-md text-white font-semibold ${
                    editingEmployee
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {editingEmployee ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
