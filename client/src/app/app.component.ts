import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service'
import { User } from './models/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

  //inyeccion de dependencias
  providers:[UserService]

})
export class AppComponent implements OnInit{
  public title = 'MUSIFY';
  public user: User;
  public user_register: User;
  public identity; //En el localStorage guardamos un identity con la info del usuario logueado //para el manejo de sesiones
  public token; //tambien se guarda en el localStorage para el manejo de sesiones
  public errorMessage;
  public alertRegister;

  //Lo que hace el constructor es darle un valor inical a una propiedad de la clase
  constructor(
    private _userService:UserService
  ){
    this.user = new User('','','','','','ROLE_USER','');//objeto vacio para ir rellenado y luego usarlo
    this.user_register = new User('','','','','','ROLE_USER','');
  }

  //Se ejecuta al cargar el componente
  ngOnInit(){
    //var texto = this._userService.signUp();
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

  }

  //Metodo llamado desde la vista - app.component.html
  public onSubmit(){
    
    //llamdo al metodo del servicio que asu ves llamara al servicio del API rest
    this._userService.signUp(this.user).subscribe(   //subscribe para suscribirnos al observable
      response => {
        console.log(response)
        this.errorMessage = '';
        let identity = response.user;
        this.identity = identity;

        if(!this.identity._id){
          alert("El usuario no esta correctamente identificado");
        }else{
          //crear elemento en el local storage para tener el usuario en sesion
          localStorage.setItem('identity', JSON.stringify(identity));

          //conseguir el token para enviarlo a cada peticio http
          this._userService.signUp(this.user, 'true').subscribe( 
            response => {
              let token = response.token;
              this.token = token;
              if(this.token.length <= 0){
                alert("El token no se ha generado");
              }else{
                //crear elemento en el local storage para el token
                localStorage.setItem('token', token);
                this.user = new User('','','','','','ROLE_USER','');
                console.log(token);
                console.log(identity);
              }
            },
            error => {
              var errorMessage = <any>error;
              if(errorMessage != null){
                this.errorMessage = errorMessage.error.message;
              }
            }
          );

        }
      },
      error => {
        var errorMessage = <any>error;
        if(errorMessage != null){
          this.errorMessage = errorMessage.error.message;
        }
      }
    );
  }

  logout(){
    localStorage.clear();
    this.identity = null;
    this.token = null;
  }


  public onSubmitRegister(){
    this._userService.register(this.user_register).subscribe(
      response =>{
        let user =  response.user;
        this.user_register = user;
        if(!user._id){
          this.alertRegister = "Error al registrarse";
        }else{
          this.alertRegister = "El registro se a realizado correctamente, identificate con:" + this.user_register.email;
          this.user_register = new User('','','','','','ROLE_USER','');
          this.user = new User('','','','','','ROLE_USER','');
        }
      },
      error => {
        var alertRegister = <any>error;
        if(alertRegister != null){
          this.alertRegister = alertRegister.error.message;
        }
      }
    );

  }

}
