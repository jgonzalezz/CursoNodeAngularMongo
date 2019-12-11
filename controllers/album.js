'use strict'

//rutas y archivos
var path = require('path');
var fs = require('fs');

//importamos los modelos
var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

//consulta paginacion
var mongoosePaginate = require('mongoose-pagination');

function getAlbum(req, res){
    var albumId = req.params.id;

    Album.findById(albumId).populate({path:'artist'}).exec((err, album) => {   //populate Especifica rutas que deben rellenarse con otros documentos. // relaciona los modelos con el id
    
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!album){
                res.status(404).send({message: 'Error el album no existe'});
            }else{
                res.status(200).send({album});
            }
        }
    });
}

function getAlbums(req, res){

    var artistId = req.params.artist;

    if(!artistId){
        //sacar todos los albums en la bd
        var find = Album.find({}).sort('title');
    }else{
        //sacar los albums de un artista concreto
        var find = Album.find({artist: artistId}).sort('year');
    }


    find.populate({path:'artist'}).exec((err, albums) =>{
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!albums){
                res.status(404).send({message: 'No hay albums'});
            }else{
                res.status(200).send({albums});
            }
        }
    });


}



function saveAlbum(req, res){
    var album = new Album();

    var params = req.body;
    album.title = params.title;
    album.description = params.description;
    album.year = params.year;
    album.image = 'null';
    album.artist = params.artist;

    album.save((err, albumStored) => {
        if(err){
            res.status(500).send({message: 'Error al guardar el album '});
        }else{
            if(!albumStored){
                res.status(404).send({message: 'Error album no ha sido guardado '});
            }else{
                res.status(200).send({album: albumStored});
            }
        }
    });
}

function updateAlbum(req,res){
    var albumId = req.params.id;
    var update = req.body;
    
    Album.findByIdAndUpdate(albumId, update, (err, albumUpdate) => {
        if(err){
            res.status(500).send({message: 'Error al guardar el album '});
        }else{
            if(!albumUpdate){
                res.status(404).send({message: 'Error artista no ha sido actualizado '});
            }else{
                res.status(200).send({artist: albumUpdate});
            }
        }
    });
}

function deleteAlbum(req,res){
    var albumId = req.params.id;
    
    Album.findByIdAndRemove(albumId, (err, albumRemove) => {
        if(err){
            res.status(500).send({message: 'Error al eliminar el album '});
        }else{
            if(!albumRemove){
                res.status(404).send({message: 'Error album no ha sido eliminado '});
            }else{
                Song.find(album, (err, albumRemove) => {
                    if(err){
                        res.status(500).send({message: 'Error al eliminar el album '});
                    }else{
                        if(!albumRemove){
                            res.status(404).send({message: 'Error album no ha sido eliminado '});
                        }else{
                            res.status(200).send({album: albumRemove});
                        }
                    }
                });
            }
        }
    });
}




module.exports = {
    getAlbum,
    getAlbums,
    saveAlbum,
    updateAlbum
    
};

