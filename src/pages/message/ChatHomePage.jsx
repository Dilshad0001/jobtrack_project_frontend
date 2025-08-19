



import React, { useState } from 'react';
import ContactList from './ContactList';
import UserChat from './UserChat';

function ChatHomePage() {
  const [selectedContactId, setSelectedContactId] = useState(null);

  const handleSelectContact = (id) => {
    setSelectedContactId(id);
  };

  return (
    <div className="h-full w-full  bg-red-900">
      <div className="h-full flex bg-amber-600">
        {/* For Medium and Larger Screens */}
        <div className="hidden md:flex w-full  ">
          {/* <div className='bg-amber-300 w-15'></div> */}
          {/* Contact List */}
          <div className="w-80 border-r ">
            <ContactList
              onSelectContact={handleSelectContact}
              selectedContactId={selectedContactId}
            />
          </div>

          {/* User Chat */}
          <div className="flex-1  ">
            <UserChat SelectedContact={selectedContactId} />
          </div>
        </div>

        {/* For Small Screens - show only one component */}
        <div className="flex flex-col md:hidden w-full h-full">
          {selectedContactId === null ? (
            <ContactList
              onSelectContact={handleSelectContact}
              selectedContactId={selectedContactId}
            />
          ) : (
            <UserChat
              SelectedContact={selectedContactId}
              goBack={() => setSelectedContactId(null)} 
            />
            
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatHomePage;
