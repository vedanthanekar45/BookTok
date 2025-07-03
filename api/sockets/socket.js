import { Server } from "socket.io";
import http from "http";

let io;

const createSocketServer = (app) => {
  const server = http.createServer(app);

  io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    socket.on("disconnect", () => {
      console.log("a user disconnected", socket.id);
    });
  });

  return server;
};

export { createSocketServer, io };
