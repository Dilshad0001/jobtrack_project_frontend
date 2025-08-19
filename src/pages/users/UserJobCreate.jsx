


import React, { useState } from "react";
import axios from "axios";
import { axiosInstance } from "../../store/AxioInstance";
// import axiosInstance from "../../store/AxioInstance";

const UserJobCreate = ({ onSuccess, onClose }) => {
  const [formData, setFormData] = useState({
    company_name: "",
    job_title: "",
    platform: "linkedin",
    salary_range: "",
    status: "applied",
    applied_date: "",
    notes: "",
    job_url: "",
    location: "",
    priority: "medium",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const token = localStorage.getItem("accessToken");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(
        "jobs/job/applications/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess(true);
      setError(null);
      if (onSuccess) onSuccess();
      onClose(); // Close the popup on success
    } catch (err) {
      setSuccess(false);
      setError("Failed to submit job application.");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center px-2 sm:px-4 py-6 overflow-y-auto z-50">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-xl w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold text-center mb-4">Add Job Application</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              placeholder="Company Name"
              className="border p-2 rounded w-full min-w-0"
              required
            />
            <input
              name="job_title"
              value={formData.job_title}
              onChange={handleChange}
              placeholder="Job Title"
              className="border p-2 rounded w-full min-w-0"
              required
            />
            <select
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              className="border p-2 rounded w-full min-w-0"
            >
              <option value="linkedin">LinkedIn</option>
              <option value="indeed">Indeed</option>
              <option value="naukri">Naukri</option>
              <option value="glassdoor">Glassdoor</option>
              <option value="other">Other</option>
            </select>
            <input
              name="salary_range"
              value={formData.salary_range}
              onChange={handleChange}
              placeholder="Salary Range"
              className="border p-2 rounded w-full min-w-0"
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border p-2 rounded w-full min-w-0"
            >
              <option value="applied">Applied</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
              <option value="withdrawn">Withdrawn</option>
              <option value="hired">Hired</option>
            </select>
            <input
              type="date"
              name="applied_date"
              value={formData.applied_date}
              onChange={handleChange}
              className="border p-2 rounded w-full min-w-0"
              required
            />
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="border p-2 rounded w-full min-w-0"
            />
            <input
              name="job_url"
              value={formData.job_url}
              onChange={handleChange}
              placeholder="Job URL"
              className="border p-2 rounded w-full min-w-0"
            />
          </div>

          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Notes"
            className="border p-2 rounded w-full min-w-0"
            rows={3}
          />
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="border p-2 rounded w-full min-w-0"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>

          {success && <p className="text-green-600 mt-2">Job application added successfully.</p>}
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default UserJobCreate;
