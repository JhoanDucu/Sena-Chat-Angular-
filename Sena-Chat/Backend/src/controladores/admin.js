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
    else res.json("No hay usuarios aun");
  });
};

exports.obtenerMensajes = (req, res) => {
  const query = 
  `SELECT m.id_mensaje, m.fecha_hora, m.contenido_mensaje, ug.id_grupos AS destino,
  tm.Nom_tipo AS tipo_mensaje FROM mensaje m INNER JOIN tipo_mensaje tm ON m.id_tipo = tm.id_tipo
  LEFT JOIN usuarios_grupos ug ON m.fk_destino = ug.id_usuarios_grupos LEFT JOIN usuarios u 
  ON m.fk_destino = u.numerodoc OR ug.id_usuarios_grupos IS NULL ORDER BY m.id_mensaje DESC;`;

  conexion.query(query, (error, resultado) => {
    if (error) console.error(error.message);
    if (resultado.length > 0) res.json(resultado);
    else res.json("No hay mensajes aun");
  });
};

exports.obtenerFichas = (req, res) => {
  const query = 
  `SELECT f.*, COUNT(DISTINCT g.id_grupos) AS cantidad_grupos 
  FROM ficha f LEFT JOIN grupos g ON f.id_ficha = g.id_ficha 
  AND g.fk_tipo_grupo = 2 GROUP BY f.id_ficha;`;

  conexion.query(query, (error, resultado) => {
    if (error) console.error(error.message);
    if (resultado.length > 0) res.json(resultado);
    else res.json("No hay fichas aun");
  });
};

exports.obtenerProgramas = (req, res) => {
  const query = 
  ` SELECT * FROM programa_formacion; `;

  conexion.query(query, (error, resultado) => {
    if (error) console.error(error.message);
    if (resultado.length > 0) res.json(resultado);
    else res.json("No hay fichas aun");
  });
};