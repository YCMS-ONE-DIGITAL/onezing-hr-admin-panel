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
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("employees");
    if (saved) setEmployees(JSON.parse(saved));
  }, []);

  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem("attendanceRecords");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("attendanceRecords", JSON.stringify(attendance));
  }, [attendance]);

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
      setAttendance([...attendance, { ...formData, id: Date.now() }]);
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

  const presentCount = attendance.filter((a) => a.status === "Present").length;
  const absentCount = attendance.filter((a) => a.status === "Absent").length;
  const leaveCount = attendance.filter((a) => a.status === "Leave").length;

  const summaryData = [
    {
      title: "Total Employees",
      value: employees.length,
      icon: <Users size={26} />,
      color: "#1E3A8A",
    },
    {
      title: "Present Today",
      value: presentCount,
      icon: <UserCheck size={26} />,
      color: "#166534",
    },
    {
      title: "Absent Today",
      value: absentCount,
      icon: <UserX size={26} />,
      color: "#B91C1C",
    },
    {
      title: "On Leave",
      value: leaveCount,
      icon: <Coffee size={26} />,
      color: "#B45309",
    },
  ];

  return (
    <div
      className="
        absolute top-[100px] left-[250px] right-0 bottom-0 
        bg-[#f8f9fb] p-6 overflow-y-auto
        max-md:left-0 
        max-md:top-[100px]     /* ⭐ Heading now lower in mobile */
        max-md:p-3
      "
    >
      {/* HEADER */}
      <h1 className="text-center text-[26px] md:text-[32px] font-semibold text-gray-800 mb-1 max-md:mt-3">
        Attendance & Leave Management
      </h1>

      <p className="text-center text-gray-600 mb-8 text-[13px] max-md:mb-6">
        Track employee attendance, leaves & overtime.
      </p>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8 w-[92%] md:w-[85%] mx-auto">
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
            <div className="mb-1" style={{ color: card.color }}>
              {card.icon}
            </div>
            <h3 className="text-[12px] md:text-[14px] text-gray-600">
              {card.title}
            </h3>
            <p className="font-semibold text-[14px] md:text-[17px] text-gray-800">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* HEADER + BUTTON */}
      <div className="flex justify-between items-center mb-3 w-[92%] md:w-[85%] mx-auto">
        <h2 className="text-[17px] font-semibold text-gray-700 max-md:text-[15px]">
          Attendance Records
        </h2>

        <button
          onClick={openModal}
          className="
            flex items-center gap-2 bg-blue-500 hover:bg-blue-600 
            text-white px-4 py-2 rounded-md shadow-md text-sm
            max-md:px-3 max-md:py-1 max-md:text-[12px]
          "
        >
          <CalendarPlus size={15} /> Add
        </button>
      </div>

      {/* TABLE (MOBILE SCROLL FIXED) */}
      <div
        className="
          bg-white shadow-lg rounded-xl 
          w-[92%] md:w-[85%] mx-auto 
          border border-gray-300
          overflow-x-auto         
          max-md:overflow-y-auto  
          max-md:max-h-[450px]    
        "
      >
        <table className="w-full min-w-[750px] text-[14px] max-md:text-[12px] border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-3 px-3 text-left">SR</th>
              <th className="py-3 px-3 text-left">Employee</th>
              <th className="py-3 px-3 text-left">Date</th>
              <th className="py-3 px-3 text-left">Status</th>
              <th className="py-3 px-3 text-left">OT</th>
              <th className="py-3 px-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {attendance.map((a, idx) => {
              const emp = employees.find((e) => e.id === Number(a.employeeId));

              return (
                <tr
                  key={a.id}
                  className="border-b border-gray-300 hover:bg-gray-100"
                >
                  <td className="py-3 px-3 font-medium text-gray-800">
                    #{idx + 1}
                  </td>

                  <td className="py-3 px-3 text-gray-700">
                    {emp ? `${emp.firstName} ${emp.lastName}` : "-"}
                  </td>

                  <td className="py-3 px-3 text-gray-700">{a.date}</td>

                  <td
                    className={`py-3 px-3 font-semibold ${
                      a.status === "Present"
                        ? "text-green-600"
                        : a.status === "Absent"
                        ? "text-red-500"
                        : "text-blue-500"
                    }`}
                  >
                    {a.status}
                  </td>

                  <td className="py-3 px-3 text-gray-700">{a.overtime} hr</td>

                  <td className="py-3 px-3">
                    <div className="flex gap-3 text-[16px] max-md:text-[14px]">
                      <button
                        onClick={() => handleEdit(a.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit3 size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(a.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-[500px] shadow-xl max-md:p-4">
            <h2 className="text-xl font-semibold mb-4 text-center max-md:text-[18px]">
              {editing ? "Edit Attendance" : "Add Attendance"}
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
