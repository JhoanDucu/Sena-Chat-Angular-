const express = require('express');
const router = express.Router();
const adminController = require('../controladores/admin');

router.get("/grupos", adminController.obtenerGrupos);
router.get("/usuarios", adminController.obtenerUsuarios);
router.get("/mensajes", adminController.obtenerMensajes);
router.get("/fichas", adminController.obtenerFichas);
router.get("/programas", adminController.obtenerProgramas);

module.exports = router;