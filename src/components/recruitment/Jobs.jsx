import React, { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaDollarSign,
  FaBriefcase,
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

/* ===========================
   ICON MAP: job position → logo
   =========================== */
const iconMap = {
  "PHP Developer": "https://cdn-icons-png.flaticon.com/512/919/919830.png",
  "React Developer": "https://cdn-icons-png.flaticon.com/512/1126/1126012.png",
  "IOS Developer": "https://cdn-icons-png.flaticon.com/512/731/731985.png",
  "Network Engineer": "https://cdn-icons-png.flaticon.com/512/3208/3208725.png",
  "Laravel Developer": "https://cdn-icons-png.flaticon.com/512/5968/5968371.png",
  "Android Developer": "https://cdn-icons-png.flaticon.com/512/888/888857.png",
  "HTML Developer": "https://cdn-icons-png.flaticon.com/512/888/888859.png",
};

const defaultIcon = "https://cdn-icons-png.flaticon.com/512/919/919851.png";

export default function Jobx() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editJob, setEditJob] = useState(null);

  const emptyForm = {
    title: "",
    location: "",
    salary: "",
    experience: "",
    type: "Full Time",
    level: "Expert",
  };

  const [form, setForm] = useState(emptyForm);

  /* Load jobs from LocalStorage */
  useEffect(() => {
    const saved = localStorage.getItem("jobs");
    if (saved) setJobs(JSON.parse(saved));
  }, []);

  /* Save jobs to LocalStorage */
  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  /* OPEN ADD MODAL */
  const openAddModal = () => {
    setEditJob(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  /* OPEN EDIT MODAL */
  const openEditModal = (job) => {
    setEditJob(job);
    setForm({
      title: job.title,
      location: job.location,
      salary: job.salary,
      experience: job.experience,
      type: job.type,
      level: job.level,
    });
    setShowModal(true);
  };

  /* SAVE JOB */
  const handleSave = () => {
    if (!form.title || !form.location || !form.salary || !form.experience) {
      alert("Please fill all fields");
      return;
    }

    const computedIcon = iconMap[form.title] || defaultIcon;

    if (editJob) {
      setJobs(
        jobs.map((item) =>
          item.id === editJob.id ? { ...item, ...form, icon: computedIcon } : item
        )
      );
    } else {
      setJobs([
        ...jobs,
        {
          id: Date.now(),
          applicants: 25,
          filled: 10,
          total: 25,
          icon: computedIcon,
          ...form,
        },
      ]);
    }

    setShowModal(false);
  };

  /* DELETE JOB */
  const deleteJob = (id) => {
    if (confirm("Delete this job?")) {
      setJobs(jobs.filter((job) => job.id !== id));
    }
  };

  /* SEARCH + FILTERS */
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase());

    const matchesRole = filterRole === "All" || job.level === filterRole;
    const matchesType = filterType === "All" || job.type === filterType;

    return matchesSearch && matchesRole && matchesType;
  });

  return (
    <div
      className="py-6"
      style={{
        marginLeft: "220px",
        paddingTop: "40px",
        paddingLeft: "20px",
        paddingRight: "20px",
        maxWidth: "calc(100% - 260px)",
        overflowX: "hidden",
      }}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold">Job Grid</h2>

        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-orange-500 text-white rounded-md flex items-center gap-2 shadow"
        >
          <FaPlus /> Post Job
        </button>
      </div>

      {/* SEARCH + FILTERS */}
      <div className="flex flex-wrap gap-4 mb-8">
        <input
          placeholder="Search jobs..."
          className="border px-3 py-2 rounded-md shadow-sm w-60"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border px-3 py-2 rounded-md shadow-sm"
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="All">All Roles</option>
          <option value="Expert">Expert</option>
          <option value="Intermediate">Intermediate</option>
        </select>

        <select
          className="border px-3 py-2 rounded-md shadow-sm"
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="All">All Types</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
        </select>
      </div>

      {/* JOB CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 
                       p-5 hover:shadow-md transition-all duration-200"
          >
            {/* CARD HEADER */}
            <div className="-mx-5 -mt-5 mb-4 px-5 py-3 bg-slate-50 rounded-t-xl border-b border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <img src={job.icon || defaultIcon} className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-semibold text-base">{job.title}</h3>
                <p className="text-gray-500 text-xs">{job.applicants} Applicants</p>
              </div>
            </div>

            {/* DETAILS */}
            <div className="space-y-2 text-sm text-gray-700 mb-4">
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-gray-500" /> {job.location}
              </p>

              <p className="flex items-center gap-2">
                <FaDollarSign className="text-gray-500" /> {job.salary}
              </p>

              <p className="flex items-center gap-2">
                <FaBriefcase className="text-gray-500" /> {job.experience}
              </p>
            </div>

            {/* TAGS (CLEAN — NO PROGRESS BAR) */}
            <div className="mt-2">
              <div className="flex gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs bg-pink-100 text-pink-700">
                  {job.type}
                </span>
                <span className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                  {job.level}
                </span>
              </div>
            </div>

            {/* ACTION BUTTONS (NO BLACK BORDER) */}
            <div className="flex justify-between mt-3">
              <button
                onClick={() => openEditModal(job)}
                className="text-blue-600 flex items-center gap-1 hover:underline text-sm"
              >
                <FaEdit /> Edit
              </button>

              <button
                onClick={() => deleteJob(job.id)}
                className="text-red-600 flex items-center gap-1 hover:underline text-sm"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
          <div
            className="pointer-events-auto bg-white/90 backdrop-blur-md 
                       p-6 rounded-xl shadow-xl border border-gray-200 
                       w-[420px] animate-popup"
          >
            <h2 className="text-xl font-semibold mb-4">
              {editJob ? "Edit Job" : "Add New Job"}
            </h2>

            <div className="space-y-3">
              {/* JOB POSITION DROPDOWN */}
              <select
                className="border p-2 rounded-lg w-full"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              >
                <option value="">Select Job Position</option>
                <option value="PHP Developer">PHP Developer</option>
                <option value="React Developer">React Developer</option>
                <option value="IOS Developer">IOS Developer</option>
                <option value="Network Engineer">Network Engineer</option>
                <option value="Laravel Developer">Laravel Developer</option>
                <option value="Android Developer">Android Developer</option>
                <option value="HTML Developer">HTML Developer</option>
              </select>

              <input
                placeholder="Location"
                className="border p-2 w-full rounded-lg"
                value={form.location}
                onChange={(e) =>
                  setForm({ ...form, location: e.target.value })
                }
              />

              <input
                placeholder="Salary"
                className="border p-2 w-full rounded-lg"
                value={form.salary}
                onChange={(e) =>
                  setForm({ ...form, salary: e.target.value })
                }
              />

              <input
                placeholder="Experience"
                className="border p-2 w-full rounded-lg"
                value={form.experience}
                onChange={(e) =>
                  setForm({ ...form, experience: e.target.value })
                }
              />

              <select
                className="border p-2 rounded-lg w-full"
                value={form.type}
                onChange={(e) =>
                  setForm({ ...form, type: e.target.value })
                }
              >
                <option>Full Time</option>
                <option>Part Time</option>
              </select>

              <select
                className="border p-2 rounded-lg w-full"
                value={form.level}
                onChange={(e) =>
                  setForm({ ...form, level: e.target.value })
                }
              >
                <option>Expert</option>
                <option>Intermediate</option>
              </select>

              <button
                onClick={handleSave}
                className="w-full bg-orange-500 text-white py-2 rounded-lg mt-4 hover:bg-orange-600 transition"
              >
                {editJob ? "Update Job" : "Save Job"}
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="w-full border py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ANIMATION */}
      <style>{`
        @keyframes popup {
          0% { transform: scale(0.85); opacity: 0 }
          100% { transform: scale(1); opacity: 1 }
        }
        .animate-popup {
          animation: popup 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}
