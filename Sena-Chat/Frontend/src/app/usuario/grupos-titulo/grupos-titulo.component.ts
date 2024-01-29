import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grupos-titulo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grupos-titulo.component.html',
  styleUrl: './grupos-titulo.component.css'
})
export class GruposTituloComponent {
  @Input() titulo: any;
}
