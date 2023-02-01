import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StagiaireModel } from './core/models/stagiaire-model';
import { StagiaireService } from './core/services/stagiaire-service';
import { IntlService } from './intl/services/intl.service';
import { Poe } from 'src/app/core/models/poe';
import { PoeService } from 'src/app/poes/services/poe/poe.service';
import { User } from './core/models/user';
import { AuthenticationService } from './core/services/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', //view
  styleUrls: ['./app.component.scss'] // Tableau de SCSS pour la mise en forme
})
export class AppComponent {
  public title = 'front-end';
  public poes:Poe[]=[];
  //public poeType: string | null = '';
  currentUser!: User;
  public constructor(
    public intlService: IntlService,
    public poeService: PoeService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.poeService.findAll()
      .subscribe((poes: Poe[])=> {
        this.poes = poes;
      });
  }

  switchLanguage(language: string): void{
      this.intlService.language = language
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
}
