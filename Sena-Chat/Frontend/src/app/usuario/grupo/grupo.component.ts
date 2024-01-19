import { Component, Input } from '@angular/core';
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
  nomGrupo: any;
  tiempo: any;
  reciente: any;
  idGrupo: any;
  contador: any = undefined;

  ngOnInit() {
    this.nomGrupo = this.grupo.nom_grupos;
    this.tiempo = this.fecha(this.grupo.mensajes.length ? this.grupo.mensajes[this.grupo.mensajes.length - 1].fecha_hora : undefined);
    this.reciente = this.grupo.mensajes.length ? this.grupo.mensajes[this.grupo.mensajes.length - 1].contenido_mensaje : undefined;
    this.idGrupo = this.grupo.id_grupos;
    this.contador = this.grupo.sin_leer;
  }

  nuevaNotificacion = () => {
    this.reciente = this.grupo.mensajes[this.grupo.mensajes.length - 1].contenido_mensaje;
    if (this.Sesion.get('grupos') != this.idGrupo) this.contador = (this.contador | 0) + 1;
  }

  restablecer = () => {
    this.contador = undefined;
    this.Chat.sinNotificaciones({ u: this.Sesion.get('documento'), g: this.idGrupo }).subscribe((data: any) => {
      // VALIDAR AQUI
    });
  }

  fecha = (date: Date) => date ? new Fecha(date).retornar() : undefined;
}
