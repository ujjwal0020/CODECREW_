// const socket = require('socket.io');
// const crypto = require("crypto");
// const { Chat } = require("../models/chat");
// const ConnectionRequest = require("../models/connectionRequest");

// const getSecretRoomId = (userId, targetUserId) => {
//   return crypto
//     .createHash("sha256")
//     .update([userId, targetUserId].sort().join("$"))
//     .digest("hex");
// };

// const initializeSocket = (server) => {
//     const io = socket(server, {
//         cors: {
//             origin: "http://localhost:5173",
//         },
//     });

//     io.on("connection", (socket) => {

//         socket.on("joinChat", ({firstName, userId, targetUserId}) => {
//           const roomId = getSecretRoomId(userId, targetUserId);
          
//           console.log(firstName + "joined room :" + roomId);
//           socket.join(roomId);
//         })

//         socket.on(
//           "sendMessage",
//           async ({ firstName, lastName, userId, targetUserId, text, time }) => {
//             try {
//               const roomId = getSecretRoomId(userId, targetUserId);

//               //Validate required fields
//               if (!userId || !targetUserId || !text?.trim()) {
//                 return socket.emit("error", {
//                   message: "Missing required message fields.",
//                 });
//               }

//               // Check if users are friends (ConnectionRequest accepted either way)
//               const isFriend = await ConnectionRequest.findOne({
//                 $or: [
//                   { senderId: userId, receiverId: targetUserId },
//                   { senderId: targetUserId, receiverId: userId },
//                 ],
//                 status: "accepted",
//               });

//               if (!isFriend) {
//                 return socket.emit("error", {
//                   message: "Users are not connected/friends.",
//                 });
//               }

//               // Find existing chat or create a new one
//               let chat = await Chat.findOne({
//                 participants: { $all: [userId, targetUserId] },
//               });

//               if (!chat) {
//                 chat = new Chat({
//                   participants: [userId, targetUserId],
//                   messages: [],
//                 });
//               }

//               // Append new message
//               chat.messages.push({
//                 senderId: userId,
//                 text,
//               });

//               // Save chat document
//               await chat.save();

//               // Emit message to both users in the room
//               io.to(roomId).emit("messageReceived", {
//                 firstName,
//                 lastName,
//                 userId,
//                 text,
//                 time,
//               });
//             } catch (error) {
//               console.error("Error saving message:", error);
//               socket.emit("error", {
//                 message: "Failed to send message. Try again later.",
//               });
//             }
//           }
//         );
        
          

//         socket.on("typing", ({ userId, targetUserId, isTyping, firstName }) => {
//           const roomId = getSecretRoomId(userId, targetUserId);
//           socket.to(roomId).emit("typing", { isTyping, firstName });
//         });
          
          
//         socket.on("disconnect", () => {

//         })
//     })
// }

// module.exports = initializeSocket;





const socket = require('socket.io');
const crypto = require("crypto");
const { Chat } = require("../models/chat");
const ConnectionRequest = require("../models/connectionRequest");

const getSecretRoomId = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("$"))
    .digest("hex");
};

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "https://codecrew-frontend-u558.onrender.com" // ✅ added deployed frontend here
      ],
      methods: ["GET", "POST"],
      credentials: true
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      const roomId = getSecretRoomId(userId, targetUserId);
      console.log(`${firstName} joined room: ${roomId}`);
      socket.join(roomId);
    });

    socket.on("sendMessage", async ({ firstName, lastName, userId, targetUserId, text, time }) => {
      try {
        const roomId = getSecretRoomId(userId, targetUserId);

        if (!userId || !targetUserId || !text?.trim()) {
          return socket.emit("error", {
            message: "Missing required message fields.",
          });
        }

        const isFriend = await ConnectionRequest.findOne({
          $or: [
            { senderId: userId, receiverId: targetUserId },
            { senderId: targetUserId, receiverId: userId },
          ],
          status: "accepted",
        });

        if (!isFriend) {
          return socket.emit("error", {
            message: "Users are not connected/friends.",
          });
        }

        let chat = await Chat.findOne({
          participants: { $all: [userId, targetUserId] },
        });

        if (!chat) {
          chat = new Chat({
            participants: [userId, targetUserId],
            messages: [],
          });
        }

        chat.messages.push({
          senderId: userId,
          text,
        });

        await chat.save();

        io.to(roomId).emit("messageReceived", {
          firstName,
          lastName,
          userId,
          text,
          time,
        });
      } catch (error) {
        console.error("Error saving message:", error);
        socket.emit("error", {
          message: "Failed to send message. Try again later.",
        });
      }
    });

    socket.on("typing", ({ userId, targetUserId, isTyping, firstName }) => {
      const roomId = getSecretRoomId(userId, targetUserId);
      socket.to(roomId).emit("typing", { isTyping, firstName });
    });

    socket.on("disconnect", () => {
      // Optional: log or handle disconnect
    });
  });
};

module.exports = initializeSocket;
