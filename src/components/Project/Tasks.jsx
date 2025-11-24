import React, { useState, useEffect, useMemo } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function Tasks() {
  // ---------------- LOAD PROJECTS FROM LOCAL STORAGE ----------------
  const projects = JSON.parse(localStorage.getItem("projects")) || [];

  // ---------------- TASKS LOCAL STORAGE ----------------
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // ---------------- MODAL STATE ----------------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    projectId: "",
    name: "",
    description: "",
    priority: "Medium",
    assignedTo: "",
  };

  const [form, setForm] = useState(emptyForm);

  // ---------------- FORM EVENTS ----------------
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // team safely load करा
  const selectedProject = useMemo(() => {
    return projects.find((p) => p.id === Number(form.projectId));
  }, [form.projectId, projects]);

  // ---------------- SUBMIT ----------------
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.projectId) return alert("Select project!");
    if (!form.name.trim()) return alert("Task name required!");
    if (!form.assignedTo.trim())
      return alert("Select employee for this task!");

    const newTask = { ...form, id: editingId || Date.now() };

    if (editingId) {
      setTasks((prev) => prev.map((t) => (t.id === editingId ? newTask : t)));
    } else {
      setTasks((prev) => [...prev, newTask]);
    }

    closeModal();
  };

  // ---------------- MODAL OPEN / CLOSE ----------------
  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  // ---------------- EDIT ----------------
  const handleEdit = (task) => {
    setForm(task);
    setEditingId(task.id);
    openModal();
  };

  // ---------------- DELETE ----------------
  const handleDelete = (id) => {
    if (!window.confirm("Delete this task?")) return;
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // -----------------------------------------------------
  // UI STARTS HERE (UNCHANGED)
  // -----------------------------------------------------
  return (
    <div
      className="
        absolute top-[115px] left-[250px] right-0 bottom-0 bg-[#f8f9fb]
        p-8 overflow-y-auto font-[Poppins]
        max-md:left-0 max-md:top-[60px] max-md:p-4
      "
    >
      {/* PAGE TITLE */}
      <h1 className="text-center text-[28px] md:text-[32px] font-semibold text-gray-800 mb-6">
        Task Management
      </h1>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5 w-[95%] md:w-[90%] max-w-[1300px] mx-auto">
        <h2 className="text-[18px] font-semibold text-gray-700">All Tasks</h2>

        <button
          onClick={openModal}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md shadow-md text-sm"
        >
          <FaPlus /> Add Task
        </button>
      </div>

      {/* TASK TABLE */}
      <div
        className="
          bg-white shadow-md rounded-xl w-[95%] md:w-[90%] max-w-[1300px]
          mx-auto overflow-x-auto border border-gray-300
        "
      >
        <table className="w-full min-w-[900px] text-center border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-3 px-4 text-left">Project</th>
              <th className="py-3 px-4 text-left">Task</th>
              <th className="py-3 px-4 text-left">Priority</th>
              <th className="py-3 px-4 text-left">Assigned To</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.length > 0 ? (
              tasks.map((t) => {
                const proj = projects.find(
                  (p) => Number(p.id) === Number(t.projectId)
                );

                return (
                  <tr
                    key={t.id}
                    className="border-b border-gray-300 hover:bg-blue-50 transition"
                  >
                    <td className="py-3 px-4">{proj ? proj.name : "-"}</td>
                    <td className="py-3 px-4">{t.name}</td>
                    <td
                      className={`py-3 px-4 font-semibold ${
                        t.priority === "High"
                          ? "text-red-600"
                          : t.priority === "Medium"
                          ? "text-orange-500"
                          : "text-green-600"
                      }`}
                    >
                      {t.priority}
                    </td>
                    <td className="py-3 px-4">{t.assignedTo}</td>

                    <td className="py-3 px-4 flex justify-center gap-4">
                      <button
                        onClick={() => handleEdit(t)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() => handleDelete(t.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="py-5 text-gray-500 italic">
                  No tasks added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-[999]">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-[550px] shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-center">
              {editingId ? "Edit Task" : "Add New Task"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {/* PROJECT DROPDOWN */}
              <select
                name="projectId"
                value={form.projectId}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              >
                <option value="">Select Project</option>

                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>

              {/* TASK NAME */}
              <input
                type="text"
                name="name"
                value={form.name}
                placeholder="Task Name"
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />

              {/* DESCRIPTION */}
              <textarea
                name="description"
                value={form.description}
                placeholder="Task Description"
                onChange={handleChange}
                className="border p-2 rounded h-20"
              />

              {/* PRIORITY */}
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="border p-2 rounded"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              {/* EMPLOYEE DROPDOWN */}
              <select
                name="assignedTo"
                value={form.assignedTo}
                onChange={handleChange}
                className="border p-2 rounded"
                required
                disabled={!selectedProject}
              >
                <option value="">
                  {selectedProject ? "Select Employee" : "Select project first"}
                </option>

                {selectedProject?.team?.map((m, i) => (
                  <option key={i} value={m.name}>
                    {m.name} ({m.role})
                  </option>
                ))}
              </select>

              {/* BUTTONS */}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  {editingId ? "Update Task" : "Add Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
