import { Component, inject } from '@angular/core';
import { HeroComponent } from '../../shared/hero/hero.component';
import { DiscoverComponent } from '../../shared/discover/discover.component';
import { GalleryComponent } from '../../shared/gallery/gallery.component';
import { TestimonialsComponent } from '../../shared/testimonials/testimonials.component';
import { ContactComponent } from '../../shared/contact/contact.component';
import { TranslationService } from '../../shared/translation.service';
import { SERVICES_CARDS } from '../../shared/data/services-cards';

interface PackageItem {
  id: number;
  ficha: string;
  setup: string;
  alt: string;
}

type ServiceCard = {
  id: string;
  src: string;
  titleKey: string;
  href: string;
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, DiscoverComponent, GalleryComponent, TestimonialsComponent, ContactComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  // Expose i18n to the template
  readonly i18n = inject(TranslationService);

  // Services cards to show in the home gallery section
  services: ServiceCard[] = SERVICES_CARDS;

  // trackBy to keep DOM stable
  trackById = (_: number, item: ServiceCard) => item.id;

  /**
   * First 6 photos for the Photos tab in the Home gallery.
   * Must match assets already present in src/assets/images/
   */
  readonly galleryItems = [
    { src: 'assets/images/evento1.jpg', alt: 'Evento 1' },
    { src: 'assets/images/evento2.jpg', alt: 'Evento 2' },
    { src: 'assets/images/evento3.jpg', alt: 'Evento 3' },
    { src: 'assets/images/evento4.jpg', alt: 'Evento 4' },
    { src: 'assets/images/evento5.jpg', alt: 'Evento 5' },
    { src: 'assets/images/evento6.jpg', alt: 'Evento 6' },
  ];

  /**
   * Extra 6 photos revealed with the "Ver más fotos" button.
   */
  readonly galleryItemsExtra = [
    { src: 'assets/images/evento7.jpg', alt: 'Evento 7' },
    { src: 'assets/images/evento8.jpg', alt: 'Evento 8' },
    { src: 'assets/images/evento9.jpg', alt: 'Evento 9' },
    { src: 'assets/images/evento10.jpg', alt: 'Evento 10' },
    { src: 'assets/images/evento11.jpg', alt: 'Evento 11' },
    { src: 'assets/images/evento12.jpg', alt: 'Evento 12' },
  ];

  readonly packagesItems: PackageItem[] = [
    {
      id: 1,
      ficha: 'assets/images/paquetes/paquete-01-ficha.jpeg',
      setup: 'assets/images/paquetes/paquete-01-setup.jpeg',
      alt: 'Pack MF Básico - ficha y setup'
    },
    {
      id: 2,
      ficha: 'assets/images/paquetes/paquete-02-ficha.jpg.jpeg',
      setup: 'assets/images/paquetes/paquete-02-setup.jpeg',
      alt: 'Pack MF 02 - ficha y setup'
    },
    {
      id: 3,
      ficha: 'assets/images/paquetes/paquete-03-ficha.jpg.jpeg',
      setup: 'assets/images/paquetes/paquete-03-setup.jpeg',
      alt: 'Pack MF 03 - ficha y setup'
    },
    {
      id: 4,
      ficha: 'assets/images/paquetes/paquete-04-ficha.jpg.jpeg',
      setup: 'assets/images/paquetes/paquete-04-setup.jpeg',
      alt: 'Pack MF 04 - ficha y setup'
    },
    {
      id: 5,
      ficha: 'assets/images/paquetes/paquete-05-ficha.jpg.jpeg',
      setup: 'assets/images/paquetes/paquete-05-setup.jpeg',
      alt: 'Pack MF 05 - ficha y setup'
    },
  ];
}
