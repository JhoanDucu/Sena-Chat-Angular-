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

  ngAfterViewInit(): void {
    document.getElementById("final")?.scrollIntoView(true);
  }

  ngOnDestroy(): void {
    // console.log('do something');
  }

  obtenerHora = (date: Date) => `${date.toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" })}`;
}
