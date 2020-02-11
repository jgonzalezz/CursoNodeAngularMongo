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
var song_routes = require('./routes/song');


//configurar body parser
//Convierte a json las peticiones que llegan por http para trabajar con ellos en el proyecto
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//configurar cabeceras http / middelware para cada peticion
//https://developer.mozilla.org/es/docs/Web/HTTP/Headers
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});





//carga de rutas base al "midelware" de expres /api se puede cambiar por cualquier nombre
app.use('/api', user_routes);
app.use('/api', artist_routes);
app.use('/api', album_routes);
app.use('/api', song_routes);




//ejemplo ruta para probar con funcion de callback(req, res)
//app.get('/pruebas', function(req,res){
//    res.status(200).send({message:'Hola mundo'})
//});

//Exportamos el modulo => para poder importar app dentro otros ficheros y poder utilizar express
module.exports = app;



