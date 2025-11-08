import React, { useState } from "react";
import "./Project.css";
import ProjectForm from "./ProjectForm";
import ProjectTable from "./ProjectTable";

export default function Project() {
  const [projects, setProjects] = useState([]);

  const addProject = (newProject) => {
    setProjects([...projects, newProject]);
  };

  return (
    <div className="project-wrapper">
      <h1>Project Management</h1>

      <div className="project-sections">
        <div className="project-form-section">
          <ProjectForm onAdd={addProject} />
        </div>

        <div className="project-list-section">
          <ProjectTable projects={projects} />
        </div>
      </div>
    </div>
  );
}
