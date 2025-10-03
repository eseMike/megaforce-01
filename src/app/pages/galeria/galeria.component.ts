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
    { src: 'assets/images/evento1.jpg', alt: 'Evento 1' },
    { src: 'assets/images/evento2.jpg', alt: 'Evento 2' },
    { src: 'assets/images/evento3.jpg', alt: 'Evento 3' },
    { src: 'assets/images/evento4.jpg', alt: 'Evento 4' },
    { src: 'assets/images/evento5.jpg', alt: 'Evento 5' },
    { src: 'assets/images/evento6.jpg', alt: 'Evento 6' },
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
