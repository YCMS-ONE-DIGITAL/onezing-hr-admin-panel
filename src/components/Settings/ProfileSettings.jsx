// src/pages/ProfileSettings.jsx
import React, { useState } from "react";

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
    department: "Human Resources",
    jobRole: "HR Manager",
    language: "English",
    timezone: "Asia/Kolkata",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      "Profile Updated Successfully!\n" +
        JSON.stringify(formData, null, 2)
    );
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4 max-md:flex-col">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Profile Settings
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Update your personal information & account preferences.
          </p>
        </div>

        {/* Avatar + Change button (UI only) */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-lg">
            {formData.fullName?.[0] || "U"}
          </div>
          <button
            type="button"
            className="text-xs px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
            onClick={() => alert("Profile picture change (UI only)")}
          >
            Change Photo
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* PERSONAL INFO */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-gray-700">
            Personal Information
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="
                  w-full border border-gray-300 rounded-md px-3 py-2 text-sm
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                "
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="
                  w-full border border-gray-300 rounded-md px-3 py-2 text-sm
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                "
                placeholder="Enter email"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="
                  w-full border border-gray-300 rounded-md px-3 py-2 text-sm
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                "
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="
                  w-full border border-gray-300 rounded-md px-3 py-2 text-sm
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                "
                placeholder="e.g. HR, Engineering"
              />
            </div>
          </div>

          <div className="md:w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Role
            </label>
            <input
              type="text"
              name="jobRole"
              value={formData.jobRole}
              onChange={handleChange}
              className="
                w-full border border-gray-300 rounded-md px-3 py-2 text-sm
                focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
              "
              placeholder="e.g. HR Manager"
            />
          </div>
        </div>

        {/* ACCOUNT PREFERENCES */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-gray-700">
            Account Preferences
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Language
              </label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="
                  w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                "
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Marathi</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Timezone
              </label>
              <select
                name="timezone"
                value={formData.timezone}
                onChange={handleChange}
                className="
                  w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                "
              >
                <option value="Asia/Kolkata">Asia / Kolkata (IST)</option>
                <option value="UTC">UTC</option>
                <option value="Europe/London">Europe / London</option>
                <option value="America/New_York">America / New York</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="
              px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium
              hover:bg-blue-700 transition
            "
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
