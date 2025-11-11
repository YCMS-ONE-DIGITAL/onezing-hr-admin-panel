import React from "react";

export default function ProjectTable({ projects }) {
  return (
    <div className="w-full min-w-[600px]">
      <h2 className="text-[20px] font-semibold text-gray-800 mb-4 text-center md:text-left">
        Active Projects
      </h2>

      {projects.length === 0 ? (
        <p className="text-center text-gray-500 italic py-6">
          No projects added yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-[700px] border-collapse text-[14px] md:text-[15px]">
            <thead>
              <tr className="bg-blue-500 text-white text-left">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Manager</th>
                <th className="py-3 px-4">Start</th>
                <th className="py-3 px-4">End</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Progress</th>
                <th className="py-3 px-4">Priority</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((p, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-200 hover:bg-blue-50 transition"
                >
                  <td className="py-2 px-4">{p.name}</td>
                  <td className="py-2 px-4">{p.manager}</td>
                  <td className="py-2 px-4">{p.startDate}</td>
                  <td className="py-2 px-4">{p.endDate}</td>
                  <td className="py-2 px-4">{p.status}</td>
                  <td className="py-2 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-200 rounded-full h-[6px] overflow-hidden">
                        <div
                          className="bg-blue-500 h-[6px] rounded-full"
                          style={{ width: `${p.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-[12px] font-medium text-gray-700">
                        {p.progress}%
                      </span>
                    </div>
                  </td>
                  <td
                    className={`py-2 px-4 font-semibold ${
                      p.priority === "High"
                        ? "text-red-600"
                        : p.priority === "Medium"
                        ? "text-orange-500"
                        : "text-green-600"
                    }`}
                  >
                    {p.priority}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
