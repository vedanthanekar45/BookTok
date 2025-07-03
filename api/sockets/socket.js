import { Server } from "socket.io";
import http from "http";

let io;
const userSocketMap = {}

export const getReceiverID = (receiverID) => {
    return userSocketMap[receiverID]
}

export const createSocketServer = (app) => {
  const server = http.createServer(app);

  io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST"],
    },
  });


  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    const userID = socket.handshake.query.userID
    if (userID && userID !== "undefined") {
        userSocketMap[userID] = socket.id
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on("disconnect", () => {
      console.log("a user disconnected", socket.id);
      delete userSocketMap[userID]
      io.emit("getOnlineUsers", Object.keys(userSocketMap))
    });
  });

  return server;
};

export { io };
