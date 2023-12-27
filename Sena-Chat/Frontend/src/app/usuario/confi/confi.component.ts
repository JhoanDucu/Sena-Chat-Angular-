import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigurarService } from '../Servicios/configurar.service';
import { SesionService } from '../Sesiones/sesion.service';

@Component({
  selector: 'app-confi',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './confi.component.html',
  styleUrl: './confi.component.css'
})
export class ConfiComponent {
  constructor(
    private Sesion: SesionService,
    private Configurar: ConfigurarService,
    private router: Router,
  ) { }

  fichaSeleccionada = this.Sesion.get('ficha');
  usuario = this.Sesion.get('documento');

  confiForm = new FormGroup({
    primer_nom: new FormControl(''),
    segundo_nom: new FormControl(''),
    primer_apellido: new FormControl(''),
    segundo_apellido: new FormControl(''),
    nombre_usuario: new FormControl(''),
    contrasena: new FormControl(''),
    correo: new FormControl(''),
  });

  actualizar() {
    this.Configurar.actualizaDatos(this.confiForm.value, this.usuario).subscribe((data: any) => {
      data == 'Actualizado' ? alert(data) : alert('No ' + data);
      this.router.navigate(['vis-perfil']);
    });
  }
}
