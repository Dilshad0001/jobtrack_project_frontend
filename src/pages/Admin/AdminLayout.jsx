

import { Outlet } from "react-router-dom";
import UserSidebar from "../users/UserSidebar";
import Navbar from "../users/Navbar";
import AdminSidebar from "./AdminSidebar";
const AdminLayout = () => {
  return (
    <div className="flex h-screen w-screen flex-col md:flex-row overflow-hidden">
      {/* Sidebar for desktop */}
      <div className=" z-10">
        <AdminSidebar />
      </div>



      {/* Main content */}
      <main className="flex-1 overflow-auto bg-gray-100 px-4 py-4 md:py-6">
        <Outlet />
      </main>
    </div>
  );
};


export default AdminLayout;


