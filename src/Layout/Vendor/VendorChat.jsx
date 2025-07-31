"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { Paperclip, Search, Send, Smile } from "lucide-react";
import {
  useGetChatRoomsQuery,
  useGetChatRoomDetailsQuery,
  useGetChatMessagesQuery,
} from "../../redux/features/baseApi";

export default function VendorChat() {
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChatRoomId, setSelectedChatRoomId] = useState(null);
  const [file, setFile] = useState(null);
  const [localMessages, setLocalMessages] = useState([]);
  const wsRef = useRef(null);
  const messagesEndRef = useRef(null);

  const getCurrentUserId = () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1] || ""));
        return payload.user_id || payload.id;
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
    return null;
  };

  const { data: chatRooms = [], isLoading: chatRoomsLoading } = useGetChatRoomsQuery();
  const { data: selectedChatRoom } = useGetChatRoomDetailsQuery(selectedChatRoomId, {
    skip: !selectedChatRoomId,
  });
  const { data: messages = [], isLoading: messagesLoading } = useGetChatMessagesQuery(
    selectedChatRoomId,
    { skip: !selectedChatRoomId }
  );

  useEffect(() => {
    setLocalMessages(messages || []);
  }, [messages, selectedChatRoomId]);

  const filteredConversations = useMemo(() => {
    if (!searchTerm) return chatRooms;
    return chatRooms.filter((room) =>
      [
        room.other_participant?.full_name,
        room.other_participant?.first_name,
        room.other_participant?.last_name,
      ]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [chatRooms, searchTerm]);

  const unreadCount = useMemo(() => {
    return chatRooms.filter((room) => room.unread_count > 0).length;
  }, [chatRooms]);

  useEffect(() => {
    if (chatRooms.length > 0 && !selectedChatRoomId) {
      setSelectedChatRoomId(chatRooms[0].id);
    }
  }, [chatRooms, selectedChatRoomId]);

  useEffect(() => {
    if (!selectedChatRoomId) return;
    const token = localStorage.getItem("access_token");
    if (!token) return;
    const wsUrl = `ws://trick-offered-certificate-wy.trycloudflare.com/ws/chat/${selectedChatRoomId}/?token=${token}`;
    const ws = new window.WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => console.log("WebSocket connected");
    ws.onclose = () => console.log("WebSocket disconnected");
    ws.onerror = (e) => console.error("WebSocket error", e);
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "chat_message" || data.type === "message") {
          setLocalMessages((prev) => {
            // Check for duplicates based on content, sender, and approximate time
            const isDuplicate = prev.some((msg) => {
              const timeDiff = Math.abs(new Date(msg.created_at) - new Date(data.created_at));
              return (
                msg.content === data.content &&
                msg.sender?.id === data.sender?.id &&
                timeDiff < 5000 // Within 5 seconds
              );
            });
            
            if (isDuplicate) {
              return prev;
            }
            
            // If there's a client_id, replace the optimistic message
            if (data.client_id) {
              const filtered = prev.filter((msg) => msg.client_id !== data.client_id);
              return [...filtered, data];
            }
            
            return [...prev, data];
          });
        }
      } catch (e) {
        console.error("WebSocket message parse error", e);
      }
    };

    return () => {
      ws.close();
    };
  }, [selectedChatRoomId]);

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSendMessage = async () => {
    if (!message.trim() && !file) return;
    if (!wsRef.current || wsRef.current.readyState !== 1) {
      alert("WebSocket not connected");
      return;
    }
    const client_id = `client-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    let payload = {
      type: "chat_message",
      content: message,
      client_id,
    };
    if (file) {
      payload.file = await fileToBase64(file);
      payload.file_name = file.name;
    }
    wsRef.current.send(JSON.stringify(payload));
    setLocalMessages((prev) => [
      ...prev,
      {
        id: client_id,
        content: message,
        file: payload.file ? `data:;base64,${payload.file}` : undefined,
        file_name: payload.file_name,
        sender: { id: getCurrentUserId() },
        created_at: new Date().toISOString(),
        client_id,
      },
    ]);
    setMessage("");
    setFile(null);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [localMessages, selectedChatRoomId]);

  return (
    <div className="flex  h-[85vh] bg-[#121212] text-white">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <h2 className="font-medium">Active Conversations</h2>
          <span className="bg-gray-700 text-xs px-2 py-1 rounded">{unreadCount}</span>
        </div>
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 text-gray-300 rounded pl-10 pr-4 py-2 text-sm focus:outline-none"
            />
            <Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {chatRoomsLoading ? (
            <div className="text-center text-gray-400 p-4">Loading conversations...</div>
          ) : filteredConversations.length === 0 ? (
            <div className="text-center text-gray-400 p-4">No conversations found</div>
          ) : (
            filteredConversations.map((room) => (
              <div
                key={room.id}
                className={`flex items-center p-4 hover:bg-gray-800 cursor-pointer ${
                  selectedChatRoomId === room.id ? "bg-gray-800" : ""
                }`}
                onClick={() => setSelectedChatRoomId(room.id)}
              >
                <div className="relative">
              
                  {room.unread_count > 0 && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#121212]"></span>
                  )}
                </div>
                <div className="ml-3 flex-1 overflow-hidden">
                  <h3 className="text-sm font-medium text-blue-400 truncate">
                    {room.other_participant?.full_name ||
                      `${room.other_participant?.first_name || ""} ${room.other_participant?.last_name || ""}`.trim() ||
                      "Unknown User"}
                  </h3>
                  <p className="text-xs text-gray-400 truncate">
                    {room.last_message?.content || "No messages yet"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center">
            {selectedChatRoom ? (
              <>
            
                <div className="ml-3">
                  <h3 className="text-blue-400 font-medium">
                    {selectedChatRoom.other_participant?.full_name ||
                      `${selectedChatRoom.other_participant?.first_name || ""} ${selectedChatRoom.other_participant?.last_name || ""}`.trim() ||
                      "Unknown User"}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {selectedChatRoom.other_participant?.role || "User"}
                  </p>
                </div>
              </>
            ) : (
              <>
                <img src="/placeholder.svg" alt="User" className="w-14 h-14 rounded-full object-cover" />
                <div className="ml-3">
                  <h3 className="text-blue-400 font-medium">Select a conversation</h3>
                  <p className="text-xs text-gray-400">Choose a chat to start messaging</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          {messagesLoading ? (
            <div className="text-center text-gray-400">Loading messages...</div>
          ) : !selectedChatRoomId ? (
            <div className="text-center text-gray-400">Select a conversation to view messages</div>
          ) : localMessages.length === 0 ? (
            <div className="text-center text-gray-400">No messages yet</div>
          ) : (
            <>
              {localMessages.map((msg) => {
                const isCurrentUser = msg.sender?.id === getCurrentUserId();
                const senderName =
                  `${msg.sender?.first_name || ""} ${msg.sender?.last_name || ""}`.trim() ||
                  msg.sender?.username ||
                  "Unknown";
                const messageTime = new Date(msg.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                return (
                  <div key={msg.id} className={`mb-4 ${isCurrentUser ? "text-right" : ""}`}>
                    {!isCurrentUser && <p className="text-xs text-gray-500 mb-1">{senderName}</p>}
                    <div
                      className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                        isCurrentUser
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-gray-800 text-white rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      {msg.file && (
                        <div className="mt-2">
                          <a
                            href={msg.file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-300 underline text-sm"
                          >
                            📎 {msg.file_name}
                          </a>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{messageTime}</p>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center bg-gray-800 rounded-lg px-3 py-2">
            <label className="text-gray-400 mr-2 cursor-pointer">
              <Paperclip size={20} />
              <input
                type="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type something here..."
              className="flex-1 bg-transparent text-gray-300 focus:outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <button className="text-gray-400 mx-2">
              <Smile size={20} />
            </button>
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700"
              disabled={!message.trim() && !file}
            >
              <Send size={16} />
            </button>
          </div>
          {file && (
            <div className="text-xs text-blue-300 mt-2 flex items-center">
              <span>📎 {file.name}</span>
              <button className="ml-2 text-red-400" onClick={() => setFile(null)}>
                Remove
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
