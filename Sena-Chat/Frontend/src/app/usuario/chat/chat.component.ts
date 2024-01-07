import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ChatService } from '../Servicios/chat.service';
import { MensajeEnviar, MensajeMostrar } from '../Modelos/mensaje';
import { MensajesComponent } from '../mensajes/mensajes.component';
import { ChatDirective } from '../Directivas/chat.directive';
import { SesionService } from '../Sesiones/sesion.service';
import { GruposComponent } from '../grupos/grupos.component';
import { InfoGruposComponent } from '../info-grupos/info-grupos.component';
import { MensajesEnviarComponent } from '../mensajes-enviar/mensajes-enviar.component';
import { ChatComponentData } from '../Modelos/login';
import { Grupo, GrupoComponentData } from '../Modelos/grupos';
import { SocketService } from '../Servicios/socket.service';

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
    protected Sesion: SesionService,
    private socket: SocketService
  ) { }
  changes = '0';
  datos = new ChatComponentData(
    new GrupoComponentData([], []),
    undefined
  );
  grupoSeleccionado: string | null = '';
  fichaSeleccionada = this.Sesion.get('ficha');
  usuario = this.Sesion.get('documento');
  mensajesGrupo: Array<MensajeMostrar> = []
  loading = false;

  ngOnInit(): void {
    this.Sesion.remove('grupos');
    if (this.fichaSeleccionada == undefined || this.usuario == undefined) {
      this.router.navigate(['login']);
      this.Sesion.set('error', 'No has iniciado sesion');
    } else {
      this.Chat.traerUsuario(this.usuario).subscribe((data: any) => this.datos.datosUsuario = data);
      this.Chat.traerGrupos(this.fichaSeleccionada, this.usuario).subscribe((data: any) => data.forEach((element: Grupo) => {
        this.Chat.traerMensajes(element.id_grupos).subscribe((resultado: any) => {resultado ? resultado.forEach((value: MensajeMostrar) => {
          value.fecha_hora = new Date(value.fecha_hora);
        }) : undefined;
        element.mensajes = resultado;
      });
        this.datos.gruposComponent?.grupos?.push(element);
      }));
      this.Chat.traerPrivados(this.fichaSeleccionada, this.usuario).subscribe((data: any) => data.forEach((element: Grupo) => {
        this.Chat.traerMensajes(element.id_grupos).subscribe((resultado: any) => {resultado ? resultado.forEach((value: MensajeMostrar) => {
          value.fecha_hora = new Date(value.fecha_hora);
        }) : undefined;
        element.mensajes = resultado;
      });
        this.datos.gruposComponent?.privados?.push(element);
      }));
    }
  }

  ngAfterViewInit() {
    console.log(this.datos);
  }

  enviar(mensaje: MensajeEnviar | any, grupo: any) {
    if (mensaje.contenido_mensaje != '') {
      delete mensaje.archivo;
      mensaje.fecha_hora = ChatDirective.fechaActual();
      this.Chat.destino(grupo, this.usuario).subscribe((id: any) => {
        mensaje.fk_destino = id[0].id_usuarios_grupos;
        mensaje.id_tipo = '1';
        this.Chat.agregarMensaje(mensaje).subscribe((data: any) => {
          data == 'Enviado' ? this.changes = ChatDirective.seleccionar(this.changes) : undefined;
        });
      });
    }
  }

  applyChanges = (newValue: string[]) => {
    this.changes = newValue[0];
    this.Sesion.set('grupos', newValue[1]);
    this.grupoSeleccionado = this.Sesion.get('grupos');
    this.datos.gruposComponent.grupos.forEach((value: Grupo, i: any) => {
      if(value.id_grupos == newValue[1] && value.mensajes) this.extraerMensajes(i, 'grupo');
    });
    this.datos.gruposComponent.privados.forEach((value: Grupo, i: any) => {
      if(value.id_grupos == newValue[1] && value.mensajes) this.extraerMensajes(i, 'privado');
    });
    document.getElementById("final")?.scrollIntoView(true);
  }

  extraerMensajes(index: number, type: string){
    type === 'grupo' ? this.mensajesGrupo = this.datos.gruposComponent.grupos[index].mensajes 
    : this.mensajesGrupo = this.datos.gruposComponent.privados[index].mensajes;
  }
}
