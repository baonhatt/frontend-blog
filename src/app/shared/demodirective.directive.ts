import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDemodirective]'
})
export class DemodirectiveDirective {

  constructor(private el: ElementRef) {}
      @HostListener('mouseenter') onmouseenter() {
        this.highlight('pink');
      }

      @HostListener('mouseleave') onmouseleave() {
        this.highlight('');
      }



    private highlight(color: string) {
      this.el.nativeElement.style.backgroundColor = color;
    }
}
