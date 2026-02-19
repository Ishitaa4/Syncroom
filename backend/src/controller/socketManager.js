import { Server } from "socket.io";

let connections = {};   // { roomId: [socketId, socketId] }
let messages = {};      // { roomId: [ { sender, data, socket_id_sender } ] }
let timeOnline = {};    // { socketId: Date }

const connectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Something connected ");
    // JOIN ROOM
    socket.on("join-call", (path) => {
      if (!connections[path]) {
        connections[path] = [];
      }

      connections[path].push(socket.id);
      timeOnline[socket.id] = new Date();

      // Notify others
      connections[path].forEach(id => {
        io.to(id).emit("user-joined", socket.id, connections[path]);
      });

      // Send chat history
      if (messages[path]) {
        messages[path].forEach(msg => {
          io.to(socket.id).emit(
            "chat-message",
            msg.data,
            msg.sender,
            msg.socket_id_sender
          );
        });
      }
    });

    // SIGNALING (WebRTC)
    socket.on("signal", (toId, message) => {
      io.to(toId).emit("Signal", socket.id, message);
    });

    // CHAT MESSAGE
    socket.on("chat-message", (data, sender) => {
      let matchingRoom = null;

      for (let roomKey in connections) {
        if (connections[roomKey].includes(socket.id)) {
          matchingRoom = roomKey;
          break;
        }
      }

      if (matchingRoom) {
        if (!messages[matchingRoom]) {
          messages[matchingRoom] = [];
        }

        messages[matchingRoom].push({
          sender,
          data,
          socket_id_sender: socket.id
        });

        connections[matchingRoom].forEach(id => {
          io.to(id).emit("chat-message", data, sender, socket.id);
        });
      }
    });

    // DISCONNECT
    socket.on("disconnect", () => {
      const disconnectTime = new Date();

      for (let roomKey in connections) {
        const index = connections[roomKey].indexOf(socket.id);

        if (index !== -1) {
          connections[roomKey].splice(index, 1);

          connections[roomKey].forEach(id => {
            io.to(id).emit("user-left", socket.id);
          });

          if (connections[roomKey].length === 0) {
            delete connections[roomKey];
          }

          break;
        }
      }

      delete timeOnline[socket.id];
    });
  });
};

export default connectToSocket;
