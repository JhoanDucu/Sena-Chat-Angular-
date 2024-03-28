import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { urlImagenes } from '../../../../servidor';

@Component({
  selector: 'app-info-mensajes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-mensajes.component.html',
  styleUrl: './info-mensajes.component.css'
})
export class InfoMensajesComponent {
  @Input() mensaje: any;
  url = urlImagenes;
}
