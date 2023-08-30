import { Component } from '@angular/core';
import { LogearService } from '../Servicios/logear.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private router: Router,
    private loginServicio: LogearService
    ){}
  Tdoc = "";

  Label(){
    let valid = document.getElementById("tipo");
    if (this.Tdoc === '') {
      valid?.setAttribute('style','left: 15%; top: -20px; left: 0; color: #ffffff; font-size: 12px; margin-left: 10%;');
    } else if (this.Tdoc === '0'){
      valid?.setAttribute('style','left: 15%; top: -20px; left: 0; color: #ffffff; font-size: 12px; margin-left: 10%;');
    }
  }
  noLabel(){
    let invalid = document.getElementById("tipo");
    if (this.Tdoc === '0') {
      invalid?.setAttribute('style','top: 0; left: 10%; padding: 10px 0; font-size: 16px; color: #181616;');
    } else if (this.Tdoc === '') {
      invalid?.setAttribute('style','top: 0; left: 10%; padding: 10px 0; font-size: 16px; color: #181616;');
    } else {
      invalid?.setAttribute('style','left: 15%; top: -20px; left: 0; color: #ffffff; font-size: 12px; margin-left: 10%;');
    }
  }
  
  logear(datos: {
    tipodoc: "",
    numerodoc: "",
    contraseña: ""
  }) {
    if (datos.tipodoc === "") {
      console.log("Seleccione el tipo de documento");
      return;
    }

    if (datos.numerodoc === "") {
      console.log("Ingrese el número de documento");
      return;
    }

    alert("Esperando respuesta...");
    this.loginServicio.buscarDatos(datos).subscribe((respuesta: any) => {
      console.log(respuesta);
      if (respuesta !== 'No existe registro') {
        // Hash the entered password using Md5.hashStr()
        const hashedEnteredPassword = (datos.contraseña);

        // Compare the hashed passwords
        if (respuesta.contraseña === hashedEnteredPassword) {
          console.log(respuesta);
          this.router.navigate(['chat']);
        } else {
          console.log('Contraseña incorrecta');
        }
      } else {
        console.log('Usuario no existe');
      }
    });
  }
}
