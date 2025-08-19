
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Home,
  BarChart2,
  MessageCircle,
  Settings,
  User,
  Info,
  LogOut 
} from 'lucide-react'
import { FiMenu } from "react-icons/fi"

function Navbar() {
  const [elementOpen, setElementOpen] = useState(false)

    const handleLogout = () => {
    alert('Are you sure you want to log out?')
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  };

  if (elementOpen) {
    return (
      <nav className="fixed top-0 left-0 w-full h-full bg-white z-50 px-4 py-3 shadow-md overflow-y-auto">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setElementOpen(false)}
            className="text-red-500 hover:text-red-700 font-bold text-2xl"
          >
            X
          </button>
        </div>
<div className="flex justify-center  h-screen">
  <ul className="space-y-4 text-gray-900 font-medium">
    <li onClick={()=>setElementOpen(false)}>
      <Link to="/user" className="flex items-center gap-3 justify-center hover:text-amber-600 transition">
        <Home size={18} />
        <span>Home</span>
      </Link>
    </li>
    <li onClick={()=>setElementOpen(false)}>
      <Link to="/user/track" className="flex items-center gap-3 justify-center hover:text-amber-600 transition">
        <BarChart2 size={18} />
        <span>Track</span>
      </Link>
    </li>
    <li onClick={()=>setElementOpen(false)}>
      <Link to="/user/messages" className="flex items-center gap-3 justify-center hover:text-amber-600 transition">
        <MessageCircle size={18} />
        <span>Messages</span>
      </Link>
    </li>
    <li onClick={()=>setElementOpen(false)}>
      <Link to="/user" className="flex items-center gap-3 justify-center hover:text-amber-600 transition">
        <Settings size={18} />
        <span>Settings</span>
      </Link>
    </li>
    <li onClick={()=>setElementOpen(false)}>
      <Link to="/user/profile" className="flex items-center gap-3 justify-center hover:text-amber-600 transition">
        <User size={18} />
        <span>Profile</span>
      </Link>
    </li>
    <li onClick={()=>setElementOpen(false)}>
      <Link to="/user" className="flex items-center gap-3 justify-center hover:text-amber-600 transition">
        <Info size={18} />
        <span>About</span>
      </Link>
    </li>

        <li onClick={handleLogout}>
      <Link to="/user" className="flex text-red-500 mt-10 items-center gap-3 justify-center hover:text-amber-600 transition">
        <LogOut  size={22} />
        <span>Logout</span>
      </Link>
    </li>
  </ul>
</div>

      </nav>
    )
  }

  // Closed menu button
  return (
    <div className="bg-gray-200 p-2 z-10 ">
      <button onClick={() => setElementOpen(true)} className="text-gray-700 hover:text-black ml-7 mt-5">
        <FiMenu size={24} />
      </button>
    </div>
  )
}

export default Navbar
