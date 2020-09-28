'use strict'

var mongoose= require('mongoose');
var Schema = mongoose.Schema;

var ArchivoSchema = Schema({
    name: String,
    autor: String,
    pag: Number,
    category: String,
    description: String,
    dir: String
});

module.exports=mongoose.model('ArchivoPdf', ArchivoSchema);