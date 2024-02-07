import { Component } from '@angular/core';
import { CrearGrupoComponent } from '../crear-grupo/crear-grupo.component';
import { GruposService } from '../../service/grupos.service';

@Component({
  selector: 'app-vis-grupos',
  standalone: true,
  imports: [CrearGrupoComponent,],
  templateUrl: './vis-grupos.component.html',
  styleUrl: './vis-grupos.component.css'
})
export class VisGruposComponent {

  constructor(private visGrupos:GruposService) { }

  mostrar = false;
  grupos:any = [];
      

  mostrarCrear = () => this.mostrar = !this.mostrar;

  ngOnInit() {
    this.visGrupos.traerGrupos().subscribe((datos:any) => {
      this.grupos = datos;
    });
  }

}
