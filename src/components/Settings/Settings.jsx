// src/pages/Settings.jsx
import React, { useState } from "react";
import ProfileSettings from "./ProfileSettings";
import AccountSecurity from "./AccountSecurity";

const Settings = () => {
  const [activeSection, setActiveSection] = useState("profile");

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSettings />;
      case "security":
        return <AccountSecurity />;
      default:
        return <ProfileSettings />;
    }
  };

  const menuItems = [
    { id: "profile", label: "Profile Settings" },
    { id: "security", label: "Security Settings" },
  ];

  return (
    <div
      className="
        absolute top-[86px] left-[270px] right-0 bottom-0 bg-[#f9fafc]
        flex gap-6 p-8 box-border
        max-md:relative max-md:top-[20px] max-md:left-0 
        max-md:flex-col max-md:p-4
      "
    >
      {/* LEFT MENU */}
      <aside
        className="
          bg-white shadow-md rounded-xl p-5 h-fit w-[250px] flex-shrink-0
          border border-gray-100
          max-md:w-full max-md:flex max-md:items-center max-md:gap-4 max-md:overflow-x-auto
        "
      >
        <div className="max-md:hidden mb-2">
          <h2 className="text-[18px] font-semibold text-gray-800">
            Settings
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Manage your profile & security
          </p>
        </div>

        <ul
          className="
            flex flex-col gap-2 mt-2
            max-md:flex-row max-md:gap-3 max-md:text-[13px]
          "
        >
          {menuItems.map((item) => (
            <li
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`
                cursor-pointer px-3 py-2 rounded-md text-sm whitespace-nowrap
                transition-all border
                ${
                  activeSection === item.id
                    ? "bg-blue-50 text-blue-700 border-blue-200 font-semibold"
                    : "bg-white text-gray-700 border-transparent hover:bg-gray-50"
                }
              `}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </aside>

      {/* RIGHT CONTENT */}
      <main
        className="
          flex-1 bg-white rounded-xl shadow-md p-6 
          border border-gray-100
          overflow-y-auto
          max-md:p-4 max-md:w-full
        "
      >
        {renderSection()}
      </main>
    </div>
  );
};

export default Settings;
