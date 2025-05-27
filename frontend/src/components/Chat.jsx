// import React, { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { createSocketConnection } from "../utils/socket";
// import axios from "axios";
// import { BASE_URL } from "../utils/constants";



// const Chat = () => {
//   const { targetUserId } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [typingUser, setTypingUser] = useState("");
//   const user = useSelector((store) => store.user);
//   const userId = user?._id;

//   const messagesEndRef = useRef(null);
//   const socketRef = useRef(null);
//   const typingTimeoutRef = useRef(null);

//   const fetchChatMessages = async () => {
//     const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
//       withCredentials: true,
//     });

//     const chatMessages = chat?.data?.messages.map((msg) => {
//       const { senderId, text } = msg;
//       return {
//         firstName: senderId?.firstName,
//         lastName: senderId?.lastName,
//         text,
//       };
//     }); 
//     setMessages(chatMessages);
//   };
//   useEffect(() => {
//     fetchChatMessages();
//   }, []);

//   useEffect(() => {
//     if (!userId) return;

//     const socket = createSocketConnection();
//     socketRef.current = socket;

//     socket.emit("joinChat", {
//       firstName: user.firstName,
//       lastName: user.lastName,
//       userId,
//       targetUserId,
//     });

//     socket.on(
//       "messageReceived",
//       ({ firstName, lastName, text, time, userId: senderId }) => {
//         setMessages((prev) => [
//           ...prev,
//           { firstName, lastName, text, time, userId: senderId },
//         ]);
//       }
//     );

//     socket.on("typing", ({ isTyping, firstName }) => {
//       if (firstName === user.firstName) return; // Ignore own typing indicator
//       setTypingUser(firstName);
//       setIsTyping(isTyping);

//       if (isTyping) {
//         clearTimeout(typingTimeoutRef.current);
//         typingTimeoutRef.current = setTimeout(() => {
//           setIsTyping(false);
//           setTypingUser("");
//         }, 2000);
//       }
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [userId, targetUserId, user]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleTyping = (e) => {
//     const text = e.target.value;
//     setNewMessage(text);

//     if (socketRef.current) {
//       socketRef.current.emit("typing", {
//         userId,
//         targetUserId,
//         firstName: user.firstName,
//         isTyping: text.length > 0,
//       });
//     }
//   };

//   const sendMessage = () => {
//     if (!newMessage.trim()) return;

//     const messageData = {
//       firstName: user.firstName,
//       lastName: user.lastName,
//       userId,
//       targetUserId,
//       text: newMessage,
//       time: new Date().toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//     };

//     socketRef.current.emit("sendMessage", messageData);

    
//     setNewMessage(""); // Don't update UI manually — messageReceived will handle it
//   };

//   const getInitials = (firstName, lastName) => {
//     return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
//   };

//   return (
//     <div className="w-full max-w-2xl mx-auto border border-gray-700 rounded-lg mt-6 h-[75vh] flex flex-col bg-[#1e1e1e] text-white shadow-md">
//       <h1 className="p-4 border-b border-gray-700 text-lg font-semibold">
//         Chat
//       </h1>

//       <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
//         {messages.map((msg, index) => {
//           const isOwnMessage = msg.userId === userId;
//           return (
//             <div
//               key={index}
//               className={`flex items-start gap-2 ${
//                 isOwnMessage ? "justify-end" : "justify-start"
//               }`}
//             >
//               {!isOwnMessage && (
//                 <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-sm font-bold">
//                   {getInitials(msg.firstName, msg.lastName)}
//                 </div>
//               )}
//               <div className="max-w-xs">
//                 <div
//                   className={`px-4 py-2 rounded-lg ${
//                     isOwnMessage ? "bg-blue-600" : "bg-gray-700"
//                   }`}
//                 >
//                   <div className="text-sm">{msg.text}</div>
//                 </div>
//                 <div className="text-xs text-gray-400 mt-1 text-right">
//                   {msg.time}
//                 </div>
//               </div>
//               {isOwnMessage && (
//                 <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold">
//                   {getInitials(msg.firstName, msg.lastName)}
//                 </div>
//               )}
//             </div>
//           );
//         })}

//         {isTyping && (
//           <div className="text-sm italic text-gray-400 mt-2">
//             {typingUser} is typing...
//           </div>
//         )}

//         <div ref={messagesEndRef} />
//       </div>

//       <div className="p-4 border-t border-gray-700 flex items-center gap-3">
//         <input
//           value={newMessage}
//           onChange={handleTyping}
//           className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 outline-none border border-gray-600 focus:ring-2 focus:ring-blue-500"
//           placeholder="Type your message..."
//         />
//         <button
//           onClick={sendMessage}
//           className="btn btn-secondary px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;


// import React, { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { createSocketConnection } from "../utils/socket";
// import axios from "axios";
// import { BASE_URL } from "../utils/constants";

// const Chat = () => {
//   const { targetUserId } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [typingUser, setTypingUser] = useState("");
//   const user = useSelector((store) => store.user);
//   const userId = user?._id;

//   const messagesEndRef = useRef(null);
//   const socketRef = useRef(null);
//   const typingTimeoutRef = useRef(null);

//   const fetchChatMessages = async () => {
//     const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
//       withCredentials: true,
//     });

//     const chatMessages = chat?.data?.messages.map((msg) => {
//       const { senderId, text } = msg;
//       return {
//         firstName: senderId?.firstName,
//         lastName: senderId?.lastName,
//         text,
//       };
//     });
//     setMessages(chatMessages);
//   };

//   useEffect(() => {
//     fetchChatMessages();
//   }, []);

//   useEffect(() => {
//     if (!userId) return;

//     const socket = createSocketConnection();
//     socketRef.current = socket;

//     socket.emit("joinChat", {
//       firstName: user.firstName,
//       lastName: user.lastName,
//       userId,
//       targetUserId,
//     });

//     socket.on(
//       "messageReceived",
//       ({ firstName, lastName, text, time, userId: senderId }) => {
//         setMessages((prev) => [
//           ...prev,
//           { firstName, lastName, text, time, userId: senderId },
//         ]);
//       }
//     );

//     socket.on("typing", ({ isTyping, firstName }) => {
//       if (firstName === user.firstName) return;
//       setTypingUser(firstName);
//       setIsTyping(isTyping);

//       if (isTyping) {
//         clearTimeout(typingTimeoutRef.current);
//         typingTimeoutRef.current = setTimeout(() => {
//           setIsTyping(false);
//           setTypingUser("");
//         }, 2000);
//       }
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [userId, targetUserId, user]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleTyping = (e) => {
//     const text = e.target.value;
//     setNewMessage(text);

//     if (socketRef.current) {
//       socketRef.current.emit("typing", {
//         userId,
//         targetUserId,
//         firstName: user.firstName,
//         isTyping: text.length > 0,
//       });
//     }
//   };

//   const sendMessage = () => {
//     if (!newMessage.trim()) return;

//     const messageData = {
//       firstName: user.firstName,
//       lastName: user.lastName,
//       userId,
//       targetUserId,
//       text: newMessage,
//       time: new Date().toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//     };

//     socketRef.current.emit("sendMessage", messageData);
//     setNewMessage("");
//   };

//   const getInitials = (firstName, lastName) => {
//     return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
//   };

//   return (
//     <div className="w-full max-w-2xl mx-auto border border-gray-300 rounded-lg mt-6 h-[75vh] flex flex-col bg-white text-gray-900 shadow-lg">
//       <h1 className="p-4 border-b border-gray-200 text-lg font-semibold">
//         Chat
//       </h1>

//       <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
//         {messages.map((msg, index) => {
//           const isOwnMessage = msg.userId === userId;
//           return (
//             <div
//               key={index}
//               className={`flex items-start gap-2 ${
//                 isOwnMessage ? "justify-end" : "justify-start"
//               }`}
//             >
//               {!isOwnMessage && (
//                 <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-700">
//                   {getInitials(msg.firstName, msg.lastName)}
//                 </div>
//               )}
//               <div className="max-w-xs">
//                 <div
//                   className={`px-4 py-2 rounded-lg shadow ${
//                     isOwnMessage
//                       ? "bg-blue-100 text-blue-900"
//                       : "bg-gray-100 text-gray-800"
//                   }`}
//                 >
//                   <div className="text-sm">{msg.text}</div>
//                 </div>
//                 <div
//                   className={`text-xs mt-1 ${
//                     isOwnMessage ? "text-right text-gray-500" : "text-left text-gray-500"
//                   }`}
//                 >
//                   {msg.time}
//                 </div>
//               </div>
//               {isOwnMessage && (
//                 <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white">
//                   {getInitials(msg.firstName, msg.lastName)}
//                 </div>
//               )}
//             </div>
//           );
//         })}

//         {isTyping && (
//           <div className="text-sm italic text-gray-500 mt-2">
//             {typingUser} is typing...
//           </div>
//         )}

//         <div ref={messagesEndRef} />
//       </div>

//       <div className="p-4 border-t border-gray-200 flex items-center gap-3 bg-white">
//         <input
//           value={newMessage}
//           onChange={handleTyping}
//           className="flex-1 bg-white text-gray-800 rounded-lg px-4 py-2 outline-none border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400"
//           placeholder="Type your message..."
//         />
//         <button
//           onClick={sendMessage}
//           className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;


import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSocketConnection, disconnectSocket } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });

      const chatMessages = chat?.data?.messages.map((msg) => {
        const { senderId, text } = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text,
          time: msg.time || "",
          userId: senderId?._id,
        };
      });
      setMessages(chatMessages);
    } catch (error) {
      console.error("Failed to fetch chat messages:", error);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, [targetUserId]);

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text, time, userId: senderId }) => {
      setMessages((prev) => [
        ...prev,
        { firstName, lastName, text, time, userId: senderId },
      ]);
    });

    socket.on("typing", ({ isTyping, firstName }) => {
      if (firstName === user.firstName) return;
      setTypingUser(firstName);
      setIsTyping(isTyping);

      if (isTyping) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
          setIsTyping(false);
          setTypingUser("");
        }, 2000);
      }
    });

    return () => {
      disconnectSocket();
    };
  }, [userId, targetUserId, user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleTyping = (e) => {
    const text = e.target.value;
    setNewMessage(text);

    if (socketRef.current) {
      socketRef.current.emit("typing", {
        userId,
        targetUserId,
        firstName: user.firstName,
        isTyping: text.length > 0,
      });
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const messageData = {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    socketRef.current.emit("sendMessage", messageData);
    setNewMessage("");
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
  };

  return (
    <div className="w-full max-w-2xl mx-auto border border-gray-300 rounded-lg mt-6 h-[75vh] flex flex-col bg-white text-gray-900 shadow-lg">
      <h1 className="p-4 border-b border-gray-200 text-lg font-semibold">
        Chat
      </h1>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        {messages.map((msg, index) => {
          const isOwnMessage = msg.userId === userId;
          return (
            <div
              key={index}
              className={`flex items-start gap-2 ${
                isOwnMessage ? "justify-end" : "justify-start"
              }`}
            >
              {!isOwnMessage && (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-700">
                  {getInitials(msg.firstName, msg.lastName)}
                </div>
              )}
              <div className="max-w-xs">
                <div
                  className={`px-4 py-2 rounded-lg shadow ${
                    isOwnMessage
                      ? "bg-blue-100 text-blue-900"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <div className="text-sm">{msg.text}</div>
                </div>
                <div
                  className={`text-xs mt-1 ${
                    isOwnMessage
                      ? "text-right text-gray-500"
                      : "text-left text-gray-500"
                  }`}
                >
                  {msg.time}
                </div>
              </div>
              {isOwnMessage && (
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white">
                  {getInitials(msg.firstName, msg.lastName)}
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div className="text-sm italic text-gray-500 mt-2">
            {typingUser} is typing...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200 flex items-center gap-3 bg-white">
        <input
          value={newMessage}
          onChange={handleTyping}
          className="flex-1 bg-white text-gray-800 rounded-lg px-4 py-2 outline-none border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
