import { Component, EventEmitter, Output } from '@angular/core';
import { GruposService } from '../../Servicios/grupos.service';
import { Grupo } from '../../../Modelos/grupos';
import { urlImagenes } from '../../../../servidor';
import { BootstrapService } from '../../Servicios/bootstrap.service';

@Component({
  selector: 'app-vis-grupos',
  standalone: true,
  imports: [],
  templateUrl: './vis-grupos.component.html',
  styleUrl: './vis-grupos.component.css'
})
export class VisGruposComponent {
  constructor(private servicio: GruposService, private b: BootstrapService) { }
  @Output() mostrar = new EventEmitter();
  grupos: Grupo[] = [];
  url = urlImagenes;

  ngOnInit() {
    this.servicio.traerGrupos().subscribe((data: any) => this.grupos = data);
  }

  abrirInfo(grupo: Grupo){
    this.b.infoGrupos();
    this.mostrar.emit(['grupos', undefined, grupo]);
  };
}