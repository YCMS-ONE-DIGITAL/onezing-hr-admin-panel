import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    manager: "",
    startDate: "",
    endDate: "",
    status: "Not Started",
    progress: "",
    priority: "Medium",
    description: "",
  });
  const [editingProject, setEditingProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    setFormData({
      name: "",
      manager: "",
      startDate: "",
      endDate: "",
      status: "Not Started",
      progress: "",
      priority: "Medium",
      description: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.manager.trim()) {
      alert("Please fill Project Name & Manager");
      return;
    }

    if (editingProject) {
      setProjects(
        projects.map((p) =>
          p.id === editingProject ? { ...formData, id: p.id } : p
        )
      );
      setEditingProject(null);
    } else {
      setProjects([...projects, { ...formData, id: Date.now() }]);
    }

    closeModal();
  };


  const editProject = (id) => {
    const project = projects.find((p) => p.id === id);
    setFormData(project);
    setEditingProject(id);
    setIsModalOpen(true);
  };


  const deleteProject = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  return (
    <div
      className="
        absolute top-[120px] left-[260px] right-0 bottom-0 bg-[#f7f8fc]
        p-8 overflow-y-auto font-[Poppins]
        max-md:relative max-md:left-0 max-md:top-[60px] max-md:p-4
        max-md:h-[calc(100vh-60px)] max-md:overflow-y-scroll
      "
    >
      <h1 className="text-center text-[28px] font-semibold text-[#222] mb-6 max-md:text-[22px]">
        Project Management
      </h1>

      <div className="flex justify-between items-center mb-4 max-w-[1200px] mx-auto">
        <h2 className="text-[18px] font-semibold text-gray-700">
          All Projects
        </h2>
        <button
          onClick={openModal}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md shadow-md text-sm font-medium transition"
        >
          <FaPlus className="text-[13px]" /> Add Project
        </button>
      </div>

      <div
        className="
          bg-white shadow-md rounded-xl overflow-hidden max-w-[1200px] mx-auto
          max-md:overflow-x-auto
        "
      >
        <table className="w-full min-w-[900px] border-collapse text-[14px]">
          <thead className="bg-blue-500 text-white sticky top-0 z-10">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">Name</th>
              <th className="py-3 px-4 text-left font-semibold">Manager</th>
              <th className="py-3 px-4 text-left font-semibold">Start</th>
              <th className="py-3 px-4 text-left font-semibold">End</th>
              <th className="py-3 px-4 text-left font-semibold">Progress</th>
              <th className="py-3 px-4 text-left font-semibold">Priority</th>
              <th className="py-3 px-4 text-left font-semibold">Status</th>
              <th className="py-3 px-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-6 text-gray-500 italic"
                >
                  No projects added yet.
                </td>
              </tr>
            ) : (
              projects.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-gray-200 hover:bg-blue-50 transition"
                >
                  <td className="py-3 px-4">{p.name}</td>
                  <td className="py-3 px-4">{p.manager}</td>
                  <td className="py-3 px-4">{p.startDate}</td>
                  <td className="py-3 px-4">{p.endDate}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-200 rounded-full h-[8px] overflow-hidden">
                        <div
                          className="bg-blue-500 h-[8px] rounded-full"
                          style={{ width: `${p.progress || 0}%` }}
                        ></div>
                      </div>
                      <span className="text-[13px] text-gray-700 font-medium">
                        {p.progress || 0}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">{p.priority}</td>
                  <td className="py-3 px-4">{p.status}</td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => editProject(p.id)}
                        className="text-blue-500 hover:text-blue-700 transition"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => deleteProject(p.id)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-[999]">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-[600px] relative">
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
              {editingProject ? "Edit Project" : "Add New Project"}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 text-[14px]"
            >
              <input
                type="text"
                name="name"
                placeholder="Project Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <input
                type="text"
                name="manager"
                placeholder="Project Manager"
                value={formData.manager}
                onChange={handleChange}
                required
                className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <div className="flex gap-3 max-md:flex-col">
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-400 outline-none"
                />
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option>Not Started</option>
                <option>In Progress</option>
                <option>Completed</option>
                <option>On Hold</option>
              </select>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>

              <input
                type="number"
                name="progress"
                placeholder="Completion %"
                value={formData.progress}
                onChange={handleChange}
                className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <textarea
                name="description"
                placeholder="Project Description"
                value={formData.description}
                onChange={handleChange}
                className="border p-2 rounded-md h-[80px] focus:ring-2 focus:ring-blue-400 outline-none"
              ></textarea>

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
                    editingProject
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {editingProject ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
