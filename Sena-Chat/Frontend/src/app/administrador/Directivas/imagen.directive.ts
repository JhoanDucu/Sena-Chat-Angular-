import { Directive, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appImagen]',
  standalone: true
})
export class ImagenDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {
    const imageElement: HTMLImageElement = this.el.nativeElement;

    imageElement.onload = () => {
      const width = imageElement.naturalWidth;
      const height = imageElement.naturalHeight;
      this.renderer.removeAttribute(imageElement, 'class');

      if (width > height) this.renderer.addClass(imageElement, 'contenido-horizontal');
      else if (width === height) this.renderer.addClass(imageElement, 'contenido-cuadrado');
      else this.renderer.addClass(imageElement, 'contenido-vertical');
    };
  }
}