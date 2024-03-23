const conexion = require("./conexion");

exports.obtenerGrupos = (req, res) => {
  const query = 
  `SELECT g.*, COUNT(ug.numerodoc) AS num_usuarios FROM grupos g
  LEFT JOIN usuarios_grupos ug ON g.id_grupos = ug.id_grupos 
  WHERE g.fk_tipo_grupo = 2 GROUP BY g.id_grupos;`;

  conexion.query(query, (error, resultado) => {
    if (error) console.error(error.message);
    if (resultado.length > 0) res.json(resultado);
    else res.json("No hay grupos aun");
  });
};

exports.obtenerUsuarios = (req, res) => {
  const query = 
  `SELECT primer_nom, segundo_nom, primer_apellido, segundo_apellido, 
  u.numerodoc, fk_id_tipodoc, id_fichas, foto, fk_id_rol FROM usuarios u
  INNER JOIN usuarios_fichas uf ON u.numerodoc = uf.numerodoc;`;

  conexion.query(query, (error, resultado) => {
    if (error) console.error(error.message);
    if (resultado.length > 0) res.json(resultado);
    else res.json("No hay grupos aun");
  });
};