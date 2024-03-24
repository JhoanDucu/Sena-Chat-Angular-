import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-crear-grupo',
  standalone: true,
  imports: [],
  templateUrl: './crear-grupo.component.html',
  styleUrl: './crear-grupo.component.css'
})
export class CrearGrupoComponent {
  @Output() volver = new EventEmitter();

  cancelar = () => this.volver.emit();
}
