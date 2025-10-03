import { Component, Input, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslationService } from '../translation.service';

export interface GalleryItem {
  src: string;
  alt?: string;
  title?: string;
  actionLabel?: string;
  actionHref?: string;
}

export interface PackageInput {
  ficha: string;
  setup: string;
  alt?: string;
  titleBase?: string;
}

export type GalleryVariant = 'home' | 'page';
export type GalleryTab = 'photos' | 'videos' | 'packages';

@Component({
  standalone: true,
  selector: 'app-gallery',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  readonly i18n = inject(TranslationService);
  /**
   * Tabs for the gallery section shown on the page/home. Client requested 3 tabs.
   */
  readonly tabs: { key: GalleryTab; labelKey: string }[] = [
    { key: 'photos',   labelKey: 'gallery.filter.photos' },
    { key: 'videos',   labelKey: 'gallery.filter.videos' },
    { key: 'packages', labelKey: 'gallery.filter.packages' },
  ];

  /** Active tab (defaults to photos). */
  activeTab: GalleryTab = 'photos';

  /** Update currently active tab */
  setActiveTab(tab: GalleryTab): void {
    this.activeTab = tab;
  }

  /**
   * External links for the "Ver más" action.
   * - Photos  -> Instagram
   * - Videos  -> TikTok
   * - Packages -> (none for now)
   */
  readonly externalMoreLinks: Record<GalleryTab, string | undefined> = {
    photos:   'https://www.instagram.com/megaforce.01',
    videos:   'https://www.tiktok.com/@megaforce.01',
    packages: undefined,
  };

  /** Label for the more-link depending on active tab */
  get moreLinkLabel(): string {
    if (this.activeTab === 'photos') return this.i18n.t('gallery.morePhotos');
    if (this.activeTab === 'videos') return this.i18n.t('gallery.moreVideos');
    return this.i18n.t('gallery.more');
  }

  /** Href for the more-link depending on active tab */
  get moreLinkHref(): string | undefined {
    return this.externalMoreLinks[this.activeTab];
  }
  /**
   * Items to render in the gallery. If empty, a small default set will be used (home variant).
   */
  @Input() items: GalleryItem[] = [];
  @Input() packages: PackageInput[] = [];

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

  /** Placeholder collections for videos & packages – content to be provided later */
  readonly defaultVideoItems: GalleryItem[] = [];
  readonly defaultPackageItems: GalleryItem[] = [];

  /** Convert packages (ficha + setup) into plain GalleryItem[] for rendering */
  private get packagesAsItems(): GalleryItem[] {
    const list = this.packages ?? [];
    return list.flatMap((p, idx) => {
      const num = String(idx + 1).padStart(2, '0');
      const base = p.titleBase ?? `Paquete ${num}`;
      return [
        { src: p.ficha, alt: p.alt ?? `${base} ficha`, title: `${base} — ficha` },
        { src: p.setup, alt: p.alt ?? `${base} setup`, title: `${base} — setup` },
      ];
    });
  }

  /** Items resolved by current tab */
  get currentItems(): GalleryItem[] {
    switch (this.activeTab) {
      case 'videos':
        return this.defaultVideoItems;
      case 'packages':
        return (this.packages && this.packages.length > 0) ? this.packagesAsItems : this.defaultPackageItems;
      case 'photos':
      default:
        return this.resolvedItems;
    }
  }

  get resolvedItems(): GalleryItem[] {
    return (this.items && this.items.length > 0) ? this.items : this.defaultHomeItems;
  }

  get isPage(): boolean {
    return this.variant === 'page';
  }

  get resolvedTitle(): string | undefined {
    return this.title ?? this.i18n.t('gallery.title');
  }

  get resolvedSubtitle(): string | undefined {
    return this.subtitle ?? this.i18n.t('gallery.subtitle');
  }
}
