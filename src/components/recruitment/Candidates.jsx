import React, { useState, useMemo } from "react";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const jobRoles = [
  "React Developer",
  "PHP Developer",
  "IOS Developer",
  "Laravel Developer",
  "Network Engineer",
];

const defaultCandidates = [
  {
    id: "C-001",
    name: "Raja Patil",
    email: "raja@gmail.com",
    jobApplied: "React Developer",
    experience: "3 years",
    status: "New",
  },
  {
    id: "C-002",
    name: "Sneha K",
    email: "sneha@example.com",
    jobApplied: "PHP Developer",
    experience: "2 years",
    status: "Shortlisted",
  },
  {
    id: "C-003",
    name: "Arjun More",
    email: "arjun@example.com",
    jobApplied: "Network Engineer",
    experience: "1 year",
    status: "Interview",
  },
];

const statusColors = {
  New: "bg-blue-100 text-blue-700",
  Shortlisted: "bg-green-100 text-green-700",
  Interview: "bg-yellow-100 text-yellow-700",
  Rejected: "bg-red-100 text-red-700",
  Hired: "bg-purple-100 text-purple-700",
};

export default function Candidates() {
  const [rows, setRows] = useState(defaultCandidates);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [editRow, setEditRow] = useState(null);

  const emptyForm = {
    name: "",
    email: "",
    jobApplied: "",
    experience: "",
    status: "New",
  };

  const [form, setForm] = useState(emptyForm);

  const openAddModal = () => {
    setEditRow(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (r) => {
    setEditRow(r);
    setForm(r);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name || !form.email || !form.jobApplied || !form.experience) {
      alert("Please fill all fields");
      return;
    }

    if (editRow) {
      setRows(
        rows.map((r) => (r.id === editRow.id ? { ...form, id: editRow.id } : r))
      );
    } else {
      setRows([
        ...rows,
        { id: "C-" + (rows.length + 1).toString().padStart(3, "0"), ...form },
      ]);
    }

    setShowModal(false);
  };

  const deleteRow = (id) => {
    if (confirm("Delete Candidate?")) {
      setRows(rows.filter((r) => r.id !== id));
    }
  };

  const visibleRows = useMemo(() => {
    let data = [...rows];

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.jobApplied.toLowerCase().includes(q)
      );
    }

    if (filterRole !== "All") data = data.filter((r) => r.jobApplied === filterRole);
    if (filterStatus !== "All") data = data.filter((r) => r.status === filterStatus);

    return data;
  }, [rows, search, filterRole, filterStatus]);

  return (
    <div className="py-6 ml-[210px] px-4 pt-10 max-w-full
                    md:ml-[210px]
                    max-md:ml-0 max-md:pt-16 max-md:px-5">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6 max-md:flex-row max-md:gap-4 max-md:mb-8">
        <h1 className="text-2xl font-semibold max-md:text-xl">Candidates</h1>

        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-orange-500 text-white rounded-md flex items-center gap-2 shadow
                     max-md:px-3 max-md:py-1.5 max-md:text-sm"
        >
          <FaPlus /> Add Candidate
        </button>
      </div>

      {/* FILTERS */}
      <div className="bg-white rounded-xl shadow-sm border p-5 mb-6 
                      max-md:mb-8 max-md:p-4 space-y-4">

        <div className="flex flex-wrap gap-4 items-center">

          {/* Search */}
          <div className="relative w-64 max-md:w-full">
            <FaSearch className="absolute left-3 top-3 text-gray-400 text-xs" />
            <input
              placeholder="Search candidates..."
              className="border pl-8 pr-3 py-2 rounded-md text-sm w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Job Role */}
          <select
            className="border px-3 py-2 rounded-md text-sm max-md:w-full"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="All">Job Role</option>
            {jobRoles.map((job) => (
              <option key={job} value={job}>{job}</option>
            ))}
          </select>

          {/* Status */}
          <select
            className="border px-3 py-2 rounded-md text-sm max-md:w-full"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">Status</option>
            <option>New</option>
            <option>Shortlisted</option>
            <option>Interview</option>
            <option>Rejected</option>
            <option>Hired</option>
          </select>

        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border
                      overflow-x-auto p-3 max-md:mt-4">

        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-gray-700 h-12">
              <th className="px-6 text-left w-8"><input type="checkbox" /></th>
              <th className="px-3 text-left">ID</th>
              <th className="px-3 text-left">Candidate</th>
              <th className="px-3 text-left">Job Applied</th>
              <th className="px-3 text-left">Experience</th>
              <th className="px-3 text-left">Status</th>
              <th className="px-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {visibleRows.map((r, i) => (
              <tr key={r.id} className={`${i % 2 ? "bg-slate-50/40" : "bg-white"} h-14`}>
                <td className="px-6"><input type="checkbox" /></td>
                <td className="px-3">{r.id}</td>

                <td className="px-3">
                  <div className="font-medium">{r.name}</div>
                  <div className="text-xs text-gray-500">{r.email}</div>
                </td>

                <td className="px-3">{r.jobApplied}</td>
                <td className="px-3">{r.experience}</td>

                <td className="px-3">
                  <span className={`px-2 py-1 rounded text-xs ${statusColors[r.status]}`}>
                    {r.status}
                  </span>
                </td>

                <td className="px-3 text-right">
                  <div className="flex items-center justify-end gap-3 text-gray-600">
                    <button onClick={() => openEditModal(r)}>
                      <FaEdit className="hover:text-blue-600" />
                    </button>
                    <button onClick={() => deleteRow(r.id)}>
                      <FaTrash className="hover:text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {visibleRows.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-gray-500 py-6">
                  No candidates found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/20 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[420px] max-md:w-[90%] scale-95 animate-[fadeIn_.2s_ease-out]">
            <h2 className="text-lg font-semibold mb-4">
              {editRow ? "Edit Candidate" : "Add Candidate"}
            </h2>

            <div className="space-y-3">
              <input
                placeholder="Candidate Name"
                className="border p-2 w-full rounded"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                placeholder="Candidate Email"
                className="border p-2 w-full rounded"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <select
                className="border p-2 w-full rounded"
                value={form.jobApplied}
                onChange={(e) => setForm({ ...form, jobApplied: e.target.value })}
              >
                <option value="">Select Job</option>
                {jobRoles.map((j) => (
                  <option key={j} value={j}>{j}</option>
                ))}
              </select>

              <input
                placeholder="Experience (e.g. 2 years)"
                className="border p-2 w-full rounded"
                value={form.experience}
                onChange={(e) => setForm({ ...form, experience: e.target.value })}
              />

              <select
                className="border p-2 w-full rounded"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option>New</option>
                <option>Shortlisted</option>
                <option>Interview</option>
                <option>Rejected</option>
                <option>Hired</option>
              </select>

              <button
                onClick={handleSave}
                className="w-full bg-orange-500 text-white py-2 rounded mt-3"
              >
                {editRow ? "Update Candidate" : "Save Candidate"}
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="w-full border py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
