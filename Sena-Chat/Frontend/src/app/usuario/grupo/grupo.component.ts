import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grupo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grupo.component.html',
  styleUrl: './grupo.component.css'
})
export class GrupoComponent {
  @Input() nomGrupo = '';
  @Input() active = false;
  @Input() tiempo: any = '';
  @Input() reciente: string | undefined = '';

  ngOnInit(){}
}
