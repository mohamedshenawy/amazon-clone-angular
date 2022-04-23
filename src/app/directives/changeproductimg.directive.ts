import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appChangeproductimg]'
})
export class ChangeproductimgDirective {
  constructor(private element:ElementRef) { 
  }

  @HostListener("mouseenter")
  onMauseEnter(){
    this.element.nativeElement.style.border = "2px solid blue";
    //  this.sourse = this.element.nativeElement.src;
    
    
  }

  @HostListener("mouseleave")
  onMauseLeave(){
    this.element.nativeElement.style.border = "2px solid gray";
  }

}
