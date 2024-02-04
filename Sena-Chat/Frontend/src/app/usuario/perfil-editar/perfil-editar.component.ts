import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Usuario } from '../Modelos/usuarios';

@Component({
  selector: 'app-perfil-editar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil-editar.component.html',
  styleUrl: './perfil-editar.component.css'
})
export class PerfilEditarComponent {
  @Input() usuario: Usuario = {}
}