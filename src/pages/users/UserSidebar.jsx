
import React, { useState } from "react";
import {
  Home,
  BarChart2,
  Settings,
  User,
  Info,
  LogOut,
  MessageCircle,
} from "lucide-react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const SidebarItem = ({ to, icon, label, className = "" }) => (
  <Link
    to={to}
    className={`group relative flex items-center justify-center py-4 px-2 w-12 hover:bg-gray-700 rounded cursor-pointer ${className}`}
  >
    {icon}
    <span className="absolute left-full ml-2 px-2 py-1 text-xs rounded bg-black text-white opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-all group-hover:translate-x-1 group-hover:visible invisible">
      {label}
    </span>
  </Link>
);

const UserSidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    alert('Are you sure you want to log out?')
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  };

  return (
    <>
      {/* Mobile toggle button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setOpen(true)}>
          <FiMenu size={24} className="text-gray-800" />
        </button>
      </div>

      {/* Overlay sidebar for mobile */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden" onClick={() => setOpen(false)} />
      )}

      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white flex flex-col justify-between items-center w-12 z-50 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static`}
      >
        {/* Close icon (mobile only) */}
        <div className="md:hidden mt-4 mb-2">
          <button onClick={() => setOpen(false)}>
            <FiX size={22} className="text-red-500" />
          </button>
        </div>

        {/* Menu items */}
        <div className="space-y-2 -ml-2  md:mt-10">
          <SidebarItem to="/user" icon={<Home size={18} />} label="Home" />
<hr className="border-t border-gray-300 my-4" />
          <SidebarItem to="/user/track" icon={<BarChart2 size={18} />} label="Track" />
          <hr className="border-t border-gray-300 my-4" />

          <SidebarItem to="/user/messages" icon={<MessageCircle size={18} />} label="Messages" />
          <hr className="border-t border-gray-300 my-4" />

          <SidebarItem to="#" icon={<Settings size={18} />} label="Settings" />
          <hr className="border-t border-gray-300 my-4" />

          <SidebarItem to="/user/profile" icon={<User size={18} />} label="Profile" />
          <hr className="border-t border-gray-300 my-4" />

          <SidebarItem to="#" icon={<Info size={18} />} label="About" />
          
        </div>

        {/* Logout button */}
        <div className="group mb-4">
          <div
            onClick={handleLogout}
            className="relative flex items-center justify-center p-3 rounded hover:bg-red-600 text-red-400 hover:text-white cursor-pointer"
          >
            <LogOut size={20} />
            <span className="absolute   left-full ml-2 px-2 py-1 text-xs rounded bg-black text-white opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-all group-hover:translate-x-1 group-hover:visible invisible">
              Logout
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSidebar;
