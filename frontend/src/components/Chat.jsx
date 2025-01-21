import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [activeUsers, setActiveUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access");
    const newSocket = io("https://skilllinkr.ngarikev.tech", {
      query: { token },
    });

    newSocket.on("connect", () => {
      console.log("Connected to WebSocket");
    });

    newSocket.on("users_update", (users) => {
      // Filter out current user
      const currentUser = JSON.parse(atob(token.split(".")[1])).sub;
      setActiveUsers(users.filter((user) => user !== currentUser));
    });

    newSocket.on("new_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && selectedUser && socket) {
      socket.emit("private_message", {
        recipient: selectedUser,
        message: message.trim(),
      });
      setMessage("");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg">
      <div className="p-4 bg-sky-600 text-white rounded-t-lg">
        <h3 className="font-bold">Chat</h3>
      </div>

      <div className="p-4">
        <select
          className="w-full mb-4 p-2 border rounded"
          value={selectedUser || ""}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Select a user</option>
          {activeUsers.map((user) => (
            <option key={user} value={user}>
              {user}
            </option>
          ))}
        </select>

        <div className="h-48 overflow-y-auto mb-4 border rounded p-2">
          {messages.map((msg, index) => (
            <div key={index} className="mb-2">
              <strong>{msg.sender}:</strong> {msg.message}
            </div>
          ))}
        </div>

        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
            disabled={!selectedUser}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
