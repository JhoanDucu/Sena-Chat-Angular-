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
    console.log("Nuevo usuario conectado");
    socket.on('unirSala', (room) => socketFunctions.joinRoom(socket, room));
    socket.on('salirSala', (room) => socketFunctions.leaveRoom(socket, room));
    socket.on("enviarMensaje", (datos) => socketFunctions.emitMessage(socket, datos));
  });

  return io;
};

module.exports = exportarSocket;
