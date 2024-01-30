import { Component, OnInit } from '@angular/core';
<<<<<<< Updated upstream
import { CrearGrupoService } from '../Servicios/crear-grupo.service'; // Asegúrate de que la ruta es correcta
import { CrearGrupoComponent } from '../crear-grupo/crear-grupo.component';
import { VisGruposComponent } from '../vis-grupos/vis-grupos.component';
=======
import { CrearGrupoService } from '../Servicios/crear-grupo.service';
import { CrearGrupoComponent } from '../ComponentGrupos/crear-grupo/crear-grupo.component';
import { VisGruposComponent } from '../ComponentGrupos/vis-grupos/vis-grupos.component';
import { EditarFormGrupoComponent } from '../ComponentGrupos/editar-form-grupo/editar-form-grupo.component';
import { VisUsuarioComponent } from '../ComponentUser/vis-usuario/vis-usuario.component';
import { CrearUsuarioComponent } from '../ComponentUser/crear-usuario/crear-usuario.component';
import { EditarFormUsuarioComponent } from '../ComponentUser/editar-form-usuario/editar-form-usuario.component';
import { VisMensajeComponent } from '../ComponentMensaje/vis-mensaje/vis-mensaje.component';
import { CrearMensajeComponent } from '../ComponentMensaje/crear-mensaje/crear-mensaje.component';
import { EditarFormMensajeComponent } from '../ComponentMensaje/editar-form-mensaje/editar-form-mensaje.component';
import { VisFichaComponent } from '../ComponentFicha/vis-ficha/vis-ficha.component';
import { CrearFichaComponent } from '../ComponentFicha/crear-ficha/crear-ficha.component';
import { EditarFormFichaComponent } from '../ComponentFicha/editar-form-ficha/editar-form-ficha.component';
>>>>>>> Stashed changes
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
