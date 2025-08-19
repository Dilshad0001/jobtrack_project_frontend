import React, { useState } from "react";
import UserJobFilter from "./UserJobFilter";
import UserJobList from "./UserJobList";
import UserJobCreate from "./UserJobCreate";

const JobDashboard = () => {
  const [selectedStatus, setSelectedStatus] = useState("applied");
  const [showPopup, setShowPopup] = useState(false);

  const handleAddJob = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const refreshList = () => {
    closePopup();
  };

  return (
    <div className="p-8 bg-gray-200 h-full w-full">


      <h1 className=" sm:text-sm md:text-2xl lg:text-2xl font-bold  mb-2 ">Track Your Job Applications</h1>
<p className="text-sm text-gray-600  mb-4 hidden sm:block">
  Keep all your job applications in one place. Fill out the form below to add a new opportunity you're applying to.
</p>
      
      <UserJobFilter
        onStatusSelect={setSelectedStatus}
        selectedStatus={selectedStatus}
        handleAddJob={handleAddJob}
      />
      
      <div className="mt-6">
        <UserJobList status={selectedStatus} />
      </div>
      
      {showPopup && (
        <UserJobCreate onSuccess={refreshList} onClose={closePopup} />
      )}
    </div>
  );
};

export default JobDashboard;