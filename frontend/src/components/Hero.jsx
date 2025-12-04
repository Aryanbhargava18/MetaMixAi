import React from "react";
import heroImg from "../assets/Hero-img.jpg";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-[90vh] flex items-center bg-[#0A0A0F] overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full px-6 sm:px-20 xl:px-32 gap-16">
        
        {/* Left Content */}
        <div className="flex-1 text-left max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-[#6B8CFF]" />
            <span className="text-sm font-medium text-gray-300">Next Gen AI Platform</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight font-cinzel">
            The AI Revolution <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B8CFF] to-[#B153EA]">
              Simplified.
            </span>
          </h1>

          <p className="text-lg text-gray-400 mb-10 leading-relaxed max-w-lg">
            Unlock infinite potential with a unified platform that powers
            creativity, productivity, and innovation. Access thousands of models
            instantly.
          </p>

          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => navigate('/playground')}
              className="px-8 py-4 bg-[#6B8CFF] hover:bg-[#5a7be0] text-white rounded-xl font-semibold transition-all hover:scale-105 shadow-lg shadow-blue-500/25 flex items-center gap-2"
            >
              Start Creating
              <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => document.getElementById('models')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-semibold transition-all"
            >
              Explore Models
            </button>
          </div>
        </div>

        {/* Right Visual */}
        <div className="flex-1 flex justify-center items-center relative">
          <div className="relative z-10 w-full max-w-lg aspect-square">
            {/* Glowing orb behind */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#6B8CFF] to-[#B153EA] rounded-full opacity-20 blur-3xl animate-pulse" />
            
            <img
              src={heroImg}
              alt="AI Platform Interface"
              className="relative z-10 w-full h-full object-cover rounded-3xl border border-white/10 shadow-2xl shadow-black/50 rotate-3 hover:rotate-0 transition-all duration-700"
            />
            
            {/* Floating Elements */}
        
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
