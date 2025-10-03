import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { TranslationService } from '../translation.service';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [NgFor],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent {
  // Exponemos el servicio para poder usar i18n.t(...) en el template
  readonly i18n = inject(TranslationService);

  /**
   * Usamos claves de traducción en lugar de textos estáticos.
   * El template resolverá estas claves con i18n.t(key) y cambiará
   * automáticamente cuando se alterne el idioma.
   */
  readonly items = [
    {
      textKey: 'testimonials.1.text',
      authorKey: 'testimonials.1.author',
      image: 'assets/testimonios/testimonial1.jpg'
    },
    {
      textKey: 'testimonials.2.text',
      authorKey: 'testimonials.2.author',
      image: 'assets/testimonios/testimonial2.jpg'
    },
    {
      textKey: 'testimonials.3.text',
      authorKey: 'testimonials.3.author',
      image: 'assets/testimonios/testimonial3.jpg'
    },
    {
      textKey: 'testimonials.4.text',
      authorKey: 'testimonials.4.author',
      image: 'assets/testimonios/testimonial4.jpg'
    },
  ];

  onImgError(event: Event) {
    const target = event.target as HTMLImageElement | null;
    if (target) {
      target.src = 'assets/testimonios/fallback.jpg';
    }
  }

}
