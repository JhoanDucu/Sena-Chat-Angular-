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
import { EditarGrupoComponent } from '../grupos/editar-grupo/editar-grupo.component';
import { EditarUsuarioComponent } from '../usuarios/editar-usuario/editar-usuario.component';
import { EditarMensajeComponent } from '../mensajes/editar-mensaje/editar-mensaje.component';
import { EditarFichaComponent } from '../fichas/editar-ficha/editar-ficha.component';

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
    CrearFichaComponent,
    EditarGrupoComponent,
    EditarUsuarioComponent,
    EditarMensajeComponent,
    EditarFichaComponent
  ],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  constructor() { }
  opcion: string = 'grupos';
  id: any;

  ngOnInit() { }

  seleccionarOpcion(opcion: any, idBuscar?: any) {
    this.opcion = opcion;
    if (idBuscar) this.id = idBuscar;
  };

  mostrar() {
    if (this.opcion == 'grupos') this.opcion = 'crearGrupo';
    else if (this.opcion == 'usuarios') this.opcion = 'crearUsuario';
    else if (this.opcion == 'mensajes') this.opcion = 'crearMensaje';
    else if (this.opcion == 'fichas') this.opcion = 'crearFicha';
    else if (this.opcion == 'crearGrupo' || this.opcion == 'editarGrupo') this.opcion = 'grupos';
    else if (this.opcion == 'crearUsuario' || this.opcion == 'editarUsuario') this.opcion = 'usuarios';
    else if (this.opcion == 'crearMensaje' || this.opcion == 'editarMensaje') this.opcion = 'mensajes';
    else if (this.opcion == 'crearFicha' || this.opcion == 'editarFicha') this.opcion = 'fichas';
  };

}
