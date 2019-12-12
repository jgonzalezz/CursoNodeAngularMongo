'use strict'

//expres para acceder a las rutas
var express = require('express');
var SongController = require('../controllers/song');

//funciones get put post etc
var api = express.Router();

//Midelware de autenticacion
var md_auth = require('../middlewares/authenticate');

// imagenes
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/songs'});


//rutas/paths
api.get('/song/:id',md_auth.ensureAuth, SongController.getSong);
api.get('/songs/:album?',md_auth.ensureAuth, SongController.getSongs);
api.post('/song',md_auth.ensureAuth, SongController.saveSong);
api.put('/song/:id',md_auth.ensureAuth, SongController.updateSong);
api.delete('/song/:id', md_auth.ensureAuth, SongController.deleteSong);

api.post('/upload-song-file/:id', [md_auth.ensureAuth,md_upload],SongController.uploadFile);
api.get('/get-song-file/:songFile', SongController.getSongFile);



module.exports = api;