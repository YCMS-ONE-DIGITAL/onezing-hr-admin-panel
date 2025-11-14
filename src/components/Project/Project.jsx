import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function Project() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Employee Management System",
      manager: "Ravi Patil",
      startDate: "2025-01-10",
      endDate: "2025-04-15",
      status: "Ongoing",
      progress: 60,
      priority: "High",
      summary: "This project covers employee attendance, leaves & payroll.",
      team: [
        { name: "Harshal Mali", role: "Frontend Dev" },
        { name: "Sneha Kulkarni", role: "Backend Dev" },
        { name: "Amit Jadhav", role: "QA Engineer" },
      ],
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [summaryProject, setSummaryProject] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    manager: "",
    startDate: "",
    endDate: "",
    status: "Not Started",
    progress: 0, // FIXED
    priority: "Medium",
    summary: "",
    team: [],
  });

  const [editInfo, setEditInfo] = useState(null);
  const [addMemberModal, setAddMemberModal] = useState(null);
  const [newMember, setNewMember] = useState({ name: "", role: "" });

  // Handle Add/Edit Project form changes
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // OPEN Add Project Modal
  const openModal = () => setIsModalOpen(true);

  // CLOSE Add Project
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      name: "",
      manager: "",
      startDate: "",
      endDate: "",
      status: "Not Started",
      progress: 0, // FIXED
      priority: "Medium",
      summary: "",
      team: [],
    });
  };

  // ADD or UPDATE PROJECT
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.manager) {
      alert("Please fill required fields");
      return;
    }

    const formattedData = {
      ...formData,
      progress: Number(formData.progress) || 0, // FIXED
      team: formData.team || [], // FIXED
    };

    if (editingId) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === editingId ? { ...formattedData, id: editingId } : p
        )
      );
    } else {
      setProjects((prev) => [
        ...prev,
        { ...formattedData, id: Date.now() },
      ]);
    }

    closeModal();
  };

  // EDIT PROJECT
  const handleEdit = (id) => {
    const proj = projects.find((p) => p.id === id);
    setFormData({
      name: proj.name,
      manager: proj.manager,
      startDate: proj.startDate,
      endDate: proj.endDate,
      status: proj.status,
      progress: proj.progress,
      priority: proj.priority,
      summary: proj.summary,
      team: proj.team,
    });
    setEditingId(id);
    setIsModalOpen(true);
  };

  // DELETE PROJECT
  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      setProjects(projects.filter((p) => p.id !== id));
      if (summaryProject?.id === id) setSummaryProject(null);
    }
  };

  // OPEN Summary Panel
  const openSummary = (project) => setSummaryProject(project);

  // CLOSE Summary
  const closeSummary = () => {
    setSummaryProject(null);
    setEditInfo(null);
    setAddMemberModal(null);
  };

  // OPEN Edit Info inside summary
  const openEditInfo = (project) => setEditInfo({ ...project });

  const handleEditInfoChange = (e) =>
    setEditInfo({ ...editInfo, [e.target.name]: e.target.value });

  // SAVE Edit Info
  const handleUpdateInfo = (e) => {
    e.preventDefault();

    setProjects((prev) =>
      prev.map((p) =>
        p.id === editInfo.id ? { ...editInfo } : p
      )
    );

    if (summaryProject?.id === editInfo.id) {
      setSummaryProject({ ...editInfo });
    }

    setEditInfo(null);
  };

  const cancelEditInfo = () => setEditInfo(null);

  // ADD TEAM MEMBER
  const openAddMember = (id) => {
    setAddMemberModal(id);
    setNewMember({ name: "", role: "" });
  };

  const handleNewMemberChange = (e) =>
    setNewMember({ ...newMember, [e.target.name]: e.target.value });

  const handleAddMember = (e) => {
    e.preventDefault();

    setProjects((prev) =>
      prev.map((p) =>
        p.id === addMemberModal
          ? { ...p, team: [...p.team, newMember] }
          : p
      )
    );

    if (summaryProject?.id === addMemberModal) {
      setSummaryProject((prev) => ({
        ...prev,
        team: [...prev.team, newMember],
      }));
    }

    setAddMemberModal(null);
  };

  const cancelAddMember = () => setAddMemberModal(null);

  // REMOVE MEMBER
  const handleRemoveMember = (projectId, index) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? { ...p, team: p.team.filter((_, i) => i !== index) }
          : p
      )
    );

    if (summaryProject?.id === projectId) {
      setSummaryProject((prev) => ({
        ...prev,
        team: prev.team.filter((_, i) => i !== index),
      }));
    }
  };

  return (
    <div
      className="
      absolute top-[120px] left-[260px] right-0 bottom-0
      bg-[#f7f8fc] p-8 overflow-y-auto font-[Poppins]
      max-md:left-0 max-md:top-[60px]
    "
    >
      <h1 className="text-center text-[28px] font-semibold mb-6">
        Project Management
      </h1>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4 max-w-[1200px] mx-auto">
        <h2 className="text-[18px] font-semibold">All Projects</h2>
        <button
          onClick={openModal}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md shadow-md"
        >
          <FaPlus /> Add Project
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white max-w-[1200px] mx-auto rounded-xl shadow-md overflow-hidden">
        <table className="w-full min-w-[900px]">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Manager</th>
              <th className="py-3 px-4">Start</th>
              <th className="py-3 px-4">End</th>
              <th className="py-3 px-4">Progress</th>
              <th className="py-3 px-4">Priority</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-b hover:bg-blue-50">
                <td
                  className="py-3 px-4 text-blue-600 underline cursor-pointer"
                  onClick={() => openSummary(p)}
                >
                  {p.name}
                </td>
                <td className="py-3 px-4">{p.manager}</td>
                <td className="py-3 px-4">{p.startDate}</td>
                <td className="py-3 px-4">{p.endDate}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-gray-200 rounded-full h-[8px] overflow-hidden">
                      <div
                        className="bg-blue-500 h-full"
                        style={{ width: `${p.progress}%` }}
                      ></div>
                    </div>
                    <span>{p.progress}%</span>
                  </div>
                </td>

                <td className="py-3 px-4">{p.priority}</td>
                <td className="py-3 px-4">{p.status}</td>

                <td className="py-3 px-4 text-center">
                  <div className="flex justify-center gap-4">
                    <button
                      className="text-blue-600"
                      onClick={() => handleEdit(p.id)}
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="text-red-600"
                      onClick={() => handleDelete(p.id)}
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

      {/* SUMMARY MODAL */}
      {summaryProject && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-6 z-[999]">
          <div className="bg-white w-full max-w-6xl max-h-[85vh] overflow-y-auto rounded-2xl shadow-2xl p-12 relative">

            {/* close */}
            <button
              className="absolute top-6 right-6 text-xl"
              onClick={closeSummary}
            >
              ✖
            </button>

            {/* EDIT INFO */}
            <button
              onClick={() => openEditInfo(summaryProject)}
              className="absolute top-6 left-6 px-4 py-2 bg-blue-100 text-blue-700 rounded-xl"
            >
              Edit Info
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
              {/* LEFT SIDE */}
              <div className="lg:col-span-2 space-y-10">
                <div className="bg-white p-8 rounded-2xl border shadow-md">
                  <h1 className="text-4xl font-bold">
                    {summaryProject.name}
                  </h1>
                  <p className="text-gray-600 mt-2">
                    <b>Start:</b> {summaryProject.startDate} |{" "}
                    <b>Deadline:</b> {summaryProject.endDate}
                  </p>
                </div>

                <div className="bg-white p-8 rounded-2xl border shadow-md">
                  <h2 className="text-3xl font-semibold mb-4">Summary</h2>
                  <p className="text-gray-700">{summaryProject.summary}</p>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="bg-white p-8 rounded-2xl border shadow-md">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-semibold">Assigned Team</h2>

                  <button
                    onClick={() => openAddMember(summaryProject.id)}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded-md"
                  >
                    + Add
                  </button>
                </div>

                <div className="mt-5 space-y-4">
                  {summaryProject.team.map((m, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-3 rounded-xl"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-gray-300 overflow-hidden"></div>

                        <div>
                          <p className="font-semibold">{m.name}</p>
                          <p className="text-gray-600 text-sm">{m.role}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemoveMember(summaryProject.id, i)}
                        className="text-red-600 text-xl"
                      >
                        ✖
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* EDIT INFO MODAL */}
      {editInfo && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-6 z-[1000]">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full relative">

            <button
              className="absolute top-4 right-5"
              onClick={cancelEditInfo}
            >
              ✖
            </button>

            <h3 className="text-xl font-semibold mb-4">
              Edit Project Information
            </h3>

            <form onSubmit={handleUpdateInfo} className="space-y-3">

              <input
                name="name"
                value={editInfo.name}
                onChange={handleEditInfoChange}
                className="w-full border p-2 rounded"
              />

              <input
                name="manager"
                value={editInfo.manager}
                onChange={handleEditInfoChange}
                className="w-full border p-2 rounded"
              />

              <div className="flex gap-3">
                <input
                  type="date"
                  name="startDate"
                  value={editInfo.startDate}
                  onChange={handleEditInfoChange}
                  className="w-full border p-2 rounded"
                />

                <input
                  type="date"
                  name="endDate"
                  value={editInfo.endDate}
                  onChange={handleEditInfoChange}
                  className="w-full border p-2 rounded"
                />
              </div>

              <textarea
                name="summary"
                rows={4}
                value={editInfo.summary}
                onChange={handleEditInfoChange}
                className="w-full border p-2 rounded"
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={cancelEditInfo}
                  type="button"
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Save
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ADD MEMBER MODAL */}
      {addMemberModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-6 z-[1000]">
          <div className="bg-white rounded-xl p-6 max-w-md w-full relative">

            <button
              className="absolute top-4 right-5"
              onClick={cancelAddMember}
            >
              ✖
            </button>

            <h3 className="text-lg font-semibold mb-4">
              Add Team Member
            </h3>

            <form onSubmit={handleAddMember} className="space-y-3">
              <input
                name="name"
                placeholder="Name"
                value={newMember.name}
                onChange={handleNewMemberChange}
                className="w-full border p-2 rounded"
              />

              <input
                name="role"
                placeholder="Role"
                value={newMember.role}
                onChange={handleNewMemberChange}
                className="w-full border p-2 rounded"
              />

              <div className="flex justify-end gap-3 mt-3">
                <button
                  type="button"
                  onClick={cancelAddMember}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Add
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ADD/EDIT PROJECT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-6 z-[999]">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full relative">

            <button
              className="absolute top-4 right-5"
              onClick={closeModal}
            >
              ✖
            </button>

            <h2 className="text-xl font-semibold text-center mb-4">
              {editingId ? "Edit Project" : "Add Project"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">

              {/* NAME */}
              <input
                type="text"
                name="name"
                placeholder="Project name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              {/* MANAGER */}
              <input
                type="text"
                name="manager"
                placeholder="Manager"
                value={formData.manager}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              {/* DATES */}
              <div className="flex gap-3">
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>

              {/* PRIORITY */}
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>

              {/* STATUS */}
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option>Not Started</option>
                <option>Ongoing</option>
                <option>Completed</option>
              </select>

              {/* PROGRESS */}
              <input
                type="number"
                min="0"
                max="100"
                name="progress"
                placeholder="Progress (%)"
                value={formData.progress}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              {/* SUMMARY */}
              <textarea
                name="summary"
                placeholder="Summary"
                rows={3}
                value={formData.summary}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <div className="flex justify-end gap-3 mt-4">

                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  {editingId ? "Update" : "Add"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
