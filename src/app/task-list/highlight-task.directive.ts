import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlightTask]'
})
export class HighlightTaskDirective {
  @Input() appHighlightTask!: string; // Use definite assignment operator

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlightTask || 'yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null); // Passing null is now acceptable
  }

  private highlight(color: string | null) {
    this.el.nativeElement.style.backgroundColor = color ? color : ''; // Reset to default if null
  }
}