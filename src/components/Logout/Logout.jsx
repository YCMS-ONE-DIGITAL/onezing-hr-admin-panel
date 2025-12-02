import React from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  const handleYes = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/login");
  };

  const handleNo = () => {
    navigate("/dashboard"); // or your preferred back page
  };

  return (
    <div
      className="
        absolute top-[115px] left-[220px] right-0 bottom-0
        bg-[#f9fafc] flex items-start justify-center p-10
        max-md:left-0 max-md:top-[60px]
      "
    >
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md text-center border">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Confirm Logout
        </h1>

        <p className="text-gray-600 mb-6">
          Are you sure you want to log out from your account?
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleYes}
            className="
              bg-red-600 text-white px-6 py-2 rounded-md 
              hover:bg-red-700 transition shadow
            "
          >
            Yes, Logout
          </button>

          <button
            onClick={handleNo}
            className="
              bg-gray-200 text-gray-700 px-6 py-2 rounded-md 
              hover:bg-gray-300 transition shadow
            "
          >
            No, Stay Here
          </button>
        </div>
      </div>
    </div>
  );
}
