import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

function Layout() {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);

  return (
    <div>
      <nav className="flex items-center justify-between p-4 bg-[#1A1A1F] border-b border-gray-700">
        <div className="flex items-center gap-4">
          <img
            className="cursor-pointer w-32 sm:w-44"
            src={logo}
            alt="Logo"
            onClick={() => navigate('/')}
          />

          {sidebar ? (
            <X
              onClick={() => setSidebar(false)}
              className="w-6 h-6 text-gray-600 sm:hidden"
            />
          ) : (
            <Menu
              onClick={() => setSidebar(true)}
              className="w-6 h-6 text-gray-600 sm:hidden"
            />
          )}
        </div>
      </nav>

      <Outlet />
    </div>
  );
}

export default Layout;
