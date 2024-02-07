import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appEditar]',
  standalone: true
})
export class EditarDirective implements AfterViewInit {
  constructor(private element: ElementRef) { }

  ngAfterViewInit(): void {
    this.element.nativeElement.focus();
  }
}
