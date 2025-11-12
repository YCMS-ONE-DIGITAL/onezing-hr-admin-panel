import React, { useState } from "react";
import {
  UserCheck,
  UserX,
  Coffee,
  Users,
  CalendarPlus,
  Trash2,
  Edit3,
} from "lucide-react";

export default function Attendance() {
  const [attendance, setAttendance] = useState([
    { id: 1, name: "Ravi Patil", date: "2025-11-10", status: "Present" },
    { id: 2, name: "Sneha Jadhav", date: "2025-11-10", status: "Absent" },
    { id: 3, name: "Amit Kulkarni", date: "2025-11-10", status: "Leave" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    status: "Present",
  });
  const [editing, setEditing] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setEditing(null);
    setFormData({ name: "", date: "", status: "Present" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return alert("Enter employee name!");

    if (editing) {
      setAttendance(
        attendance.map((a) =>
          a.id === editing ? { ...formData, id: a.id } : a
        )
      );
    } else {
      setAttendance([...attendance, { ...formData, id: Date.now() }]);
    }

    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setAttendance(attendance.filter((a) => a.id !== id));
    }
  };

  const handleEdit = (id) => {
    const record = attendance.find((a) => a.id === id);
    setFormData(record);
    setEditing(id);
    setIsModalOpen(true);
  };

  const summaryData = [
    { title: "Total Employees", value: 120, icon: <Users />, color: "#3B82F6" },
    { title: "Present Today", value: 98, icon: <UserCheck />, color: "#16A34A" },
    { title: "Absent Today", value: 15, icon: <UserX />, color: "#EF4444" },
    { title: "On Leave", value: 7, icon: <Coffee />, color: "#F59E0B" },
  ];

  return (
    <div
      className="
        absolute top-[115px] left-[250px] right-0 bottom-0 bg-[#f8f9fb]
        flex flex-col items-center p-8 font-[Poppins]
        max-md:relative max-md:left-0 max-md:top-[60px] max-md:p-4
      "
    >
      {/* === Header === */}
      <h1 className="text-center text-[28px] md:text-[32px] font-semibold text-gray-800 mb-2">
        Attendance & Leave Management
      </h1>
      <p className="text-center text-gray-600 mb-8 text-[14px] md:text-[16px]">
        Track employee attendance, leaves, and daily presence.
      </p>

      {/* ✅ SAME CARD SIZE & WIDTH AS PAYROLL */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10 w-full max-w-[1300px] mx-auto">
        {summaryData.map((card, i) => (
          <div
            key={i}
            className="bg-white shadow-md rounded-xl p-4 md:p-6 flex flex-col items-center justify-center text-center 
                       transition-all hover:shadow-lg hover:-translate-y-1 w-full h-[140px] md:h-[150px]"
            style={{
              flex: "1 1 0",
              minWidth: "250px", // ✅ ensures width same as payroll cards
              maxWidth: "300px",
              margin: "0 auto",
            }}
          >
            <div
              className="text-[22px] md:text-[26px] mb-2"
              style={{ color: card.color }}
            >
              {card.icon}
            </div>
            <h3 className="text-[13px] md:text-[14px] text-gray-600 font-medium">
              {card.title}
            </h3>
            <p className="font-semibold text-[15px] md:text-[17px] text-gray-800">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* === Table Header === */}
      <div className="flex justify-between items-center mb-3 w-[95%] md:w-[90%] max-w-[1300px] mx-auto">
        <h2 className="text-[18px] font-semibold text-gray-700">
          Attendance Records
        </h2>
        <button
          onClick={openModal}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md shadow-md text-sm font-medium transition"
        >
          <CalendarPlus size={16} /> Add Record
        </button>
      </div>

      {/* === Table Section === */}
      <div
        className="
          bg-white shadow-md rounded-xl w-[97%] md:w-[90%] max-w-[1300px]
          h-[450px] overflow-y-auto
          max-md:h-[350px] max-md:overflow-x-auto
          transition-all duration-300
        "
      >
        <div className="min-w-[750px] w-full">
          <table className="w-full border-collapse text-[14px] md:text-[15px] text-center">
            <thead className="bg-blue-500 text-white sticky top-0 z-10">
              <tr>
                <th className="py-3 px-4">Employee Name</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {attendance.length > 0 ? (
                attendance.map((a) => (
                  <tr
                    key={a.id}
                    className="border-b border-gray-200 hover:bg-blue-50 transition"
                  >
                    <td className="py-3 px-4">{a.name}</td>
                    <td className="py-3 px-4">{a.date}</td>
                    <td
                      className={`py-3 px-4 font-semibold ${
                        a.status === "Present"
                          ? "text-green-600"
                          : a.status === "Absent"
                          ? "text-red-500"
                          : "text-blue-500"
                      }`}
                    >
                      {a.status}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => handleEdit(a.id)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(a.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center text-gray-500 italic py-5"
                  >
                    No attendance records yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* === Add/Edit Modal === */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999]">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-[500px]">
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
              {editing ? "Edit Attendance" : "Add Attendance Record"}
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
                required
                className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <input
                type="date"
                name="date"
                value={formData.date}
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
                <option>Present</option>
                <option>Absent</option>
                <option>Leave</option>
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
                    editing
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {editing ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
