import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensajeMostrar } from '../../Modelos/mensaje';
import { SesionService } from '../Sesiones/sesion.service';
import { ImagenDirective } from '../Directivas/imagen.directive';
import { url } from '../../../servidor';

@Component({
  selector: 'app-mensajes',
  standalone: true,
  imports: [CommonModule, ImagenDirective],
  templateUrl: './mensajes.component.html',
  styleUrl: './mensajes.component.css'
})
export class MensajesComponent {
  constructor(
    // private Chat: ChatService
    protected Sesion: SesionService
  ) { }
  @ViewChild('componente', { static: false }) mensajesElement!: ElementRef;
  @Input() mensajes: MensajeMostrar[] = [];
  @Input() mensajeFinal: any;
  @Output() detectarMensaje = new EventEmitter();
  grupoSeleccionado = this.Sesion.get('grupos');
  fichaSeleccionada = this.Sesion.get('ficha');
  usuario = this.Sesion.get('documento');
  url = url + '/imagenes/';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['mensajeFinal'] && !changes['mensajeFinal'].firstChange) setTimeout(() => this.hacerScroll(2), 0);
  }

  ngAfterViewInit(): void {
    if (this.mensajes.length !== 0) this.hacerScroll(1);
  }

  ngOnDestroy(): void {
    // console.log('do something, cuando se destruye');
  }

  obtenerHora = (date: Date) => `${date.toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" })}`;

  hacerScroll = (behavior: 1 | 2) => {
    this.mensajesElement.nativeElement.scrollTo({
      top: this.mensajesElement.nativeElement.scrollHeight,
      behavior: behavior == 1 ? 'auto' : 'smooth',
    });
  }
}