import { Component } from '@angular/core';
import { LogearService } from '../Servicios/logear.service';
import { Router } from '@angular/router';
import { Login } from '../modelos/login';

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
  logear(datos: Login){
    alert("Esperando respuesta...");
    this.loginServicio.buscarDatos(datos).subscribe((respuesta: any) => {
      if (respuesta != 'No existe registro') {
        this.router.navigate(['chat', respuesta[0], respuesta[1]]);
      } else {
        alert('Usuario no existe');
      }
    })
  }
}
