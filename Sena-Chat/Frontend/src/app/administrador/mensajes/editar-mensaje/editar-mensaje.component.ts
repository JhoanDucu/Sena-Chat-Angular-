import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensajesService } from '../../Servicios/mensajes.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-mensaje',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editar-mensaje.component.html',
  styleUrl: './editar-mensaje.component.css'
})
export class EditarMensajeComponent {
  constructor(private servicio: MensajesService) { }
  @Input() id_mensaje: any;
  @Output() volver = new EventEmitter();
  mensaje: any;
  formMensaje = new FormGroup({
    contenido_mensaje: new FormControl('', Validators.required)
  });

  ngOnInit() {
    this.servicio.traerMensajePorId(this.id_mensaje).subscribe(data => {
      this.mensaje = data;
      this.formMensaje.setValue({ contenido_mensaje: this.mensaje.contenido_mensaje });
    });
  }

  cancelar = () => this.volver.emit();

  validar(){
    this.editar(this.formMensaje.value);
  }

  editar(datos: any){
    this.servicio.editarMensaje(datos, this.id_mensaje).subscribe((data) => {if (data) this.cancelar(); });
  }
}
