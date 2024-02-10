import { Directive, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { SesionService } from '../Sesiones/sesion.service';
import { Grupo } from '../Modelos/grupos';

@Directive({
  selector: '[appGrupos]',
  standalone: true
})
export class GruposDirective implements OnChanges {
  constructor(private s: SesionService) { }
  @Input('appGrupos') primerValor: Grupo = {};
  @Output() notificarTab = new EventEmitter();

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['primerValor'].firstChange) {
      let tipoGrupo = this.primerValor.fk_tipo_grupo == 2 ? 'grupos' : 'privados';
      if(tipoGrupo !== this.s.get('pestaña')) this.notificarTab.emit(tipoGrupo);
    }
  }
}