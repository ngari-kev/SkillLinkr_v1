import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authenticatedFetch } from "../utils/api";
import Header from "./Header";

const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialUserId = searchParams.get("userId");

  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchConversations();
    if (initialUserId) {
      fetchUserAndInitiateChat(initialUserId);
    }
    const interval = setInterval(fetchConversations, 10000);
    return () => clearInterval(interval);
  }, [initialUserId]);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser.id);
      const interval = setInterval(() => fetchMessages(selectedUser.id), 3000);
      return () => clearInterval(interval);
    }
  }, [selectedUser]);

  useEffect(scrollToBottom, [messages]);

  const fetchUserAndInitiateChat = async (userId) => {
    try {
      const response = await authenticatedFetch(`/api/chat/user/${userId}`);
      if (response.ok) {
        const userData = await response.json();
        setSelectedUser(userData);
      } else {
        const error = await response.json();
        setError(error.message);
      }
    } catch (err) {
      setError("Failed to load user information");
    }
  };

  const fetchConversations = async () => {
    try {
      const response = await authenticatedFetch("/api/chat/conversations");
      if (response.ok) {
        const data = await response.json();
        setConversations(data.conversations);
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  const fetchMessages = async (userId) => {
    try {
      const response = await authenticatedFetch(`/api/chat/messages/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser) return;

    try {
      const response = await authenticatedFetch(
        `/api/chat/messages/${selectedUser.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: newMessage }),
        },
      );

      if (response.ok) {
        setNewMessage("");
        fetchMessages(selectedUser.id);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="flex h-screen mt-16">
        {/* Conversations List */}
        <div className="w-1/3 border-r bg-white">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold text-sky-900">Conversations</h2>
          </div>
          <div className="overflow-y-auto h-full">
            {conversations.map((conv) => (
              <div
                key={conv.user.id}
                onClick={() => setSelectedUser(conv.user)}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50
                  ${selectedUser?.id === conv.user.id ? "bg-gray-100" : ""}`}
              >
                <div className="flex justify-between">
                  <span className="font-semibold text-sky-900">
                    {conv.user.username}
                  </span>
                  {conv.unread_count > 0 && (
                    <span className="bg-sky-500 text-white px-2 rounded-full text-sm">
                      {conv.unread_count}
                    </span>
                  )}
                </div>
                {conv.last_message && (
                  <p className="text-sm text-gray-500 truncate">
                    {conv.last_message.content}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {error ? (
            <div className="flex-1 flex items-center justify-center text-red-500">
              {error}
            </div>
          ) : selectedUser ? (
            <>
              <div className="p-4 border-b">
                <h3 className="text-xl font-bold text-sky-900">
                  {selectedUser.username}
                </h3>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 ${
                      message.is_sender ? "text-right" : "text-left"
                    }`}
                  >
                    <div
                      className={`inline-block p-2 rounded-lg ${
                        message.is_sender
                          ? "bg-sky-500 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {message.content}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(message.created_at).toLocaleTimeString()}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <form onSubmit={sendMessage} className="p-4 border-t">
                <div className="flex">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 border rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="Type a message..."
                  />
                  <button
                    type="submit"
                    className="bg-sky-500 text-white px-6 py-2 rounded-r hover:bg-sky-600"
                  >
                    Send
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a conversation to start chatting
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;
