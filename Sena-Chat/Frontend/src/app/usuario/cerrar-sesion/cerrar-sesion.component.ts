import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SesionService } from '../Sesiones/sesion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cerrar-sesion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cerrar-sesion.component.html',
  styleUrl: './cerrar-sesion.component.css'
})
export class CerrarSesionComponent {
  constructor(public Sesion: SesionService, private router: Router) { }

  cerrarSesion = () => {
    this.Sesion.clear();
    this.router.navigate(['login']);
  };
}
