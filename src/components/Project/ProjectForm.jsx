import React, { useState } from "react";

export default function ProjectForm({ onAdd }) {
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

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    onAdd(formData);
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

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full">
      <h2 className="text-[20px] font-semibold text-gray-800 mb-4 text-center">
        Add New Project
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 text-[14px]"
      >
        <input
          type="text"
          name="name"
          placeholder="Project Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          name="manager"
          placeholder="Project Manager"
          value={formData.manager}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex gap-3 flex-col sm:flex-row">
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-2 flex-1 focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-2 flex-1 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
        >
          <option>Not Started</option>
          <option>In Progress</option>
          <option>Completed</option>
          <option>On Hold</option>
        </select>

        <input
          type="number"
          name="progress"
          placeholder="Completion %"
          value={formData.progress}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
        />

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <textarea
          name="description"
          placeholder="Project Description"
          value={formData.description}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 h-[80px] resize-none focus:ring-2 focus:ring-blue-400"
        ></textarea>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Add Project
        </button>
      </form>
    </div>
  );
}
