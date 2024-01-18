import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionDirective } from '../Directivas/notificacion.directive';
import { ChatService } from '../Servicios/chat.service';
import { SesionService } from '../Sesiones/sesion.service';

@Component({
  selector: 'app-grupo',
  standalone: true,
  imports: [CommonModule, NotificacionDirective],
  templateUrl: './grupo.component.html',
  styleUrl: './grupo.component.css'
})
export class GrupoComponent {

  constructor(private Chat: ChatService, private Sesion: SesionService) { }

  @Input() nomGrupo = '';
  @Input() active = false;
  @Input() tiempo: any = '';
  @Input() reciente: string | undefined = '';
  @Input() idGrupo = '';
  @Input() contador: any = undefined;

  ngOnInit() {}

  nuevaNotificacion = () => this.contador = (this.contador | 0) + 1;

  restablecer = () => {
    this.contador = undefined;
    this.Chat.sinNotificaciones({u: this.Sesion.get('documento'), g: this.idGrupo}).subscribe((data: any) => {
      // VALIDAR AQUI
    });
  };
}
