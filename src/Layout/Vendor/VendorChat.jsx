"use client"
import { Paperclip, Search, Send, Smile } from "lucide-react"
import { useState } from "react"

export default function VendorChat() {
  const [message, setMessage] = useState("")

  const conversations = [
    {
      id: 1,
      name: "Henry Dholi",
      avatar: "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg?height=40&width=40",
      lastMessage: "I cam across your profile and...",
      unread: false,
      active: true,
    },
    {
      id: 2,
      name: "Mariya Desoja",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyzTWQoCUbRNdiyorem5Qp1zYYhpliR9q0Bw&s?height=40&width=40",
      lastMessage: "I like your confidence! 💪",
      unread: true,
      active: false,
    },
    {
      id: 3,
      name: "Robert Jhon",
      avatar: "https://i.pinimg.com/736x/2e/76/9d/2e769d14b35a9627065c30e6dbf09001.jpg?height=40&width=40",
      lastMessage: "Can you share your offer?",
      unread: true,
      active: false,
    },
    {
      id: 4,
      name: "Cody Fisher",
      avatar: "https://www.thenorthwestern.com/gcdn/-mm-/ef7b91c0875da6db10b578d01af188ba61486bed/c=24-0-744-960/local/-/media/2015/06/05/Oshkosh/B9317626632Z.1_20150605171145_000_G8HB0EK3O.1-0.jpg?width=660&height=880&fit=crop&format=pjpg&auto=webp?height=40&width=40",
      lastMessage: "I'm waiting for you response!",
      unread: true,
      active: false,
    },
    {
      id: 5,
      name: "Cristofer Dorin",
      avatar: "https://toppng.com/uploads/preview/stock-person-png-stock-photo-man-11563049686zqeb9zmqjd.png?height=40&width=40",
      lastMessage: "I'm waiting for you response!",
      unread: true,
      active: false,
    },
    {
      id: 6,
      name: "Marcus Siphron",
      avatar: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhY2slMjBwZXJzb258ZW58MHx8MHx8fDA%3D?height=40&width=40",
      lastMessage: "Hello, how are you?",
      unread: false,
      active: false,
    }
    
  ]

  const messages = [
    {
      id: 1,
   
      content: "I want to make an appointment tomorrow from 2:00 to 5:00pm?",
      time: "1:55pm",
      isUser: false,
    },
    {
      id: 2,
      sender: "You",
      content: "Hello, Thomas! I will check the schedule and inform you",
      time: "1:58pm",
      isUser: true,
    },
    {
      id: 3,
 
      content: "Ok, Thanks for your reply.",
      time: "1:59pm",
      isUser: false,
    },
    {
      id: 4,
      sender: "You",
      content: "You are welcome!",
      time: "2:00pm",
      isUser: true,
    },
    {
      id: 5,
  
      content: "Ok, Thanks for your reply.",
      time: "1:59pm",
      isUser: false,
    },
    {
      id: 6,
      sender: "You",
      content: "You are welcome!",
      time: "2:00pm",
      isUser: true,
    },
  ]

  const handleSendMessage = () => {
    if (message.trim()) {
      // Here you would typically add the message to your messages array
      // and send it to your backend
      setMessage("")
    }
  }

  return (
    <div className="flex h-[85vh] bg-[#121212]">
      {/* Left sidebar */}
      <div className="w-64 border-r border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-white font-medium">Active Conversations</h2>
          <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded">4</span>
        </div>

        {/* Search bar */}
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-800 text-gray-300 rounded pl-10 pr-4 py-2 text-sm focus:outline-none"
            />
            <Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
          </div>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`flex items-center p-4 hover:bg-gray-800 cursor-pointer ${conversation.active ? "bg-gray-800" : ""}`}
            >
              <div className="relative">
                <img
                  src={conversation.avatar || "/placeholder.svg"}
                  alt={conversation.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {conversation.unread && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#121212]"></span>
                )}
              </div>
              <div className="ml-3 flex-1 overflow-hidden">
                <div className="flex justify-between">
                  <h3 className="text-sm font-medium text-blue-400">{conversation.name}</h3>
                </div>
                <p className="text-xs text-gray-400 truncate">{conversation.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <div className="flex items-center">
            <img src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid&w=740" alt="Henry Dholi" className="w-14 h-14 rounded-full object-cover" />
            <div className="ml-3">
              <h3 className="text-blue-400 font-medium">Henry Dholi</h3>
              <p className="text-xs text-gray-400">Reply to message</p>
            </div>
          </div>
          <button className="text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg) => (
            <div key={msg.id} className={`mb-4 ${msg.isUser ? "text-right" : ""}`}>
              {!msg.isUser && <p className="text-xs text-gray-500 mb-1">{msg.sender}</p>}
              <div
                className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                  msg.isUser ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-800 text-white rounded-bl-none"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
            </div>
          ))}
        </div>

        {/* Message input */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center bg-gray-800 rounded-lg px-3 py-2">
            <button className="text-gray-400 mr-2">
              <Paperclip size={20} />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type something here..."
              className="flex-1 bg-transparent text-gray-300 focus:outline-none"
            />
            <button className="text-gray-400 mx-2">
              <Smile size={20} />
            </button>
            <button onClick={handleSendMessage} className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700">
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
