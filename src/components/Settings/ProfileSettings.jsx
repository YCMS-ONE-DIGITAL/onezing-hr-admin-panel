import React, { useState } from "react";

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@example.com",
    contactNo: "1234567890",
    telephone: "0987654321",
    address: "123 Main Street, City, Country",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile Updated Successfully!\n" + JSON.stringify(formData, null, 2));
  };

  return (
    <div className="card">
      <h2>Profile Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
        </div>

        <div className="form-group">
          <label>Contact Number:</label>
          <input
            type="text"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleChange}
            placeholder="Enter contact number"
          />
        </div>

        <div className="form-group">
          <label>Telephone:</label>
          <input
            type="text"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            placeholder="Enter telephone number"
          />
        </div>

        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
          />
        </div>

        <button type="submit" className="save-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;
