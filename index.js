'use strict'
var mongose = require('mongoose');
var app= require('./app');
var port=3000;

mongose.Promise = global.Promise;
mongose.connect('mongodb+srv://usuario_prueba:12pmT35t@cluster0.utxgu.mongodb.net/<dbname>?retryWrites=true&w=majority')
    .then(()=>{
        console.log("conexion establecida a db");

        app.listen(port,()=>{
            console.log("Servidor corriendo");
        })
    })
    .catch(err=> console.log(err));