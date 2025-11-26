import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { TranslationService } from '../translation.service';
import { TESTIMONIALS } from './testimonials.data';

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

  readonly items = TESTIMONIALS;

  onImgError(event: Event) {
    const target = event.target as HTMLImageElement | null;
    if (target) {
      target.src = '/assets/testimonios/testimonial1.jpeg';
    }
  }

}
