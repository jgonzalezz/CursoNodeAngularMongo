'use strict'

//expres para acceder a las rutas
var express = require('express');
var ArtistController = require('../controllers/artist');

//funciones get put post etc
var api = express.Router();

//Midelware de autenticacion
var md_auth = require('../middlewares/authenticate');

// imagenes
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/artists'});

//rutas
api.get('/artist/:id',md_auth.ensureAuth, ArtistController.getArtist);
api.get('/artists/:page?',md_auth.ensureAuth, ArtistController.getArtists); // ? es puede ir o no // opcional
api.post('/artist',md_auth.ensureAuth, ArtistController.saveArtist);
api.put('/artist/:id',md_auth.ensureAuth, ArtistController.updateArtist);
api.delete('/artist/:id',md_auth.ensureAuth, ArtistController.deleteArtist);

api.post('/upload-image-artist/:id', [md_auth.ensureAuth,md_upload],ArtistController.uploadImage);
api.get('/upload-image-artist/:imageFile', ArtistController.getImageFile);




module.exports = api;