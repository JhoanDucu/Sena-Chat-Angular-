import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { urlImagenes } from '../../../../servidor';
import { Usuario } from '../../../Modelos/usuarios';

@Component({
  selector: 'app-info-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-usuarios.component.html',
  styleUrl: './info-usuarios.component.css'
})
export class InfoUsuariosComponent {
  @Input() usuario: Usuario = {};
  url = urlImagenes;
}
