import React, { useState, useEffect } from "react";
import {
  UserCheck,
  UserX,
  Coffee,
  Users,
  CalendarPlus,
  Trash2,
  Edit3,
  Eye,
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

  // ---- TODAY + MONTH ----
  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);
  const currentMonth = today.toISOString().slice(0, 7);

  // ---- MODAL ----
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

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
    setEditingId(null);
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

    if (editingId) {
      setAttendance((prev) =>
        prev.map((a) => (a.id === editingId ? { ...formData, id: a.id } : a))
      );
    } else {
      setAttendance((prev) => [...prev, { ...formData, id: Date.now() }]);
    }

    closeModal();
  };

  const handleEditTodayForEmployee = (emp) => {
    const existing = attendance.find(
      (a) => Number(a.employeeId) === emp.id && a.date === todayStr
    );

    if (existing) {
      setFormData(existing);
      setEditingId(existing.id);
    } else {
      setFormData({
        employeeId: String(emp.id),
        date: todayStr,
        status: "Present",
        overtime: 0,
      });
      setEditingId(null);
    }

    setIsModalOpen(true);
  };

  const handleDeleteTodayForEmployee = (emp) => {
    const existing = attendance.find(
      (a) => Number(a.employeeId) === emp.id && a.date === todayStr
    );
    if (!existing) return;

    if (window.confirm("Delete today's attendance?")) {
      setAttendance((prev) => prev.filter((a) => a.id !== existing.id));
    }
  };

  // ---- SUMMARY ----
  const todayPresent = attendance.filter(
    (a) => a.status === "Present" && a.date === todayStr
  ).length;
  const todayAbsent = attendance.filter(
    (a) => a.status === "Absent" && a.date === todayStr
  ).length;
  const todayLeave = attendance.filter(
    (a) => a.status === "Leave" && a.date === todayStr
  ).length;

  const summaryData = [
    {
      title: "Total Employees",
      value: employees.length,
      icon: <Users size={26} />,
      color: "#1E3A8A",
    },
    {
      title: "Present Today",
      value: todayPresent,
      icon: <UserCheck size={26} />,
      color: "#166534",
    },
    {
      title: "Absent Today",
      value: todayAbsent,
      icon: <UserX size={26} />,
      color: "#B91C1C",
    },
    {
      title: "On Leave",
      value: todayLeave,
      icon: <Coffee size={26} />,
      color: "#B45309",
    },
  ];

  // ---- HISTORY POPUP ----
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [openMonth, setOpenMonth] = useState(false);
  const [openYear, setOpenYear] = useState(false);


  const handleViewMore = (emp) => {
    setSelectedEmployee(emp);

    const months = attendance
      .filter((a) => Number(a.employeeId) === emp.id)
      .map((a) => a.date.slice(0, 7));

    const uniqueMonths = [...new Set(months)];

    setSelectedMonth(uniqueMonths[0] || currentMonth);

    setIsHistoryOpen(true);
  };

  // ---- Month Selector ----
  const monthNames = [
    "01","02","03","04","05","06","07","08","09","10","11","12"
  ];

  const currentYear = new Date().getFullYear();
  const last5Years = Array.from({ length: 5 }, (_, i) => currentYear - 4 + i);

  const handleMonthSelect = (m) => {
    const y = selectedMonth.split("-")[0];
    setSelectedMonth(`${y}-${m}`);
  };

  const handleYearSelect = (y) => {
    const m = selectedMonth.split("-")[1];
    setSelectedMonth(`${y}-${m}`);
  };

  const changeMonth = (direction) => {
    const [y, m] = selectedMonth.split("-").map(Number);
    const newDate = new Date(y, m - 1 + direction, 1);
    const newMonth = newDate.toISOString().slice(0, 7);
    setSelectedMonth(newMonth);
  };

  const getCalendarDays = () => {
    const [year, month] = selectedMonth.split("-").map(Number);
    const firstDay = new Date(year, month - 1, 1);
    const startWeekday = firstDay.getDay();
    const daysInMonth = new Date(year, month, 0).getDate();

    const cells = [];
    for (let i = 0; i < startWeekday; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    return cells;
  };

  const getStatusForDate = (empId, dateStr) => {
    const rec = attendance.find(
      (a) => Number(a.employeeId) === empId && a.date === dateStr
    );
    return rec ? rec.status : null;
  };

  return (
    <div
      className="
        absolute top-[100px] left-[250px] right-0 bottom-0 
        bg-[#f8f9fb] p-6 overflow-y-auto
        max-md:left-0 max-md:top-[100px] max-md:p-3
      "
    >
      {/* HEADER */}
      <h1 className="text-center text-[26px] md:text-[32px] font-semibold text-gray-800 mb-1">
        Attendance & Leave Management
      </h1>
      <p className="text-center text-gray-600 mb-8 text-[13px]">
        Track employee attendance, leaves & overtime.
      </p>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8 w-[92%] md:w-[85%] mx-auto">
        {summaryData.map((card, i) => (
          <div
            key={i}
            className="
              bg-white shadow-md rounded-xl p-4 md:p-6 flex flex-col 
              items-center text-center hover:shadow-lg transition
              h-[125px] md:h-[130px]
            "
            style={{ border: "1px solid #e5e7eb" }}
          >
            <div className="text-[26px] mb-1" style={{ color: card.color }}>
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

      {/* HEADER + ADD BUTTON */}
      <div className="flex justify-between items-center mb-3 w-[92%] md:w-[85%] mx-auto">
        <h2 className="text-[17px] font-semibold text-gray-700">
          Attendance Records (Today)
        </h2>

        <button
          onClick={openModal}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md text-sm"
        >
          <CalendarPlus size={15} /> Add
        </button>
      </div>

      {/* TODAY TABLE */}
      <div
        className="
          bg-white shadow-lg rounded-xl w-[92%] md:w-[85%] mx-auto 
          border border-gray-300 overflow-x-auto
        "
      >
        <table className="w-full min-w-[750px] text-[14px] border-collapse">
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
            {employees.map((emp, idx) => {
              const todayRecord = attendance.find(
                (a) => Number(a.employeeId) === emp.id && a.date === todayStr
              );

              const status = todayRecord?.status || "Not Marked";
              const overtime = todayRecord?.overtime || 0;

              return (
                <tr key={emp.id} className="border-b border-gray-300 hover:bg-gray-100">
                  <td className="py-3 px-3 font-medium">#{idx + 1}</td>

                  <td className="py-3 px-3">
                    {emp.firstName} {emp.lastName}
                  </td>

                  <td className="py-3 px-3">{todayStr}</td>

                  <td className="py-3 px-3 font-bold">
                    {status === "Present" && (
                      <span className="text-green-600 text-lg">✓</span>
                    )}
                    {status === "Absent" && (
                      <span className="text-red-600 text-lg">✕</span>
                    )}
                    {status === "Leave" && (
                      <span className="text-yellow-500 text-lg">?</span>
                    )}
                    {status === "Not Marked" && (
                      <span className="text-gray-500">-</span>
                    )}
                  </td>

                  <td className="py-3 px-3">
                    {todayRecord ? `${overtime} hr` : "-"}
                  </td>

                  <td className="py-3 px-3">
                    <div className="flex gap-3 text-[16px]">
                      <button
                        onClick={() => handleViewMore(emp)}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        onClick={() => handleEditTodayForEmployee(emp)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit3 size={16} />
                      </button>

                      <button
                        onClick={() => handleDeleteTodayForEmployee(emp)}
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

      {/* ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-[500px] shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-center">
              {editingId ? "Edit Attendance" : "Add Attendance"}
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
                    editingId ? "bg-green-600" : "bg-blue-600"
                  }`}
                >
                  {editingId ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* HISTORY POPUP */}
      {isHistoryOpen && selectedEmployee && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999]">
          <div
            className="
              bg-white rounded-xl shadow-xl
              w-[90%] max-w-[800px] p-6
              max-md:w-full max-md:h-full max-md:rounded-none
            "
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Attendance History</h2>
              <button
                onClick={() => setIsHistoryOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            <p className="font-medium text-gray-700 mb-2">
              Employee:{" "}
              <span className="font-semibold">
                {selectedEmployee.firstName} {selectedEmployee.lastName}
              </span>
            </p>

            {/* --- Month Controls + Selectors --- */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => changeMonth(-1)}
                className="px-3 py-1 border rounded-md hover:bg-gray-100"
              >
                ◀ Prev
              </button>

              {/* Month + Year Selector */}
              <div className="flex items-center gap-2">
                {/* MONTH DROPDOWN */}
                <div className="relative">
                  <button
                    onClick={() => setOpenMonth((prev) => !prev)}
                    className="border p-2 rounded-md w-24 bg-white text-left pr-6 relative"
                  >
                    {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][selectedMonth.split("-")[1] - 1]}
                    {/* Dropdown Arrow */}
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600">
                      ▼
                    </span>
                  </button>

                  {openMonth && (
                    <div className="absolute z-50 mt-1 w-24 bg-white border rounded-md shadow-lg max-h-28 overflow-y-auto">
                      {monthNames.map((m, i) => (
                        <div
                          key={m}
                          onClick={() => {
                            handleMonthSelect(m);
                            setOpenMonth(false);
                          }}
                          className="p-2 hover:bg-blue-100 cursor-pointer"
                        >
                          {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i]}
                        </div>
                      ))} 
                    </div>
                  )}
                </div>

                {/* YEAR DROPDOWN */}
                <div className="relative">
                  <button
                    onClick={() => setOpenYear((prev) => !prev)}
                    className="border p-2 rounded-md w-24 bg-white text-left pr-6 relative"
                  >
                    {selectedMonth.split("-")[0]}
                    {/* Dropdown Arrow */}
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600">
                      ▼
                    </span>
                  </button>

                  {openYear && (
                    <div className="absolute z-50 mt-1 w-24 bg-white border rounded-md shadow-lg max-h-28 overflow-y-auto">

                      {last5Years.map((y) => (
                        <div
                          key={y}
                          onClick={() => {
                            handleYearSelect(y);
                            setOpenYear(false);
                          }}
                          className="p-2 hover:bg-blue-100 cursor-pointer"
                        >
                          {y}
                        </div>
                      ))}

                    </div>
                  )}
                </div>

              </div>


              <button
                onClick={() => changeMonth(1)}
                className="px-3 py-1 border rounded-md hover:bg-gray-100"
              >
                Next ▶
              </button>
            </div>

            {/* LEGEND */}
            <div className="flex gap-4 mb-3 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                Present
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                Absent
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                Leave
              </div>
            </div>

            {/* CALENDAR + LIST */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto">

              {/* CALENDAR */}
              <div className="border rounded-lg p-3">
                <div className="grid grid-cols-7 text-[11px] text-center text-gray-500 mb-1">
                  <span>Sun</span>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                </div>

                <div className="grid grid-cols-7 gap-1 text-[11px]">
                  {getCalendarDays().map((day, idx) => {
                    if (!day) return <div key={idx} className="h-12" />;

                    const dayStr = `${selectedMonth}-${String(day).padStart(
                      2,
                      "0"
                    )}`;

                    const status = getStatusForDate(
                      selectedEmployee.id,
                      dayStr
                    );

                    let bg = "bg-gray-50";
                    let text = "text-gray-700";
                    let mark = "";

                    if (status === "Present") {
                      bg = "bg-green-50";
                      text = "text-green-700";
                      mark = "✓";
                    } else if (status === "Absent") {
                      bg = "bg-red-50";
                      text = "text-red-700";
                      mark = "✕";
                    } else if (status === "Leave") {
                      bg = "bg-yellow-50";
                      text = "text-yellow-700";
                      mark = "?";
                    }

                    return (
                      <div
                        key={idx}
                        className={`
                          h-12 border rounded-md flex flex-col items-center justify-center 
                          ${bg} ${text} 
                          ${
                            dayStr === todayStr
                              ? "border-2 border-blue-500"
                              : ""
                          }
                        `}
                      >
                        <span className="text-[11px] font-medium">{day}</span>
                        <span className="text-[13px] font-bold">{mark}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* MONTH LIST */}
              <div className="border rounded-lg p-3">
                <h3 className="text-sm font-semibold mb-2">
                  Detailed View ({selectedMonth})
                </h3>

                <div className="max-h-[260px] overflow-y-auto text-[12px]">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-blue-50 text-gray-700">
                        <th className="py-1 px-2 text-left">Date</th>
                        <th className="py-1 px-2 text-left">Status</th>
                        <th className="py-1 px-2 text-left">OT</th>
                      </tr>
                    </thead>

                    <tbody>
                      {attendance
                        .filter(
                          (a) =>
                            Number(a.employeeId) === selectedEmployee.id &&
                            a.date.startsWith(selectedMonth)
                        )
                        .map((rec, i) => (
                          <tr key={i} className="border-b">
                            <td className="py-1 px-2">{rec.date}</td>
                            <td
                              className={`py-1 px-2 font-bold ${
                                rec.status === "Present"
                                  ? "text-green-600"
                                  : rec.status === "Absent"
                                  ? "text-red-600"
                                  : "text-yellow-500"
                              }`}
                            >
                              {rec.status}
                            </td>
                            <td className="py-1 px-2">{rec.overtime} hr</td>
                          </tr>
                        ))}

                      {attendance.filter(
                        (a) =>
                          Number(a.employeeId) === selectedEmployee.id &&
                          a.date.startsWith(selectedMonth)
                      ).length === 0 && (
                        <tr>
                          <td
                            colSpan={3}
                            className="py-2 px-2 text-center text-gray-500"
                          >
                            No records for this month.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}