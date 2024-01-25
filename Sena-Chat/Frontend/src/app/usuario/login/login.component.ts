import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { LogearService } from '../Servicios/logear.service';
import { SesionService } from '../Sesiones/sesion.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private router: Router,
    private loginServicio: LogearService,
    protected Sesion: SesionService,
    ){}
  formLogin = new FormGroup({
    numerodoc: new FormControl('', Validators.required),
    contrasena: new FormControl('', Validators.required),
    tipodoc: new FormControl('', Validators.required)
  });
 
  Label(){
    let valid = document.getElementById("tipo");
    if (this.formLogin.value.tipodoc === '') {
      valid?.setAttribute('style','left: 15%; top: -20px; left: 0; color: #000; font-size: 12px; margin-left: 10%;');
    } else if (this.formLogin.value.tipodoc === '0'){
      valid?.setAttribute('style','left: 15%; top: -20px; left: 0; color: #000; font-size: 12px; margin-left: 10%;');
    }
  }
  noLabel(){
    let invalid = document.getElementById("tipo");
    if (this.formLogin.value.tipodoc === '0') {
      invalid?.setAttribute('style','top: 0; left: 10%; padding: 10px 0; font-size: 16px; color: #000;');
    } else if (this.formLogin.value.tipodoc === '') {
      invalid?.setAttribute('style','top: 0; left: 10%; padding: 10px 0; font-size: 16px; color: #000;');
    } else {
      invalid?.setAttribute('style','left: 15%; top: -20px; left: 0; color: #000; font-size: 12px; margin-left: 10%;');
    }
  }
  logear(datos: {}){
    alert("Esperando respuesta...");
    this.loginServicio.buscarDatos(datos).subscribe((respuesta: any) => {
      if (respuesta != 'No existe registro') {
        this.Sesion.set('ficha', respuesta[0]);
        this.Sesion.set('documento', respuesta[1]);
        this.Sesion.set('rol', respuesta[2]);
        if(respuesta[2] == 3) this.router.navigate(['admin']);
        if(respuesta[2] == 1 || respuesta[2] == 2) this.router.navigate(['chat']);
        // this.loginServicio.mandarCorreo('hello').subscribe((r)=>console.log(r));
       } else {
         alert('Usuario no existe');
       }
     })
  }
}
