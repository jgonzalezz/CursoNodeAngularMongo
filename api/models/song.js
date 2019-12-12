'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SongSchema = Schema({
    number: String,
    name:String,
    duration: String,
    file: String,
    album: { type: Schema.ObjectId, ref:'Album'} //Guarda un id  de la referencia del objeto artist en la bd de esta forma relaciona ambos documentos(con toda la info de ese id)
});

module.exports = mongoose.model('Song', SongSchema);
