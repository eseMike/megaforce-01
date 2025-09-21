import { Component, inject } from '@angular/core';
import { TranslationService } from '../translation.service';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  readonly i18n = inject(TranslationService);

}
