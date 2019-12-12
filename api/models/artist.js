'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;//Define un modelo o escquema de base de datos, permite crear un objeto de tipo Schema para guaradar datos(documentos)


//Schema o modelo para el Artista que representa la colleccion en mongo
var ArtistSchema = Schema({
    name:String,
    description: String,
    image: String
});

//Exporta el objeto user con los datos del Schema(UserSchema)
module.exports = mongoose.model('Artist', ArtistSchema);//Artist nombre de la entidad
