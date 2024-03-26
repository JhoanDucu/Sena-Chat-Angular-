import { Component, EventEmitter, Output } from '@angular/core';
import { MensajesService } from '../../Servicios/mensajes.service';
import { MensajeMostrar } from '../../../Modelos/mensaje';

@Component({
  selector: 'app-vis-mensaje',
  standalone: true,
  imports: [],
  templateUrl: './vis-mensaje.component.html',
  styleUrl: './vis-mensaje.component.css'
})
export class VisMensajeComponent {
  constructor(private servicio: MensajesService){ }
  @Output() mostrar = new EventEmitter();
  mensajes: MensajeMostrar[] = [];

  ngOnInit(){
    this.servicio.traerMensajes().subscribe((data: any) => this.mensajes = data);
  }
}