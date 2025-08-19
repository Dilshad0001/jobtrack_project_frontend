




let socket = null;

export const connectSocket = (userId, onMessage) => {
  const token = localStorage.getItem("accessToken");

socket = new WebSocket(`ws://51.21.215.128/chat/ws/chat/${userId}/?token=${token}`);

  socket.onopen = () => console.log("✅ WebSocket Connected:", userId);

  socket.onmessage = (e) => {
    const data = JSON.parse(e.data);
    onMessage(data); // Pass to handler
  };

  socket.onerror = (e) => {
    console.error("❌ WebSocket Error:", e);
  };

  socket.onclose = () => {
    console.warn("🔌 WebSocket Closed");
  };
};

export const sendMessage = (msg) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(msg));
  } else {
    console.warn("🕸️ WebSocket not open. Message not sent.");
  }
};
