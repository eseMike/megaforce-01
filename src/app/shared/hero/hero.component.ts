import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() backgroundUrl = ''; // e.g. '/assets/images/fondo-personas.png'
}
