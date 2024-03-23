import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearGrupoService } from '../Servicios/crear-grupo.service';
import { CrearGrupoComponent } from '../grupos/crear-grupo/crear-grupo.component';
import { VisGruposComponent } from '../grupos/vis-grupos/vis-grupos.component';
import { EditarGrupoComponent } from '../grupos/editar-grupo/editar-grupo.component';
import { VisUsuarioComponent } from '../usuarios/vis-usuario/vis-usuario.component';
import { CrearUsuarioComponent } from '../usuarios/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from '../usuarios/editar-usuario/editar-usuario.component';
import { VisMensajeComponent } from '../mensajes/vis-mensaje/vis-mensaje.component';
import { CrearMensajeComponent } from '../mensajes/crear-mensaje/crear-mensaje.component';
import { EditarMensajeComponent } from '../mensajes/editar-mensaje/editar-mensaje.component';
import { VisFichaComponent } from '../fichas/vis-ficha/vis-ficha.component';
import { CrearFichaComponent } from '../fichas/crear-ficha/crear-ficha.component';
import { EditarFichaComponent } from '../fichas/editar-ficha/editar-ficha.component';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [
    CommonModule,
    CrearGrupoComponent,
    VisGruposComponent,
    EditarGrupoComponent,
    VisUsuarioComponent,
    CrearUsuarioComponent,
    EditarUsuarioComponent,
    VisMensajeComponent,
    CrearMensajeComponent,
    EditarMensajeComponent,
    VisFichaComponent,
    CrearFichaComponent,
    EditarFichaComponent
  ],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(private crearGrupoService: CrearGrupoService) {
    this.message = '';
  }

  opcion: string = 'grupos';

  message!: string;

  ngOnInit() {
    // this.crearGrupoService.currentMessage.subscribe((message: string) => this.message = message);
  }

  seleccionarOpcion = (opcion: string) => this.opcion = opcion;

}
