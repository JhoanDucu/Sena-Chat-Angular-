import { Component, EventEmitter, Output} from '@angular/core';


@Component({
  selector: 'app-crear-mensaje',
  standalone: true,
  imports: [],
  templateUrl: './crear-mensaje.component.html',
  styleUrl: './crear-mensaje.component.css'
})
export class CrearMensajeComponent {

  @Output() mostrar = new EventEmitter();

  cancelar = () => this.mostrar.emit();
  
}
