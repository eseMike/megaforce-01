

import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[fallback]'
})
export class ImageFallbackDirective {

  @Input() fallback: string = 'assets/images/fallback.jpeg';

  constructor(private el: ElementRef<HTMLImageElement>) { }

  @HostListener('error')
  onError() {
    const img: HTMLImageElement = this.el.nativeElement;
    if (img.src !== this.fallback) {
      img.src = this.fallback;
    }
  }
}
