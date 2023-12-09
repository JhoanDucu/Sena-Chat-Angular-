const express = require("express") 
 const cors = require('cors') 
 const mysql = require("mysql2") 
 const bodyParser = require('body-parser') 
 const md5 = require('md5'); 
 const path = require('path');

// Swagger (Documentación de la API)

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerDefinition = {
   openapi: '3.0.0',
   info: {
     title: 'Express API para Sena Chat',
     version: '1.0.0',
     description: 'Esta es una API REST para Sena Chat',
   },
   servers: [
     {
       url: 'http://localhost:3000',
       description: 'Servidor local',
     },
   ],
 };
 
 const options = {
   swaggerDefinition,
   apis: [path.join(__dirname, './index.js')],
 };
 
 const swaggerSpec = swaggerJsDoc(options);


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
       password: '',
       port: 3306,
    } 
 );

  //middleware
   app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  
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

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Iniciar sesión con un documento y contraseña
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipodoc:
 *                 type: integer
 *               numerodoc:
 *                 type: string
 *               contrasena:
 *                 type: string
 *           example:
 *             tipodoc: 1
 *             numerodoc: "1234567891"
 *             contrasena: "123"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                type: integer
 *               description: ID de la ficha y número de documento
 *       404:
 *         description: No existe registro
 */
 app.post('/login', (req, res)=>{ 
    const {tipodoc, numerodoc, contrasena} = req.body;
    const query = `SELECT * FROM usuarios WHERE numerodoc = ${numerodoc} AND fk_id_tipodoc = ${tipodoc} AND contrasena = '${md5(contrasena)}'`; 
    conexion.query(query, (error, resultado) => { 
        if (error) return console.error(error.message)  
        if (resultado.length > 0) {
           res.json([resultado[0].fk_id_ficha, resultado[0].numerodoc]);
        } else { 
           res.json('No existe registro') 
        } 
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
 /**
 * @swagger
 * /chat/grupos/{ficha}:
 *   get:
 *     summary: Obtener grupos por ficha
 *     description: Obtener todos los grupos que corresponden a una ficha específica
 *     tags: [Grupos]
 *     parameters:
 *       - in: path
 *         name: ficha
 *         required: true
 *         description: Ficha de los grupos
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de grupos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_ficha:
 *                     type: integer
 *                   fk_tipo_grupo:
 *                     type: integer
 *       404:
 *         description: No hay grupos aun
 */ 
 app.get('/chat/grupos/:ficha', (req, res) => { 
    const ficha = req.params.ficha; 
    const query = `SELECT * FROM grupos WHERE id_ficha = ${ficha} AND fk_tipo_grupo <> 1`; 
  
    conexion.query(query, (error, result) => { 
       if(error) console.error(error.message); 
  
       if (result.length > 0) { 
          res.json(result); 
       } else { 
          res.json('No hay grupos aun'); 
       } 
    }) 
 });

 /**
 * @swagger
 * /chat/miembros/{grupo}:
 *   get:
 *     summary: Obtener miembros de un grupo
 *     description: Obtener todos los miembros que pertenecen a un grupo específico
 *     tags: [Mienbros]
 *     parameters:
 *       - in: path
 *         name: grupo
 *         required: true
 *         description: ID del grupo
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de miembros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   primer_nom:
 *                     type: string
 *                   segundo_nom:
 *                     type: string
 *                   primer_apellido:
 *                     type: string
 *                   segundo_apellido:
 *                     type: string
 *       404:
 *         description: No hay grupos aun
 */
app.get('/chat/miembros/:grupo', (req, res) => { 
   const grupo = req.params.grupo; 
   const query = `SELECT primer_nom, segundo_nom, primer_apellido, segundo_apellido FROM usuarios_grupos ug INNER JOIN usuarios u ON u.numerodoc = ug.numerodoc WHERE ug.id_grupos = ${grupo}`; 
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
 /**
 * @swagger
 * /chat/informacion/{grupo}:
 *   get:
 *     summary: Obtener información de un grupo
 *     description: Obtener el nombre y la descripción de un grupo específico
 *     tags: [Informacion]
 *     parameters:
 *       - in: path
 *         name: grupo
 *         required: true
 *         description: ID del grupo
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Información del grupo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nom_grupos:
 *                     type: string
 *                   descripcion_grupos:
 *                     type: string
 *       404:
 *         description: No hay grupos aun
 */
 app.get('/chat/mensajes/:grupo', (req, res) => { 
    const grupo = req.params.grupo; 
    const query = `SELECT id_mensaje, primer_nom, primer_apellido, fecha, hora, contenido_mensaje, id_tipo, u.numerodoc FROM usuarios_grupos ug
    INNER JOIN grupos g ON ug.id_grupos = g.id_grupos 
    INNER JOIN usuarios u ON u.numerodoc = ug.numerodoc
    INNER JOIN mensaje m ON m.fk_destino = ug.id_usuarios_grupos
    WHERE ug.id_grupos = ${grupo} ORDER BY ug.id_usuarios_grupos`; 
  
    conexion.query(query, (error, resultado) => { 
       if(error) console.error(error.message); 
  
       if (resultado.length > 0) { 
          res.json(resultado); 
       } else { 
          res.json(false); 
       } 
    }) 
 }); 

app.post('/mensaje', (req, res) => { 
   const mensaje = { 
      fecha: req.body.fecha, 
      hora: req.body.hora,
      contenido_mensaje: req.body.mensaje,
      id_tipo: req.body.tipoMensaje, 
      fk_id_grupos: req.body.grupoDestino
   }; 
   const query = 'INSERT INTO mensaje SET ?'; 
   conexion.query(query, mensaje, (error, resultado) => { 
      if (error) return console.error(error.message); 
      res.json('Enviado'); 
   }); 
});

 /*   USUARIO   */
/**
 * @swagger
 * /usuario/{numerodoc}:
 *   get:
 *     summary: Obtener usuario por documento
 *     description: Obtener información de un usuario específico basado en su documento
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: numerodoc
 *         required: true
 *         description: Documento del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Información del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 correo:
 *           type: string
 *           description: Correo del usuario
 *         nombre:
 *           type: string
 *           description: Nombre del usuario
 *         apellido1:
 *           type: string
 *           description: Primer apellido del usuario
 *         apellido2:
 *           type: string
 *           description: Segundo apellido del usuario
 *         nombre_usuario:
 *           type: string
 *           description: Nombre de usuario
 *         tipodoc:
 *           type: integer
 *           description: Tipo de documento
 *         numerodoc:
 *           type: integer
 *           description: Número de documento
 *         estado:
 *           type: integer
 *           description: Estado del usuario
 *         codigo:
 *           type: string
 *           description: Código del usuario
 *       404:
 *         description: Usuario no encontrado
 */
app.get('/usuario/:numerodoc', (req, res) =>{
   const numerodoc = req.params.numerodoc;
   const query = `SELECT * FROM usuarios WHERE numerodoc = ${numerodoc}`;
conexion.query(query, (error, resultado) => {
   if (error) return console.error(error.message) 
   res.json(resultado);
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
app.get('/chat/privados/:ficha', (req, res) => { 
   const ficha = req.params.ficha; 
   const query = `SELECT * FROM grupos WHERE id_ficha = ${ficha} AND fk_tipo_grupo <> 2`; 
 
   conexion.query(query, (error, result) => { 
      if(error) console.error(error.message); 
 
      if (result.length > 0) { 
         res.json(result); 
      } else { 
         res.json('No hay grupos aun'); 
      } 
   }) 
});
