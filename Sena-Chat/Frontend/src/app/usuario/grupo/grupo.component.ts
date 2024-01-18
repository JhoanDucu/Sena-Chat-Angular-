import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionDirective } from '../Directivas/notificacion.directive';
import { OutletContext } from '@angular/router';

@Component({
  selector: 'app-grupo',
  standalone: true,
  imports: [CommonModule, NotificacionDirective],
  templateUrl: './grupo.component.html',
  styleUrl: './grupo.component.css'
})
export class GrupoComponent {

  constructor() { }

  @Input() nomGrupo = '';
  @Input() active = false;
  @Input() tiempo: any = '';
  @Input() reciente: string | undefined = '';
  @Input() idGrupo = '';
  @Input() contador: any = undefined;

  ngOnInit() {}

  nuevaNotificacion = () => {
    if (this.active) this.contador = undefined;
    this.contador = (this.contador | 0) + 1;
  };

  restablecer = () => this.contador = undefined;
}
