import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { urlImagenes } from '../../../../servidor';
import { MensajesService } from '../../Servicios/mensajes.service';
import { BootstrapService } from '../../Servicios/bootstrap.service';
import { Fecha } from '../../../Modelos/fechas';
import { ImagenDirective } from '../../Directivas/imagen.directive';

@Component({
  selector: 'app-info-mensajes',
  standalone: true,
  imports: [CommonModule, ImagenDirective],
  templateUrl: './info-mensajes.component.html',
  styleUrl: './info-mensajes.component.css'
})
export class InfoMensajesComponent {
  constructor(private servicio: MensajesService, private b: BootstrapService) { }
  @Input() mensaje: any;
  @Output() mostrar = new EventEmitter();
  url = urlImagenes;

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['mensaje'].firstChange) this.servicio.datosMensaje(this.mensaje.id_mensaje).subscribe((data) => Object.assign(this.mensaje, data));
  }

  conversion = (date: Date) => Fecha.fechaAdmin(new Date(date));

  editarMensaje() {
    this.mostrar.emit(['editarMensaje', this.mensaje.id_mensaje]);
    this.b.infoMensajes();
  }
}
