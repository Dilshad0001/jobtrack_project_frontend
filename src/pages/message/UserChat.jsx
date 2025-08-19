import { useRef } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { connectSocket, sendMessage } from "./socket";
import { HiArrowLeft } from "react-icons/hi";
import { axiosInstance } from "../../store/AxioInstance";

function UserChat({ SelectedContact,goBack  }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userId, setUserId] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState({});
  const [reciverProfile,setReciverProfile]=useState({})

  const receiverId = SelectedContact;
  const bottomRef = useRef(null);
  useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);
  
  useEffect(() => {
    axiosInstance
      .get("auth/api/auth/self-profile/"
      //   , {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      //   },
      // }
    )
      .then((res) => {
        setUserId(res.data.data.id);
        console.log("IN USEFFECT=",res.data.data);
      })
      .catch((err) => {
        console.error("Failed to fetch user:", err);
      });
  }, []);

  useEffect(() => {
    if (!receiverId || !userId) return;

    const resetUnreadCount = async () => {
      try {
        await axiosInstance.patch(
          `chat/chat/contact-list/?user_id=${userId}&contact_id=${receiverId}`,
          { unread_message_count: 0 },
          // {
          //   headers: {
          //     Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          //   },
          // }
        );
        console.log('Unread message count reset for contact:', SelectedContact);

        // 🔄 Refresh chat list without reload
        window.dispatchEvent(new Event("refreshContacts"));

      } catch (error) {
        console.error('Error resetting unread message count:', error);
      }
    };

    resetUnreadCount();
  }, [SelectedContact]);

  // 2. Fetch messages only after both userId and receiverId are ready
  useEffect(() => {
    if (!userId || !receiverId) return;

    axiosInstance
      .get(
        `chat/chat/messages/?user1=${userId}&user2=${receiverId}`,
        // {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        //   },
        // }
      )
      .then((res) => {
        setMessages(res.data);
        
        // setChatPageOpen(true)
      })
      .catch((err) => {
        console.error("Error fetching messages:", err);
      });
  }, [userId, receiverId]);

console.log("reciver profile==",reciverProfile);

    useEffect(() => {
    if ( !receiverId) return;

    axiosInstance
      .get(
        `auth/user/profile/?profileId=${receiverId}`,
        // {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        //   },
        // }
      )
      .then((res) => {
        setReciverProfile(res.data);
        
        // setChatPageOpen(true)
      })
      .catch((err) => {
        console.error("Error fetching fetching reciver profile:", err);
      });
  }, [ receiverId]);

  useEffect(() => {
    if (!userId ) return;

    const socket = connectSocket(userId, (data) => {
      if (data.type === "chat_message") {
        setMessages((prev) => [...prev, data]);
        window.dispatchEvent(new Event("refreshContacts"));
      }

      if (data.type === "online_status" || data.type === "online_status_response") {
        setOnlineUsers((prev) => ({
          ...prev,
          [data.user_id]: data.is_online
        }));
      }

      if (data.type === "new_chat_contact") {
        window.dispatchEvent(new Event("refreshContacts"));
      }
    });
    return () => {
      if (socket) socket.close();
    };
  }, [userId]);

  useEffect(() => {
    if (!userId || !receiverId) return;

    sendMessage({
      type: "check_online",
      target_user_id: receiverId,
    });
  }, [userId, receiverId]);

  // 4. Handle send message
  const handleSend = () => {
    if (!input.trim()) return;
    const now = new Date().toISOString();

    const newMessage = {
      sender_id: userId,
      receiver_id: receiverId,
      content: input,
      timestamp: now
    };

    sendMessage(newMessage);
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  console.log('messages=',messages[messages.length-1]);

  // UI if no contact selected
  if (!receiverId) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-yellow-100 to-pink-100">
        <div className="bg-white p-10 rounded-2xl shadow-lg text-center">
          <h1 className="text-xl font-semibold text-gray-700">No chat selected</h1>
          <p className="text-sm text-gray-500 mt-2">Please select a contact to start chatting.</p>
        </div>
      </div>
    );
  }

  // Chat UI
  return (
    <div className="flex flex-col h-screen w-full mx-auto bg-gray-50">
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button className="md:hidden -ml-5" onClick={goBack}><HiArrowLeft className="w-5 h-5 mr-2" /></button>


            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-bold text-sm">{reciverProfile?.full_name?.slice(0,1) || 'U'}</span>
            </div>
            <div>
              <h2 className=" text-gray-900">{reciverProfile.full_name}</h2>
              <div className="flex items-center space-x-1">
                {onlineUsers[receiverId] ? (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600 font-medium">Online</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-sm text-gray-500">Offline</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender_id === userId ? "justify-start " : "justify-end"
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                msg.sender_id === userId
                  ? "bg-white text-gray-800 border border-gray-200  "
                  : "bg-blue-600 text-white  "
              }`}
            >


{/* <p className="text-xs sm:text-sm md:text-base leading-relaxed break-words max-w-[99%]">
  {msg.content || msg.message}
</p> */}
<p className="text-xs sm:text-sm md:text-base leading-relaxed break-words">
  {msg.content || msg.message}
</p>


              <div
                className={`text-xs mt-1 ${
                  msg.sender_id === userId
                    ? "text-gray-500 text-right "
                    : "text-blue-100 text-left"
                }`}
              >
                {msg.timestamp && (() => {
                  const time = msg.timestamp.slice(11, 16);
                  const [hh, mm] = time.split(':');
                  const hour12 = ((parseInt(hh) + 11) % 12) + 1;
                  const period = parseInt(hh) >= 12 ? 'PM' : 'AM';
                  return `${hour12}:${mm} ${period}`;
                })()}

                
              </div>
            </div>
          </div>
        ))}
  <div ref={bottomRef} />

      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>
          
          <div className="flex-1 relative">
            <input
              className="w-full bg-gray-100 border-0 rounded-full px-4 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
            />
          </div>
          
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8a2 2 0 002-2V6a2 2 0 00-2-2H8a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
          </button>
          
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-blue-600 text-white p-2.5 rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserChat;