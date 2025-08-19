import React, { useEffect, useState } from "react";
import { Users, CheckCircle, XCircle, CalendarDays, ClipboardList } from "lucide-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { axiosInstance } from "../../store/AxioInstance";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
      const [dashboarData,setDasboardData]=useState("")
      const navigate=useNavigate()
  // Dummy stats
  const stats = [
    { name: "Total Users", value: dashboarData?.user_count, icon: Users, color: "bg-blue-100 text-blue-600" },
    { name: "Completed Profiles", value: dashboarData?.profile_count, icon: CheckCircle, color: "bg-green-100 text-green-600" },
    { name: "Incomplete Profiles", value: dashboarData?.user_count-dashboarData?.profile_count, icon: XCircle, color: "bg-red-100 text-red-600" },

  ];

useEffect(()=>{
    const fetchDashboarddata=async()=>{
        try {
            const res= await axiosInstance.get('auth/user/admin-dashboard/'
              // ,{headers:{Authorization:`Bearer ${localStorage.getItem('accessToken')}`}}
            )
            setDasboardData(res.data)
        } catch (error) {
            console.log("dashboard data fetch failed");
            // alert('only admin can see it')
            navigate('/user')
            
            
        }
    }
    fetchDashboarddata();
},[])
console.log("DASBOARD DATA=",dashboarData);

  // Calendar state
  const [date, setDate] = useState(new Date());

  // Dummy to-do list
  const [todos, setTodos] = useState([
    { id: 1, task: "Review new job applications", completed: false },
    { id: 2, task: "Approve profile updates", completed: true },
    { id: 3, task: "Send monthly newsletter", completed: false },
  ]);

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Title */}
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="flex items-center p-4 bg-white rounded-xl shadow-md"
          >
            <div className={`p-3 rounded-full ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">{stat.name}</p>
              <p className="text-xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Calendar + To-do */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Calendar */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <div className="flex items-center mb-4">
            <CalendarDays className="text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold">Calendar</h2>
          </div>
          <Calendar value={date} onChange={setDate} />
        </div>

        {/* To-do List */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <div className="flex items-center mb-4">
            <ClipboardList className="text-green-600 mr-2" />
            <h2 className="text-lg font-semibold">To-do List</h2>
          </div>
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
              >
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span
                    className={`${
                      todo.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {todo.task}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};







export default AdminDashboard;
