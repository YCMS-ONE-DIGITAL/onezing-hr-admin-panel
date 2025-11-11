import React from "react";

export default function Navbar() {
  return (
    <nav
      className="
        fixed top-0 left-0 w-full h-[60px] z-[1000]
        bg-[#1f1f1f] text-white flex justify-between items-center
        px-5 md:px-6 shadow-md box-border
      "
    >
      <div className="flex items-center gap-5">
        <span className="text-[20px] font-semibold text-white">
          HROne
        </span>

        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="
              bg-[#2b2b3d] border border-[#333] rounded-md
              px-4 py-2 text-sm text-white w-[250px]
              placeholder:text-[#aaa]
              focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6]
              outline-none transition-all duration-300
              max-md:w-[130px]
            "
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <button
          className="
            bg-[#4caf50] hover:bg-[#45a049]
            text-white px-4 py-1.5 rounded-md text-sm
            transition-all duration-300 max-md:px-3 max-md:py-1 max-md:text-xs
          "
        >
          Login
        </button>
      </div>
    </nav>
  );
}
