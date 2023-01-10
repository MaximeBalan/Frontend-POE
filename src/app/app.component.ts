import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StagiaireModel } from './core/models/stagiaire-model';
import { StagiaireService } from './core/services/stagiaire-service';
import { IntlService } from './intl/services/intl.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', //view
  styleUrls: ['./app.component.scss'] // Tableau de SCSS pour la mise en forme
})
export class AppComponent {
  public title = 'front-end';

  public constructor(
    public intlService: IntlService
  ) {}

  switchLanguage(language: string): void{ 
    this.intlService.language = language;
   }

}
