import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionDirective } from '../Directivas/notificacion.directive';
import { ChatService } from '../Servicios/chat.service';
import { SesionService } from '../Sesiones/sesion.service';
import { Fecha } from '../Modelos/fechas';

@Component({
  selector: 'app-grupo',
  standalone: true,
  imports: [CommonModule, NotificacionDirective],
  templateUrl: './grupo.component.html',
  styleUrl: './grupo.component.css'
})
export class GrupoComponent {

  constructor(private Chat: ChatService, private Sesion: SesionService) { }

  @Input() grupo: any = {};
  @Input() active = false;
  @Input() tiempo: any;
  @Input() reciente: any;
  @Output() moverGrupo = new EventEmitter();
  nomGrupo: any;
  idGrupo: any;
  contador: any = undefined;

  ngOnInit() {
    this.nomGrupo = this.grupo.nom_grupos;
    this.idGrupo = this.grupo.id_grupos;
    this.contador = this.grupo.sin_leer;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tiempo']) this.tiempo = this.fecha(changes['tiempo'].currentValue);
    if (changes['reciente'] !== undefined) !changes['reciente'].isFirstChange() ? this.moverGrupo.emit() : undefined;
  }

  nuevaNotificacion = () => this.Sesion.get('grupos') != this.idGrupo ? this.contador = (this.contador | 0) + 1 : document.getElementById;

  restablecer = () => {
    this.contador = undefined;
    this.Chat.sinNotificaciones({ u: this.Sesion.get('documento'), g: this.idGrupo }).subscribe((data: any) => {
      // VALIDAR
    });
  }

  fecha = (date: Date) => date ? new Fecha(date).retornar() : undefined;
}
