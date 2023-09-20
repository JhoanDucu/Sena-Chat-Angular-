import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../Servicios/chat.service';
import { Grupo } from '../modelos/grupos';
import { Mensaje } from '../modelos/mensaje';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent {
  constructor(
    private router: Router,
    private Chat: ChatService,
    private rutaActiva: ActivatedRoute
    ){}
  grupos: Grupo[] = [];
  mensaje: Mensaje[] = [];
  grupoSeleccionado = this.rutaActiva.snapshot.params['grupo'];
  fichaSeleccionada = this.rutaActiva.snapshot.params['ficha'];
  usuario = this.rutaActiva.snapshot.params['documento'];
  months = {
    0: 'Enero',
    1: 'Febrero',
    2: 'Marzo',
    3: 'Abril',
    4: 'Mayo',
    5: 'Junio',     /* USAR PARA MOSTRAR FECHAS */
    6: 'Julio',
    7: 'Agosto',
    8: 'Septiembre',
    9: 'Octubre',
    10: 'Noviembre',
    11: 'Diciembre',
  };

  ngOnInit(): void {
    this.Chat.traerGrupos(this.fichaSeleccionada).subscribe((data: any)=> data.forEach((element: any) => {this.grupos.push(element)}));
    this.grupoSeleccionado ? this.Chat.traerMensajes(this.grupoSeleccionado).subscribe((data: any)=> data.forEach((element: any) => {this.mensaje.push(element)})) : undefined;
    document.getElementById("final")?.scrollIntoView(true);
  }
  seleccionar(){
    this.grupoSeleccionado = this.rutaActiva.snapshot.params['grupo'];
  }
}
