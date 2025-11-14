// Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "Models", path: "/models" },
  { label: "Explore AI", path: "/explore-ai" },
//   { label: "Pricing", path: "/pricing" },
  { label: "About", path: "/about" },
];

const Footer = () => (
  <footer className="bg-[#131425] pt-12 pb-6 px-6 sm:px-20 mt-20">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      {/* Logo & Description */}
      <div className="flex flex-col items-start gap-2">
        {/* Replace with your SVG/Logo */}
        <span className="font-extrabold text-lg text-white tracking-wide">MetaMix AI</span>
        <p className="text-gray-400 text-sm max-w-[270px]">
          Integrated AI solutions for creators, professionals, and teams—build, innovate, and grow smarter with MetaMix.
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-wrap gap-4">
        {navLinks.map(link => (
          <Link
            key={link.path}
            to={link.path}
            className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Social Section (expand as needed) */}
      <div className="flex gap-4">
        {/* Example social icon (replace with actual icon components if available) */}
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
          {/* Insert icon here, e.g. <TwitterIcon className="w-6 h-6" /> */}
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 19h.01M12 19h.01M16 19h.01M21 19h.01M19 8a7.003 7.003 0 01-7 7c-2.76 0-5.11-1.6-6.22-4M21 8v0a7.003 7.003 0 01-7 7c-2.76 0-5.11-1.6-6.22-4"></path></svg>
        </a>
        {/* Add more social links/icons here */}
      </div>
    </div>
    {/* Copyright */}
    <div className="border-t border-[#252646] mt-10 pt-6 text-center text-gray-500 text-xs">
      &copy; {new Date().getFullYear()} MetaMix AI. All rights reserved.
    </div>
  </footer>
);

export default Footer;
