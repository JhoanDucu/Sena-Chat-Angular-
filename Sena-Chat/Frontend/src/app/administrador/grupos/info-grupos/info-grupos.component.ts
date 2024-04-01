import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { urlImagenes } from '../../../../servidor';
import { Grupo } from '../../../Modelos/grupos';
import { GruposService } from '../../Servicios/grupos.service';
import { Usuario } from '../../../Modelos/usuarios';
import { BootstrapService } from '../../Servicios/bootstrap.service';
import { Rol } from '../../../Modelos/roles';
import { Fecha } from '../../../Modelos/fechas';

@Component({
  selector: 'app-info-grupos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-grupos.component.html',
  styleUrl: './info-grupos.component.css'
})
export class InfoGruposComponent {
  constructor(private servicio: GruposService, private b: BootstrapService) { }
  @Input() grupo: Grupo = {};
  url = urlImagenes;
  miembros: Usuario[] | any = [];
  rol = new Rol();
  aviso: any;
  detalles = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['grupo'] && !changes['grupo'].firstChange)
      this.servicio.traerMiembros(this.grupo.id_grupos).subscribe((data: any) => {
        if (data !== 'No hay miembros aun') this.miembros = data;
        else {
          this.aviso = data;
          this.miembros = [];
        }
      });
  }

  abrirDrop(id: any){
    this.b.drop(id);
  }

  conversion = (date: any) => Fecha.fechaAdmin(new Date(date));

  abrirDetalles = (numdoc: any) => this.detalles = this.detalles !== numdoc ? numdoc : undefined;

  eliminar(id: any){
    this.servicio
  }
}