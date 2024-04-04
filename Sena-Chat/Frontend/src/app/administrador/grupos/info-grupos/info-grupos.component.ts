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
  faltantes: Usuario[] | undefined;
  rol = new Rol();
  aviso: any;
  detalles = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['grupo'] && !changes['grupo'].firstChange)
      this.servicio.traerMiembros(this.grupo.id_grupos).subscribe((data: any) => {
        if (data !== 'No hay miembros aun') {
          this.miembros = data;
          this.faltantes = undefined;
        } else {
          this.aviso = data;
          this.miembros = [];
        }
      });
  }

  abrirDrop(id: any) {
    this.b.drop(id);
  }

  conversion = (date: any) => Fecha.fechaAdmin(new Date(date));

  abrirDetalles = (numdoc: any) => this.detalles = this.detalles !== numdoc ? numdoc : undefined;

  eliminar(id: any) {
    this.servicio.eliminarMiembro({ activo: false, fecha_union: Fecha.fechaActual() }, id).subscribe((data) => {
      // console.log(data)
    });
  }

  consultar(rol: any) {
    const datos = {
      id_ficha: this.grupo.id_ficha,
      rol: rol,
      id_grupo: this.grupo.id_grupos
    };
    this.servicio.traerFaltantes(datos).subscribe((data: any) => {
      if (data) this.faltantes = data;
      else this.faltantes = [];
    });
  }

  agregar(numdoc: any) {
    this.servicio.comprobarMiembro(numdoc, this.grupo.id_grupos).subscribe((data) => {
      const datos = {
        sin_leer: null,
        activo: true,
        fecha_union: Fecha.fechaActual()
      };
      if (data) {
        this.servicio.actualizarMiembro(datos, data).subscribe((data) => console.log(data));
      } else {
        this.servicio.agregarMiembro(
          Object.assign(datos, { id_grupos: this.grupo.id_grupos, numerodoc: numdoc })
        ).subscribe((data) => console.log(data));
      }
    });
  }
}