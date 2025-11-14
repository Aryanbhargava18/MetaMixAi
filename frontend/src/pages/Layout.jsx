import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Menu, X } from "lucide-react"

function Layout() {
  const navigate = useNavigate()
  const [sidebar, setSidebar] = useState(false)

  return (
    <div>
      <nav className="flex items-center justify-between p-4 bg-[#1A1A1F] border-b border-gray-700">
        <div className="flex items-center gap-4">
          <img className='cursor-pointer w-32 sm:w-44' src='src/assets/logo.png' alt='' onClick={() => navigate('/')}/>
          {
            sidebar ? <X onClick={() => setSidebar(false)} className='w-6 h-6 text-gray-600 sm:hidden'/>
            : <Menu onClick={() => setSidebar(true)} className='w-6 h-6 text-gray-600 sm:hidden'/>
          }
        </div>

        {/* No auth controls */}
      </nav>
      <Outlet/>
    </div>
  )
}

export default Layout
