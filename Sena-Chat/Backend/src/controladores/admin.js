const conexion = require("./conexion");

exports.obtenerGrupos = (req, res) => {
  const query = "SELECT * FROM grupos WHERE fk_tipo_grupo = 2";
  conexion.query(query, (error, resultado) => {
    if (error) return console.error(error.message);
    res.json(resultado);
  });
}

exports.obtenerUsuarios = (req, res) => {
  const query = "SELECT * FROM usuarios";
  conexion.query(query, (error, resultado) => {
    if (error) return console.error(error.message);
    res.json(resultado);
  });
}

exports.obtenerFichas = (req, res) => {
  const query = "SELECT * FROM mensaje";
  conexion.query(query, (error, resultado) => {
    if (error) return console.error(error.message);
    res.json(resultado);
  });
}