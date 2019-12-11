'use strict'


//Modulo para encriptar contraseñas
var bcrypt = require('bcrypt-nodejs');

//Instanciamos entifaf User
var User = require('../models/user');

var jwt = require('../services/jwt');

//importar modulo file system
var fs = require('fs');

//importar molulo path para acceder a rutas
var path = require('path');

//resive request devuelve response// prueba para probar el controlador
function pruebas(req, res) {
    //console.log({req,res});
    res.status(200).send({
        message: 'prueba accion controlador api rest node exitosa!'
    });
}

// guadar usuario
function saveUser(req,res){

    //instaciamos usuario
    var user = new User();

    //recoger los parametros que nos llega en la peticion post en el body
    var params = req.body;//Todas las variables o datos que nos llegan por Post

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_USER';
    user.image = 'null';

    if(params.password){
        //Encriptar contraseña y guardar datos
        bcrypt.hash(params.password, null, null, function (err, hash) {
            user.password = hash;
            if(user.name != null && user.surname != null && user.email != null){
                //guardar el usuario
                user.save((err, userStored) => {   //funcion callback de tipo fetch
                    if(err){
                        res.status(500).send({message :'Error al guardar el usuario'});
                    }else{
                        if(!userStored){
                            res.status(404).send({message :'No se ha registrado el usuario'});
                        }else{
                            res.status(200).send({user : userStored});
                        }
                    }
                });
            }else{
                res.status(200).send({message :'Rellena todos los campos'});
            }
        })
    }else{
        res.status(200).send({message :'Introduce la contraseña'});
    }
}


function loginUser(req, res){

    var params = req.body;//Todas las variables o datos que nos llegan por Post

    var email = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()}, (err, user) => {
        if(err){
            res.status(500).send({message :'Error en la peticion'});
        }else{
            if(!user){
                res.status(404).send({message :'El usuario no exixste'});
            }else{
                //comprobar la contraseña
                bcrypt.compare(password,user.password, function (err, check) {
                    if(check){
                        //devolver los datos del usuario logueadao
                        if(params.gethash){
                            //devolver un token de jwt para tener dentro un token todos los datos del usuario hash(autenticacion con tokens)
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        }else{
                            res.status(200).send({user});
                        }
                    }else{
                        res.status(404).send({message :'El usuario no ha podido loguearse'});
                    }
                })
            }
        }
    });

}

function updateUser(req, res){
    var userId = req.params.id;
    var update = req.body;//Todos los datos que llegan del usuario que vamos a actualizar

    User.findByIdAndUpdate(userId, update,(err, userUpdated) => {
        if(err){
            res.status(500).send({message :'Error al actualizar el usuario'});
        }else{
            if(!userUpdated){
                res.status(404).send({message :'No se ha podido actualizar el usuario'});
            }else{
                res.status(200).send({User : userUpdated});
            }
        }
    });
}


function uploadImage(req, res){
    var userId = req.params.id;
    var file_name = 'No Subido...';

    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
            //Actaulizamos la imagen en la bd
            User.findByIdAndUpdate(userId, {image: file_name}, (err, userUpdated) => { // ?????????????????
                
                if(!userUpdated){
                    res.status(404).send({message :'No se ha podido actualizar el usuario'});
                }else{
                    res.status(200).send({User : userUpdated});
                }
            });

        }else{
            res.status(500).send({message :'Extension de la imagen no es correcta'});
        }

    }else{
        res.status(200).send({message: 'No has subido ninguna imagen...'});
    }
}

function getImageFile(req, res){
    var imageFile = req.params.imageFile;
    var path_file = './uploads/users/'+imageFile;

    //Comprobar si existe el fichero en el servidor
    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
            //nos envia el fichero a la vista
        }else{
            res.status(200).send({message :'No existe la imagen....'});
        }
    });

}


//prueba test con jest
function sum(a, b) {
    return a + b;
}

module.exports = {
    pruebas,
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile,
    sum
};
