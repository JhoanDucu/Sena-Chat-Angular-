const express = require("express")
const cors = require('cors')
const mysql = require("mysql")
const bodyParser = require('body-parser')

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
   const query = `SELECT * FROM usuarios WHERE numerodoc = ${id}`;
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
      contrasena: req.body.contraseña,
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
})