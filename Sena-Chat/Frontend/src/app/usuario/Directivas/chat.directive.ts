import { Directive, Input, OnChanges, TemplateRef, ViewContainerRef, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appChat]',
  standalone: true
})
export class ChatDirective implements OnChanges {
  @Input() appChat !: string;
  constructor(
    private TemplateRef: TemplateRef<any>,
    private ViewContainerRef: ViewContainerRef,
  ) {
    this.ViewContainerRef.createEmbeddedView(TemplateRef);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appChat'] && changes['appChat'].previousValue != undefined) {
      this.ViewContainerRef.clear();
      this.ViewContainerRef.createEmbeddedView(this.TemplateRef);
    }
    setTimeout(() => {
      document.getElementById("final")?.scrollIntoView(true);
    }, 90);
  }
  
  static seleccionar = (value: string) => { return value = value == '0' ? '1' : '0' }

  static estadoBusqueda = (current: Boolean, before: Boolean) => current || before;

  static fechaActual = () => {
    let time = new Date();
    return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes() + 1}:${time.getSeconds()}`;
  }
}
