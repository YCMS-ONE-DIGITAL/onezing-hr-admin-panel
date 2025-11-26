import React, { useState, useMemo, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const initialProjects = [
  {
    id: 1,
    name: "Employee Management System",
    manager: "Ravi Patil",
    startDate: "2025-01-10",
    endDate: "2025-04-15",
    status: "Ongoing",
    progress: 60,
    priority: "High",
    category: "HR",
    summary:
      "This project covers employee attendance, leave management, and payroll automation.",
    team: [
      { name: "Harshal Mali", role: "Frontend Dev" },
      { name: "Sneha Kulkarni", role: "Backend Dev" },
      { name: "Amit Jadhav", role: "QA Engineer" },
    ],
  },
  {
    id: 2,
    name: "Clinic Management System",
    manager: "Dr. Neha Joshi",
    startDate: "2025-02-01",
    endDate: "2025-05-30",
    status: "Ongoing",
    progress: 45,
    priority: "High",
    category: "Healthcare",
    summary:
      "Streamlines patient records, appointments, billing and basic inventory for small clinics.",
    team: [
      { name: "Rohan Kulkarni", role: "Full Stack Dev" },
      { name: "Priya Shah", role: "UI/UX Designer" },
      { name: "Sagar More", role: "QA Engineer" },
    ],
  },
];

export default function Project() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("projects");
    return saved ? JSON.parse(saved) : initialProjects;
  });

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const emptyProject = {
    name: "",
    manager: "",
    startDate: "",
    endDate: "",
    status: "Not Started",
    priority: "Medium",
    category: "",
    progress: 0,
    team: [],
    summary: "",
  };

  const [form, setForm] = useState(emptyProject);

  const [member, setMember] = useState({ name: "", role: "" });

  const addTeamMember = () => {
    if (!member.name.trim() || !member.role.trim()) {
      alert("Enter employee name & role");
      return;
    }

    setForm({
      ...form,
      team: [...form.team, member],
    });

    setMember({ name: "", role: "" });
  };

  const removeTeamMember = (index) => {
    setForm({
      ...form,
      team: form.team.filter((_, i) => i !== index),
    });
  };

  const statusColors = {
    "Not Started": "bg-gray-200 text-gray-700",
    Ongoing: "bg-yellow-200 text-yellow-800",
    Completed: "bg-green-200 text-green-700",
  };

  const priorityColors = {
    High: "text-red-600",
    Medium: "text-orange-500",
    Low: "text-green-600",
  };

  const categoryColors = {
    HR: "bg-purple-50 text-purple-700 border border-purple-200",
    Healthcare: "bg-rose-50 text-rose-700 border border-rose-200",
    Education: "bg-blue-50 text-blue-700 border border-blue-200",
    Travel: "bg-orange-50 text-orange-700 border border-orange-200",
    Retail: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    Default: "bg-gray-100 text-gray-700 border border-gray-200",
  };

  const filtered = useMemo(() => {
    return projects
      .filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase().trim())
      )
      .filter((p) =>
        filterStatus === "All" ? true : p.status === filterStatus
      );
  }, [projects, search, filterStatus]);

  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyProject);
    setMember({ name: "", role: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (project) => {
    setEditingId(project.id);
    setForm(project);
    setMember({ name: "", role: "" });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setForm(emptyProject);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.manager) {
      alert("Please fill Project Name & Manager");
      return;
    }

    if (editingId) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === editingId ? { ...form, id: editingId } : p
        )
      );
    } else {
      const newId = Date.now();
      setProjects((prev) => [
        ...prev,
        { ...form, id: newId },
      ]);
    }

    closeModal();
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this project?")) return;
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div
      className="
        absolute 
        top-[95px] left-[260px] right-0 bottom-0
        bg-[#f7f8fc]
        p-8
        overflow-y-auto
        font-[Poppins]

        max-md:left-0 
        max-md:top-[120px] 
        max-md:p-4
      "
    >

      <h1 className="text-center text-[28px] font-semibold mb-6">
        Project Management
      </h1>

      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 max-w-[1200px] mx-auto gap-3">
        <h2 className="text-[20px] font-semibold">All Projects</h2>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md"
        >
          <FaPlus /> Add Project
        </button>
      </div>

      <div className="max-w-[1200px] mx-auto mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-3 rounded-lg shadow-sm bg-white"
        />

        <select
          className="border p-3 rounded-lg shadow-sm bg-white"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option>All</option>
          <option>Not Started</option>
          <option>Ongoing</option>
          <option>Completed</option>
        </select>

        <div />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
        {filtered.map((p) => {
          const categoryClass =
            categoryColors[p.category] || categoryColors.Default;

          return (
            <div
              key={p.id}
              onClick={() => navigate(`/project/${p.id}`)}
              className="bg-white p-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)] transition cursor-pointer"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-[20px] font-semibold text-gray-800 leading-tight">
                  {p.name}
                </h3>

                <div className="flex gap-3 text-[18px] text-gray-500">
                  <button
                    className="hover:text-blue-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditModal(p);
                    }}
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="hover:text-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(p.id);
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-2">
                {p.category && (
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${categoryClass}`}
                  >
                    {p.category}
                  </span>
                )}

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[p.status]}`}
                >
                  {p.status}
                </span>
              </div>

              <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                {p.summary}
              </p>

              <div className="flex justify-between mt-4 text-sm text-gray-700">
                <p><b>Manager:</b> {p.manager}</p>
                <p className={`${priorityColors[p.priority]} font-semibold`}>
                  {p.priority}
                </p>
              </div>

              <div className="flex justify-between text-sm text-gray-700 mt-2">
                <p><b>Start:</b> {p.startDate}</p>
                <p><b>End:</b> {p.endDate}</p>
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-start justify-center pt-20 p-4 z-[999]">

          <div className="bg-white rounded-xl shadow-[0_6px_16px_rgba(0,0,0,0.12)] p-6 w-full max-w-2xl max-h-[88vh] overflow-y-auto">

            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold text-gray-800">
                {editingId ? "Edit Project" : "Add Project"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-red-500 text-xl transition"
              >
                ✖
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div className="flex flex-col">
                <label className="text-gray-700 mb-1 font-medium">Project Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="Enter project name"
                  value={form.name}
                  onChange={handleFormChange}
                  className="p-3 rounded-lg border border-gray-300 bg-gray-50"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-700 mb-1 font-medium">Manager</label>
                <input
                  name="manager"
                  type="text"
                  placeholder="Project manager"
                  value={form.manager}
                  onChange={handleFormChange}
                  className="p-3 rounded-lg border border-gray-300 bg-gray-50"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-700 mb-1 font-medium">Start Date</label>
                <input
                  name="startDate"
                  type="date"
                  value={form.startDate}
                  onChange={handleFormChange}
                  className="p-3 rounded-lg border border-gray-300 bg-gray-50"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-700 mb-1 font-medium">End Date</label>
                <input
                  name="endDate"
                  type="date"
                  value={form.endDate}
                  onChange={handleFormChange}
                  className="p-3 rounded-lg border border-gray-300 bg-gray-50"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-700 mb-1 font-medium">Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleFormChange}
                  className="p-3 rounded-lg border border-gray-300 bg-gray-50"
                >
                  <option>Not Started</option>
                  <option>Ongoing</option>
                  <option>Completed</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-gray-700 mb-1 font-medium">Priority</label>
                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleFormChange}
                  className="p-3 rounded-lg border border-gray-300 bg-gray-50"
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>

              <div className="md:col-span-2 flex flex-col">
                <label className="text-gray-700 mb-1 font-medium">Summary</label>
                <textarea
                  name="summary"
                  placeholder="Enter summary"
                  value={form.summary}
                  onChange={handleFormChange}
                  rows={3}
                  className="p-3 rounded-lg border border-gray-300 bg-gray-50"
                ></textarea>
              </div>

              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-3">

                <input
                  type="text"
                  placeholder="Employee Name"
                  value={member.name}
                  onChange={(e) =>
                    setMember({ ...member, name: e.target.value })
                  }
                  className="p-3 rounded-lg border border-gray-300 bg-gray-50"
                />

                <select
                  value={member.role}
                  onChange={(e) =>
                    setMember({ ...member, role: e.target.value })
                  }
                  className="p-3 rounded-lg border border-gray-300 bg-gray-50"
                >
                  <option value="">Select Role</option>
                  <option>Frontend Dev</option>
                  <option>Backend Dev</option>
                  <option>Full Stack Dev</option>
                  <option>UI/UX Designer</option>
                  <option>QA Engineer</option>
                  <option>Tester</option>
                  <option>Manager</option>
                </select>

                <button
                  type="button"
                  onClick={addTeamMember}
                  className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
                >
                  Add
                </button>
              </div>

              {form.team.length > 0 && (
                <div className="md:col-span-2 mt-3 space-y-2">
                  {form.team.map((m, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border p-2 rounded-lg bg-gray-50"
                    >
                      <p>
                        <b>{m.name}</b> — {m.role}
                      </p>

                      <button
                        type="button"
                        onClick={() => removeTeamMember(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow transition"
                >
                  {editingId ? "Update Project" : "Add Project"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
