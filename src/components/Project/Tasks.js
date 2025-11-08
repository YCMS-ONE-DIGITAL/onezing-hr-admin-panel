import React, { useState } from "react";
import "./Tasks.css";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    priority: "Medium",
    estimatedHours: "",
    actualHours: "",
    progress: "",
    relatedProject: "",
    assignedTo: "",
    deadline: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const addTask = () => {
    if (!newTask.name) return alert("Please enter task name");
    setTasks([...tasks, newTask]);
    setNewTask({
      name: "",
      description: "",
      priority: "Medium",
      estimatedHours: "",
      actualHours: "",
      progress: "",
      relatedProject: "",
      assignedTo: "",
      deadline: "",
    });
  };

  return (
    <div className="tasks-wrapper">
      <h1>Task Management</h1>

      
      <div className="add-task-card">
        <h3>Add New Task</h3>

        <div className="task-form-grid">
          <input
            type="text"
            name="name"
            placeholder="Task Name"
            value={newTask.name}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Task Description"
            value={newTask.description}
            onChange={handleChange}
          />

          <select
            name="priority"
            value={newTask.priority}
            onChange={handleChange}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <input
            type="number"
            name="estimatedHours"
            placeholder="Estimated Hours"
            value={newTask.estimatedHours}
            onChange={handleChange}
          />

          <input
            type="number"
            name="actualHours"
            placeholder="Actual Hours"
            value={newTask.actualHours}
            onChange={handleChange}
          />

          <input
            type="number"
            name="progress"
            placeholder="Progress %"
            value={newTask.progress}
            onChange={handleChange}
          />

          <input
            type="text"
            name="relatedProject"
            placeholder="Related Project"
            value={newTask.relatedProject}
            onChange={handleChange}
          />

          <input
            type="text"
            name="assignedTo"
            placeholder="Assigned Team Members"
            value={newTask.assignedTo}
            onChange={handleChange}
          />

          <input
            type="date"
            name="deadline"
            value={newTask.deadline}
            onChange={handleChange}
          />

          <button onClick={addTask}>Add Task</button>
        </div>
      </div>


      <div className="task-list">
        <table>
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Estimated Hours</th>
              <th>Actual Hours</th>
              <th>Progress</th>
              <th>Related Project</th>
              <th>Assigned To</th>
              <th>Deadline</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td className={`priority-${task.priority.toLowerCase()}`}>
                  {task.priority}
                </td>
                <td>{task.estimatedHours}</td>
                <td>{task.actualHours}</td>
                <td>{task.progress}%</td>
                <td>{task.relatedProject}</td>
                <td>{task.assignedTo}</td>
                <td>{task.deadline}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
