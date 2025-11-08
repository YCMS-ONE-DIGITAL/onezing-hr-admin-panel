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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
    <div className="card">
      <h2>Add New Project</h2>
      <form onSubmit={handleSubmit} className="project-form">
        <input
          type="text"
          name="name"
          placeholder="Project Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="manager"
          placeholder="Project Manager"
          value={formData.manager}
          onChange={handleChange}
          required
        />
        <div className="form-row">
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>
        <select name="status" value={formData.status} onChange={handleChange}>
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
        />

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
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
        ></textarea>

        <button type="submit" className="add-btn">
          Add Project
        </button>
      </form>
    </div>
  );
}
