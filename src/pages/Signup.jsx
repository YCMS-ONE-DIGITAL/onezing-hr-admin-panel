import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirm) {
      alert("⚠️ Please fill all fields");
      return;
    }

    if (password !== confirm) {
      alert("❌ Passwords do not match");
      return;
    }

    alert("✅ Account created successfully!");
    navigate("/login");
  };

  return (
    <div
      className="
        flex justify-center items-center 
        min-h-screen 
        bg-transparent
      "
    >
      <div
        className="
          bg-white
          rounded-2xl shadow-2xl
          w-[90%] sm:w-[400px] md:w-[480px] lg:w-[520px]
          p-6 sm:p-8 md:p-12
          flex flex-col justify-center
          font-[Poppins]
          absolute top-1/2 left-1/2 
          -translate-x-1/2 -translate-y-1/2
          transition-all duration-300
        "
      >
        <h2 className="text-[26px] md:text-[34px] font-semibold text-[#1a1a1a] mb-2 text-center">
          Create Account
        </h2>
        <p className="text-[14px] md:text-[16px] text-[#666] mb-8 text-center">
          Fill in your details to register
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-[14px] font-medium text-[#333] mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
              className="
                w-full h-[45px] px-3 text-[15px]
                border border-gray-300 rounded-md 
                focus:border-[#7c3aed] outline-none
                transition-all
              "
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-[14px] font-medium text-[#333] mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="
                w-full h-[45px] px-3 text-[15px]
                border border-gray-300 rounded-md 
                focus:border-[#7c3aed] outline-none
                transition-all
              "
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[14px] font-medium text-[#333] mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="
                w-full h-[45px] px-3 text-[15px]
                border border-gray-300 rounded-md 
                focus:border-[#7c3aed] outline-none
                transition-all
              "
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-[14px] font-medium text-[#333] mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
              required
              className="
                w-full h-[45px] px-3 text-[15px]
                border border-gray-300 rounded-md 
                focus:border-[#7c3aed] outline-none
                transition-all
              "
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="
              w-full h-[45px]
              bg-[#7c3aed] hover:bg-[#6d28d9]
              text-white font-semibold rounded-md
              text-[16px] shadow-md
              transition-all duration-300
            "
          >
            SIGN UP
          </button>

          {/* Login Redirect */}
          <p className="text-center mt-4 text-[14px] text-[#555]">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#6c5ce7] font-medium hover:underline"
            >
              Sign In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
