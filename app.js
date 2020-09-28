'use strcit'
var express = require('express');
var bodyParser = require('body-parser');
const router = require('./routers/archivosRou');

var app=express();

//cargar archivos de rutas
var archivos_routers = require('./routers/archivosRou');

//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Cors

//rutas
app.use('/api', archivos_routers);

//exportar
module.exports=app;
