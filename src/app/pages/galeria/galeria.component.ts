import { Component, inject } from '@angular/core';
import { TranslationService } from '../../shared/translation.service';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from '../../shared/gallery/gallery.component';
import { HeroComponent } from '../../shared/hero/hero.component';

interface PackageItem {
  id: number;
  ficha: string; // imagen con lista de elementos del paquete
  setup: string; // imagen del montaje/equipo
  alt: string;
}

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [CommonModule, GalleryComponent, HeroComponent],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.scss'
})
export class GaleriaComponent {
  readonly i18n = inject(TranslationService);
  readonly galleryItems = [
    { src: 'assets/images/evento4.jpeg', alt: 'Evento 4' },
    { src: 'assets/images/evento5.jpeg', alt: 'Evento 5' },
    { src: 'assets/images/evento6.jpeg', alt: 'Evento 6' },
    { src: 'assets/images/evento1.jpeg', alt: 'Evento 1' },
    { src: 'assets/images/evento2.jpeg', alt: 'Evento 2' },
    { src: 'assets/images/evento3.jpeg', alt: 'Evento 3' },
  ];

  /** Controls the 'Ver más fotos' expansion for photos tab */
  showMore = false;

  /** Extra 6 photos that appear after clicking 'Ver más fotos' */
  readonly galleryItemsExtra = [
    { src: 'assets/images/evento7.jpeg', alt: 'Evento 7' },
    { src: 'assets/images/evento8.jpeg', alt: 'Evento 8' },
    { src: 'assets/images/evento9.jpeg', alt: 'Evento 9' },
    { src: 'assets/images/evento10.jpeg', alt: 'Evento 10' },
    { src: 'assets/images/evento11.jpeg', alt: 'Evento 11' },
    { src: 'assets/images/evento12.jpeg', alt: 'Evento 12' },
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
      ficha: 'assets/images/paquetes/paquete-02-ficha.jpeg.jpeg',
      setup: 'assets/images/paquetes/paquete-02-setup.jpeg',
      alt: 'Pack MF 02 - ficha y setup'
    },
    {
      id: 3,
      ficha: 'assets/images/paquetes/paquete-03-ficha.jpeg.jpeg',
      setup: 'assets/images/paquetes/paquete-03-setup.jpeg',
      alt: 'Pack MF 03 - ficha y setup'
    },
    {
      id: 4,
      ficha: 'assets/images/paquetes/paquete-04-ficha.jpeg.jpeg',
      setup: 'assets/images/paquetes/paquete-04-setup.jpeg',
      alt: 'Pack MF 04 - ficha y setup'
    },
    {
      id: 5,
      ficha: 'assets/images/paquetes/paquete-05-ficha.jpeg.jpeg',
      setup: 'assets/images/paquetes/paquete-05-setup.jpeg',
      alt: 'Pack MF 05 - ficha y setup'
    },
  ];
}
