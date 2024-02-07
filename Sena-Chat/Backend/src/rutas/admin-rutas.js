const express = require('express');
const router = express.Router();
const adminController = require('../controladores/admin');

router.get('/grupos', adminController.obtenerGrupos);
router.get('/usuarios', adminController.obtenerUsuarios);
router.get('/mensajes', adminController.obtenerFichas);

module.exports = router;

