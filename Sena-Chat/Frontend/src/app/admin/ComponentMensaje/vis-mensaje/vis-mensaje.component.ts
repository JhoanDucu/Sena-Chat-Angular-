import { Component } from '@angular/core';
import { CrearMensajeComponent } from '../crear-mensaje/crear-mensaje.component';
import { MensajeService } from '../../service/mensaje.service';


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

  constructor(private visMensaje:MensajeService) { }

  mostrar = false;
  mensajes:any = [];

  mostrarCrear = () => this.mostrar = !this.mostrar;

  ngOnInit() {
    this.visMensaje.traerMensajes().subscribe((datos:any) => {
      this.mensajes = datos;
    });
  }

}
