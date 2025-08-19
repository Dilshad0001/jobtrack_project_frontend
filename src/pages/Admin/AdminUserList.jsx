import React, { useEffect, useState } from "react";
import axios from "axios";
import { axiosInstance } from "../../store/AxioInstance";

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`auth/user/profile-list/?full_name=${filteredUsers}`
        //   ,{
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );
        setUsers(res.data.data);
        setFilteredUsers(res.data.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  // Filter users when searchQuery changes
  useEffect(() => {
    const filtered = users.filter((user) =>
      user.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Users</h2>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 px-4 py-2 border border-gray-300 rounded-md w-full md:w-1/3"
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Full Name</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Location</th>
                <th className="px-4 py-2 text-left">Gender</th>
                <th className="px-4 py-2 text-left">DOB</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-2 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="px-4 py-2">{user?.full_name}</td>
                    <td className="px-4 py-2">{user?.phone}</td>
                    <td className="px-4 py-2">{user?.location}</td>
                    <td className="px-4 py-2">{user?.gender}</td>
                    <td className="px-4 py-2">{user?.dob}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUserList;
