'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;//Define un modelo o escquema de base de datos, permite crear un objeto de tipo Schema para guaradar datos(documentos)


//Schema o modelo para el usuario que representa la colleccion en mongo
var UserSchema = Schema({
    name:String,
    surname:String,
    email:String,
    password:String,
    role: String,
    image: String
});

//Exporta el objeto user con los datos del Schema(UserSchema)
module.exports = mongoose.model('User', UserSchema);//User nombre de la entidad
