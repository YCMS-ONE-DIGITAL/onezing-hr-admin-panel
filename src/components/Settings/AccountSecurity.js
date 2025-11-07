import React, { useState } from "react";

const AccountSecurity = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New Password and Confirm Password do not match!");
      return;
    }
    alert("Password updated successfully!");
    // Here you can integrate API call for updating password
  };

  return (
    <div className="card">
      <h2>Account Security</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Old Password:</label>
          <input
            type="password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            placeholder="Enter old password"
          />
        </div>

        <div className="form-group">
          <label>New Password:</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="Enter new password"
          />
        </div>

        <div className="form-group">
          <label>Re-enter New Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter new password"
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <a href="#" style={{ fontSize: "14px", color: "#3b82f6" }}>
            Forgot Password?
          </a>
        </div>

        <button type="submit" className="save-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AccountSecurity;
