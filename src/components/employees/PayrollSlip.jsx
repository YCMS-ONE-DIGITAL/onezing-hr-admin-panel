import React from "react";
import { FaDownload, FaPrint, FaSave } from "react-icons/fa";

export default function SalarySlip({ slip, onClose }) {
  if (!slip) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-start p-4 z-[999] overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl p-8 mt-10">

        {/* HEADER */}
        <div className="flex justify-between items-start border-b pb-5">
          <div>
            <h1 className="text-3xl font-bold text-blue-800">HROne Pvt. Ltd.</h1>
            <p className="text-gray-600 text-sm">
              100 Terminal Road, Pune, Maharashtra, India
            </p>
            <p className="text-gray-600 text-sm">contact@hrone.com</p>
            <p className="text-gray-600 text-sm">+91 90000 12345</p>
          </div>

          <div className="text-right">
            <h2 className="text-xl font-semibold text-gray-800">
              Salary Slip
            </h2>
            <p className="text-gray-600 text-sm">
              Employee ID: <strong>{slip.id}</strong>
            </p>
            <p className="text-gray-600 text-sm">
              Date: <strong>01 / 11 / 2024</strong>
            </p>
          </div>
        </div>

        {/* EMPLOYEE DETAILS */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">
            Employee Information
          </h3>

          <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm">
            <p><strong>Name:</strong> {slip.name}</p>
            <p><strong>Designation:</strong> {slip.designation}</p>
            <p><strong>Department:</strong> IT Department</p>
            <p><strong>Status:</strong> {slip.status}</p>
          </div>
        </div>

        {/* LEAVE & ATTENDANCE */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">
            Attendance Summary
          </h3>

          <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm">
            <p><strong>Total Working Days:</strong> 30</p>
            <p><strong>Present Days:</strong> 26</p>
            <p><strong>Absent Days:</strong> 2</p>
            <p><strong>Paid Leave:</strong> 1</p>
            <p><strong>Unpaid Leave:</strong> 1</p>
            <p><strong>Overtime Hours:</strong> 5 hrs</p>
          </div>
        </div>

        {/* EARNINGS */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">
            Earnings
          </h3>

          <table className="w-full border rounded-lg">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="p-3">Title</th>
                <th className="p-3">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border-t">Basic Salary</td>
                <td className="p-3 border-t">{slip.salary}</td>
              </tr>
              <tr>
                <td className="p-3 border-t">Overtime Pay</td>
                <td className="p-3 border-t">₹2,000</td>
              </tr>
              <tr>
                <td className="p-3 border-t font-bold">Total Earnings</td>
                <td className="p-3 border-t font-bold">₹{parseInt(slip.salary.replace("₹","")) + 2000}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* DEDUCTIONS */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">
            Deductions
          </h3>

          <table className="w-full border rounded-lg">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="p-3">Title</th>
                <th className="p-3">Amount</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="p-3 border-t">Provident Fund</td>
                <td className="p-3 border-t">₹500</td>
              </tr>

              <tr>
                <td className="p-3 border-t">Professional Tax</td>
                <td className="p-3 border-t">₹200</td>
              </tr>

              <tr>
                <td className="p-3 border-t font-bold">Total Deductions</td>
                <td className="p-3 border-t font-bold">₹700</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* NET SALARY */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">
            Net Salary
          </h3>

          <p className="text-xl font-bold text-green-600">
            ₹{parseInt(slip.salary.replace("₹","")) + 2000 - 700}
          </p>
        </div>

        {/* BANK DETAILS */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">
            Payment Details
          </h3>

          <p className="text-sm text-gray-700"><strong>Bank:</strong> HDFC Bank</p>
          <p className="text-sm text-gray-700"><strong>Account No.:</strong> 4567 **** **** 22</p>
          <p className="text-sm text-gray-700"><strong>Payment Mode:</strong> Bank Transfer</p>
        </div>

        {/* BUTTONS */}
        <div className="mt-10 flex justify-end gap-4">
          <button className="px-5 py-2 bg-blue-500 text-white rounded-lg shadow flex items-center gap-2 hover:bg-blue-600">
            <FaPrint /> Print
          </button>

          <button className="px-5 py-2 bg-green-500 text-white rounded-lg shadow flex items-center gap-2 hover:bg-green-600">
            <FaSave /> Save
          </button>

          <button className="px-5 py-2 bg-orange-500 text-white rounded-lg shadow flex items-center gap-2 hover:bg-orange-600">
            <FaDownload /> Download
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
