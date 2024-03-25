import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-ficha',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editar-ficha.component.html',
  styleUrl: './editar-ficha.component.css'
})
export class EditarFichaComponent {
  @Input() id_ficha: any;
}
