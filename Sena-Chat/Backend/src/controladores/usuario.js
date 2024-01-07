const conexion = require("./conexion");
const md5 = require("md5");
const nodeMailer = require("nodemailer");

exports.inicioSesion = (req, res) => {
  const { tipodoc, numerodoc, contrasena } = req.body;
  const query = `SELECT * FROM usuarios u INNER JOIN usuarios_fichas uf 
                    ON u.numerodoc = uf.numerodoc
                    WHERE uf.numerodoc = ${numerodoc} AND
                    fk_id_tipodoc = ${tipodoc} AND contrasena = '${md5(contrasena)}'`;

  conexion.query(query, (error, resultado) => {
    if (error) return console.error(error.message);
    if (resultado.length > 0) {
      res.json([
        resultado[0].id_fichas,
        resultado[0].numerodoc,
        resultado[0].fk_id_rol,
      ]);
    } else {
      res.json("No existe registro");
    }
  });
};

exports.enviarEmail = (req, res) => {
    let config = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "senachat82@gmail.com",
        pass: "ecxa lfnp ohid xzfn",
      },
    });
  
    const opciones = {
      from: "SENA CHAT",
      subject: "Bienvenido a Sena Chat",
      to: "johanandreyd@gmail.com",
      text: "Emmmmm pues si, funciona",
    };
  
    config.sendMail(opciones, (error, result) => {
      if (error) return res.json({ ok: false, msg: error });
      return res.json({
        ok: true,
        msg: result,
      });
    });
  }

  exports.registrarUsuario = (req, res) => {
    const usuario = req.body;
    usuario.fk_id_ficha = "2558104";
    usuario.foto = "NULL";
    usuario.fk_id_rol = "2";
    delete usuario?.confirmar;
    usuario.contrasena = md5(usuario.contrasena);
  
    const query = "INSERT INTO usuarios SET ?";
    conexion.query(query, usuario, (error, resultado) => {
      if (error) return console.error(error.message);
      res.json(["Se inserto correctamente el usuario", usuario.numerodoc]);
    });
  }

  exports.bienvenidaUsuario = (req, res) => {
    const numerodoc = req.params.documento;
    const ficha = req.body.buscar;
  
    const query = `UPDATE usuarios SET fk_id_ficha = ${ficha} WHERE numerodoc = ${numerodoc}`;
    conexion.query(query, (error, resultado) => {
      if (error) return console.error(error.message);
      console.log();
      res.json([ficha, numerodoc]);
    });
  }

  exports.obtenerDatosUsuario = (req, res) => {
    const numerodoc = req.params.numerodoc;
    const query = `SELECT * FROM usuarios WHERE numerodoc = ?`;
    conexion.query(query, numerodoc, (error, resultado) => {
      if (error) return console.error(error.message);
      res.json(resultado[0]);
    });
  }

  exports.configurarUsuario = (req, res) => {
    const numerodoc = req.params.documento;
    const nuevosDatos = req.body;
    nuevosDatos.contrasena = md5(nuevosDatos.contrasena);
  
    const query = `UPDATE usuarios SET ? WHERE numerodoc = ${numerodoc}`;
    conexion.query(query, nuevosDatos, (error, resultado) => {
      if (error) return console.error(error.message);
      res.json("Actualizado");
    });
  }