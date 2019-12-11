'use strict'

//expres para acceder a las rutas
var express = require('express');
var AlbumController = require('../controllers/album');

//funciones get put post etc
var api = express.Router();

//Midelware de autenticacion
var md_auth = require('../middlewares/authenticate');

// imagenes
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/album'});

//rutas
api.get('/album/:id',md_auth.ensureAuth, AlbumController.getAlbum);
api.get('/albums/:artist?',md_auth.ensureAuth, AlbumController.getAlbums);

api.post('/album',md_auth.ensureAuth, AlbumController.saveAlbum);
api.put('/album/:id',md_auth.ensureAuth, AlbumController.updateAlbum);


module.exports = api;