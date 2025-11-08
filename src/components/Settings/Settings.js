import React, { useState } from "react";
import "./Settings.css";
import ProfileSettings from "./ProfileSettings";
import AccountSecurity from "./AccountSecurity";
import Notifications from "./Notifications";
import ThemeLayout from "./ThemeLayout";

const Settings = () => {
  const [activeSection, setActiveSection] = useState("profile");

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSettings />;
      case "security":
        return <AccountSecurity />;
      case "notifications":
        return <Notifications />;
      case "theme":
        return <ThemeLayout />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-sidebar">
        <h2>Settings</h2>
        <ul>
          <li
            className={activeSection === "profile" ? "active" : ""}
            onClick={() => setActiveSection("profile")}
          >
            Profile
          </li>
          <li
            className={activeSection === "security" ? "active" : ""}
            onClick={() => setActiveSection("security")}
          >
            Account Security
          </li>
          <li
            className={activeSection === "notifications" ? "active" : ""}
            onClick={() => setActiveSection("notifications")}
          >
            Notifications
          </li>
          <li
            className={activeSection === "theme" ? "active" : ""}
            onClick={() => setActiveSection("theme")}
          >
            Theme & Layout
          </li>
        </ul>
      </div>

      <div className="settings-content">{renderSection()}</div>
    </div>
  );
};

export default Settings;
