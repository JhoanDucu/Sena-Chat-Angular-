import { Component } from '@angular/core';
import { CrearMensajeComponent } from '../crear-mensaje/crear-mensaje.component';
import { MensajesService } from '../../Servicios/mensajes.service';

@Component({
  selector: 'app-vis-mensaje',
  standalone: true,
  imports: [ 
    CrearMensajeComponent,
  ],
  templateUrl: './vis-mensaje.component.html',
  styleUrl: './vis-mensaje.component.css'
})
export class VisMensajeComponent {
  constructor(private servicio: MensajesService){ }
  mensajes = [];
  ngOnInit(){
    this.servicio.traerMensajes().subscribe((data: any) => this.mensajes = data);
  }
}