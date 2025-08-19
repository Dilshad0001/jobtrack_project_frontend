

import { Outlet } from "react-router-dom";
import UserSidebar from "./UserSidebar";
import Navbar from "./Navbar";

const UserLayout = () => {
  return (
    <div className="flex h-screen w-screen flex-col md:flex-row overflow-hidden">
      {/* Sidebar for desktop */}
      <div className="hidden md:block z-10">
        <UserSidebar />
      </div>

      {/* Navbar for mobile */}
      <div className="block md:hidden">
        <Navbar />
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-gray-100 px-4 py-4 md:py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
