

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fallbackImage',
  pure: true,
})
export class FallbackImagePipe implements PipeTransform {
  transform(src: string | null | undefined): string {
    const fallback = 'assets/images/fallback.jpeg';
    return src && src.trim() !== '' ? src : fallback;
  }
}
