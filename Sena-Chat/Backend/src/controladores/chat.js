const conexion = require("./conexion");

exports.obtenerGrupos = (req, res) => {
  const numerodoc = req.params.usuario;
  const ficha = req.params.ficha;
  const query = `SELECT * FROM usuarios_grupos ug INNER JOIN grupos g 
          ON ug.id_grupos = g.id_grupos WHERE numerodoc = ${numerodoc} AND fk_tipo_grupo <> 1`;

  conexion.query(query, (error, result) => {
    if (error) console.error(error.message);

    if (result.length > 0) {
      res.json(result);
    } else {
      res.json("No hay grupos aun");
    }
  });
};

exports.obtenerMiembros = (req, res) => {
  const grupo = req.params.grupo;
  const query = `SELECT primer_nom, segundo_nom, primer_apellido, segundo_apellido, ug.numerodoc, u.fk_id_rol
          FROM usuarios_grupos ug INNER JOIN usuarios u 
          ON u.numerodoc = ug.numerodoc WHERE ug.id_grupos = ${grupo} ORDER BY u.fk_id_rol`;

  conexion.query(query, (error, result) => {
    if (error) console.error(error.message);

    if (result.length > 0) {
      res.json(result);
    } else {
      res.json("No hay grupos aun");
    }
  });
};

exports.obtenerInformacion = (req, res) => {
  const grupo = req.params.grupo;
  const query = `SELECT nom_grupos, descripcion_grupos FROM grupos WHERE id_grupos = ${grupo}`;

  conexion.query(query, (error, result) => {
    if (error) console.error(error.message);

    if (result.length > 0) {
      res.json(result);
    } else {
      res.json("No hay grupos aun");
    }
  });
};

exports.obtenerMensajes = (req, res) => {
  const grupo = req.params.grupo;
  const query = `SELECT id_mensaje, primer_nom, primer_apellido, fecha_hora, contenido_mensaje, id_tipo, u.numerodoc FROM usuarios_grupos ug
          INNER JOIN grupos g ON ug.id_grupos = g.id_grupos 
          INNER JOIN usuarios u ON u.numerodoc = ug.numerodoc
          INNER JOIN mensaje m ON m.fk_destino = ug.id_usuarios_grupos
          WHERE ug.id_grupos = ${grupo} ORDER BY id_mensaje`;

  conexion.query(query, (error, resultado) => {
    if (error) console.error(error.message);

    if (resultado.length > 0) {
      res.json(resultado);
    } else {
      res.json(false);
    }
  });
};

exports.obtenerDestino = (req, res) => {
  const usuario = req.params.usuario;
  const grupo = req.params.grupo;
  const query = `SELECT id_usuarios_grupos FROM usuarios_grupos WHERE id_grupos = '${grupo}' AND numerodoc = '${usuario}'`;

  conexion.query(query, (error, result) => {
    if (error) console.error(error.message);

    if (result.length > 0) {
      res.json(result[0].id_usuarios_grupos);
    } else {
      res.json("Falla en consulta");
    }
  });
};

exports.insertarMensaje = (req, res) => {
  const mensaje = req.body;
  const query = "INSERT INTO mensaje SET ?";
  conexion.query(query, mensaje, (error, resultado) => {
    if (error) return console.error(error.message);
    res.json(resultado.insertId);
  });
};

exports.obtenerPrivados = (req, res) => {
  const ficha = req.params.ficha;
  const numerodoc = req.params.documento;
  const query = `SELECT * FROM grupos g
         INNER JOIN usuarios_grupos ug ON g.id_grupos = ug.id_grupos
         WHERE id_ficha = ${ficha} AND fk_tipo_grupo <> 2 AND numerodoc = ${numerodoc};`;

  conexion.query(query, (error, result) => {
    if (error) console.error(error.message);

    if (result.length > 0) {
      res.json(result);
    } else {
      res.json("No hay grupos aun");
    }
  });
};

exports.actualizarSinLeer = (req, res) => {
  const { u: numerodoc, g: id_grupos} = req.body;
  const query = `UPDATE usuarios_grupos
                  SET sin_leer = COALESCE(sin_leer, 0) + 1
                  WHERE numerodoc <> ? AND id_grupos = ?`;

  conexion.query(query, [numerodoc, id_grupos], (error, result) => {
    if (error) console.error(error.message);
    if (result.affectedRows != 0) {
      res.json(result.affectedRows);
    } else {
      res.json('Caso en que no notifica'); // MANEJAR ERRORES
    }
  });
};

exports.reiniciarSinLeer = (req, res) => {
  const { u: numerodoc, g: id_grupos} = req.body;
  const query = `UPDATE usuarios_grupos SET sin_leer = NULL
                  WHERE numerodoc = ? AND id_grupos = ?`;

  conexion.query(query, [numerodoc, id_grupos], (error, result) => {
    if (error) console.error(error.message);
    if (result.affectedRows != 0) {
      res.json(result.affectedRows);
    } else {
      res.json('Caso en que no notifica'); // MANEJAR ERRORES
    }
  });
};