import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [],
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.css'
})
export class CrearUsuarioComponent {

  @Output() mostrar = new EventEmitter();

  cancelar = () => this.mostrar.emit();

}
