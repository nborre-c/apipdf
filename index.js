'use strict'
var mongose = require('mongoose');
var app= require('./app');
var port=3000;

mongose.Promise = global.Promise;
mongose.connect('mongodb://localhost:27017/managerPdf')
    .then(()=>{
        console.log("conexion establecida a db");

        app.listen(port,()=>{
            console.log("Servidor corriendo");
        })
    })
    .catch(err=> console.log(err));