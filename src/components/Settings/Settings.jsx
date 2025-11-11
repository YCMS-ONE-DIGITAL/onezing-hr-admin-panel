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
    <div
      className="
        absolute top-[86px] left-[270px] right-0 bottom-0 bg-[#f9fafc]
        flex p-8 gap-8 box-border
        md:top-[86px] md:left-[270px]
        max-md:relative max-md:left-0 max-md:top-[15px]
        max-md:flex-col max-md:p-4 max-md:gap-4 max-md:w-full max-md:overflow-x-hidden
      "
    >
      <div
        className="
          bg-white shadow-md rounded-xl p-5 h-fit w-[250px] flex-shrink-0
          max-md:w-full max-md:flex max-md:justify-around max-md:items-center 
          max-md:py-3 max-md:overflow-x-auto
        "
      >
        <h2 className="text-[18px] font-semibold mb-3 text-gray-800 max-md:hidden">
          Settings
        </h2>

        <ul
          className="
            flex flex-col gap-3 text-gray-700 font-medium
            max-md:flex-row max-md:gap-5 max-md:text-[13px]
          "
        >
          <li
            className={`cursor-pointer px-3 py-2 rounded-md text-sm transition-all ${
              activeSection === "profile"
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveSection("profile")}
          >
            Profile
          </li>
          <li
            className={`cursor-pointer px-3 py-2 rounded-md text-sm transition-all ${
              activeSection === "security"
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveSection("security")}
          >
            Security
          </li>
          <li
            className={`cursor-pointer px-3 py-2 rounded-md text-sm transition-all ${
              activeSection === "notifications"
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveSection("notifications")}
          >
            Notifications
          </li>
          <li
            className={`cursor-pointer px-3 py-2 rounded-md text-sm transition-all ${
              activeSection === "theme"
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveSection("theme")}
          >
            Theme
          </li>
        </ul>
      </div>

      <div
        className="
          flex-1 bg-white rounded-xl shadow-md p-6 overflow-y-auto
          max-md:p-4 max-md:w-full
        "
      >
        {renderSection()}
      </div>
    </div>
  );
};

export default Settings;
