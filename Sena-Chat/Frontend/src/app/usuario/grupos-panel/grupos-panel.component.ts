import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SesionService } from '../Sesiones/sesion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grupos-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grupos-panel.component.html',
  styleUrl: './grupos-panel.component.css'
})
export class GruposPanelComponent {
  constructor(public Sesion: SesionService, private router: Router) { }

  cerrarSesion = () => {
    this.Sesion.clear();
    this.router.navigate(['login']);
  };
}
