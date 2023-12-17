const express = require("express") 
 const cors = require('cors') 
 const mysql = require("mysql2") 
 const bodyParser = require('body-parser') 
 const md5 = require('md5');
 const nodeMailer = require('nodemailer');
  
 const app = express(); 
  
 app.use(function(req, res, next){ 
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', '*'); 
    next() 
 }); 
 app.use(cors()); 
 app.use(bodyParser.json());
  
 const puerto = 3000 
  
 const conexion = mysql.createConnection ({ 
       host: 'localhost', 
       database: 'sena_chat', 
       user: 'root', 
       password: 'root',
       port: 3306,
    } 
 ); 
  
 app.listen(puerto, () => { 
    console.log('Usando el puerto: '+puerto); 
 }); 
  
 conexion.connect((error)=>{ 
    if (error) throw error 
    console.log('Conectado a base de datos'); 
 }); 
  
 app.get('/', (req, res) => { 
    res.send('API'); 
 }); 
  
 app.post('/login', (req, res)=>{ 
    const {tipodoc, numerodoc, contrasena} = req.body;
    const query = `SELECT * FROM usuarios WHERE numerodoc = ${numerodoc} AND fk_id_tipodoc = ${tipodoc} AND contrasena = '${md5(contrasena)}'`; 
    conexion.query(query, (error, resultado) => { 
        if (error) return console.error(error.message)  
        if (resultado.length > 0) {
           res.json([resultado[0].fk_id_ficha, resultado[0].numerodoc, resultado[0].fk_id_rol]);
        } else { 
           res.json('No existe registro') 
        } 
    });
 }); 

 app.post('/autenticar', (req, res) => {
   let config = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
         user: 'senachat82@gmail.com',
         pass: 'ecxa lfnp ohid xzfn'
      }
   });

   const opciones = {
      from: 'SENA CHAT',
      subject: 'Bienvenido a Sena Chat',
      to: 'johanandreyd@gmail.com',
      text: 'Emmmmm pues si, funciona',
   };

   config.sendMail(opciones, (error, result) => {
      if (error) return res.json({ok: false, msg: error});
      return res.json({
         ok: true,
         msg: result
      });
   });
 });
  
 app.post('/registrar', (req, res) => { 
    const usuario = req.body;
    usuario.fk_id_ficha = '2558104';
    usuario.foto = 'NULL';
    usuario.fk_id_rol = '2'; 
    delete usuario?.confirmar; 
    usuario.contrasena = md5(usuario.contrasena);

    const query = 'INSERT INTO usuarios SET ?' 
    conexion.query(query, usuario, (error, resultado) => { 
        if (error) return console.error(error.message) 
        res.json(['Se inserto correctamente el usuario', usuario.numerodoc]); 
    });
 }); 
 /* BIENVENIDA */ 
 app.put('/bienvenida/:documento',(req, res)=>{ 
    const numerodoc = req.params.documento; 
    const ficha = req.body.buscar; 
  
    const query = `UPDATE usuarios SET fk_id_ficha = ${ficha} WHERE numerodoc = ${numerodoc}`; 
    conexion.query(query, (error, resultado) => { 
       if (error) return console.error(error.message);
       res.json([ficha, numerodoc]); 
    }) 
 }); 
 /* GRUPOS */ 
 app.get('/chat/grupos/:ficha/:usuario', (req, res) => { 
    const numerodoc = req.params.usuario;
    const ficha = req.params.ficha;
    const query = `SELECT * FROM usuarios_grupos ug INNER JOIN grupos g 
    ON ug.id_grupos = g.id_grupos WHERE numerodoc = ${numerodoc} AND fk_tipo_grupo <> 1`; 
  
    conexion.query(query, (error, result) => { 
       if(error) console.error(error.message); 
  
       if (result.length > 0) { 
          res.json(result); 
       } else { 
          res.json('No hay grupos aun'); 
       } 
    }) 
 });
app.get('/chat/miembros/:grupo', (req, res) => { 
    const grupo = req.params.grupo; 
    const query = `SELECT primer_nom, segundo_nom, primer_apellido, segundo_apellido, ug.numerodoc, u.fk_id_rol
    FROM usuarios_grupos ug INNER JOIN usuarios u 
    ON u.numerodoc = ug.numerodoc WHERE ug.id_grupos = ${grupo} ORDER BY u.fk_id_rol`; 
  
    conexion.query(query, (error, result) => { 
       if(error) console.error(error.message); 
  
       if (result.length > 0) { 
          res.json(result); 
       } else { 
          res.json('No hay grupos aun'); 
       } 
    }) 
 }); 
 app.get('/chat/informacion/:grupo', (req, res) => {
    const grupo = req.params.grupo;
    const query = `SELECT nom_grupos, descripcion_grupos FROM grupos WHERE id_grupos = ${grupo}`;
 
    conexion.query(query, (error, result) => {
       if (error) console.error(error.message);
 
       if (result.length > 0) {
          res.json(result);
       } else {
          res.json('No hay grupos aun');
       }
    })
 });
  
 /* MENSAJES */ 
 
 app.get('/chat/mensajes/:grupo', (req, res) => { 
    const grupo = req.params.grupo; 
    const query = `SELECT id_mensaje, primer_nom, primer_apellido, fecha_hora, contenido_mensaje, id_tipo, u.numerodoc FROM usuarios_grupos ug
    INNER JOIN grupos g ON ug.id_grupos = g.id_grupos 
    INNER JOIN usuarios u ON u.numerodoc = ug.numerodoc
    INNER JOIN mensaje m ON m.fk_destino = ug.id_usuarios_grupos
    WHERE ug.id_grupos = ${grupo} ORDER BY id_mensaje`; 
  
    conexion.query(query, (error, resultado) => { 
       if(error) console.error(error.message); 
  
       if (resultado.length > 0) {
         res.json(resultado);
       } else { 
          res.json(false); 
       } 
    }) 
 });
 app.get('/destino/:grupo/:usuario', (req, res) => { 
   const usuario = req.params.usuario;
   const grupo = req.params.grupo;
   const query = `SELECT id_usuarios_grupos FROM usuarios_grupos WHERE id_grupos = '${grupo}' AND numerodoc = '${usuario}'`; 
 
   conexion.query(query, (error, result) => { 
      if(error) console.error(error.message); 
 
      if (result.length > 0) { 
         res.json(result); 
      } else { 
         res.json('Falla en consulta'); 
      } 
   }) 
});
 app.post('/mensaje', (req, res) => { 
    const mensaje = req.body;
    const query = 'INSERT INTO mensaje SET ?' 
    conexion.query(query, mensaje, (error, resultado) => { 
        if (error) return console.error(error.message) 
        res.json('Enviado'); 
     }) 
 });
 
 /*   USUARIO   */

app.get('/usuario/:numerodoc', (req, res) =>{
   const numerodoc = req.params.numerodoc;
   const query = `SELECT * FROM usuarios WHERE numerodoc = ?`;
   conexion.query(query, numerodoc, (error, resultado) => {
      if (error) return console.error(error.message);
      res.json(resultado[0]);
   })
}); 
app.put('/configurar/:documento',(req, res)=>{ 
   const numerodoc = req.params.documento; 
   const nuevosDatos = req.body;
   nuevosDatos.contrasena = md5(nuevosDatos.contrasena);

   const query = `UPDATE usuarios SET ? WHERE numerodoc = ${numerodoc}`; 
   conexion.query(query, nuevosDatos, (error, resultado) => { 
       if (error) return console.error(error.message) 
       res.json('Actualizado'); 
   }) 
});

/* PRIVADOS */

app.get('/chat/privados/:ficha/:documento', (req, res) => { 
   const ficha = req.params.ficha;
   const numerodoc = req.params.documento;  
   const query = `SELECT * FROM grupos g
   INNER JOIN usuarios_grupos ug ON g.id_grupos = ug.id_grupos
   WHERE id_ficha = ${ficha} AND fk_tipo_grupo <> 2 AND numerodoc = ${numerodoc};`; 
 
   conexion.query(query, (error, result) => { 
      if(error) console.error(error.message); 
 
      if (result.length > 0) { 
         res.json(result); 
      } else { 
         res.json('No hay grupos aun'); 
      } 
   }) 
});
