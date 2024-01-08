exports.joinRoom = (socket, room) => {
  socket.join(room);
  // socket.broadcast.to(room).emit('test2', 'ke si');
  // socket.emit(''); OPCIONAL EMITIR EVENTO
};

exports.leaveRoom = (socket, room) => {
  socket.leave(room);
  // socket.emit('test2'); OPCIONAL EMITIR EVENTO
  // socket.to(room).emit('test2', 'Me fui de la sala desde otra pestaña');
};

exports.emitMessage = (socket, datosEnvio) => {
  socket.to(datosEnvio.room).emit('Recibe', datosEnvio.message);
  // Lógica para manejar la desconexión de un usuario
};
