import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionDirective } from '../Directivas/notificacion.directive';

@Component({
  selector: 'app-grupo',
  standalone: true,
  imports: [CommonModule, NotificacionDirective],
  templateUrl: './grupo.component.html',
  styleUrl: './grupo.component.css'
})
export class GrupoComponent {
  @Input() nomGrupo = '';
  @Input() active = false;
  @Input() tiempo: any = '';
  @Input() reciente: string | undefined = '';
  @Input() contador: undefined | number = undefined;

  ngOnInit(){}

  nuevaNotificacion = () => this.contador = (this.contador || 0) + 1;
}
