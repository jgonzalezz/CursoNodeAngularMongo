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

//http://localhost:3977/api/albums/
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

//http://localhost:3977/api/album/5dbc9323f1879131884e8a9b
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
    
    Album.findByIdAndRemove(albumId, (err, albumRemoved) => {
        if(err){
            res.status(500).send({message: 'Error al eliminar el album '});
        }else{
            if(!albumRemoved){
                res.status(404).send({message: 'Error album no ha sido eliminado '});
            }else{
                Song.find({album: albumRemoved._id}).remove((err, songRemoved) => {
                    if(err){
                        res.status(500).send({message: 'Error al eliminar la cancion'});
                    }else{
                        if(!songRemoved){
                            res.status(404).send({message: 'Error la cancion no ha sido eliminada '});
                        }else{
                            res.status(200).send({album: albumRemoved});
                        }
                    }
                });
            }
        }
    });
}

function uploadImage(req, res){
    var albumId = req.params.id;
    var file_name = 'No Subido...';

    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
            //Actaulizamos la imagen en la bd
            Album.findByIdAndUpdate(albumId, {image: file_name}, (err, albumUpdated) => {
                if(!albumUpdated){
                    res.status(404).send({message :'No se ha podido actualizar el album'});
                }else{
                    res.status(200).send({album : albumUpdated});
                }
            });

        }else{
            res.status(500).send({message :'Extension de la imagen no es correcta'});
        }

    }else{
        res.status(200).send({message: 'No has subido ninguna imagen...'});
    }
}

function getImageFile(req, res){
    var imageFile = req.params.imageFile;
    var path_file = './uploads/albums/'+imageFile;

    //Comprobar si existe el fichero en el servidor
    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
            //nos envia el fichero a la vista
        }else{
            res.status(200).send({message :'No existe la imagen....'});
        }
    });
}





module.exports = {
    getAlbum,
    getAlbums,
    saveAlbum,
    updateAlbum,
    deleteAlbum,
    uploadImage,
    getImageFile
    
};

