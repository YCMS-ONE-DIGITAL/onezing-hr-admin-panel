import React from "react";

export default function Navbar() {
  return (
    <nav
      className="
        fixed top-0 left-0 w-full h-[50px] z-[1000]
        bg-[#1f1f1f] text-white flex justify-between items-center
        px-4 md:px-6 shadow-md box-border
      "
    >
      <div className="flex items-center gap-4">
        <span className="text-[18px] font-semibold text-white">
          HROne
        </span>

        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="
              bg-[#2b2b3d] border border-[#333] rounded-md
              px-3 text-sm text-white w-[180px]
              placeholder:text-[#aaa]
              focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6]
              outline-none transition-all duration-300

              /* ⭐ SLIM HEIGHT */
              h-[32px] leading-[32px]

              /* ⭐ MOBILE VIEW */
              max-md:w-[90px] max-md:h-[28px] max-md:leading-[28px] max-md:text-xs
            "
          />
        </div>
      </div>

      <div className="flex items-center justify-end">
        <button
          className="
            bg-[#4caf50] hover:bg-[#45a049]
            text-white px-3 py-1.5 rounded-md text-sm
            transition-all duration-300 max-md:px-2 max-md:py-1 max-md:text-xs
          "
        >
          Login
        </button>
      </div>
    </nav>
  );
}
