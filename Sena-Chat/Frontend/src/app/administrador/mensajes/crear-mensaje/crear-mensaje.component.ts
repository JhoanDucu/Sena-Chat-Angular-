import { Component, EventEmitter, Output} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MensajesService } from '../../Servicios/mensajes.service';


@Component({
  selector: 'app-crear-mensaje',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './crear-mensaje.component.html',
  styleUrl: './crear-mensaje.component.css'
})
export class CrearMensajeComponent {
  constructor (private servicio: MensajesService){ }
  @Output() volver = new EventEmitter();
  formMensaje = new FormGroup({
    contenidoMensaje: new FormControl('', Validators.required),
    id_tipo: new FormControl('', Validators.required),
  });

  cancelar = () => this.volver.emit();

  validar(){
    this.nuevoMensaje();
  }

  nuevoMensaje(){
    console.log(this.formMensaje.value);
    // this.servicio.agregarMensaje(this.formMensaje.value).subscribe(data => console.log(data));
  }
  
}
