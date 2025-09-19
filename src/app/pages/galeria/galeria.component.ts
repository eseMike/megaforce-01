import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from '../../shared/gallery/gallery.component';
import { HeroComponent } from '../../shared/hero/hero.component';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [CommonModule, GalleryComponent, HeroComponent],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.scss'
})
export class GaleriaComponent {
  readonly galleryItems = [
    { src: 'assets/images/evento1.jpg', alt: 'Evento 1' },
    { src: 'assets/images/evento2.jpg', alt: 'Evento 2' },
    { src: 'assets/images/evento3.jpg', alt: 'Evento 3' },
    { src: 'assets/images/evento4.jpg', alt: 'Evento 4' },
    { src: 'assets/images/evento5.jpg', alt: 'Evento 5' },
    { src: 'assets/images/evento6.jpg', alt: 'Evento 6' },
  ];
}
