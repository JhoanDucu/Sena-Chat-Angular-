import { Directive, Input, ElementRef, Renderer2, OnChanges, SimpleChanges, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appNotificacion]',
  standalone: true,
})
export class NotificacionDirective implements OnChanges {
  @Input('appNotificacion') ultimoMensaje: any = '';
  @Output('+') sumar = new EventEmitter();

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ultimoMensaje'].currentValue && changes['ultimoMensaje'].previousValue) {
      this.renderer.setStyle(this.el.nativeElement, 'font-weight', 'bolder');
      this.sumar.emit()
    }
  }
}