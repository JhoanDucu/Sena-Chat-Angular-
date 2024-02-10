import { Directive, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appGrupos]',
  standalone: true
})
export class GruposDirective implements OnChanges {
  @Input('appGrupos') primerValor: any;
  @Output() arrayChanged = new EventEmitter<any[]>();

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['primerValor'].firstChange) console.log(this.primerValor);
  }
}
