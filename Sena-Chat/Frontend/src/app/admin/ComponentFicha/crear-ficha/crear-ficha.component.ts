import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-crear-ficha',
  standalone: true,
  imports: [],
  templateUrl: './crear-ficha.component.html',
  styleUrl: './crear-ficha.component.css'
})
export class CrearFichaComponent {

  @Output() mostrar = new EventEmitter();

  cancelar = () => this.mostrar.emit();


}
