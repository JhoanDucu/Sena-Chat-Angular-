import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MensajeEnviar } from '../Modelos/mensaje';
import { Modals } from '../Modelos/modal';

@Component({
  selector: 'app-mensajes-varios',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './mensajes-varios.component.html',
  styleUrl: './mensajes-varios.component.css'
})
export class MensajesVariosComponent {
  @ViewChild(FormGroupDirective) formDirective !: FormGroupDirective;
  @Input() grupos: any;
  @Output() envioMultiple = new EventEmitter<MensajeEnviar>();
  @Output() deseleccionar = new EventEmitter();
  mensajes = new FormGroup({
    variasFichas: new FormControl('', Validators.required),
    mensajeFichas: new FormControl('', Validators.required),
  });
  checked: string[] = [];
  inputSizes = ['mensajeFichas', 'mensajeFichas2', 'mensajeFichas3'];
  idInput = this.inputSizes[0];

  ngOnInit() {}

  cerrar() {
    this.checked = [];
    this.mensajes.reset();
    new Modals().usar('grupos', 2);
  }

  emitirEnvios(formValue: any) {
    if (formValue.variasFichas) this.checked.forEach(
      (value, index) => {
        // this.seleccionarEnGrupos(value, index, 'grupos');
        this.envioMultiple.emit({
          id_mensaje: undefined,
          fecha_hora: '',
          contenido_mensaje: formValue.mensajeFichas,
          fk_destino: value,
          id_tipo: '1'
        });
        this.deseleccionar.emit();
      });
    this.cerrar();
  }

  inputSize(e: any) {
    if (this.mensajes.value.mensajeFichas == '') this.idInput = this.inputSizes[0];
    else if (this.inputSizes.indexOf(this.idInput) == 0 && e.code == 'Delete') console.log('e verdad');
    // else if(this.inputSizes.indexOf(this.idInput) == 1) undefined
    else if (this.inputSizes.indexOf(this.idInput) == 2) undefined
    else if (e.target.scrollHeight > e.target.offsetHeight) this.idInput = this.inputSizes[this.inputSizes.indexOf(this.idInput) + 1];
  }

  check(selected: any) {
    if (this.checked.indexOf(selected.value) == -1 && selected.checked) this.checked.push(selected.value);
    else this.checked.splice(this.checked.indexOf(selected.value), 1);
  }
}
