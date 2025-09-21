import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslationService } from '../translation.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  // Mobile menu state
  isOpen = false;

  // i18n service
  readonly i18n = inject(TranslationService);

  toggle() {
    this.isOpen = !this.isOpen;
  }

  close() {
    this.isOpen = false;
  }

  // Switch language ES <-> EN
  toggleLang() {
    this.i18n.toggle();
  }

  // Label shown in the small language button
  get langLabel(): string {
    return this.i18n.current === 'es' ? 'EN' : 'ES';
  }
}
