import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FichasService } from '../../Servicios/fichas.service';
import { Ficha } from '../../../Modelos/fichas';

@Component({
  selector: 'app-editar-ficha',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editar-ficha.component.html',
  styleUrl: './editar-ficha.component.css'
})
export class EditarFichaComponent {
  constructor(private servicio: FichasService) { }
  @Input() id_ficha: any;
  @Output() volver = new EventEmitter();
  ficha: Partial<Ficha> = {};
  programas: any;

  ngOnInit() {
    this.servicio.traerFichaPorId(this.id_ficha).subscribe(data => {
      this.ficha = data;
      // this.formGrupo.setValue({
      //   nom_grupos: this.grupo.nom_grupos as string,
      //   descripcion_grupos: this.grupo.descripcion_grupos as string,
      //   id_ficha: this.grupo.id_ficha as string
      // })
    });
    this.servicio.traerProgramas().subscribe((data: any) => this.programas = data);
  }

  cancelar = () => this.volver.emit();

  validar(){
    // this.editar(this.formGrupo.value);
  }

  editar(datos: any){
    this.servicio
  }
}
