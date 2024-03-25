import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-mensaje',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editar-mensaje.component.html',
  styleUrl: './editar-mensaje.component.css'
})
export class EditarMensajeComponent {
  @Input() id_mensaje: any;
}
