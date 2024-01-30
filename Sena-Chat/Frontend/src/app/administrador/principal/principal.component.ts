import { Component, OnInit } from '@angular/core';
import { CrearGrupoService } from '../Servicios/crear-grupo.service';
import { CrearGrupoComponent } from '../grupos/crear-grupo/crear-grupo.component'; 
import { VisGruposComponent } from '../grupos/vis-grupos/vis-grupos.component'; 
import { EditarFormGrupoComponent } from '../grupos/editar-form-grupo/editar-form-grupo.component'; 
import { VisUsuarioComponent } from '../usuarios/vis-usuario/vis-usuario.component'; 
import { CrearUsuarioComponent } from '../usuarios/crear-usuario/crear-usuario.component'; 
import { EditarFormUsuarioComponent } from '../usuarios/editar-form-usuario/editar-form-usuario.component';
import { VisMensajeComponent } from '../mensajes/vis-mensaje/vis-mensaje.component';
import { CrearMensajeComponent } from '../mensajes/crear-mensaje/crear-mensaje.component';
import { EditarFormMensajeComponent } from '../mensajes/editar-form-mensaje/editar-form-mensaje.component';
import { VisFichaComponent } from '../fichas/vis-ficha/vis-ficha.component';
import { CrearFichaComponent } from '../fichas/crear-ficha/crear-ficha.component';
import { EditarFormFichaComponent } from '../fichas/editar-form-ficha/editar-form-ficha.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [
    CommonModule,
    CrearGrupoComponent,
    VisGruposComponent,
    EditarFormGrupoComponent,
    VisUsuarioComponent,
    CrearUsuarioComponent,
    EditarFormUsuarioComponent,
    VisMensajeComponent,
    CrearMensajeComponent,
    EditarFormMensajeComponent,
    VisFichaComponent,
    CrearFichaComponent,
    EditarFormFichaComponent
  ],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  opcionSeleccionada: string = 'grupo';

  message!: string;

  constructor(private crearGrupoService: CrearGrupoService) {
    this.message = '';
  }

  ngOnInit() {
    this.crearGrupoService.currentMessage.subscribe((message: string) => this.message = message);
  }

  seleccionarOpcion(opcion: string) {
    this.opcionSeleccionada = opcion;
  }

}
