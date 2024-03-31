import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../Modelos/usuarios';
import { urlImagenes } from '../../../servidor';

@Component({
  selector: 'app-info-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-perfil.component.html',
  styleUrl: './info-perfil.component.css'
})
export class InfoPerfilComponent {
  @Input() usuario: Usuario = {};
  url = urlImagenes;
}
