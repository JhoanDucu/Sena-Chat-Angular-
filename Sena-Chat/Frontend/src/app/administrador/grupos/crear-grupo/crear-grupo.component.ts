import { Component, Output, EventEmitter } from '@angular/core';
import { GruposService } from '../../Servicios/grupos.service';

@Component({
  selector: 'app-crear-grupo',
  standalone: true,
  imports: [],
  templateUrl: './crear-grupo.component.html',
  styleUrl: './crear-grupo.component.css'
})
export class CrearGrupoComponent {
  constructor(private servicio: GruposService){ }
  @Output() volver = new EventEmitter();
  fichas: any = [];

  ngOnInit(){
    this.servicio.traerIdFichas().subscribe((data: any)=> this.fichas = data);
  }

  cancelar = () => this.volver.emit();
}
