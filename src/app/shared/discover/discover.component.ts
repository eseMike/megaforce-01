import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../translation.service';

@Component({
  selector: 'app-discover',
  imports: [CommonModule],
  templateUrl: './discover.component.html',
  styleUrl: './discover.component.scss'
})
export class DiscoverComponent {
  readonly i18n = inject(TranslationService);

  /** Images for the continuous marquee in Discover */
  carouselImages: string[] = [
    'assets/images/evento1.jpg',
    'assets/images/evento2.jpg',
    'assets/images/evento3.jpg',
    'assets/images/evento4.jpg',
    'assets/images/evento5.jpg',
    'assets/images/evento6.jpg',
    'assets/images/evento7.jpg',
    'assets/images/evento8.jpg',
    'assets/images/evento9.jpg',
    'assets/images/evento10.jpg',
    'assets/images/evento11.jpg',
    'assets/images/evento12.jpg',
  ];
}
