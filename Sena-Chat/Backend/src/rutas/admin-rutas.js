const express = require('express');
const router = express.Router();
const adminController = require('../controladores/admin');

router.get("/grupos", adminController.obtenerGrupos);
router.get("/usuarios", adminController.obtenerUsuarios);
router.get("/mensajes", adminController.obtenerMensajes);
router.get("/fichas", adminController.obtenerFichas);
router.get("/programas", adminController.obtenerProgramas);
router.get("/grupo/:id_grupo", adminController.obtenerUnGrupo);
router.get("/usuario/:numerodoc", adminController.obtenerUnUsuario);
router.get("/mensaje/:id_mensaje", adminController.obtenerUnMensaje);
router.get("/ficha/:id_ficha", adminController.obtenerUnaFicha);
router.get("/num-fichas", adminController.obtenerFichasId);
router.post("/agregar-ficha", adminController.insertarFicha);
router.post("/agregar-grupo", adminController.insertarGrupo);
router.post("/agregar-mensaje", adminController.insertarMensaje);
router.post("/agregar-usuario", adminController.insertarUsuario);
router.put("/editar-ficha/:id_ficha", adminController.actualizarFicha);
router.put("/editar-grupo/:id_grupo", adminController.actualizarGrupo);
router.put("/editar-mensaje/:id_mensaje", adminController.insertarMensaje);
router.put("/editar-usuario/:numerodoc", adminController.actualizarUsuario);

module.exports = router;