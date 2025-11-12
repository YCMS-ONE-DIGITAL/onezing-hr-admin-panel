import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // ✅ Link import केलं

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "demo@example.com" && password === "password123") {
      alert("✅ Login Successful");
      navigate("/dashboard");
    } else {
      alert("❌ Invalid credentials");
    }
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
        {/* Title */}
        <h2 className="text-[26px] md:text-[34px] font-semibold text-[#1a1a1a] mb-2 text-center">
          Sign In
        </h2>
        <p className="text-[14px] md:text-[16px] text-[#666] mb-8 text-center">
          Enter your email and password to login
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
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

          {/* Remember me */}
          <div className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              id="remember"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="w-4 h-4 accent-[#7c3aed]"
            />
            <label htmlFor="remember" className="text-[14px] text-[#444]">
              Remember me
            </label>
          </div>

          {/* Button */}
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
            SIGN IN
          </button>

          {/* Signup */}
          <p className="text-center mt-4 text-[14px] text-[#555]">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-[#6c5ce7] font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
