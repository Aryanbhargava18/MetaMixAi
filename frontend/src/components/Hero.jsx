import React from "react";
import heroImg from "../assets/Hero-img.jpg";
// import logo from "../assets/logo.png";

const Hero = () => {
  return (
    <div
      className="relative w-full min-h-screen flex items-center bg-[#0A0A0F]" 
    >
      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full px-6 sm:px-20 xl:px-32 gap-x-20">
        
        {/* Left side */}
    <div className="flex-1 text-left text-white uppercase max-w-xl ml-15">
      <h1
        className="text-6xl mb-4 font-cinzel font-extrabold"
        style={{ color: "	#FFFFFF" }} 
      >
        THE AI REVOLUTION
      </h1> 
      <h2
        className="text-4xl mb-6 font-poppins font-medium"
        style={{ color: "#6B8CFF" }} 
      >
        - Simplified
      </h2>
      <p
        className="text-lg leading-relaxed font-roboto normal-case max-w-md"
        style={{ color: "#CCCCCC" }}
      >
    Unlock infinite potential with a unified platform that powers
    creativity, productivity, and innovation across every domain —
    integrated AI tools built for speed and impact.
  </p>
</div>


       {/* Right side (phone image with logo) */}
<div className="flex-1 flex justify-center items-center mt-10 lg:mt-0 relative">

  {/* Glowing orb/gradient behind phone */}
  <div className="absolute w-[360px] h-[360px] rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 opacity-40 blur-3xl animate-pulse -z-10"></div>

  {/* Phone container */}
  <div className="relative z-10">
    <img
      src={heroImg}
      alt="Phone Mockup"
      className="w-full max-w-lg lg:max-w-2xl "
    />
            {/* Logo overlay inside phone
            <img
              src={logo}
              alt="Logo"
              className="absolute top-41 left-27 w-16 h-16"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
