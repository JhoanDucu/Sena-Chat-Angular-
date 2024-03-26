import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FichasService } from '../../Servicios/fichas.service';
import { Ficha } from '../../../Modelos/fichas';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-ficha',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editar-ficha.component.html',
  styleUrl: './editar-ficha.component.css'
})
export class EditarFichaComponent {
  constructor(private servicio: FichasService) { }
  @Input() id_ficha: any;
  @Output() volver = new EventEmitter();
  ficha: Partial<Ficha> = {};
  programas: any;
  formFicha = new FormGroup({
    id_ficha: new FormControl('', Validators.required),
    fk_programa: new FormControl('', Validators.required),
    trimestre: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.servicio.traerFichaPorId(this.id_ficha).subscribe(data => {
      this.ficha = data;
      this.formFicha.setValue({
        id_ficha: String(this.ficha.id_ficha),
        fk_programa: this.ficha.fk_programa as string,
        trimestre: String(this.ficha.trimestre)
      });
    });
    this.servicio.traerProgramas().subscribe((data: any) => this.programas = data);
  }

  cancelar = () => this.volver.emit();

  validar() {
    this.editar(this.formFicha.value, this.id_ficha);
  }

  editar(datos: any, id: any) {
    this.servicio.editarFicha(datos, id).subscribe((data) => { if (data) this.cancelar(); });
  }
}
