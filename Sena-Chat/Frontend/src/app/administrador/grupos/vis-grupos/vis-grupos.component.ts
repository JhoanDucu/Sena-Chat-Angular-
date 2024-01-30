import { Component } from '@angular/core';
import { CrearGrupoComponent } from '../crear-grupo/crear-grupo.component';

@Component({
  selector: 'app-vis-grupos',
  standalone: true,
  imports: [CrearGrupoComponent,],
  templateUrl: './vis-grupos.component.html',
  styleUrl: './vis-grupos.component.css'
})
export class VisGruposComponent {

  mostrar = false;
  mostrarCrear = () => this.mostrar = !this.mostrar;

}
