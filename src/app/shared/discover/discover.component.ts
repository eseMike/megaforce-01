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
    'assets/images/evento1.jpeg',
    'assets/images/evento2.jpeg',
    'assets/images/evento3.jpeg',
    'assets/images/evento4.jpeg',
    'assets/images/evento5.jpeg',
    'assets/images/evento6.jpeg',
    'assets/images/evento7.jpeg',
    'assets/images/evento8.jpeg',
    'assets/images/evento9.jpeg',
    'assets/images/evento10.jpeg',
    'assets/images/evento11.jpeg',
    'assets/images/evento12.jpeg',
  ];
}
