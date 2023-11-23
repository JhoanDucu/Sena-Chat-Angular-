import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ChatService } from '../Servicios/chat.service';
import { Grupo } from '../Modelos/grupos';
import { Mensaje } from '../Modelos/mensaje';
import { Usuario } from '../Modelos/usuarios';
import { MensajesComponent } from '../mensajes/mensajes.component';
import { ChatDirective } from '../Directivas/chat.directive';

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
    private rutaActiva: ActivatedRoute
    ){}
  grupos: Grupo[] = [];
  mensaje: Mensaje[] = [];
  datosUsuario: Usuario = new Usuario('','','','','','','','','','','','');
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
    contenido_mensaje: new FormControl('')
  });
 gruposVisible = true;
 privadosVisible = false;

  ngOnInit(): void {
    this.Chat.traerGrupos(this.fichaSeleccionada).subscribe((data: any)=> data.forEach((element: any) => {this.grupos.push(element)}));
    this.Chat.traerUsuario(this.usuario).subscribe((data: any) => this.datosUsuario = data[0]);
    // document.getElementById("final")?.scrollIntoView(true);
  }
  seleccionar(){
    this.changes = this.changes == '0' ? '1' : '0';
  }
  enviar(mensaje: any, tipo: any){
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
      alert('No has ingresado a algun grupo');
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
}
