import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    // private router: Router,
    // private Chat: ChatService,
    // private rutaActiva: ActivatedRoute,
    protected Sesion: SesionService
  ) { }
  @ViewChild('final', { static: false }) finalElement!: ElementRef;
  @Input() mensajes: MensajeMostrar[] = [];
  @Input() mensajeFinal: any;
  @Output() detectarMensaje = new EventEmitter();
  grupoSeleccionado = this.Sesion.get('grupos');
  fichaSeleccionada = this.Sesion.get('ficha');
  usuario = this.Sesion.get('documento');
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['mensajeFinal'] && !changes['mensajeFinal'].firstChange) this.hacerScroll();
  }

  ngAfterViewInit(): void {
    if (this.mensajes.length !== 0) {
      this.finalElement.nativeElement.scrollIntoView({ behavior: 'auto', block: 'end' });
    }
  }

  ngOnDestroy(): void {
    // console.log('do something, cuando se destruye');
  }

  obtenerHora = (date: Date) => `${date.toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" })}`;

  hacerScroll = () => this.finalElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
}