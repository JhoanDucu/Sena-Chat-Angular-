import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisPerfilService } from '../Servicios/vis-perfil.service';
import { Usuario } from '../Modelos/usuarios';
import { SesionService } from '../Sesiones/sesion.service';

@Component({
  selector: 'app-vis-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vis-perfil.component.html',
  styleUrl: './vis-perfil.component.css'
})
export class VisPerfilComponent {
}

