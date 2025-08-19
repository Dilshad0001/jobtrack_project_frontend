


import React, { useEffect, useState } from "react";
import axios from "axios";
import { axiosInstance } from "../../store/AxioInstance";
// import axiosInstance from "../../store/AxioInstance";

const UserJobList = ({ status }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState({});
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(
          `jobs/job/applications/?status=${status}`,
          // {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // }
        );
        setApplications(res.data.data);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [status, token]);

  const handleEdit = (id, field, value) => {
    setEditing({ id, field, value });
  };

  const handleChange = (e) => {
    setEditing({ ...editing, value: e.target.value });
  };

  const handleBlur = async () => {
    const { id, field, value } = editing;
    if (!id) return;
    try {
      await axiosInstance.patch(
        `jobs/job/applications/?jobId=${id}`,
        {
          [field]: value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updated = applications.map((app) =>
        app.id === id ? { ...app, [field]: value } : app
      );
      setApplications(updated);
    } catch (err) {
      console.error("Update failed", err);
    }
    setEditing({});
  };

  const handleSelectChange = async (newValue) => {
    const { id, field } = editing;
    if (!id) return;
    try {
      await axiosInstance.patch(
        `jobs/job/applications/?jobId=${id}`,
        {
          [field]: newValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updated = applications.map((app) =>
        app.id === id ? { ...app, [field]: newValue } : app
      );
      setApplications(updated);
    } catch (err) {
      console.error("Update failed", err);
    }
    setEditing({});
  };

  if (loading)
    return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="p-4 overflow-x-auto bg-gray-100 h-full w-full">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md text-sm">


        <thead className="bg-gray-100 w-full ">
  <tr>
    <th className="py-2 px-4 border">Company</th>
    <th className="py-2 px-4 border">Title</th>
    <th className="py-2 px-4 border hidden sm:table-cell">Platform</th>
    <th className="py-2 px-4 border">Status</th>
    <th className="py-2 px-4 border hidden sm:table-cell">Priority</th>
    <th className="py-2 px-4 border hidden lg:table-cell">Applied Date</th>
    <th className="py-2 px-4 border">Location</th>
    <th className="py-2 px-4 border hidden sm:table-cell">Salary</th>
    <th className="py-2 px-4 border hidden lg:table-cell">Notes</th>
    <th className="py-2 px-4 border hidden sm:table-cell">URL</th>
  </tr>
</thead>

        <tbody>
          {applications.map((app) => (
            <tr key={app.id} className="hover:bg-gray-50">

{["company_name", "job_title", "platform", "status", "priority", "applied_date", "location", "salary_range", "notes", "job_url"].map((field) => (
  <td
    key={field}
    className={`py-2 px-4 border cursor-pointer
      ${
        ["platform", "salary_range", "priority", "job_url"].includes(field)
          ? "hidden sm:table-cell"
          : ["applied_date", "notes"].includes(field)
          ? "hidden lg:table-cell"
          : ""
      }
    `}
    onClick={() => handleEdit(app.id, field, app[field])}
  >
    {editing.id === app.id && editing.field === field ? (
      ["status", "priority", "platform"].includes(field) ? (
        <select
          className="w-full border rounded px-1"
          value={editing.value}
          onChange={(e) => handleSelectChange(e.target.value)}
          autoFocus
          onBlur={() => setEditing({})}
        >
          {field === "status" && ["applied", "shortlisted", "interview", "offer", "rejected", "withdrawn", "hired"].map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
          {field === "priority" && ["low", "medium", "high"].map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
          {field === "platform" && ["linkedin", "indeed", "naukri", "others"].map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input
          className="w-full border rounded px-1"
          value={editing.value || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
        />
      )
    ) : field === "job_url" ? (
      <div className="flex items-center gap-2">
        <span className="truncate max-w-[150px]">{app[field]}</span>
        <a
          href={app[field]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700 w-10 h-5 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          🔗
        </a>
      </div>
    ) : (
      app[field]
    )}
  </td>

              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {applications.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          No applications found for this status.
        </div>
      )}
    </div>
  );
};

export default UserJobList;