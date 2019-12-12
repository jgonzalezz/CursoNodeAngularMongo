'use strict';

//Cargamos el modulo(libreria) de mongodb que en este caso es mongoose
var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;//Puerto servidor backend

//conexion a la bd
mongoose.Promise = global.Promise;
mongoose.connect( 'mongodb://127.0.0.1:27017/cursonodeangularmongo' , (err, res) => { //funcion de callback ?
    if(err){
        throw err;
    } else {
        console.log("La base de datos corre correctamente");

        //ponemos el servidor a escuchar
        app.listen(port, function(){
            console.log('Servidor del Api rest de musica escuchando en http://localhost:'+port);
        });
    }
});




