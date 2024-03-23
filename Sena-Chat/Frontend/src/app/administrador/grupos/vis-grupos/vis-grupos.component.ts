import { Component } from '@angular/core';
import { CrearGrupoComponent } from '../crear-grupo/crear-grupo.component';
import { GruposService } from '../../Servicios/grupos.service';
import { Grupo } from '../../Modelos/grupos';

@Component({
  selector: 'app-vis-grupos',
  standalone: true,
  imports: [CrearGrupoComponent,],
  templateUrl: './vis-grupos.component.html',
  styleUrl: './vis-grupos.component.css'
})
export class VisGruposComponent {
  constructor(private servicio: GruposService){ }
  grupos: Grupo[] = [];
  mostrar = false;

  ngOnInit(){
    this.servicio.traerGrupos().subscribe((data: any) => this.grupos = data);
  }

  mostrarCrear = () => this.mostrar = !this.mostrar;
}
