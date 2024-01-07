import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../Servicios/chat.service';
import { MensajeMostrar } from '../Modelos/mensaje';
import { SesionService } from '../Sesiones/sesion.service';

@Component({
  selector: 'app-mensajes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mensajes.component.html',
  styleUrl: './mensajes.component.css'
})
export class MensajesComponent {
  constructor(
    private router: Router,
    private Chat: ChatService,
    private rutaActiva: ActivatedRoute,
    protected Sesion: SesionService
  ) { }
  @Input() mensajes: MensajeMostrar[] = [];
  grupoSeleccionado = this.Sesion.get('grupos');
  fichaSeleccionada = this.Sesion.get('ficha');
  usuario = this.Sesion.get('documento');
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

  ngAfterViewInit(): void {
    document.getElementById("final")?.scrollIntoView(true);
  }

  ngOnDestroy(): void {
    console.log('do something');
  }

  obtenerHora(date: Date) {
    return `${date.toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" })}`;
  }
}
