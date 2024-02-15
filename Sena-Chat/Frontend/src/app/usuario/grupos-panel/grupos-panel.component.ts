import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SesionService } from '../Sesiones/sesion.service';
import { Router } from '@angular/router';
import { BootstrapService } from '../Servicios/bootstrap.service';

@Component({
  selector: 'app-grupos-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grupos-panel.component.html',
  styleUrl: './grupos-panel.component.css'
})
export class GruposPanelComponent {
  constructor(public Sesion: SesionService, private b: BootstrapService) { }

  abrirCerrar = () => this.b.cerrarCanva();
}
