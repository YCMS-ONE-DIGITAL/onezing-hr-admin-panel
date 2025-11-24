import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaUserTie, FaCalendar, FaTasks } from "react-icons/fa";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ Load projects from localStorage (MAIN FIX)
  const project = useMemo(() => {
    const saved = JSON.parse(localStorage.getItem("projects")) || [];
    return saved.find((p) => Number(p.id) === Number(id)); 
  }, [id]);

  // ✅ Load tasks for this project
  const tasks = useMemo(() => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    return saved.filter((t) => Number(t.projectId) === Number(id));
  }, [id]);

  // 🚨 If project not found
  if (!project) {
    return (
      <div className="p-10 text-center text-xl text-gray-700">
        Project Not Found
      </div>
    );
  }

  // 🔒 Safe fallback
  const safeTeam = project.team || [];
  const safeProgress = project.progress || 0;

  return (
    <div
      className="
        absolute top-[110px] left-[260px] right-0 bottom-0 
        bg-[#f7f8fc] p-8 overflow-y-auto font-[Poppins]
        max-md:left-0 max-md:top-[60px] max-md:p-4
      "
    >
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/project")}
        className="
          flex items-center gap-2 text-blue-600 mb-6 font-medium
          hover:text-blue-800 transition
        "
      >
        <FaArrowLeft /> Back to Projects
      </button>

      {/* HEADER */}
      <h1 className="text-[30px] font-semibold text-gray-800 mb-4">
        {project.name}
      </h1>

      {/* SUMMARY */}
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-[1200px] mx-auto mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Project Summary
        </h2>

        <p className="text-gray-600 leading-relaxed">{project.summary}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

          {/* Manager */}
          <div className="flex gap-3 items-center">
            <FaUserTie className="text-blue-600 text-xl" />
            <p className="text-gray-700 text-[15px]">
              <b>Project Manager:</b> {project.manager}
            </p>
          </div>

          {/* Dates */}
          <div className="flex gap-3 items-center">
            <FaCalendar className="text-green-600 text-xl" />
            <p className="text-gray-700 text-[15px]">
              <b>Duration:</b> {project.startDate || "-"} → {project.endDate || "-"}
            </p>
          </div>

          {/* Status */}
          <div>
            <p className="text-gray-700 text-[15px]">
              <b>Status:</b>{" "}
              <span
                className="px-3 py-1 rounded-full text-white"
                style={{
                  background:
                    project.status === "Completed"
                      ? "#16a34a"
                      : project.status === "Ongoing"
                      ? "#facc15"
                      : "#9ca3af",
                }}
              >
                {project.status}
              </span>
            </p>
          </div>

          {/* Priority */}
          <div>
            <p className="text-gray-700 text-[15px]">
              <b>Priority:</b>{" "}
              <span
                className={`${
                  project.priority === "High"
                    ? "text-red-600"
                    : project.priority === "Medium"
                    ? "text-orange-500"
                    : "text-green-600"
                } font-semibold`}
              >
                {project.priority}
              </span>
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <p className="text-gray-700 font-medium mb-1">Progress</p>
          <div className="w-full bg-gray-200 rounded-full h-[10px] overflow-hidden">
            <div
              className="bg-blue-600 h-full transition-all"
              style={{ width: `${safeProgress}%` }}
            ></div>
          </div>
          <p className="text-gray-800 text-sm mt-1 font-semibold">
            {safeProgress}%
          </p>
        </div>
      </div>

      {/* TEAM SECTION */}
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-[1200px] mx-auto mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Team Members</h2>

        {safeTeam.length === 0 ? (
          <p className="text-gray-500 italic">No team members added.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {safeTeam.map((m, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 border rounded-lg bg-gray-50"
              >
                <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-sm font-semibold">
                  {m.name
                    ?.split(" ")
                    ?.map((x) => x[0])
                    ?.join("")
                    ?.toUpperCase()}
                </div>

                <div>
                  <p className="text-gray-800 font-semibold">{m.name}</p>
                  <p className="text-gray-600 text-sm">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* TASK SECTION */}
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-[1200px] mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
          <FaTasks /> Assigned Tasks
        </h2>

        {tasks.length === 0 ? (
          <p className="text-gray-500 italic">No tasks assigned yet.</p>
        ) : (
          <table className="w-full border-collapse text-left text-[15px]">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-3 px-4 border">Task Name</th>
                <th className="py-3 px-4 border">Priority</th>
                <th className="py-3 px-4 border">Assigned To</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((t) => (
                <tr key={t.id} className="border-b hover:bg-blue-50">
                  <td className="py-3 px-4">{t.name}</td>

                  <td
                    className={`py-3 px-4 font-semibold ${
                      t.priority === "High"
                        ? "text-red-600"
                        : t.priority === "Medium"
                        ? "text-orange-500"
                        : "text-green-600"
                    }`}
                  >
                    {t.priority}
                  </td>

                  <td className="py-3 px-4">{t.assignedTo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
