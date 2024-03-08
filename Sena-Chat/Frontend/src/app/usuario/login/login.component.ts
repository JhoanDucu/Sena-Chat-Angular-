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
    private login: LogearService,
    protected Sesion: SesionService,
  ) { }
  formLogin = new FormGroup({
    tipodoc: new FormControl('', Validators.required),
    numerodoc: new FormControl('', Validators.required),
    contrasena: new FormControl('', Validators.required),
  });
  tdoc: any;
  ndoc: any;
  pass: any;
  cargando = false;

  Label() {
    this.comprobar(1);
    let valid = document.getElementById("tipodoc");
    if (this.formLogin.value.tipodoc === '') {
      valid?.setAttribute('style', 'top: -20px; left: 6%; color: #000; font-size: 12px;');
    } else if (this.formLogin.value.tipodoc === '0') {
      valid?.setAttribute('style', 'top: -20px; left: 6%; color: #000; font-size: 12px;');
    }
  }

  noLabel() {
    let invalid = document.getElementById("tipodoc");
    if (this.formLogin.value.tipodoc === '') {
      invalid?.setAttribute('style', 'top: 0; left: 6.2%; padding: 10px 0; font-size: 16px; color: #000;');
    } else {
      invalid?.setAttribute('style', 'top: -20px; left: 6%; color: #000; font-size: 12px;');
    }
  }

  comprobar(n: 1 | 2 | 3) {
    if (n === 1) if (this.tdoc) this.tdoc = undefined;
    if (n === 2) if (this.ndoc) this.ndoc = undefined;
    if (n === 3) if (this.pass) this.pass = undefined;
  }

  validar() {
    if(this.formLogin.get('tipodoc')?.hasError('required')) this.tdoc = 'Seleccione su tipo de documento';
    if(this.formLogin.get('numerodoc')?.hasError('required')) this.ndoc = 'Digite su numero de documento';
    if(this.formLogin.get('contrasena')?.hasError('required')) this.pass = 'Digite su contraseña';
    !this.tdoc && !this.ndoc && !this.pass ? this.logear() : undefined;
  }

  logear() {
    this.cargando = true;
    this.login.buscarDatos(this.formLogin.value).subscribe((respuesta: any) => {
      if (respuesta != 'No existe registro') {
        this.Sesion.set('ficha', respuesta[0]);
        this.Sesion.set('documento', respuesta[1]);
        this.Sesion.set('rol', respuesta[2]);
        if (respuesta[2] == 3) this.router.navigate(['principal']);
        if (respuesta[2] == 1 || respuesta[2] == 2) {
          this.router.navigate(['chat']);
          this.login.establecerCarga();
        };
        // this.loginServicio.mandarCorreo('hello').subscribe((r)=>console.log(r));
      } else {
        // alert('Usuario no existe');
        this.cargando = false;
      }
    });
  }
}
