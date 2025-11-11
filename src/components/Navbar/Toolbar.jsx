import React from "react";
import { FaBars } from "react-icons/fa";

const Toolbar = ({ toggleSidebar }) => {
  return (
    <div
      className="
        fixed 
        top-[60px] 
        left-0 
        w-full 
        h-[50px] 
        bg-[#f9f9f9]
        flex 
        items-center 
        justify-between 
        px-5 
        z-[999] 
        shadow-sm 
        border-b border-gray-300
      "
    >
      <div className="flex items-center gap-3 md:gap-4">
        <button
          onClick={toggleSidebar}
          className="
            text-gray-800 
            text-[22px] 
            md:text-[24px] 
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
            text-sm 
            md:text-base 
            whitespace-nowrap
          "
        >
          Quick Access Panel
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full text-gray-500 text-sm font-semibold">
          A
        </div>

        <span className="hidden md:block text-sm text-gray-600 font-medium">
          Admin
        </span>
      </div>
    </div>
  );
};

export default Toolbar;
