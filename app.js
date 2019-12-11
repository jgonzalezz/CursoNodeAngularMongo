//Logica para crear servidor WEB NODE.js con express

'use strict';

//framewor express
var express = require('express');
var bodyParser = require('body-parser');

//Crear objeto de express
var app = express();

//cargar fichero de las rutas
var user_routes = require('./routes/user');
var artist_routes = require('./routes/artist');
var album_routes = require('./routes/album');




//configurar body parser
//Convierte a json las peticiones que llegan por http para trabajar con ellos en el proyecto
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//configurar cabeceras http


//carga de rutas base "midelware"
app.use('/api', user_routes);
app.use('/api', artist_routes);
app.use('/api', album_routes);



//ejemplo ruta para probar con funcion de callback(req, res)
//app.get('/pruebas', function(req,res){
//    res.status(200).send({message:'Hola mundo'})
//});

//Exportamos el modulo => para poder importar app dentro otros ficheros y poder utilizar express
module.exports = app;



