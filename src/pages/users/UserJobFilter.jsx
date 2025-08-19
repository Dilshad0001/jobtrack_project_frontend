


import React from "react";
import UserJobCreate from "./UserJobCreate";

const statuses = [
  "applied",
  "shortlisted",
  "interview",
  "offer",
  "rejected",
  "withdrawn",
  "hired",
];

const UserJobFilter = ({ onStatusSelect, selectedStatus, handleAddJob }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-100 p-4 gap-2">
      {/* Status Buttons - visible on md+ */}
      <div className="hidden md:flex overflow-x-auto space-x-2">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => onStatusSelect(status)}
            className={`flex items-center justify-center px-4 py-2 border-r last:border-r-0 cursor-pointer transition-all duration-200 h-12 clip-arrow-right bg-amber-300 w-40 mt-1
              ${
                selectedStatus === status
                  ? "bg-orange-100 text-orange-800 font-semibold text-2xl"
                  : "hover:bg-gray-100"
              }
            `}
            style={{
              clipPath:
                "polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%, 15% 50%)",
            }}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Dropdown - visible only on small screens */}
      <div className="block md:hidden w-full">
        <select
          value={selectedStatus}
          onChange={(e) => onStatusSelect(e.target.value)}
          className="w-full px-4 py-2 border rounded bg-white shadow-sm"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Add Job Button - always visible */}
      <button
        onClick={handleAddJob}
        className="bg-blue-600 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700 transition-colors w-full md:w-auto"
      >
        Add application
      </button>
    </div>
  );
};

export default UserJobFilter;


