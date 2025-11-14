import React from "react";
import DashboardCards from "../components/dashboard/DashboardCards";

export default function Dashboard() {
  return (
    <div
      className="
        absolute
        top-[110px]
        left-[280px]
        right-0
        bottom-0
        bg-[#f4f6f9]
        px-12 py-8
        overflow-y-auto
        transition-all
        max-md:left-0 max-md:top-[70px] max-md:p-4
      "
    >
      <DashboardCards />
    </div>
  );
}
