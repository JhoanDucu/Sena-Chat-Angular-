import { Component, EventEmitter, Output } from '@angular/core';
import { MensajesService } from '../../Servicios/mensajes.service';
import { MensajeMostrar } from '../../../Modelos/mensaje';
import { BootstrapService } from '../../Servicios/bootstrap.service';

@Component({
  selector: 'app-vis-mensaje',
  standalone: true,
  imports: [],
  templateUrl: './vis-mensaje.component.html',
  styleUrl: './vis-mensaje.component.css'
})
export class VisMensajeComponent {
  constructor(private servicio: MensajesService, private b: BootstrapService) { }
  @Output() mostrar = new EventEmitter();
  mensajes: MensajeMostrar[] = [];

  ngOnInit() {
    this.servicio.traerMensajes().subscribe((data: any) => this.mensajes = data);
  }

  abrirInfo = () => this.b.infoMensajes();
}