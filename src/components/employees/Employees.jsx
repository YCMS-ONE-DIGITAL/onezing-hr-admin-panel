import React from "react";
import "./Employees.css";
import { FaSearch, FaPlus } from "react-icons/fa";

const Employees = () => {
  return (
    <div className="employees-wrapper">
      {/* === Header Section === */}
      <div className="employees-header">
        <h2>Employees</h2>
        <div className="employees-actions">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search employee..." />
          </div>
          <button className="add-btn">
            <FaPlus /> Add Employee
          </button>
        </div>
      </div>

      {/* === Table Section === */}
      <div className="employees-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#001</td>
              <td>Adrianna Stevens</td>
              <td>Software Engineer</td>
              <td>Development</td>
              <td className="status active">Active</td>
            </tr>
            <tr>
              <td>#002</td>
              <td>Zachary McLaughlin</td>
              <td>HR Manager</td>
              <td>Human Resources</td>
              <td className="status active">Active</td>
            </tr>
            <tr>
              <td>#003</td>
              <td>Stephanie Douglas</td>
              <td>QA Analysts</td>
              <td>Development</td>
              <td className="status active">Active</td>
            </tr>
            <tr>
              <td>#004</td>
              <td>Derek Cervantes</td>
              <td>System Administrators</td>
              <td>Network and Infra Department</td>
              <td className="status active">Active</td>
            </tr>
            <tr>
              <td>#005</td>
              <td>SAylin Wilcox</td>
              <td>Helpdesk Technician</td>
              <td>Technical Support</td>
              <td className="status active">Active</td>
            </tr>
            <tr>
              <td>#006</td>
              <td>Jerry Zhang</td>
              <td>Security Analysts</td>
              <td>Cybersecurity</td>
              <td className="status active">Active</td>
            </tr>
            <tr>
              <td>#007</td>
              <td>Kase Huynh</td>
              <td>DevOps Engineer</td>
              <td>Software Development</td>
              <td className="status inactive">Inactive</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employees;
