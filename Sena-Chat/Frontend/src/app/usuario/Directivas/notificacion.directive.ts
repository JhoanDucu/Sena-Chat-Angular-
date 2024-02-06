import {
  Directive,
  Input,
  ElementRef,
  Renderer2,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { SonidosService } from '../Servicios/sonidos.service';

@Directive({
  selector: '[appNotificacion]',
  standalone: true,
})
export class NotificacionDirective implements OnChanges {
  @Input('appNotificacion') ultimoMensaje: any = {};
  @Output('+') sumar = new EventEmitter();
  @Output('-') cero = new EventEmitter();

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private sound: SonidosService
  ) {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.ultimoMensaje[1]) this.cero.emit()
    else if (changes['ultimoMensaje'].currentValue && changes['ultimoMensaje'].previousValue && !this.ultimoMensaje[1]) {
      this.renderer.setStyle(this.el.nativeElement, 'font-weight', 'bolder');
      this.sumar.emit();
      this.sound.playNotificationSound();
    }
  }
}