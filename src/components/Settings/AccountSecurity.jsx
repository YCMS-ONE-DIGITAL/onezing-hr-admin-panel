// src/pages/AccountSecurity.jsx
import React, { useState } from "react";

const AccountSecurity = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [twoFactor, setTwoFactor] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("New Password and Confirm Password do not match!");
      return;
    }

    if (formData.newPassword.length < 8) {
      alert("Password must be at least 8 characters.");
      return;
    }

    // येथे API call लावू शकतो नंतर
    alert("Password updated successfully!");
  };

  const handleLogoutAll = () => {
    // backend connect झाल्यावर इथे API call
    alert("Logged out from all active devices (demo).");
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Security Settings
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Change your password & manage login security.
        </p>
      </div>

      {/* CHANGE PASSWORD */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-50 border border-gray-200 rounded-xl p-5"
      >
        <h3 className="text-sm font-semibold text-gray-700 mb-2">
          Change Password
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Old Password
            </label>
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              className="
                w-full border border-gray-300 rounded-md px-3 py-2 text-sm
                focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
              "
              placeholder="Enter old password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="
                w-full border border-gray-300 rounded-md px-3 py-2 text-sm
                focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
              "
              placeholder="Enter new password"
            />
            <p className="text-[11px] text-gray-500 mt-1">
              Use at least 8 characters, including numbers & symbols.
            </p>
          </div>
        </div>

        <div className="md:w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="
              w-full border border-gray-300 rounded-md px-3 py-2 text-sm
              focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
            "
            placeholder="Re-enter new password"
          />
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3 mt-2">
          <button
            type="button"
            onClick={() => alert("Forgot Password clicked!")}
            className="text-xs text-blue-600 hover:underline"
          >
            Forgot Password?
          </button>

          <button
            type="submit"
            className="
              px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium
              hover:bg-blue-700 transition
            "
          >
            Update Password
          </button>
        </div>
      </form>

      {/* 2FA + LOGOUT ALL DEVICES */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h3 className="text-sm font-semibold text-gray-700">
              Two-Factor Authentication (2FA)
            </h3>
            <p className="text-xs text-gray-500 mt-1 max-w-md">
              Add an extra layer of security. When enabled, a verification code
              will be required during login.
            </p>
          </div>

          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={twoFactor}
              onChange={() => setTwoFactor((prev) => !prev)}
              className="h-4 w-4"
            />
            <span className="text-sm text-gray-700">
              Enable 2FA
            </span>
          </label>
        </div>

        <div className="border-t border-gray-200 pt-4 mt-2 flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-sm font-semibold text-gray-700">
              Logout from all devices
            </p>
            <p className="text-xs text-gray-500 mt-1 max-w-md">
              If you think your account is used somewhere else, logout
              instantly from all other sessions.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogoutAll}
            className="
              px-4 py-2 rounded-md border border-red-300 text-red-600 text-sm font-medium
              hover:bg-red-50 transition
            "
          >
            Logout from all devices
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSecurity;
