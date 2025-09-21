import { Component, inject } from '@angular/core';
import { HeroComponent } from '../../shared/hero/hero.component';
import { DiscoverComponent } from '../../shared/discover/discover.component';
import { GalleryComponent } from '../../shared/gallery/gallery.component';
import { TestimonialsComponent } from '../../shared/testimonials/testimonials.component';
import { ContactComponent } from '../../shared/contact/contact.component';
import { TranslationService } from '../../shared/translation.service';

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
}
