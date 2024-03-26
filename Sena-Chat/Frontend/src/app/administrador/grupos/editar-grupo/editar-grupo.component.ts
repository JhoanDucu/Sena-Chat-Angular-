import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GruposService } from '../../Servicios/grupos.service';
import { Grupo } from '../../../Modelos/grupos';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ficha } from '../../../Modelos/fichas';

@Component({
  selector: 'app-editar-grupo',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editar-grupo.component.html',
  styleUrl: './editar-grupo.component.css'
})
export class EditarGrupoComponent {
  constructor(private servicio: GruposService) { }
  @Input() id_grupo: any;
  @Output() volver = new EventEmitter();
  grupo: Grupo = {};
  fichas: Ficha[] = [];
  formGrupo = new FormGroup({
    nom_grupos: new FormControl('', Validators.required),
    descripcion_grupos: new FormControl('', Validators.required),
    id_ficha: new FormControl('', Validators.required)
  });

  ngOnInit() {
    this.servicio.traerGrupoPorId(this.id_grupo).subscribe(data => {
      this.grupo = data;
      this.formGrupo.setValue({
        nom_grupos: this.grupo.nom_grupos as string,
        descripcion_grupos: this.grupo.descripcion_grupos as string,
        id_ficha: this.grupo.id_ficha as string
      })
    });
    this.servicio.traerIdFichas().subscribe((data: any) => this.fichas = data);
  }

  cancelar = () => this.volver.emit();

  validar(){
    this.editar(this.formGrupo.value);
  }

  editar(datos: any){
    this.servicio
  }
}
