import { Directive, Input, OnChanges, TemplateRef, ViewContainerRef, SimpleChanges } from '@angular/core';
import { Grupo } from '../../Modelos/grupos';

@Directive({
  selector: '[appChat]',
  standalone: true
})
export class ChatDirective implements OnChanges {
  @Input() appChat !: string;
  constructor(
    private TemplateRef: TemplateRef<any>,
    private ViewContainerRef: ViewContainerRef
  ) {
    this.ViewContainerRef.createEmbeddedView(TemplateRef);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appChat'] && changes['appChat'].previousValue != undefined) {
      this.ViewContainerRef.clear();
      this.ViewContainerRef.createEmbeddedView(this.TemplateRef);
    }
  }

  static seleccionar = (value: string) => { return value = value == '0' ? '1' : '0' }

  static contieneMensajes = (grupo: Grupo, valor: string) => {
    if (grupo?.mensajes?.length) return grupo.mensajes[grupo.mensajes.length - 1][valor];
  }
  
}
