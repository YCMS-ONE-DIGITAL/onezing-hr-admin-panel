import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    priority: "Medium",
    assignedTo: "",
  });

  const handleChange = (e) =>
    setTaskData({ ...taskData, [e.target.name]: e.target.value });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
    setTaskData({
      name: "",
      description: "",
      priority: "Medium",
      assignedTo: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskData.name.trim() || !taskData.assignedTo.trim()) {
      alert("Please enter task name and assignee");
      return;
    }

    if (editingTask) {
      setTasks(
        tasks.map((t) =>
          t.id === editingTask ? { ...taskData, id: t.id } : t
        )
      );
    } else {
      setTasks([...tasks, { ...taskData, id: Date.now() }]);
    }

    closeModal();
  };

  const handleEdit = (id) => {
    const editData = tasks.find((t) => t.id === id);
    setTaskData(editData);
    setEditingTask(id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  return (
    <div
      className="
        absolute top-[115px] left-[250px] right-0 bottom-0 bg-[#f8f9fb]
        flex flex-col items-center p-8 gap-8 overflow-y-auto
        font-[Poppins]
        max-md:relative max-md:left-0 max-md:top-[40px] max-md:p-4
      "
    >
      <h1 className="text-center text-[#222] font-semibold text-[28px] md:text-[32px]">
        Task Management
      </h1>

      <div className="flex justify-between items-center w-[90%] md:w-[80%] max-w-[900px] mb-4">
        <h2 className="text-[18px] font-semibold text-gray-700">
          Employee Tasks
        </h2>
        <button
          onClick={openModal}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md shadow-md text-sm font-medium transition"
        >
          <FaPlus className="text-[13px]" /> Add Task
        </button>
      </div>

      <div
        className="
          bg-white rounded-xl shadow-md p-4 md:p-6 w-[95%] md:w-[80%] max-w-[900px]
          overflow-x-auto
        "
      >
        <table className="w-full border-collapse text-[13px] md:text-[15px] text-center">
          <thead>
            <tr className="bg-[#f1f3f6] text-gray-800 font-semibold">
              <th className="border border-gray-200 py-2 px-3">Name</th>
              <th className="border border-gray-200 py-2 px-3">Description</th>
              <th className="border border-gray-200 py-2 px-3">Priority</th>
              <th className="border border-gray-200 py-2 px-3">Assigned To</th>
              <th className="border border-gray-200 py-2 px-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((t) => (
                <tr key={t.id} className="text-gray-700 hover:bg-blue-50">
                  <td className="border border-gray-200 py-2 px-3">{t.name}</td>
                  <td className="border border-gray-200 py-2 px-3">
                    {t.description || "-"}
                  </td>
                  <td
                    className={`border border-gray-200 py-2 px-3 font-semibold ${
                      t.priority === "Low"
                        ? "text-green-600"
                        : t.priority === "Medium"
                        ? "text-orange-500"
                        : "text-red-600"
                    }`}
                  >
                    {t.priority}
                  </td>
                  <td className="border border-gray-200 py-2 px-3">
                    {t.assignedTo}
                  </td>
                  <td className="border border-gray-200 py-2 px-3">
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => handleEdit(t.id)}
                        className="text-blue-500 hover:text-blue-700 transition"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(t.id)}
                        className="text-red-500 hover:text-red-700 transition"
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
                  colSpan="5"
                  className="py-3 text-gray-500 italic text-center"
                >
                  No tasks added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-[999]">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-[600px] relative">
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
              {editingTask ? "Edit Task" : "Add New Task"}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 text-[14px]"
            >
              <input
                type="text"
                name="name"
                placeholder="Task Name"
                value={taskData.name}
                onChange={handleChange}
                required
                className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <textarea
                name="description"
                placeholder="Task Description"
                value={taskData.description}
                onChange={handleChange}
                className="border p-2 rounded-md h-[70px] focus:ring-2 focus:ring-blue-400 outline-none"
              ></textarea>

              <select
                name="priority"
                value={taskData.priority}
                onChange={handleChange}
                className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              <input
                type="text"
                name="assignedTo"
                placeholder="Assign To (Employee Name)"
                value={taskData.assignedTo}
                onChange={handleChange}
                required
                className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              />

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
                    editingTask
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {editingTask ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
