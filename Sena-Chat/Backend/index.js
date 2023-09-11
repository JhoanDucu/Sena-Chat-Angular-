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
   const id = req.body.numerodoc;
   const query = `SELECT * FROM usuarios WHERE numerodoc = ${numerodoc} AND fk_id_tipodoc = ${tipodoc} AND contrasena = '${md5(password)}'`;
    conexion.query(query, (error, resultado) => {
       if (error) return console.error(error.message) 
       if (resultado.length > 0) {
          res.json(resultado)
       } else {
          res.json('No existe registro')
       }
    })
});

app.post('/registrar', (req, res) => {
   const usuario = {
      correo: req.body.correo,
      primer_nom: req.body.primerNombre,
      segundo_nom: req.body.segundoNombre,
      primer_apellido: req.body.primerApellido,
      segundo_apellido: req.body.segundoApellido,
      contrasena: md5(req.body.contraseña),
      nombre_usuario: req.body.nombreUsuario,
      foto: '',
      fk_id_rol: '2',
      numerodoc: req.body.Numerodoc,
      fk_id_tipodoc: req.body.tipodoc,
      fk_id_ficha: '2558104',
   }
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
// SELECT * FROM grupos WHERE id_ficha = ".$_GET['getf']
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

/* MENSAJES */
/* SELECT primer_nom,primer_apellido, time_format(fecha_hora, "%H:%i"), contenido_mensaje, id_tipo, u.numerodoc FROM usuarios u
INNER JOIN mensaje a ON u.numerodoc = a.numerodoc 
INNER JOIN grupos b ON b.id_grupos = a.fk_id_grupos
WHERE b.id_grupos = '.$_GET["geti"] */

app.get('/chat/grupos/:grupo', (req, res) => {
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

/* INSERT INTO mensaje VALUES (NULL,'$this->fecha $this->hora','$this->mensaje',
'$this->usuario','$this->tipoMensaje',$this->grupoDestino) */

app.post('/mensaje', (req, res) => {
   const mensaje = {
      fecha: req.body.fecha,
      hora: req.body.hora,
      contenido_mensaje: req.body.mensaje,
      numerodoc: req.body.usuario,
      id_tipo: req.body.tipoMensaje,
      fk_id_grupos: req.body.grupoDestino,
   }
   const query = 'INSERT INTO mensaje SET ?'
   conexion.query(query, mensaje, (error, resultado) => {
       if (error) return console.error(error.message)
       res.json('Enviado');
    })
});
