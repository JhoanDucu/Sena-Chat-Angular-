import { Component, EventEmitter, Output } from '@angular/core';
import { FichasService } from '../../Servicios/fichas.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-ficha',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './crear-ficha.component.html',
  styleUrl: './crear-ficha.component.css'
})
export class CrearFichaComponent {
  constructor(private servicio: FichasService) { }
  @Output() volver = new EventEmitter();
  programas: any[] = [];
  formFicha = new FormGroup({
    id_ficha: new FormControl('', Validators.required),
    fk_programa: new FormControl('', Validators.required),
    trimestre: new FormControl('', Validators.required),
  });
  ficha = '';
  programa = '';
  trimestre = '';

  ngOnInit() {
    this.servicio.traerProgramas().subscribe((data: any) => this.programas = data);
  }

  cancelar = () => this.volver.emit();

  validar(){
    // if (this.formFicha.get('id_ficha')?.hasError('required')) this.ficha = 'Este campo es obligatorio';
    // if (this.formFicha.get('programa')?.hasError('required')) this.programa = 'Este campo es obligatorio';
    // if (this.formFicha.get('id_ficha')?.hasError('required')) this.trimestre = 'Este campo es obligatorio';
    this.nuevaFicha();
  }

  nuevaFicha() {
    this.servicio.agregarFicha(this.formFicha.value).subscribe((data) => { if (data) this.cancelar() });
  }
}