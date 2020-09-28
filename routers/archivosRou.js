'use strict'

var express =  require('express');
var ArchivosController = require('../controllers/archivosCon');

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './archivos'});

router.get('/',ArchivosController.index);
router.post('/test',ArchivosController.test);
router.post('/guardarPdf',ArchivosController.guardarPdf);
router.get('/pdf/:id?', ArchivosController.getPdf);
router.get('/pdfs', ArchivosController.getAllPdf);
router.put('/actualizarPdf/:id',ArchivosController.updatePdf);
router.delete('/borrarPdfDb/:id',  ArchivosController.deletePdf);
router.post('/subirPdf/:id', multipartMiddleware, ArchivosController.uploadPdf);
router.delete('/borrarPdf/:dir',ArchivosController.deleteArchPdf);


module.exports = router;