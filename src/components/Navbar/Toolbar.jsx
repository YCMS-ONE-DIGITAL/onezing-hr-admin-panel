import React from "react";
import { FaBars } from "react-icons/fa";

const Toolbar = ({ toggleSidebar }) => {
  return (
    <div
      className="
        fixed 
        top-[50px]      /* Navbar खाली exact बसतो */
        left-0 
        w-full 
        h-[44px]        /* ⭐ SLIM HEIGHT */
        bg-[#f9f9f9]
        flex 
        items-center 
        justify-between 
        px-4 
        z-[999] 
        shadow-sm 
        border-b 
        border-gray-300
      "
    >
      {/* LEFT SIDE */}
      <div className="flex items-center gap-2 md:gap-3">
        <button
          onClick={toggleSidebar}
          className="
            text-gray-800 
            text-[18px]      /* ⭐ Icon smaller */
            md:text-[20px] 
            hover:text-blue-600 
            transition-all 
            duration-200 
            active:scale-90
          "
        >
          <FaBars />
        </button>

        <h2
          className="
            text-gray-700 
            font-semibold 
            tracking-wide 
            text-xs        /* ⭐ Text smaller */
            md:text-sm 
            whitespace-nowrap
          "
        >
          Quick Access Panel
        </h2>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3">
        <div className="
          hidden md:flex 
          items-center justify-center 
          w-7 h-7            /* ⭐ Smaller circle */
          bg-gray-200 
          rounded-full 
          text-gray-500 
          text-xs 
          font-semibold
        ">
          A
        </div>

        <span className="
          hidden md:block 
          text-xs          /* ⭐ Smaller text */
          text-gray-600 
          font-medium
        ">
          Admin
        </span>
      </div>
    </div>
  );
};

export default Toolbar;
