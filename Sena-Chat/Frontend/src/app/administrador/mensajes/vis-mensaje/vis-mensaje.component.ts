import { Component, EventEmitter, Output } from '@angular/core';
import { MensajesService } from '../../Servicios/mensajes.service';
import { MensajeMostrar } from '../../../Modelos/mensaje';
import { BootstrapService } from '../../Servicios/bootstrap.service';
import { Fecha } from '../../../Modelos/fechas';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vis-mensaje',
  standalone: true,
  imports: [CommonModule],
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

  conversion = (date: any) => Fecha.fechaAdmin(new Date(date));

  abrirInfo = (mensaje: any) => {
    this.b.infoMensajes();
    this.mostrar.emit([,,mensaje]);
  }
}