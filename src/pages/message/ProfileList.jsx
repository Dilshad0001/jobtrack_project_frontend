

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../store/AxioInstance'

function ProfileList({onCloseProfileList }) {
  const [profiles, setProfiles] = useState([])
  const [searchKeyword, setSearchKeyword] = useState("")
  const [loading, setLoading] = useState(false)
  const [addingProfile, setAddingProfile] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        const response = await axiosInstance.get(
          `auth/user/profile/?search=${searchKeyword}`,
          // { headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` } }
        )
        // Ensure profiles is always an array
        setProfiles(Array.isArray(response.data.data) ? response.data.data : [])
        console.log("res===",response)
      } catch (error) {
        console.log("fetching error")
        setProfiles([]) // fallback to empty array on error
      } finally {
        setLoading(false)
      }
    }

    // Debounce search to avoid too many API calls
    const timeoutId = setTimeout(() => {
      fetchUsers()
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchKeyword])

  const handleAddProfile = async (profile) => {
    setAddingProfile(profile.id)
    try {
      await axiosInstance.post(
        "chat/chat/contact-list/",
        { contact_id: profile.id },
        // { headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` } }
      )
      console.log("added new profile successfully")
      onCloseProfileList(false)
    }
      // You can replace with toast notification
catch (error) {
  console.log("add to chat contact failed", error.response?.data);
  
  if (error.response?.status === 400) {
alert ('user already added')
  } else {
    alert (error.response?.data?.error?.contact_id?.[0]||'user already added')
  }

  onCloseProfileList(false);


      // Handle error, e.g. user already exists
    } finally {
      setAddingProfile(null)
      window.dispatchEvent(new Event("refreshContacts"))
    }
  }

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Search Section */}
      <div className="p-4 bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="relative">
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="Search users by name..."
            className="w-full bg-gray-100 border-0 rounded-full px-4 py-3 pl-10 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
          <svg
            className="w-5 h-5 absolute left-3 top-3.5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {loading && (
            <div className="absolute right-3 top-3.5">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      <div className="flex-1 overflow-y-auto">
        {loading && Array.isArray(profiles) && profiles.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : Array.isArray(profiles) && profiles.length === 0 && searchKeyword ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <svg
              className="w-16 h-16 text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-500">Try searching with a different name</p>
          </div>
        ) : Array.isArray(profiles) && profiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <svg
              className="w-16 h-16 text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Find new contacts</h3>
            <p className="text-gray-500">Start typing to search for users</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {Array.isArray(profiles) && profiles.map((profile) => (
              <div
                key={profile.id}
                className="flex items-center px-4 py-4 hover:bg-gray-50 transition-colors"
              >
                {/* Avatar */}
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white font-semibold text-lg">
                    {profile.full_name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>

                {/* Profile Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">
                    {profile.full_name}
                  </h3>
                  {profile.email && (
                    <p className="text-sm text-gray-500 truncate">
                      {profile.email}
                    </p>
                  )}
                  {profile.phone && (
                    <p className="text-xs text-gray-400 truncate">
                      {profile.phone}
                    </p>
                  )}
                </div>

                {/* Add Button */}
                <button
                  onClick={() => handleAddProfile(profile)}
                  disabled={addingProfile === profile.id}
                  className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-1 flex-shrink-0"
                >
                  {addingProfile === profile.id ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Adding...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span>Add</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Info */}
      {Array.isArray(profiles) && profiles.length > 0 && (
        <div className="p-4 bg-gray-50 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            Found {profiles.length} user{profiles.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  )
}

export default ProfileList

