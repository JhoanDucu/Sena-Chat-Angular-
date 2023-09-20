import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../Servicios/chat.service';
import { ActivatedRoute } from '@angular/router';
import { Grupo } from '../modelos/grupos';
import { Mensaje } from '../modelos/mensaje';
import { Usuario } from '../modelos/usuarios';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  @ViewChild(FormGroupDirective)
  formDirective !: FormGroupDirective;

  constructor(
    private router: Router,
    private Chat: ChatService,
    private rutaActiva: ActivatedRoute
    ){}
  grupos: Grupo[] = [];
  mensaje: Mensaje[] = [];
  datosUsuario: Usuario[] = [];
  grupoSeleccionado = this.rutaActiva.snapshot.params['grupo'];
  fichaSeleccionada = this.rutaActiva.snapshot.params['ficha'];
  usuario = this.rutaActiva.snapshot.params['documento'];
  changes = '0';
  months = {
    0: 'Enero',
    1: 'Febrero',
    2: 'Marzo',
    3: 'Abril',
    4: 'Mayo',
    5: 'Junio',     /* USAR PARA MOSTRAR FECHAS */
    6: 'Julio',
    7: 'Agosto',
    8: 'Septiembre',
    9: 'Octubre',
    10: 'Noviembre',
    11: 'Diciembre',
  };
  form = new FormGroup({
    contenido_mensaje: new FormControl()
  })

  ngOnInit(): void {
    this.Chat.traerGrupos(this.fichaSeleccionada).subscribe((data: any)=> data.forEach((element: any) => {this.grupos.push(element)}));
    this.grupoSeleccionado ? this.Chat.traerMensajes(this.grupoSeleccionado).subscribe((data: any)=> data.forEach((element: any) => {this.mensaje.push(element)})) : undefined;
    this.Chat.traerUsuario(this.usuario).subscribe((data: any)=> data.forEach((element: any) => {this.datosUsuario.push(element)}));
    // document.getElementById("final")?.scrollIntoView(true);
  }
  seleccionar(){
    this.changes = this.changes == '0' ? '1' : '0';
  }
  enviar(mensaje: Mensaje, tipo: any){
    this.grupoSeleccionado = this.grupoSeleccionado == '0' ? this.rutaActiva.snapshot.params['grupo'] : '0';
    if(this.grupoSeleccionado != undefined && mensaje.contenido_mensaje != ''){
      let time = new Date();
      mensaje.fecha = `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()}`;
      mensaje.hora = `${time.getHours()}:${time.getMinutes()+1}:${time.getSeconds()}`;
      mensaje.numerodoc = this.usuario;
      mensaje.id_tipo = tipo;
      mensaje.fk_id_grupos = this.rutaActiva.snapshot.params['grupo'];
      
      this.Chat.agregarMensaje(mensaje).subscribe((data: any)=>data == 'Enviado' ? this.seleccionar() : undefined);
      this.form.reset();
      document.getElementById("final")?.scrollIntoView(true);
    } else {
      alert('No has ingresado a un grupo o un mensaje');
    }
  }
}
