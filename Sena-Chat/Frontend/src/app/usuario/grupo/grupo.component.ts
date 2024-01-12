import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Grupo } from '../Modelos/grupos';

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
  @Input() fecha = '';
  @Input() reciente = '';
  @Input() ultimoMensaje: any = {};

  obtenerHora = (date: Date) => `${date.toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" })}`;

  ngAfterViewInit(){ }
}
