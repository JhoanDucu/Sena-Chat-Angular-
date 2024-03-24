import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisGruposComponent } from '../grupos/vis-grupos/vis-grupos.component';
import { VisUsuarioComponent } from '../usuarios/vis-usuario/vis-usuario.component';
import { VisMensajeComponent } from '../mensajes/vis-mensaje/vis-mensaje.component';
import { VisFichaComponent } from '../fichas/vis-ficha/vis-ficha.component';
import { CrearGrupoComponent } from '../grupos/crear-grupo/crear-grupo.component';
import { CrearUsuarioComponent } from '../usuarios/crear-usuario/crear-usuario.component';
import { CrearMensajeComponent } from '../mensajes/crear-mensaje/crear-mensaje.component';
import { CrearFichaComponent } from '../fichas/crear-ficha/crear-ficha.component';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [
    CommonModule,
    VisGruposComponent,
    VisUsuarioComponent,
    VisMensajeComponent,
    VisFichaComponent,
    CrearGrupoComponent,
    CrearUsuarioComponent,
    CrearMensajeComponent,
    CrearFichaComponent
  ],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor() {
    this.message = '';
  }

  opcion: string = 'grupos';

  message!: string;

  ngOnInit() { }

  seleccionarOpcion = (opcion: any) => this.opcion = opcion;

  mostrarCrear(){
    if (this.opcion == 'grupos') this.opcion = 'crearGrupo';
    if (this.opcion == 'usuarios') this.opcion = 'crearUsuario';
    if (this.opcion == 'mensajes') this.opcion = 'crearMensaje';
    if (this.opcion == 'fichas') this.opcion = 'crearFicha';
  };

}
