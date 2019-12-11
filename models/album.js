'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlbumSchema = Schema({
    title:String,
    description: String,
    year: Number,
    image: String,
    artist: { type: Schema.ObjectId, ref:'Artist'} //Guarda un id  de la referencia del objeto artist en la bd de esta forma relaciona ambos documentos
});

module.exports = mongoose.model('Album', AlbumSchema);
