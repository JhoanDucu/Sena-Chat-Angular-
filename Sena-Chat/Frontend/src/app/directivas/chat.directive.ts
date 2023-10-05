import { Directive, Input, OnChanges, TemplateRef, ViewContainerRef, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appChat]'
})
export class ChatDirective implements OnChanges{
  @Input() appChat !: string;
  constructor(
    private TemplateRef: TemplateRef<any>,
    private ViewContainerRef: ViewContainerRef
  ) {
    this.ViewContainerRef.createEmbeddedView( TemplateRef );
   }
   ngOnChanges(changes: SimpleChanges): void {
    if( changes['appChat'] && changes['appChat'].previousValue != undefined){
      this.ViewContainerRef.clear();
      this.ViewContainerRef.createEmbeddedView(this.TemplateRef);
    }
   }
}