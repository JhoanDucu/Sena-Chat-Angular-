import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appImagen]',
  standalone: true
})
export class ImagenDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    const imageElement: HTMLImageElement = this.el.nativeElement;

    imageElement.onload = () => {
      const width = imageElement.naturalWidth;
      const height = imageElement.naturalHeight;

      if (width > height) {
        // this.renderer.addClass(imageElement, 'imagen-horizontal');
        this.renderer.addClass(imageElement.parentElement, 'imagen-horizontal');
      } else if (width === height) {
        this.renderer.addClass(imageElement.parentElement, 'imagen-cuadrada');
      } else {
        // this.renderer.addClass(imageElement, 'imagen-vertical');
        this.renderer.addClass(imageElement.parentElement, 'imagen-vertical');
      }
    };
  }
}
