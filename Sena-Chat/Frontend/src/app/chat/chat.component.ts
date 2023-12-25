import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ChatService } from '../Servicios/chat.service';
import { Mensaje } from '../Modelos/mensaje';
import { Usuario } from '../Modelos/usuarios';
import { MensajesComponent } from '../mensajes/mensajes.component';
import { ChatDirective } from '../Directivas/chat.directive';
import { SesionService } from '../Sesiones/sesion.service';
import { GruposComponent } from '../grupos/grupos.component';
import { InfoGruposComponent } from '../info-grupos/info-grupos.component';
import { MensajesEnviarComponent } from '../mensajes-enviar/mensajes-enviar.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MensajesComponent,
    ChatDirective,
    GruposComponent,
    InfoGruposComponent,
    MensajesEnviarComponent
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  constructor(
    private router: Router,
    private Chat: ChatService,
    private rutaActiva: ActivatedRoute,
    protected Sesion: SesionService
  ) { }
  changes = '0';
  mensaje: Mensaje[] = [];
  datosUsuario: Usuario = new Usuario('', '', '', '', '', '', '', '', '', '', '', '');
  grupoSeleccionado: string | null = '';
  fichaSeleccionada = this.Sesion.get('ficha');
  usuario = this.Sesion.get('documento');


  ngOnInit(): void {
    if (this.fichaSeleccionada == undefined || this.usuario == undefined) {
      this.router.navigate(['login']);
      this.Sesion.set('error', 'No has iniciado sesion');
    } else {
      this.Chat.traerUsuario(this.usuario).subscribe((data: any) => this.datosUsuario = data);
    }
  }
  actualizarParametro() {
    return this.grupoSeleccionado = this.Sesion.get('grupos');
  }

  enviar(mensaje: any) {
    if (mensaje.contenido_mensaje != '') {
      let time = new Date();
      mensaje.fecha_hora = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes() + 1}:${time.getSeconds()}`;
      this.Chat.destino(this.grupoSeleccionado, this.usuario).subscribe((id: any) => {
        mensaje.fk_destino = id[0].id_usuarios_grupos;
        mensaje.id_tipo = '1';
        this.Chat.agregarMensaje(mensaje).subscribe((data: any) => {
          data == 'Enviado' ? this.changes = GruposComponent.seleccionar(this.changes) : undefined;
        });
      });
    } else {
      this.Sesion.set('error', 'Ingrese un mensaje 😒');
    }
  }

  applyChanges = (newValue: string[]) => { this.changes = newValue[0]; this.Sesion.set('grupos', newValue[1]); }
}
