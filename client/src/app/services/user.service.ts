//Servicio para conectar con la API rest
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders , HttpResponse} from '@angular/common/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/observable';
import { GLOBAL } from './global';

@Injectable()  //para permitir inyectar(inyeccion de dependencias) la clase en otros componentes
export class UserService{

    public url: string;
    public identity;
    public token;

    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }

    signUp(user_to_login, gethash = null):Observable<any> {

        if(gethash != null){
            user_to_login.gethash = gethash
        }

        let params = JSON.stringify(user_to_login);

        let headers = new HttpHeaders({'Content-Type' : 'application/json'});
        return this._http.post(this.url+'login', params, {headers: headers});

    }

    //metodos para acceder al local strorage y devolver la info procesda para el manejo de sesion
    getIdentity(){

        let identity = JSON.parse(localStorage.getItem('identity'));

        if(identity != "undefined"){
            this.identity = identity;
        }else{
            this.identity = null;
        }
        return this.identity
    }

    getToken(){
        let token = localStorage.getItem('token');
        if(token != "token"){
            this.token = token;
        }else{
            this.token = null;
        }
        return this.token
    }


    register(user_to_register):Observable<any>{
        let params = JSON.stringify(user_to_register);
        let headers = new HttpHeaders({'Content-Type' : 'application/json'});
        return this._http.post(this.url+'register', params, {headers: headers});//peticion ajax al servidor
    }


}





