import { Component, inject } from '@angular/core';
import { TranslationService } from '../../shared/translation.service';

@Component({
  selector: 'app-servicios',
  imports: [],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.scss'
})
export class ServiciosComponent {
  readonly i18n = inject(TranslationService);
}
