import React, { useState } from "react";

const ThemeLayout = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSave = () => {
    alert("Theme & Layout Saved!");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  return (
    <div className="card">
      <h2>Theme & Layout</h2>
      <div className="form-group">
        <label>
          <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
          Dark Mode
        </label>
      </div>
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={sidebarCollapsed}
            onChange={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
          Collapse Sidebar by Default
        </label>
      </div>
      <button className="save-btn" onClick={handleSave}>Save</button>
    </div>
  );
};

export default ThemeLayout;
