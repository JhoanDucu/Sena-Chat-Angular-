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
    this.Sesion.remove('grupos');
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

  enviar(mensaje: any, grupo: any) {
    if (mensaje.contenido_mensaje != '') {
      delete mensaje.archivo;
      delete mensaje.primer_nom;
      delete mensaje.primer_apellido;
      delete mensaje.numerodoc;
      mensaje.fecha_hora = ChatDirective.fechaActual();
<<<<<<< Updated upstream
      this.Chat.destino(this.grupoSeleccionado, this.usuario).subscribe((id: any) => {
=======
      this.Chat.destino(grupo, this.usuario).subscribe((id: any) => {
>>>>>>> Stashed changes
        mensaje.fk_destino = id[0].id_usuarios_grupos;
        mensaje.id_tipo = '1';
        this.Chat.agregarMensaje(mensaje).subscribe((data: any) => {
          data == 'Enviado' ? this.changes = ChatDirective.seleccionar(this.changes) : undefined;
        });
      });
    } // else this.Sesion.set('error', 'Ingrese un mensaje 😒');
  }

  enviarVarios(datos: any){
    datos.id_tipo = this.datosUsuario.fk_id_tipodoc;

    this.Chat.agregarMensaje(datos).subscribe(
      (data: any) => console.log(data)      
    )
  }

  applyChanges = (newValue: string[]) => { this.changes = newValue[0]; this.Sesion.set('grupos', newValue[1]); }
}
