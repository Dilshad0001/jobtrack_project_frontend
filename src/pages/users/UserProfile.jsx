

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, createProfile, updateProfile, clearCreated } from '../../store/profileSlice';
import { fetchSelfUser } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const dispatch = useDispatch();
  const { data: profile, loading, error, created } = useSelector((state) => state.profile);
  const { data: user, loading: userLoading, error: userError } = useSelector((state) => state.user);
  const navigate=useNavigate()

  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    dob: '',
    gender: '',
    location: ''
  });

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchSelfUser())
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        dob: profile.dob || '',
        gender: profile.gender || '',
        location: profile.location || ''
      });
    }
  }, [profile]);

  useEffect(() => {
    if (created) {
      alert('Profile created successfully!');
      dispatch(clearCreated());
      navigate("/user");
    }
  }, [created, dispatch,navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await dispatch(updateProfile(formData));
      alert('Profile updated successfully!');
      setIsEdit(false);
    } else {
      await dispatch(createProfile(formData));
    }
  };

  if (!userLoading && !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">User Data Not Found</h3>
            <p className="text-gray-600">Unable to load user information. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Profile</h3>
            <p className="text-gray-600">Please wait while we fetch your information...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Profile</h3>
            <p className="text-red-600 text-sm mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
              <h1 className="text-2xl font-bold text-white">Create Your Profile</h1>
              <p className="text-blue-100 mt-1">Complete your profile to get started</p>
            </div>
            
            {/* Form */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Enter your location"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
                    />
                  </div>
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400 bg-white"
                    >
                      <option value="">Select your gender</option>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                      <option value="O">Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    Create Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isEdit) {
    return (
      <div className="h-full bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto ">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-600 to-slate-700 px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white">Edit Profile</h1>
                  <p className="text-slate-200 mt-1">Update your profile information</p>
                </div>
                <button
                  onClick={() => setIsEdit(false)}
                  className="text-slate-200 hover:text-white font-medium px-4 py-2 rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
            
            {/* Form */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Enter your location"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
                    />
                  </div>
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400 bg-white"
                    >
                      <option value="">Select your gender</option>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                      <option value="O">Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-50 py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Cover Banner */}
            <div className="h-20 sm:h-24 md:h-14 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 relative">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            </div>
            
            {/* Profile Header */}
            <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  {/* Avatar */}
                  <div className="relative -mt-10 sm:-mt-12 md:-mt-16 self-start">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                      <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700">
                        {profile.full_name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                  </div>
                  
                  {/* User Info */}
                  <div className="pt-0 sm:pt-4">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                      Welcome, {profile.full_name?.split(' ')[0] || 'User'}
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600 mt-1">
                      Last updated {profile.updated_at.slice(0, 10)}
                    </p>
                  </div>
                </div>
                
                {/* Edit Button */}
                <button
                  onClick={() => setIsEdit(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center space-x-2 w-full sm:w-auto"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>Edit Profile</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Profile Information</h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Your personal details and contact information</p>
          </div>
          
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Full Name</label>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                    <p className="text-gray-900 font-medium text-sm sm:text-base break-words">
                      {profile.full_name || <span className="text-gray-400 font-normal">Not specified</span>}
                    </p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Email Address</label>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                    <p className="text-gray-900 font-medium text-sm sm:text-base break-words">
                      {user?.email || <span className="text-gray-400 font-normal">No email available</span>}
                    </p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Phone Number</label>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                    <p className="text-gray-900 font-medium text-sm sm:text-base break-words">
                      {profile.phone || <span className="text-gray-400 font-normal">Not specified</span>}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Date of Birth</label>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                    <p className="text-gray-900 font-medium text-sm sm:text-base">
                      {profile.dob || <span className="text-gray-400 font-normal">Not specified</span>}
                    </p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Location</label>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                    <p className="text-gray-900 font-medium text-sm sm:text-base break-words">
                      {profile.location || <span className="text-gray-400 font-normal">Not specified</span>}
                    </p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Gender</label>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                    <p className="text-gray-900 font-medium text-sm sm:text-base">
                      {profile.gender === 'M' ? 'Male' : 
                       profile.gender === 'F' ? 'Female' : 
                       profile.gender === 'O' ? 'Other' : 
                       <span className="text-gray-400 font-normal">Not specified</span>}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;