import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ChatService } from '../Servicios/chat.service';
import { MensajeEmitir, MensajeMostrar } from '../Modelos/mensaje';
import { MensajesComponent } from '../mensajes/mensajes.component';
import { ChatDirective } from '../Directivas/chat.directive';
import { SesionService } from '../Sesiones/sesion.service';
import { GruposComponent } from '../grupos/grupos.component';
import { InfoGruposComponent } from '../info-grupos/info-grupos.component';
import { MensajesEnviarComponent } from '../mensajes-enviar/mensajes-enviar.component';
import { ChatComponentData } from '../Modelos/chat';
import { Grupo } from '../Modelos/grupos';
import { SocketService } from '../Servicios/socket.service';
import { Fecha } from '../Modelos/fechas';

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
  datos = new ChatComponentData({ grupos: [], privados: [] }, undefined, { changes: '0', loading: false });
  grupoSeleccionado: string | null = '';
  fichaSeleccionada = this.Sesion.get('ficha');
  usuario = this.Sesion.get('documento');
  mensajesGrupo: Array<MensajeMostrar> = [];

  ngOnInit() {
    this.Sesion.remove('grupos');
    if (this.fichaSeleccionada == undefined || this.usuario == undefined) {
      this.router.navigate(['login']);
      this.Sesion.set('error', 'No has iniciado sesion');
    } else {
      this.Chat.traerUsuario(this.usuario).subscribe((usuario: any) => this.datos.datosUsuario = usuario);
      this.Chat.traerGrupos(this.fichaSeleccionada, this.usuario).subscribe((grupos: any) => this.extraerMensajes(grupos, 'grupos'));
      this.Chat.traerPrivados(this.fichaSeleccionada, this.usuario).subscribe((privados: any) => this.extraerMensajes(privados, 'privados'));
    }
  }

  ngAfterViewInit() {
    this.socket.recibirMensaje().subscribe((data: any) => this.añadirMensaje(data.message, 'meh', data.pn, data.pa));
    this.socket.notificaMensaje().subscribe((data: any) => this.añadirMensaje(data.message, 'meh', data.pn, data.pa, data.room));
  }

  enviar(mensaje: any, grupo: any) {
    let pn = this.datos.datosUsuario!.primer_nom;
    let pa = this.datos.datosUsuario!.primer_apellido;
    this.añadirMensaje({ ...mensaje }, this.usuario, pn, pa);
    this.Chat.destino(grupo, this.usuario).subscribe((id: any) => {
      mensaje.fk_destino = id;
      mensaje.fecha_hora = Fecha.fechaActual();
      this.Chat.agregarMensaje(mensaje).subscribe((insertId: any) => {
        insertId !== undefined && insertId !== null ? mensaje.id_mensaje = insertId : undefined;
        this.Chat.masNotificaciones({u: this.usuario, g: grupo}).subscribe((data: any) => data ?
          this.socket.emitirMensaje({ room: grupo, message: mensaje, pn: pn, pa: pa, u: this.usuario })
        : undefined );
      });
    });
  }

  applyChanges = (newValue: string[]) => {
    this.datos.other.changes = newValue[0];
    this.Sesion.set('grupos', newValue[1]);
    this.grupoSeleccionado = this.Sesion.get('grupos');
    this.mensajesGrupo = this.datos.gruposComponent[newValue[3]][newValue[2]].mensajes;
  }

  extraerMensajes(data: any, location: string) {
    data.forEach((element: Grupo) => {
      this.socket.conectarEnGrupo(element.id_grupos);
      this.Chat.traerMensajes(element.id_grupos).subscribe((resultado: any) => {
        resultado ? resultado.forEach((value: MensajeMostrar) => {
          value.fecha_hora = new Date(value.fecha_hora);
        }) : undefined;
        element.mensajes = resultado ? resultado : [];
        this.datos.gruposComponent[location].push(element);
      });
    });
  }

  añadirMensaje(mensaje: MensajeEmitir, ...values: Array<any>) {
    const [numerodoc, primer_nom, primer_apellido, grupo] = values;
    mensaje.numerodoc = numerodoc;
    mensaje.primer_nom = primer_nom;
    mensaje.primer_apellido = primer_apellido;
    mensaje.fecha_hora = new Date();
    
    if (!grupo) this.mensajesGrupo.push(mensaje);
    else {
      this.datos.gruposComponent.grupos.find((g: Grupo) => g.id_grupos == grupo)?.mensajes.push(mensaje)
      this.datos.gruposComponent.privados.find((p: Grupo) => p.id_grupos == grupo)?.mensajes.push(mensaje)
    }
  }

  sinGrupo(){
    this.grupoSeleccionado = '';
    this.Sesion.remove('grupos');
  }
}