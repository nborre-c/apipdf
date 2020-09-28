'use strict'
const { discriminator } = require('../models/archivo');
var archivoPdf = require('../models/archivo');
var fs = require('fs');

var archivos = {
    test: function(req,res){
        return res.status(200).send({
            message: 'Funcion Test'
        });
    },
    guardarPdf: function(req, res){
        var pdf = new archivoPdf();

        var params = req.body;
        
        pdf.name = params.name;
        console.log(params);
        pdf.autor = params.autor;
        pdf.pag = params.pag;
        pdf.category = params.category;
        pdf.description = params.description;
        pdf.dir = null;

        pdf.save((err,pdfStored)=>{
            if(err) return res.status(500).send({message:'Error al guardar el archivo pdf. '});

            if(!pdfStored) return res.status(404).send({message:'No se ha podido guerdar. '});
        });


        return res.status(200).send({
            archivo: pdf,
            message: 'Metodo Guardar Pdf'
        });
    },
    getPdf: function(req,res){
        var pdfId = req.params.id;
       
        if(pdfId == null) return res.status(404).send({message:'El archivo PDF no existe. null'});
        
        archivoPdf.findById( pdfId,  (err, pdf)=>{
            
            if(err) return res.status(500).send({message: 'Error al devolver los datos.'});
            
            if(!pdf) return res.status(404).send({message: 'El archivo PDF no existe.'});

            return res.status(200).send({
                pdf
            });
        
        });

    },
    getAllPdf: function(req, res){
        archivoPdf.find({}).exec((err, pdfs) =>{
            if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

            if(!pdfs) return res.status(404).send({message: 'No hay pdfs que regresar.' });

            res.status(200).send({
                pdfs  
            });

        });
    },
    updatePdf: function(req, res){
        var pdfId = req.params.id;
        var update = req.body;

        archivoPdf.findByIdAndUpdate(pdfId, update, (err, pdfUpdate)=>{
            if(err) return res.status(500).send({message: 'Error al actualizar los datos.'});

            if(!pdfUpdate) return res.status(404).send({message: 'No existe el pdf para actualizar.' });
            
            return res.status(200).send({
                project: pdfUpdate
            });
        });
    },
    deletePdf: function(req, res){
        var pdfId = req.params.id;

        archivoPdf.findOneAndR(pdfId, (err, pdfDelete)=>{
            if(err) return res.status(500).send({message: 'Error al borrar el pdf.'});

            if(!pdfDelete) return res.status(404).send({message: 'No existe el pdf.' });

            res.status(200).send({
                project: pdfDelete
            });
            
        });
    },
    uploadPdf: function(req, res){
        var pdfId = req.params.id;
        var fileName = 'Pdf no cargado';
        
        if(req.files){
            var filePath = req.files.dir.path;
            var fileSplit = filePath.split('/');
            var fileName = fileSplit[1];
            var extSplit =  fileName.split('\.');
            var fileExt = extSplit[1];

            if(fileExt == 'pdf'){
                archivoPdf.findByIdAndUpdate(pdfId, {dir: fileName}, {new: true}, (err, pdfUpdate)=>{
                    if(err) return res.status(500).send({message: 'El pdf no se ha subido.'});
    
                    if(!pdfUpdate) return res.status(404).send({message: 'El pdf no se pudo asignar en la base.' });
    
                    return res.status(200).send({
                        project: pdfUpdate
                    });
                });
            }else{
                fs.unlink(filePath, (err)=>{
                    console.log(filePath);
                    return res.status(200).send({ message: 'La extencion no es valida'});
                });
            }
        }
        else{
            return res.status.send({
                message: fileName
            })
        }
    },
    deleteArchPdf: function(req,res){
        var dirPdf = req.params.dir;
        if(dirPdf==null) return res.status(404).send({message: 'El archivo pdf no existe.'});

        var ruta="archivos/"+dirPdf;
        
        fs.unlink(ruta, (err)=>{
            if(err) return res.status(500).send({message: 'Error al borrar el archivo'});
            
            return res.status(200).send({ message: 'Archivo eliminado'});
        });

    }
    

};

module.exports = archivos;