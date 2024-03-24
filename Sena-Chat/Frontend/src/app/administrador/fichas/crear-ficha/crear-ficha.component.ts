import { Component, EventEmitter, Output } from '@angular/core';
import { FichasService } from '../../Servicios/fichas.service';

@Component({
  selector: 'app-crear-ficha',
  standalone: true,
  imports: [],
  templateUrl: './crear-ficha.component.html',
  styleUrl: './crear-ficha.component.css'
})
export class CrearFichaComponent {
  constructor(private servicio: FichasService){}
  @Output() volver = new EventEmitter();
  programas: any[] = [];

  ngOnInit(){
    this.servicio.traerProgramas().subscribe((data: any) => this.programas = data);
  }

  cancelar = () => this.volver.emit();
}