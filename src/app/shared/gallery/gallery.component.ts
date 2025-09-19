import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface GalleryItem {
  src: string;
  alt?: string;
  title?: string;
  actionLabel?: string;
  actionHref?: string;
}

export type GalleryVariant = 'home' | 'page';

@Component({
  standalone: true,
  selector: 'app-gallery',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  /**
   * Items to render in the gallery. If empty, a small default set will be used (home variant).
   */
  @Input() items: GalleryItem[] = [];

  /**
   * Changes the layout of the component:
   * - 'home'  -> compact summary layout for the homepage
   * - 'page'  -> full grid layout (3×N on desktop, responsive in template/SCSS)
   */
  @Input() variant: GalleryVariant = 'home';

  /**
   * Optional heading/subtitle for the gallery section (used by the template if provided).
   */
  @Input() title?: string;
  @Input() subtitle?: string;

  /**
   * Fallback items for home when no items are passed in.
   */
  readonly defaultHomeItems: GalleryItem[] = [
    { src: 'assets/images/evento1.jpg', alt: 'Evento 1' },
    { src: 'assets/images/evento2.jpg', alt: 'Evento 2' },
    { src: 'assets/images/evento3.jpg', alt: 'Evento 3' },
    { src: 'assets/images/evento4.jpg', alt: 'Evento 4' },
    { src: 'assets/images/evento5.jpg', alt: 'Evento 5' },
    { src: 'assets/images/evento6.jpg', alt: 'Evento 6' },
  ];

  get resolvedItems(): GalleryItem[] {
    return (this.items && this.items.length > 0) ? this.items : this.defaultHomeItems;
  }

  get isPage(): boolean {
    return this.variant === 'page';
  }
}
