import { Component, EventEmitter, Output } from '@angular/core';
import { GruposService } from '../../Servicios/grupos.service';
import { Grupo } from '../../../Modelos/grupos'; 
import { EditarGrupoComponent } from '../editar-grupo/editar-grupo.component';

@Component({
  selector: 'app-vis-grupos',
  standalone: true,
  imports: [EditarGrupoComponent],
  templateUrl: './vis-grupos.component.html',
  styleUrl: './vis-grupos.component.css'
})
export class VisGruposComponent {
  constructor(private servicio: GruposService){ }
  @Output() mostrar = new EventEmitter();
  grupos: Grupo[] = [];

  ngOnInit(){
    this.servicio.traerGrupos().subscribe((data: any) => this.grupos = data);
  }

  mostrarEditar = (id: any) => this.mostrar.emit(id);

}