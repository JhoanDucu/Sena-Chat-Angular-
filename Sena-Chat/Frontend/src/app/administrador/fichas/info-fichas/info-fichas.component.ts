import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-fichas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-fichas.component.html',
  styleUrl: './info-fichas.component.css'
})
export class InfoFichasComponent {
  @Input() ficha: any;
}
