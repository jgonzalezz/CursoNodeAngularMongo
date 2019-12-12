'use strict'
//creacio del token para autenticacion

var jwt = require('jwt-simple');

var moment = require('moment');

var secret = 'clave_secreta_curso';


exports.createToken = function (user) {
    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(), //fecha creacion token formato unix => timestap actual
        exp: moment().add(30,'days').unix()  //fecha de expriracion del token  cada 30 dias
    };

    return jwt.encode(payload,secret); //devolvemos el token codificado o cifrado con el objeto payload de los datos del usuario y la clave secreta

};

//decodificar token



