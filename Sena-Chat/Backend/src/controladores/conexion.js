const mysql = require("mysql2");

const conexion = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_DATABASE || "sena_chat",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  port: process.env.DB_PORT || 3306,
});

conexion.connect((error) => {
  if (error) throw error;
  console.log("Conectado a base de datos");
});

module.exports = conexion;