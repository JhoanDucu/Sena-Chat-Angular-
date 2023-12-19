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
 *     description: Iniciar sesión con tipo de documento, número de documento y contraseña
 *     tags: [Formulario]
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
 *             numerodoc: "1131104356"
 *             contrasena: "123"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: integer
 *               description: ID de la ficha, número de documento y ID del rol
 *       404:
 *         description: No existe registro
 */
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

/**
 * @swagger
 * /registrar:
 *   post:
 *     summary: Registrar usuario
 *     description: Registrar un nuevo usuario con los datos proporcionados
 *     tags: [Formulario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *               primer_nom:
 *                 type: string
 *               segundo_nom:
 *                 type: string
 *               primer_apellido:
 *                 type: string
 *               segundo_apellido:
 *                 type: string
 *               contrasena:
 *                 type: string
 *               nombre_usuario:
 *                 type: string
 *               numerodoc:
 *                 type: string
 *               fk_id_tipodoc:
 *                 type: integer
 *           example:
 *             correo: "ejemplo@correo.com"
 *             primer_nom: "PrimerNombre"
 *             segundo_nom: "SegundoNombre"
 *             primer_apellido: "PrimerApellido"
 *             segundo_apellido: "SegundoApellido"
 *             contrasena: "123"
 *             nombre_usuario: "NombreUsuario"
 *             numerodoc: "123456789"
 *             fk_id_tipodoc: 1
 *     responses:
 *       200:
 *         description: Usuario registrado correctamente
 *       400:
 *         description: Error al registrar el usuario
 */
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

/**
 * @swagger
 * /bienvenida/{documento}:
 *   put:
 *     summary: Actualizar usuario
 *     description: Actualizar la ficha de un usuario a un valor seleccionado por el usuario
 *     tags: [Bienvenida]
 *     parameters:
 *       - in: path
 *         name: documento
 *         required: true
 *         description: Documento del usuario
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               buscar:
 *                 type: integer
 *           example:
 *             buscar: 2558104 
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                type: integer
 *               description: Ficha y número de documento
 *       400:
 *         description: Error al actualizar el usuario
 */
app.put('/bienvenida/:documento',(req, res)=>{ 
   const numerodoc = req.params.documento; 
   const ficha = req.body.buscar; 
 
   const query = `UPDATE usuarios SET fk_id_ficha = ${ficha} WHERE numerodoc = ${numerodoc}`; 
   conexion.query(query, (error, resultado) => { 
      if (error) return console.error(error.message);
      res.json([ficha, numerodoc]); 
   }) 
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

 /* GRUPOS */
/**
 * @swagger
 * /chat/grupos/{ficha}/{usuario}:
 *   get:
 *     summary: Obtener grupos de un usuario
 *     description: Obtener todos los grupos de un usuario específico que no son de tipo 1
 *     tags: [Grupos]
 *     parameters:
 *       - in: path
 *         name: ficha
 *         required: true
 *         description: Ficha del usuario
 *         schema:
 *           type: integer
 *       - in: path
 *         name: usuario
 *         required: true
 *         description: Documento del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Grupos del usuario obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       404:
 *         description: No hay grupos aun
 */
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

 /**
 * @swagger
 * /chat/miembros/{grupo}:
 *   get:
 *     summary: Obtener miembros de un grupo
 *     description: Obtener todos los miembros que pertenecen a un grupo específico
 *     tags: [Chat]
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

/**
 * @swagger
 * /chat/informacion/{grupo}:
 *   get:
 *     summary: Obtener información de un grupo
 *     description: Obtener el nombre y la descripción de un grupo específico
 *     tags: [Chat]
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

/* PRIVADOS */
/**
 * @swagger
 * /chat/privados/{ficha}/{documento}:
 *   get:
 *     summary: Obtener chats privados de un usuario
 *     description: Obtener todos los chats privados de un usuario específico que no son de tipo 2
 *     tags: [Chat]
 *     parameters:
 *       - in: path
 *         name: ficha
 *         required: true
 *         description: Ficha del usuario
 *         schema:
 *           type: integer
 *       - in: path
 *         name: documento
 *         required: true
 *         description: Documento del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chats privados del usuario obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       404:
 *         description: No hay chats privados aun
 */
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
  
 /* MENSAJES */ 
/**
 * @swagger
 * /chat/mensajes/{grupo}:
 *   get:
 *     summary: Obtener mensajes de un grupo
 *     description: Obtener todos los mensajes de un grupo específico ordenados por id_mensaje
 *     tags: [Mensajes]
 *     parameters:
 *       - in: path
 *         name: grupo
 *         required: true
 *         description: ID del grupo
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Mensajes del grupo obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_mensaje:
 *                     type: integer
 *                   primer_nom:
 *                     type: string
 *                   primer_apellido:
 *                     type: string
 *                   fecha_hora:
 *                     type: string
 *                   contenido_mensaje:
 *                     type: string
 *                   id_tipo:
 *                     type: integer
 *                   numerodoc:
 *                     type: string
 *       404:
 *         description: No hay mensajes en el grupo
 */
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

app.post('/mensaje', (req, res) => { 
   const mensaje = req.body;
   const query = 'INSERT INTO mensaje SET ?' 
   conexion.query(query, mensaje, (error, resultado) => { 
       if (error) return console.error(error.message) 
       res.json('Enviado'); 
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
   const query = `SELECT * FROM usuarios WHERE numerodoc = ?`;
   conexion.query(query, numerodoc, (error, resultado) => {
      if (error) return console.error(error.message);
      res.json(resultado[0]);
   })
}); 

/**
 * @swagger
 * /configurar/{documento}:
 *   put:
 *     summary: Actualizar la configuración de un usuario
 *     description: Actualizar la configuración de un usuario específico
 *     tags: [Configuración]
 *     parameters:
 *       - in: path
 *         name: documento
 *         required: true
 *         description: Documento del usuario
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               primer_nom:
 *                 type: string
 *               segundo_nom:
 *                 type: string
 *               primer_apellido:
 *                 type: string
 *               segundo_apellido:
 *                 type: string
 *               contrasena:
 *                 type: string
 *           example:
 *             primer_nom: "Juan"
 *             segundo_nom: "Carlos"
 *             primer_apellido: "Perez"
 *             segundo_apellido: "Gomez"
 *             contrasena: "123456"
 *     responses:
 *       200:
 *         description: Configuración del usuario actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Actualizado"
 *       400:
 *         description: Error al actualizar la configuración del usuario
 */
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
