import React, { useState, useEffect } from "react";
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
  // ---------------- LOAD EMPLOYEES ----------------
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("employees");
    if (saved) setEmployees(JSON.parse(saved));
  }, []);

  // ---------------- ATTENDANCE STORAGE ----------------
  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem("attendanceRecords");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("attendanceRecords", JSON.stringify(attendance));
  }, [attendance]);

  // ---------------- MODAL ----------------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    employeeId: "",
    date: "",
    status: "Present",
    overtime: 0,
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setEditing(null);
    setFormData({
      employeeId: "",
      date: "",
      status: "Present",
      overtime: 0,
    });
  };

  // ---------------- ADD/UPDATE ATTENDANCE ----------------
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.employeeId) return alert("Select employee!");

    if (editing) {
      setAttendance(
        attendance.map((a) =>
          a.id === editing ? { ...formData, id: a.id } : a
        )
      );
    } else {
      setAttendance([
        ...attendance,
        { ...formData, id: Date.now() },
      ]);
    }

    closeModal();
  };

  const handleEdit = (id) => {
    const record = attendance.find((a) => a.id === id);
    setFormData(record);
    setEditing(id);
    openModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this attendance record?")) {
      setAttendance(attendance.filter((a) => a.id !== id));
    }
  };

  // ---------------- SUMMARY COUNTS ----------------
  const presentCount = attendance.filter((a) => a.status === "Present").length;
  const absentCount = attendance.filter((a) => a.status === "Absent").length;
  const leaveCount = attendance.filter((a) => a.status === "Leave").length;
  const totalOvertime = attendance.reduce(
    (sum, a) => sum + Number(a.overtime || 0),
    0
  );

  // ⭐ UPDATED ICONS + DARK COLORS
  const summaryData = [
    {
      title: "Total Employees",
      value: employees.length,
      icon: <Users size={28} />,
      color: "#1E3A8A",
    },
    {
      title: "Present Today",
      value: presentCount,
      icon: <UserCheck size={28} />,
      color: "#166534",
    },
    {
      title: "Absent Today",
      value: absentCount,
      icon: <UserX size={28} />,
      color: "#B91C1C",
    },
    {
      title: "On Leave",
      value: leaveCount,
      icon: <Coffee size={28} />,
      color: "#B45309",
    },
  ];

  return (
    <div
      className="
        absolute top-[115px] left-[250px] right-0 bottom-0 bg-[#f8f9fb]
        flex flex-col items-center p-8 font-[Poppins]
        max-md:left-0 max-md:top-[60px] max-md:p-4
      "
    >
      {/* HEADER */}
      <h1 className="text-center text-[28px] md:text-[32px] font-semibold text-gray-800 mb-2">
        Attendance & Leave Management
      </h1>
      <p className="text-center text-gray-600 mb-8 text-[14px]">
        Track employee attendance, leaves & overtime.
      </p>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10 w-full max-w-[1300px] mx-auto">
        {summaryData.map((card, i) => (
          <div
            key={i}
            className="bg-white shadow-md rounded-xl p-4 md:p-6 flex flex-col items-center justify-center text-center 
            transition-all hover:shadow-lg hover:-translate-y-1 w-full h-[140px] md:h-[150px]"
            style={{ minWidth: "250px", maxWidth: "300px", margin: "0 auto" }}
          >
            <div className="mb-2" style={{ color: card.color }}>
              {card.icon}
            </div>
            <h3 className="text-[13px] md:text-[14px] text-gray-600">
              {card.title}
            </h3>
            <p className="font-semibold text-[15px] md:text-[17px] text-gray-800">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* TABLE HEADER */}
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

      {/* TABLE */}
      <div className="bg-white shadow-md rounded-xl w-[97%] md:w-[90%] max-w-[1300px] h-[450px] overflow-y-auto">
        <div className="min-w-[750px] w-full">
          <table className="w-full text-center text-[14px] md:text-[15px]">
            <thead className="bg-blue-500 text-white sticky top-0 z-10">
              <tr>
                <th className="py-3 px-4">Employee Name</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Overtime</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {attendance.map((a) => {
                const emp = employees.find((e) => e.id === Number(a.employeeId));
                return (
                  <tr key={a.id} className="border-b hover:bg-blue-50 transition">
                    <td className="py-3 px-4">
                      {emp ? `${emp.firstName} ${emp.lastName}` : "-"}
                    </td>
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
                    <td className="py-3 px-4">{a.overtime} hrs</td>

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
                );
              })}
            </tbody>

          </table>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-[500px] shadow-xl">

            <h2 className="text-xl font-semibold mb-4 text-center">
              {editing ? "Edit Attendance" : "Add Attendance Record"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">

              <select
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                required
                className="border p-2 rounded-md"
              >
                <option value="">Select Employee</option>
                {employees.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.firstName} {e.lastName}
                  </option>
                ))}
              </select>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="border p-2 rounded-md"
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="border p-2 rounded-md"
              >
                <option>Present</option>
                <option>Absent</option>
                <option>Leave</option>
              </select>

              <input
                type="number"
                name="overtime"
                placeholder="Overtime Hours"
                value={formData.overtime}
                onChange={handleChange}
                className="border p-2 rounded-md"
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className={`px-4 py-2 text-white rounded-md ${
                    editing ? "bg-green-600" : "bg-blue-600"
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
