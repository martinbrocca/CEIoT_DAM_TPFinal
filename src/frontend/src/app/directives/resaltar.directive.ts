/* eslint-disable @typescript-eslint/member-ordering */
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appResaltar]'
})
export class ResaltarDirective {
// Custom directive to highligh a row while overing the mouse.

  constructor(private el: ElementRef) {
    //el.nativeElement.style.backgroundColor="blue";
   }

   private resaltarLinea(colorBg: string, colorFont: string){
    this.el.nativeElement.style.backgroundColor=colorBg;
    this.el.nativeElement.style.color=colorFont;
   }

   @HostListener('mouseenter') onMouseEnter() {
    this.resaltarLinea('#3880ff', 'white');
   }
   @HostListener('mouseleave') onMouseLeave() {
    this.resaltarLinea('','');
  }

}
