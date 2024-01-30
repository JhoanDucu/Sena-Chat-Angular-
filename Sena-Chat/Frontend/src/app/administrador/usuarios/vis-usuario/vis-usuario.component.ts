import { Component } from '@angular/core';
import { CrearUsuarioComponent } from '../crear-usuario/crear-usuario.component';

@Component({
  selector: 'app-vis-usuario',
  standalone: true,
  imports: [
    CrearUsuarioComponent,
  ],
  templateUrl: './vis-usuario.component.html',
  styleUrl: './vis-usuario.component.css'
})
export class VisUsuarioComponent {

  mostrar = false;
  mostrarCrear = () => this.mostrar = !this.mostrar;

}
