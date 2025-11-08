import React from "react";

export default function ProjectTable({ projects }) {
  return (
    <div className="card">
      <h2>Active Projects</h2>
      {projects.length === 0 ? (
        <p>No projects added yet.</p>
      ) : (
        <table className="project-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Manager</th>
              <th>Start</th>
              <th>End</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p, index) => (
              <tr key={index}>
                <td>{p.name}</td>
                <td>{p.manager}</td>
                <td>{p.startDate}</td>
                <td>{p.endDate}</td>
                <td>{p.status}</td>
                <td>{p.progress}%</td>
                <td>{p.priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
