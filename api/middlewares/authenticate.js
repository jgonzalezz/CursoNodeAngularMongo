'use strict'

//Clase que funciona como midelware se ejecuta antes que nada despues de la peticion http


var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_curso';

//permite comprobar si los datos del token son correctos

exports.ensureAuth = function (req, res, next) { //next para salir del midelware

    if(!req.headers.authorization){
        return res.status(403).send({message: 'la peticion no tiene la cabecera de autenticacion'});
    }

    var token = req.headers.authorization.replace(/['"]+/g,''); 

    try {
        var payload = jwt.decode(token, secret);
        if(payload.exp <= moment().unix()){ //Si fecha de expedicion del token es menor o igual a la fecha actual
            return res.status(401).send({message: 'El Token a expirado'})
        }
    }catch (ex) {
        console.log(ex)
        return res.status(404).send({message: 'Token no valido'});
    }

    //añadir al request el objeto user autenticado para no tener que decodificarlo despues
    req.user = payload;

    next();

};
