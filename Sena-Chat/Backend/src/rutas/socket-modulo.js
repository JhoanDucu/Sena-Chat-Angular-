const socketFunctions = require("../controladores/socket-funciones");

const exportarSocket = (http) => {
  const io = require("socket.io")(http, {
    cors: {
      origin: true,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log('Nuevo usuario conectado');
    socket.on("", () => socketFunctions.handleUserDisconnect(socket));
  });

  return io;
};

module.exports = exportarSocket;
