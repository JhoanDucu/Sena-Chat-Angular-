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
        console.log(imageElement.parentElement);
        this.renderer.addClass(imageElement.parentElement?.parentElement, 'imagen'); // horizontal
      } else {
        this.renderer.addClass(imageElement.parentElement?.parentElement, 'imagen'); // vertical
      }
    };
  }
}
