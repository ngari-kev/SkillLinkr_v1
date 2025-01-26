import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

/**
 * Chat component that provides real-time messaging functionality
 * @component
 */
const Chat = () => {
  // State management for chat functionality
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [activeUsers, setActiveUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);

  /**
   * Initialize WebSocket connection and event handlers
   */
  useEffect(() => {
    console.log("Initilaizing chat...");
    const token = localStorage.getItem("access");
    if (!token) {
      console.log("No token found");
      setConnected(false);
      return;
    }
    console.log("Found Token: ", token);

    // Initialize Socket.IO connection with configuration
    const newSocket = io("https://skilllinkr.ngarikev.tech", {
      transports: ["websocket"],
      upgrade: true,
      rememberUpgrade: true,
      secure: true,
      rejectUnauthorized: false,
      query: { token },
      withCredentials: true,
    });

    // Handle successful connection
    newSocket.on("connect", () => {
      console.log("Connected to WebSocket");
      setConnected(true);
    });

    // Handle connection errors
    newSocket.on("connect_error", (error) => {
      console.error("Connection error:", error);
      setConnected(false);
    });

    // Handle updates to active users list
    newSocket.on("users_update", (users) => {
      console.log("Received users update:", users);
      // Extract current user from JWT token and filter them out
      const currentUser = JSON.parse(atob(token.split(".")[1])).sub;
      const filteredUsers = users.filter((user) => user !== currentUser);
      console.log("Filtered users:", filteredUsers);
      setActiveUsers(filteredUsers);
    });

    // Handle incoming messages
    newSocket.on("new_message", (data) => {
      console.log("Received message:", data);
      setMessages((prev) => [...prev, data]);
    });

    // Handle disconnection
    newSocket.on("disconnect", () => {
      console.log("Disconnected from WebSocket");
      setConnected(false);
    });

    setSocket(newSocket);

    // Cleanup function to close socket connection
    return () => {
      if (newSocket) {
        console.log("Diconnecting socket on cleanup");
        newSocket.close();
      }
    };
  }, []);

  /**
   * Handles sending messages to other users
   * @param {Event} e - Form submit event
   */
  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && selectedUser && socket) {
      console.log("Sending message to:", selectedUser);
      socket.emit("private_message", {
        recipient: selectedUser,
        message: message.trim(),
      });
      // Add sent message to local message history
      setMessages((prev) => [
        ...prev,
        {
          sender: "You",
          message: message.trim(),
        },
      ]);
      setMessage(""); // Clear input field
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg">
      {/* Chat header with connection status */}
      <div className="p-4 bg-sky-600 text-white rounded-t-lg flex justify-between items-center">
        <h3 className="font-bold">Chat</h3>
        <span
          className={`h-3 w-3 rounded-full ${connected ? "bg-green-500" : "bg-red-500"}`}
        ></span>
      </div>

      <div className="p-4">
        {/* User selection dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Online Users ({activeUsers.length})
          </label>
          <select
            className="w-full p-2 border rounded"
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
        </div>

        {/* Message history display */}
        <div className="h-48 overflow-y-auto mb-4 border rounded p-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 ${msg.sender === "You" ? "text-right" : ""}`}
            >
              <span className="font-bold">{msg.sender}:</span> {msg.message}
            </div>
          ))}
        </div>

        {/* Message input form */}
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder="Type a message..."
            disabled={!selectedUser || !connected}
          />
          <button
            type="submit"
            className={`px-4 py-2 rounded ${
              selectedUser && connected
                ? "bg-sky-600 text-white hover:bg-sky-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!selectedUser || !connected}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
