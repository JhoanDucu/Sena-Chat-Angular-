import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RegistrarService } from '../Servicios/registrar.service';
import { SesionService } from '../Sesiones/sesion.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  constructor(
    private registroServicio: RegistrarService,
    private router: Router,
    protected Sesion: SesionService
  ) { }
  Tdoc: FormControl = new FormControl('');
  sN: FormControl = new FormControl('');
  sA: FormControl = new FormControl('');
  formRegistro = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.email]),
    primer_nom: new FormControl('', Validators.required),
    segundo_nom: this.sN,
    primer_apellido: new FormControl('', Validators.required),
    segundo_apellido: this.sA,
    contrasena: new FormControl('', Validators.required),
    nombre_usuario: new FormControl('', Validators.required),
    numerodoc: new FormControl('', Validators.required),
    fk_id_tipodoc: this.Tdoc,
    confirmar: new FormControl('', Validators.required)
  });

  Label() {
    let valid = document.getElementById("tipo");
    if (this.Tdoc.value === '') {
      valid?.setAttribute('style', 'top: -20px; color: #000000; font-size: 12px;');
    } else if (this.Tdoc.value === '0') {
      valid?.setAttribute('style', 'top: -20px; color: #000000; font-size: 12px; ');
    }
  }
  noLabel() {
    let invalid = document.getElementById("tipo");
    if (this.Tdoc.value === '0') {
      invalid?.setAttribute('style', 'top:0; left: 0; padding: 10px 0; padding-left: 5%; font-size: 16px; color: #181616;');
    } else if (this.Tdoc.value === '') {
      invalid?.setAttribute('style', 'top:0; left: 0; padding: 10px 0; padding-left: 5%; font-size: 16px; color: #181616;');
    } else {
      invalid?.setAttribute('style', 'top: -20px; color: #000000; font-size: 12px;');
    }
  }
  validsN() {
    let sN = document.getElementById("sN");
    if (this.sN.value == "") {
      sN?.removeAttribute('readonly');
    }
  }

  validsA() {
    let sA = document.getElementById("sA");
    if (this.sA.value == "") {
      sA?.removeAttribute('readonly');
    }
  }

  invalidsN() {
    let sN = document.getElementById("sN");
    if (this.sN.value == "") {
      sN?.setAttribute('readonly', '');
    }
  }

  invalidsA() {
    let sA = document.getElementById("sA");
    if (this.sA.value == "") {
      sA?.setAttribute('readonly', '');
    }
  }

  registrar() {
    this.formRegistro.value.contrasena === this.formRegistro.value.confirmar ? this.registroServicio.enviarDatos(this.formRegistro.value).subscribe((respuesta: any) => {
      if (respuesta[0] == 'Se inserto correctamente el usuario') {
        alert(respuesta[0]);
        this.Sesion.set('documento', respuesta[1]);
        this.Sesion.set('ficha', '0000000');
        this.router.navigate(['chat']);
      } else {
        alert('No se agrego el usuario');
      }
    }) : alert('Las contraseñas no son iguales');
  }
}
