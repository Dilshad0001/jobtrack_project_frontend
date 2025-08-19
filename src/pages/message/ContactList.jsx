



import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import UserChat from './UserChat';
import ProfileList from './ProfileList';
import { fetchProfile } from '../../store/profileSlice';
import { HiOutlineUser } from 'react-icons/hi';
import { axiosInstance } from '../../store/AxioInstance';
import ContactListDelete from './ContactListDelete';

function ContactList({ onSelectContact, selectedContactId }) {
  const [chatContact, setChatContact] = useState([]);
  const [chatUser, setChatUser] = useState([]);
  const [profileDetails, setProfileDetails] = useState([]); 
  const navigate = useNavigate();
  const [newProfile, setNewProfile] = useState(false);
  const oldUnreadCountsRef = useRef({}); 
  const [popup, setPopup] = useState({ visible: false, x: 0, y: 0, id: null });
  const timerRef = useRef(null);
  // ✅ Event Handlers moved outside useEffect
  const handleContextMenu = (e, profileId) => {
    console.log('HANDLE CONTEXT MENU ON');
    
    e.preventDefault();
    setPopup({ visible: true, x: e.pageX, y: e.pageY, id: profileId });
  };
console.log('UN READ MESSAGE COUNT===',chatUser);

  const handleTouchStart = (e, profileId) => {
        console.log('HANDLE TOUCH sTART ON');

    const touch = e.touches[0];
    timerRef.current = setTimeout(() => {
      setPopup({ visible: true, x: touch.pageX, y: touch.pageY, id: profileId });
    }, 600); // long press
  };

  const handleTouchEnd = () => clearTimeout(timerRef.current);

  const handleClickAnywhere = () => popup.visible && setPopup({ ...popup, visible: false });

  const handleAddProfile = (profile) => {
    onSelectContact(profile.contact_id);
  };

  useEffect(() => {
    const fetchChatUser = async () => {
      try {
        const res = await axiosInstance.get("chat/chat/contact-list/");
        const newData = res.data.data;        
        let shouldRefresh = false;

        newData.forEach(contact => {
          const oldCount = oldUnreadCountsRef.current[contact.contact_id] || 0;
          if (contact.unread_message_count !== oldCount) shouldRefresh = true;
        });

        setChatUser(newData);

        const updatedCounts = {};
        newData.forEach(contact => {
          updatedCounts[contact.contact_id] = contact.unread_message_count;
        });
        oldUnreadCountsRef.current = updatedCounts;

        if (shouldRefresh) window.dispatchEvent(new Event("refreshContacts"));
      } catch (error) {
        console.log("profile fetch error");
      }
    };

    fetchChatUser();

    const handleRefresh = () => {
      console.log("🔄 Refreshing chat contacts via socket...");
      fetchChatUser();
    };

    window.addEventListener("refreshContacts", handleRefresh);
    return () => window.removeEventListener("refreshContacts", handleRefresh);
  }, []); // no popup dependency needed

  if (newProfile) {
    return (
      <div className='bg-white min-h-full flex flex-col'>
        {/* Header */}
        <div className='bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-sm'>
          <h2 className='text-xl font-semibold text-gray-900'>Find New Contacts</h2>
          <button
            className='p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors'
            onClick={() => setNewProfile(false)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Profile list */}
        <div className='flex-1 overflow-y-auto p-4'>
          <ProfileList onCloseProfileList={() => setNewProfile(false)} />
        </div>
      </div>
    );
  } else {
    return (
      <div
        className='bg-white h-full flex flex-col border-r border-gray-200 relative'
        onClick={handleClickAnywhere}
      >
        {/* Popup */}
{popup.visible && (
  <div
    className="absolute bg-white shadow-lg border rounded-md p-2 z-50 "
    style={{ top: popup.y, left: popup.x }}
  >
    <ContactListDelete
      contact_id={popup.id}
      onDeleted={(id) => {
        console.log("Deleted contact with id:", id);
        setChatUser((prev) => prev.filter((c) => c.contact_id !== id));
        setPopup({ ...popup, visible: false }); // close popup after delete
      }}
    />
  </div>
)}


        {/* Header */}
        <div className='bg-white border-b border-gray-200 p-4 shadow-sm'>
          <div className='flex items-center justify-between mb-3'>
            <h2 className='text-xl font-semibold text-gray-900'>Chats</h2>
            <button
              className='p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors'
              onClick={() => setNewProfile(true)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>

          {/* Search bar */}
          <div className='relative'>
            <input
              type="text"
              placeholder="Search contacts..."
              className='w-full bg-gray-100 border-0 rounded-full px-4 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all'
            />
            <svg className="w-4 h-4 absolute right-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Contact List */}
        <div className='flex-1 overflow-y-auto'>
          {Array.isArray(chatUser) &&
            chatUser.map((profile) => (
              <div
                key={profile.id}
                className={`flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors relative ${
                  selectedContactId === profile.contact_id ? 'bg-blue-50 border-r-4 border-r-blue-500' : ''
                }`}
                onClick={() => handleAddProfile(profile)}
                // onContextMenu={(e) => handleContextMenu(e, profile.id)}
                // onTouchStart={(e) => handleTouchStart(e, profile.id)}
                onContextMenu={(e) => handleContextMenu(e, profile.contact_id)}
                onTouchStart={(e) => handleTouchStart(e, profile.contact_id)}
                onTouchEnd={handleTouchEnd}
              >
                {/* Avatar */}
                <div className="relative">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                    <HiOutlineUser className="w-6 h-6 text-gray-600" />
                  </div>
                </div>

                {/* Contact Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{profile.contact_name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">
                        {(() => {
                          try {
                            const date = new Date(profile.last_message_at);
                            const now = new Date();
                            const diffTime = Math.abs(now - date);
                            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                            if (diffDays === 1) return `Today ${profile.last_message_at.slice(10,19)}`;
                            else if (diffDays === 2) return `Yesterday ${profile.last_message_at.slice(10,19)}`;
                            else if (diffDays <= 7) return date.toLocaleDateString('en-US', { weekday: 'short' });
                            else return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                          } catch {
                            return profile.last_message_at?.slice(10, 16) || '';
                          }
                        })()}
                      </span>

                      {profile.unread_message_count !== 0 && profile.contact_id !== selectedContactId && (
                        <div className="bg-blue-600 text-white text-xs rounded-full min-w-5 h-5 flex items-center justify-center px-1.5">
                          {profile.unread_message_count > 99 ? '99+' : profile.unread_message_count}
                        </div>
                       )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 truncate mt-1">Start the conversation...</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default ContactList;
