import React from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <>
      <div
        className="fixed left-1/2 translate-x-[-50%] top-6 z-50 
        flex items-center justify-between gap-16
        py-4 px-12 rounded-full
        bg-gradient-to-r from-[#2D2D44]/40 via-[#3B2B6F]/40 to-[#36395A]/50
        backdrop-blur-xl border border-white/30 shadow-xl transition-all duration-300 text-white"
      >
        {/* Logo */}
        <div className="h-10 w-28 scale-150">
          <img
            src={logo}
            alt="Logo"
            className="relative top-1 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Menu */}
<ul className="flex gap-8 text-xl flex-nowrap">
          <li
            className="relative group cursor-pointer whitespace-nowrap"
            onClick={() => navigate("/")}
          >
            Home
            <span
              className="absolute left-0 bottom-[-5px] w-0 h-1 rounded-xl 
              bg-gradient-to-r from-blue-500 to-green-500 
              transition-all duration-300 group-hover:w-full"
            ></span>
          </li>

          <li
            className="relative group cursor-pointer whitespace-nowrap"
            onClick={() => navigate("/playground")}
          >
            AI Chat
            <span
              className="absolute left-0 bottom-[-5px] w-0 h-1 rounded-xl 
              bg-gradient-to-r from-blue-500 to-green-500 
              transition-all duration-300 group-hover:w-full"
            ></span>
          </li>

          <li
            className="relative group cursor-pointer whitespace-nowrap"
            onClick={() => navigate("/about")}
          >
            About
            <span
              className="absolute left-0 bottom-[-5px] w-0 h-1 rounded-xl 
              bg-gradient-to-r from-blue-500 to-green-500 
              transition-all duration-300 group-hover:w-full"
            ></span>
          </li>
        </ul>

        {/* CTA - Changes based on login state */}
        <button
          onClick={() => navigate(isLoggedIn ? "/ai" : "/login")}
          className="bg-white py-1 px-5 rounded-3xl
                     shadow-2xl text-gray-800 text-lg font-semibold
                     hover:bg-gray-200 hover:shadow-gray-500 whitespace-nowrap
                     focus:outline-none focus:ring-2 focus:ring-gray-400 flex items-center gap-2"
        >
          {isLoggedIn ? "Dashboard" : "Get Started"} <ArrowRight />
        </button>
      </div>
    </>
  );
};

export default Navbar;
