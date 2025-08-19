

import axios from "axios";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // default styles
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../store/AxioInstance";
// import axiosInstance from "../../store/AxioInstance";

const motivationalQuotes = [
  "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
  "The future depends on what you do today. – Mahatma Gandhi",
  "Believe you can and you're halfway there. – Theodore Roosevelt",
];

const techNews = [
  {
    title: "React 19 Alpha Released",
    source: "reactjs.org",
    date: "Aug 3, 2025",
  },
  {
    title: "Python 3.13 to improve startup performance",
    source: "python.org",
    date: "Aug 1, 2025",
  },
  {
    title: "OpenAI introduces GPT-5 Preview",
    source: "openai.com",
    date: "July 29, 2025",
  },
];

const HomePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate=useNavigate()
   const [profile, setProfile] = useState(null);

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("accessToken");


      const response = await axiosInstance.get("auth/user/profile/", {

        
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('REPONSEEEEE==',response);
      

      // ✅ Set profile always if response is OK
      setProfile(response.data);
      console.log('RES=',response.status);
      if (response.status===204){
                navigate("/user/profile");


      }
      

    } catch (error) {
      console.error("Failed to fetch user profile:", error);

      // Redirect only on token/auth related errors
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate("/login");
      }
    }
  };

  fetchProfile();
}, []);


console.log('profile==',profile);


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Welcome */}
      <h1 className="text-3xl font-bold mb-2">👋 Welcome back {profile?.full_name}</h1>
      <p className="text-gray-600 mb-8">
        Let’s land your dream job. Stay inspired and informed while you track your progress.
      </p>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Motivational Quotes */}
        <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">💡 </h2>
          <ul className="space-y-3">
            {motivationalQuotes.map((quote, idx) => (
              <li
                key={idx}
                className="text-gray-700 italic border-l-4 border-blue-400 pl-3"
              >
                "{quote}"
              </li>
            ))}
          </ul>
        </div>

        {/* Small Calendar */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">📅 Calendar</h2>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="border-none"
          />
          <p className="text-sm text-gray-500 mt-2">
            Selected date: <strong>{selectedDate.toDateString()}</strong>
          </p>
        </div>

        {/* Tech News */}
        <div className="bg-white rounded-lg shadow p-6 md:col-span-3">
          <h2 className="text-xl font-semibold mb-4">📰 Updates</h2>
          <ul className="space-y-4">
            {techNews.map((news, idx) => (
              <li
                key={idx}
                className="flex justify-between items-start border-b pb-2"
              >
                <div>
                  <p className="font-medium text-blue-600">{news.title}</p>
                  <p className="text-sm text-gray-500">{news.source}</p>
                </div>
                <p className="text-xs text-gray-400">{news.date}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">⚡ Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => navigate("/user/track")}
          >
            ➕ Add New Application
          </button>

          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={() => navigate("/user/messages")}
          >
            💬 Go to Chat
          </button>

          <button
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            onClick={() => navigate("#")}
          >
            📅 View Interviews
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
