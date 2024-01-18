const mysql = require("mysql2");

const conexion = mysql.createConnection({
  host: "localhost",
  database: "sena_chat",
  user: "root",
  password: "root",
  port: 3306,
});

conexion.connect((error) => {
  if (error) throw error;
  console.log("Conectado a base de datos");
});

module.exports = conexion;