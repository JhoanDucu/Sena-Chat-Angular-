import { Component, OnInit } from '@angular/core';
import { CrearFichaComponent } from '../crear-ficha/crear-ficha.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vis-ficha',
  standalone: true,
  imports: [
    CrearFichaComponent,
    CommonModule,
  ],
  templateUrl: './vis-ficha.component.html',
  styleUrl: './vis-ficha.component.css'
})
export class VisFichaComponent {

  mostrar = false;
  mostrarCrear = () => this.mostrar = !this.mostrar;

}
