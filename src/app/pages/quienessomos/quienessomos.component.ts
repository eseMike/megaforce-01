import { Component, inject } from '@angular/core';
import { TranslationService } from '../../shared/translation.service';

@Component({
  selector: 'app-quienessomos',
  imports: [],
  templateUrl: './quienessomos.component.html',
  styleUrl: './quienessomos.component.scss'
})
export class QuienessomosComponent {

  readonly i18n = inject(TranslationService);

}
