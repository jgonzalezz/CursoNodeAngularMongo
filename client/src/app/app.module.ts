import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; //Módulo que posibilita el uso de formularios y trabajar con el databibnding vista-componente --modifica datos en vista y backend

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [//cargar componetes y directivas
    AppComponent
  ],
  imports: [//cargar modulos del framework y modulos propios
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [], //carga servicios
  bootstrap: [AppComponent]
})
export class AppModule { }
