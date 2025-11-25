import React, { useState, useMemo, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

/* =========================================
   JOB ICON MAP
   ========================================= */
const jobIconMap = {
  "Senior IOS Developer": "https://cdn-icons-png.flaticon.com/512/731/731985.png",
  "Junior PHP Developer": "https://cdn-icons-png.flaticon.com/512/919/919830.png",
  "Network Engineer": "https://cdn-icons-png.flaticon.com/512/3208/3208725.png",
  "Junior React Developer": "https://cdn-icons-png.flaticon.com/512/1126/1126012.png",
  "Senior Laravel Developer": "https://cdn-icons-png.flaticon.com/512/5968/5968371.png",
};

/* =========================================
   DEFAULT REFERRALS DATA
   ========================================= */
const defaultReferrals = [
  {
    id: "Reff-001",
    referrerName: "Anthony Lewis",
    referrerRole: "Finance",
    jobTitle: "Senior IOS Developer",
    candidateName: "Harold Gaynor",
    candidateEmail: "harold@example.com",
    bonus: 200,
  },
  {
    id: "Reff-002",
    referrerName: "Brian Villalobos",
    referrerRole: "Developer",
    jobTitle: "Junior PHP Developer",
    candidateName: "Sandra Ornellas",
    candidateEmail: "sandra@example.com",
    bonus: 100,
  },
];

export default function Referrals() {
  /* =========================================
     STATE: referrals + modal + form
     ========================================= */
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [sortOption, setSortOption] = useState("last7");
  const [showModal, setShowModal] = useState(false);
  const [editRow, setEditRow] = useState(null);

  /* FORM DATA */
  const emptyForm = {
    referrerName: "",
    referrerRole: "",
    jobTitle: "",
    candidateName: "",
    candidateEmail: "",
    bonus: "",
  };

  const [form, setForm] = useState(emptyForm);

  /* =========================================
     LOCAL STORAGE LOAD
     ========================================= */
  useEffect(() => {
    const saved = localStorage.getItem("referrals");
    if (saved) setRows(JSON.parse(saved));
    else setRows(defaultReferrals);
  }, []);

  /* SAVE TO LOCAL STORAGE */
  useEffect(() => {
    localStorage.setItem("referrals", JSON.stringify(rows));
  }, [rows]);

  /* =========================================
     OPEN MODAL
     ========================================= */
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

  /* =========================================
     SAVE REFERRAL
     ========================================= */
  const handleSave = () => {
    if (
      !form.referrerName ||
      !form.referrerRole ||
      !form.jobTitle ||
      !form.candidateName ||
      !form.candidateEmail ||
      !form.bonus
    ) {
      alert("Please fill all fields");
      return;
    }

    if (editRow) {
      setRows(
        rows.map((r) =>
          r.id === editRow.id ? { ...form, id: editRow.id } : r
        )
      );
    } else {
      setRows([
        ...rows,
        {
          id: "Reff-" + String(rows.length + 1).padStart(3, "0"),
          ...form,
        },
      ]);
    }

    setShowModal(false);
  };

  /* =========================================
     DELETE REFERRAL
     ========================================= */
  const deleteRow = (id) => {
    if (confirm("Delete this referral?")) {
      setRows(rows.filter((r) => r.id !== id));
    }
  };

  /* =========================================
     FILTER + SEARCH
     ========================================= */
  const visibleRows = useMemo(() => {
    let data = [...rows];

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (r) =>
          r.referrerName.toLowerCase().includes(q) ||
          r.candidateName.toLowerCase().includes(q) ||
          r.jobTitle.toLowerCase().includes(q)
      );
    }

    if (roleFilter !== "All") {
      data = data.filter((r) => r.referrerRole === roleFilter);
    }

    return data;
  }, [rows, search, roleFilter]);

  /* =========================================
     PAGE UI
     ========================================= */
  return (
    <div
      className="py-6"
      style={{
        marginLeft: "200px",
        paddingTop: "40px",
        paddingLeft: "10px",
        paddingRight: "20px",
      }}
    >
      {/* PAGE HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Referrals</h1>

        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-orange-500 text-white rounded-md flex items-center gap-2 shadow"
        >
          <FaPlus /> Add Referral
        </button>
      </div>

      {/* MAIN CARD */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* CARD HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="font-semibold">Referrals List</h2>

          <div className="flex items-center gap-3">
            <select
              className="border px-3 py-1 rounded-md text-sm"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="All">Role</option>
              <option value="Finance">Finance</option>
              <option value="Developer">Developer</option>
              <option value="Executive Officer">Executive Officer</option>
              <option value="Manager">Manager</option>
            </select>

            <div className="relative">
              <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-xs" />
              <input
                className="border pl-8 pr-3 py-1.5 rounded-md text-sm w-48"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-gray-700">
                <th className="px-6 py-3 text-left w-8">
                  <input type="checkbox" />
                </th>
                <th className="px-3 py-3 text-left">Referrals ID</th>
                <th className="px-3 py-3 text-left">Referrer Name</th>
                <th className="px-3 py-3 text-left">Job Referred</th>
                <th className="px-3 py-3 text-left">Referee Name</th>
                <th className="px-3 py-3 text-left">Bonus</th>
                <th className="px-3 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {visibleRows.map((r, i) => (
                <tr key={r.id} className={i % 2 ? "bg-slate-50/40" : "bg-white"}>
                  <td className="px-6 py-3">
                    <input type="checkbox" />
                  </td>

                  <td className="px-3 py-3">{r.id}</td>

                  {/* ONLY NAME + DESIGNATION (NO PHOTO) */}
                  <td className="px-3 py-3">
                    <div className="font-medium">{r.referrerName}</div>
                    <div className="text-xs text-gray-500">{r.referrerRole}</div>
                  </td>

                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={jobIconMap[r.jobTitle]}
                        className="w-6 h-6"
                      />
                      {r.jobTitle}
                    </div>
                  </td>

                  <td className="px-3 py-3">
                    <div>{r.candidateName}</div>
                    <div className="text-xs text-gray-500">{r.candidateEmail}</div>
                  </td>

                  <td className="px-3 py-3">${r.bonus}</td>

                  <td className="px-3 py-3 text-right">
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
                  <td colSpan={7} className="text-center py-6 text-gray-500">
                    No referrals found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/20 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[420px] animate-popup">
            <h2 className="text-lg font-semibold mb-4">
              {editRow ? "Edit Referral" : "Add Referral"}
            </h2>

            <div className="space-y-3">
              <input
                placeholder="Referrer Name"
                className="border p-2 w-full rounded"
                value={form.referrerName}
                onChange={(e) => setForm({ ...form, referrerName: e.target.value })}
              />

              <input
                placeholder="Referrer Role"
                className="border p-2 w-full rounded"
                value={form.referrerRole}
                onChange={(e) => setForm({ ...form, referrerRole: e.target.value })}
              />

              <select
                className="border p-2 w-full rounded"
                value={form.jobTitle}
                onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
              >
                <option value="">Select Job</option>
                {Object.keys(jobIconMap).map((title) => (
                  <option key={title} value={title}>
                    {title}
                  </option>
                ))}
              </select>

              <input
                placeholder="Candidate Name"
                className="border p-2 w-full rounded"
                value={form.candidateName}
                onChange={(e) => setForm({ ...form, candidateName: e.target.value })}
              />

              <input
                placeholder="Candidate Email"
                className="border p-2 w-full rounded"
                value={form.candidateEmail}
                onChange={(e) =>
                  setForm({ ...form, candidateEmail: e.target.value })
                }
              />

              <input
                placeholder="Bonus"
                type="number"
                className="border p-2 w-full rounded"
                value={form.bonus}
                onChange={(e) => setForm({ ...form, bonus: e.target.value })}
              />

              <button
                onClick={handleSave}
                className="w-full bg-orange-500 text-white py-2 rounded mt-3"
              >
                {editRow ? "Update Referral" : "Save Referral"}
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

      {/* MODAL ANIMATION */}
      <style>{`
        @keyframes popup {
          0% { transform: scale(0.9); opacity: 0 }
          100% { transform: scale(1); opacity: 1 }
        }
        .animate-popup {
          animation: popup 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}
