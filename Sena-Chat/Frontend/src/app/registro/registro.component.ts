import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Component, Injectable } from '@angular/core';
import { RegistrarService } from '../Servicios/registrar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
@Injectable({ providedIn: "root"})
export class RegistroComponent {
  constructor(
    private http: HttpClient,
    private registroServicio: RegistrarService,
    private router: Router
    ){ }
  Tdoc = "";

  Label(){
    let valid = document.getElementById("tipo");
    if (this.Tdoc === '') {
      valid?.setAttribute('style','top: -20px; left: -35px; color: #ffffff; font-size: 12px; margin-left: 10%;');
    } else if (this.Tdoc === '0'){
      valid?.setAttribute('style','top: -20px; left: -35px; color: #ffffff; font-size: 12px; margin-left: 10%;');
    }
  }
  noLabel(){
    let invalid = document.getElementById("tipo");
    if (this.Tdoc === '0') {
      invalid?.setAttribute('style','top:0; left: 0; padding: 10px 0; padding-left: 5%; font-size: 16px; color: #181616;');
    } else if (this.Tdoc === '') {
      invalid?.setAttribute('style','top:0; left: 0; padding: 10px 0; padding-left: 5%; font-size: 16px; color: #181616;');
    } else {
      invalid?.setAttribute('style','top: -20px; left: -35px; color: #ffffff; font-size: 12px; margin-left: 10%;');
    }
  }
  registrar( datos = {
    correo: "",
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    nombreUsuario: "",
    tipodoc: "",
    Numerodoc: "",
    contraseña: "",
    confirmar: ""
  }){
    this.registroServicio.enviarDatos(datos).subscribe( (respuesta:any) => {
      if (respuesta == 'Se inserto correctamente el usuario') {
        alert(respuesta);
        this.router.navigate(['login']);
      } else {
        alert('No se agrego el usuario');
      }
    });
  }
}
