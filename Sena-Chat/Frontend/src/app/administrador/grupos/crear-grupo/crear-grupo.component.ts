import { Component, Output, EventEmitter } from '@angular/core';
import { GruposService } from '../../Servicios/grupos.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-grupo',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './crear-grupo.component.html',
  styleUrl: './crear-grupo.component.css'
})
export class CrearGrupoComponent {
  constructor(private servicio: GruposService) { }
  @Output() volver = new EventEmitter();
  fichas: any = [];
  formGrupo = new FormGroup({
    nom_grupos: new FormControl('', Validators.required),
    descripcion_grupos: new FormControl('', Validators.required),
    id_ficha: new FormControl('', Validators.required)
  });

  ngOnInit() {
    this.servicio.traerIdFichas().subscribe((data: any) => this.fichas = data);
  }

  cancelar = () => this.volver.emit();

  validar() {
    this.nuevoGrupo(this.formGrupo.value);
  }

  nuevoGrupo(datos: any) {
    datos.fk_tipo_grupo = '2';
    this.servicio.agregarGrupo(datos).subscribe((data) => { if (data) this.cancelar()  });
  }
}
