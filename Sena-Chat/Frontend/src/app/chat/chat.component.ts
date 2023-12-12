import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ChatService } from '../Servicios/chat.service';
import { Grupo } from '../Modelos/grupos';
import { Mensaje } from '../Modelos/mensaje';
import { Usuario } from '../Modelos/usuarios';
import { MensajesComponent } from '../mensajes/mensajes.component';
import { ChatDirective } from '../Directivas/chat.directive';
import { SesionService } from '../Sesiones/sesion.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule, MensajesComponent, ChatDirective],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  @ViewChild(FormGroupDirective)
  formDirective !: FormGroupDirective;

  constructor(
    private router: Router,
    private Chat: ChatService,
    private rutaActiva: ActivatedRoute,
    protected Sesion: SesionService
  ) { }
  grupos: Grupo[] = [];
  privados: Grupo[] = [];
  mensaje: Mensaje[] = [];
  miembros: Usuario[] = [];
  datosUsuario: Usuario = new Usuario('', '', '', '', '', '', '', '', '', '', '', '');
  grupoSeleccionado = this.rutaActiva.snapshot.params['grupo'];
  fichaSeleccionada = this.Sesion.get('ficha');
  usuario = this.Sesion.get('documento');
  changes = '0';
  form = new FormGroup({
    contenido_mensaje: new FormControl('', Validators.required)
  });
  gruposVisible = true;
  privadosVisible = false;
  noEnviar = true;

  ngOnInit(): void {
    if(this.fichaSeleccionada == undefined || this.usuario == undefined){
      this.router.navigate(['login']);
      this.Sesion.set('error', 'No has iniciado sesion');
    } else {
      this.Chat.traerGrupos(this.fichaSeleccionada, this.usuario).subscribe((data: any) => data.forEach((element: any) => { this.grupos.push(element) }));
      this.Chat.traerUsuario(this.usuario).subscribe((data: any) => this.datosUsuario = data[0]);
      this.Chat.traerPrivados(this.fichaSeleccionada, this.usuario).subscribe((data: any) => data.forEach((element: any) => { this.privados.push(element) }));
      
      // document.getElementById("final")?.scrollIntoView(true);
    }
  }
  seleccionar() {
    this.changes = this.changes == '0' ? '1' : '0';
  }
  actualizarParametro() {
    this.grupoSeleccionado = this.grupoSeleccionado == this.rutaActiva.snapshot.params['grupo'] ? this.rutaActiva.snapshot.params['grupo'] : this.rutaActiva.snapshot.params['grupo'];
  }
  enviar(mensaje: any, tipo: any) {
    this.actualizarParametro();
    if (mensaje.contenido_mensaje != '') {
      let time = new Date();
      mensaje.fecha_hora = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes() + 1}:${time.getSeconds()}`;
      this.Chat.destino(this.grupoSeleccionado, this.usuario).subscribe((id: any) => {
        mensaje.fk_destino = id[0].id_usuarios_grupos
        this.Chat.agregarMensaje(mensaje).subscribe((data: any) => data == 'Enviado' ? this.seleccionar() : undefined);
      });
      mensaje.id_tipo = tipo;
      this.form.reset();
      document.getElementById("final")?.scrollIntoView(true);
    } else {
      this.Sesion.set('error','Ingrese un mensaje 😒');
    }
  }
  mostrarGrupos() {
    this.gruposVisible = true;
    this.privadosVisible = false;
  }

  mostrarPrivados() {
    this.gruposVisible = false;
    this.privadosVisible = true;
  }
  consultarMiembros() {
    this.actualizarParametro();
    this.Chat.traerMiembros(this.grupoSeleccionado).subscribe((data: any) => { this.miembros = data });
  }
  cerrarSesion() {
    this.Sesion.clear();
  }
  longitud(){
    if(this.form.get('contenido_mensaje')?.errors?.['required']){
      this.noEnviar = true;
    } else {
      this.noEnviar = false;
    }
  }
}
