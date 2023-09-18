const express = require("express") 
 const cors = require('cors') 
 const mysql = require("mysql") 
 const bodyParser = require('body-parser') 
 const md5 = require('md5'); 
  
 const app = express(); 
  
 app.use(function(req, res, next){ 
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', '*'); 
    next() 
 }); 
 app.use(cors()); 
 app.use(bodyParser.json()) 
  
 const puerto = 3000 
  
 const conexion = mysql.createConnection ({ 
       host: 'localhost', 
       database: 'sena_chat', 
       user: 'root', 
       password: '' 
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
           res.json([resultado.fk_id_ficha, resultado.numerodoc]) 
        } else { 
           res.json('No existe registro') 
        } 
    }) 
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
        res.json('Se inserto correctamente el usuario'); 
    }) 
 }); 
 /* BIENVENIDA */ 
 app.put('/bienvenida/:documento',(req, res)=>{ 
    const numerodoc = req.params.documento; 
    const ficha = req.body.buscar; 
  
    const query = `UPDATE usuarios SET fk_id_ficha = ${ficha} WHERE numerodoc = ${numerodoc}`; 
    conexion.query(query, (error, resultado) => { 
       if (error) return console.error(error.message) 
       res.json([ficha, numerodoc]); 
    }) 
 }); 
 /* GRUPOS */ 
 app.get('/chat/grupos/:ficha', (req, res) => { 
    const ficha = req.params.ficha; 
    const query = `SELECT * FROM grupos WHERE id_ficha = ${ficha}`; 
  
    conexion.query(query, (error, result) => { 
       if(error) console.error(error.message); 
  
       if (result.length > 0) { 
          res.json(resultado); 
       } else { 
          res.json('No hay grupos aun'); 
       } 
    }) 
 });
app.get('/chat/miembros/:grupo', (req, res) => { 
    const grupo = req.params.grupo; 
    const query = `SELECT primer_nom, segundo_nom, primer_apellido, segundo_apellido FROM usuarios_grupos ug INNER JOIN usuarios u ON u.numerodoc = ug.numerodoc WHERE ug.id_grupos = ${grupo}`; 
  
    conexion.query(query, (error, result) => { 
       if(error) console.error(error.message); 
  
       if (result.length > 0) { 
          res.json(resultado); 
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
          res.json(resultado);
       } else {
          res.json('No hay grupos aun');
       }
    })
 });
  
 /* MENSAJES */ 
 
 app.get('/chat/mensajes/:grupo', (req, res) => { 
    const grupo = req.params.grupo; 
    const query = `SELECT primer_nom,primer_apellido, time_format(fecha_hora, "%H:%i"), contenido_mensaje, id_tipo, u.numerodoc FROM usuarios u 
    INNER JOIN mensaje a ON u.numerodoc = a.numerodoc  
    INNER JOIN grupos b ON b.id_grupos = a.fk_id_grupos 
    WHERE b.id_grupos = ${grupo}`; 
  
    conexion.query(query, (error, result) => { 
       if(error) console.error(error.message); 
  
       if (resultado.length > 0) { 
          res.json(resultado); 
       } else { 
          res.json(false); 
       } 
    }) 
 }); 
 app.post('/mensaje', (req, res) => { 
    const mensaje = req.body; /*{ 
       fecha: req.body.fecha, 
       hora: req.body.hora, 
       contenido_mensaje: req.body.mensaje, 
       numerodoc: req.body.usuario, 
       id_tipo: req.body.tipoMensaje, 
       fk_id_grupos: req.body.grupoDestino, 
    } */
    const query = 'INSERT INTO mensaje SET ?' 
    conexion.query(query, mensaje, (error, resultado) => { 
        if (error) return console.error(error.message) 
        res.json('Enviado'); 
     }) 
 });
 
 /*   PERFIL   */
 
