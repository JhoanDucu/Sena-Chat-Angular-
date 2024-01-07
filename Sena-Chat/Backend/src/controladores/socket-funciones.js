exports.handleChatMessage = (socket, message) => {
  console.log(`Nuevo mensaje: ${message}`);
  // Lógica para manejar el mensaje, enviar a otros usuarios, etc.
};

exports.handleUserJoin = (socket, username) => {
  console.log(`${username} se ha unido.`);
  // Lógica para manejar la entrada de un nuevo usuario
};

exports.handleUserDisconnect = (socket) => {
  console.log("Usuario desconectado.");
  // Lógica para manejar la desconexión de un usuario
};