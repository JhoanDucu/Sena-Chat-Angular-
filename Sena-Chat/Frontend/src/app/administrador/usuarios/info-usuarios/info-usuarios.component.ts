import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { urlImagenes } from '../../../../servidor';

@Component({
  selector: 'app-info-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-usuarios.component.html',
  styleUrl: './info-usuarios.component.css'
})
export class InfoUsuariosComponent {
  @Input() usuario: any;
  url = urlImagenes;
}
