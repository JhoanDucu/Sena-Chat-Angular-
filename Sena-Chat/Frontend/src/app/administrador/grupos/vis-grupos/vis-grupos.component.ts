import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
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
  @Input() confirmar: any;
  grupos: Grupo[] = [];
  url = urlImagenes;
  idBorrar: any;
  index: any;

  ngOnInit() {
    this.servicio.traerGrupos().subscribe((data: any) => this.grupos = data);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['confirmar'].firstChange) 
    this.servicio.eliminarGrupo(this.idBorrar).subscribe((data) => {
      if(data === 'Grupo eliminado correctamente') this.grupos.splice(this.index, 1);
      this.abrirModal();
    });
  }

  abrirInfo(grupo: Grupo){
    this.b.infoGrupos();
    this.mostrar.emit(['grupos', undefined, grupo]);
  };

  abrirModal(id?: any, index?: any){
    this.idBorrar = id ? id : undefined;
    this.index = index ? index : undefined;
    this.b.modal();
  }
}