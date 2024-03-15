import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mensajes-imagen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mensajes-imagen.component.html',
  styleUrl: './mensajes-imagen.component.css'
})
export class MensajesImagenComponent {
  @Input() imagenes: any;
  @Output() cerrarImagenes = new EventEmitter();

  emitirCerrar = () => this.cerrarImagenes.emit();
}
